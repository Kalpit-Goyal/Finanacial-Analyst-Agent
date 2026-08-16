import asyncio
import os
import sys

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_mcp_adapters.client import MultiServerMCPClient


load_dotenv()


async def main():

    # Connect to our MCP server
    client = MultiServerMCPClient(
        {
            "financial": {
                "command": sys.executable,
                "args": ["mcp_server/financial_tools.py"],
                "transport": "stdio",
            }
        }
    )

    # Get MCP tools
    tools = await client.get_tools()

    print("Available tools:")
    for tool in tools:
        print("-", tool.name)

    # Create LLM
    llm = ChatOpenAI(
        model="kat-coder-pro-v2.5",
        api_key=os.getenv("api_key"),
        base_url="https://api.hcnsec.cn/v1"
    )

    # Give tools to LLM
    llm_with_tools = llm.bind_tools(tools)

    # Ask LLM what tools it needs
    response = await llm_with_tools.ainvoke(
        "For NVIDIA, evaluate its profitability."
    )

    print("\nLLM selected:")
    print(response.tool_calls)

    # Execute the selected tools
    tool_results = []

    for tool_call in response.tool_calls:

        for tool in tools:

            if tool.name == tool_call["name"]:

                result = await tool.ainvoke(tool_call["args"])

                tool_results.append(
                    {
                        "name": tool_call["name"],
                        "result": result
                    }
                )

    print("\nTool results:")

    for result in tool_results:
        print("\n", result["name"])
        print(result["result"])


if __name__ == "__main__":
    asyncio.run(main())
import os

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

from state import AgentState


load_dotenv()


def analyst_node(state: AgentState, tools):

    llm = ChatOpenAI(
        model="kat-coder-pro-v2.5",
        api_key=os.getenv("api_key"),
        base_url="https://api.hcnsec.cn/v1",
    )

    llm_with_tools = llm.bind_tools(tools)

    response = llm_with_tools.invoke(
        [
            {
                "role": "system",
                "content": f"""
You are a financial analyst assistant.

Company: {state["company"]}
Ticker: {state["ticker"]}

Use the available financial tools whenever actual financial
data is required.

Do not invent financial information.
Use the conversation history to understand context.
""",
            },
            *state["messages"],
        ]
    )

    return {"messages": [response]}
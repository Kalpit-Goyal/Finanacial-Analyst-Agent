import sys

from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_mcp_adapters.client import MultiServerMCPClient

from state import AgentState
from user_input import get_ticker
from analyst import analyst_node


async def create_graph():

    # Connect to MCP server
    client = MultiServerMCPClient(
        {
            "financial": {
                "command": sys.executable,
                "args": ["mcp_server/financial_tools.py"],
                "transport": "stdio",
            }
        }
    )

    tools = await client.get_tools()

    graph = StateGraph(AgentState)

    # Nodes
    graph.add_node("get_ticker", get_ticker)

    graph.add_node(
        "analyst",
        lambda state: analyst_node(state, tools)
    )

    graph.add_node(
        "tools",
        ToolNode(tools)
    )

    # START → ticker lookup
    graph.add_edge(
        START,
        "get_ticker"
    )

    # ticker → analyst
    graph.add_edge(
        "get_ticker",
        "analyst"
    )

    # Analyst decides whether a tool is needed
    graph.add_conditional_edges(
        "analyst",
        tools_condition,
        {
            "tools": "tools",
            END: END,
        },
    )

    # Tool result → analyst
    graph.add_edge(
        "tools",
        "analyst"
    )

    return graph.compile()
from langgraph.graph import StateGraph, START, END
from state import AgentState
from user_input import get_input,get_ticker

def create_graph():
    graph=StateGraph(AgentState)

    graph.add_node("get_input",get_input)
    graph.add_node("get_ticker",get_ticker)

    graph.add_edge(START,"get_input")
    graph.add_edge("get_input","get_ticker")
    graph.add_edge("get_ticker",END)

    return graph.compile()
from typing import TypedDict, Annotated
from langgraph.graph.message import add_messages


class AgentState(TypedDict):
    company: str
    ticker: str
    messages: Annotated[list, add_messages]
    financial_data: dict
    web_data: dict
    artifacts: dict


initial_state: AgentState = {
    "company": "",
    "ticker": "",
    "messages": [],
    "financial_data": {},
    "web_data": {},
    "artifacts": {},
}
from typing import TypedDict

class AgentState(TypedDict):
    company:str
    question:str
    ticker:str


initial_state: AgentState = {
    "company": "",
    "question": "",
    "ticker": ""
}
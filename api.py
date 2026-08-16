from fastapi import FastAPI
from pydantic import BaseModel

from graph import create_graph


app = FastAPI(title="Financial Analyst Agent")

graph = create_graph()


class AnalysisRequest(BaseModel):
    company: str
    question: str


@app.get("/")
def health_check():
    return {"status": "ok"}


@app.post("/analyze")
async def analyze(request: AnalysisRequest):

    initial_state = {
        "company": request.company,
        "question": request.question,
        "ticker": "",
        "financial_data": {},
        "report": ""
    }

    final_state = await graph.ainvoke(initial_state)

    return final_state
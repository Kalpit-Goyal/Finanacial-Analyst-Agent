from fastapi import FastAPI
from pydantic import BaseModel

from graph import create_graph
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="MY-NEW-FINANCIAL-ANALYST-APP-123")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
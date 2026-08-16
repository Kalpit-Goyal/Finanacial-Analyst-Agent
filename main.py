from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from graph import create_graph


app = FastAPI(title="Financial Analyst Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalysisRequest(BaseModel):
    company: str
    question: str


@app.get("/")
def health_check():
    return {"status": "ok"}


@app.post("/analyze")
async def analyze(request: AnalysisRequest):

    graph = await create_graph()

    initial_state = {
        "company": request.company,
        "ticker": "",
        "messages": [
            {
                "role": "user",
                "content": request.question,
            }
        ],
        "financial_data": {},
        "web_data": {},
        "artifacts": {},
    }

    final_state = await graph.ainvoke(initial_state)

    return final_state
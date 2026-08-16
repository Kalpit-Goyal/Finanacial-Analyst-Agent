from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from graph import create_graph


app = FastAPI()


# Allow the React development server to communicate
# with the FastAPI backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    company: str
    message: str


@app.post("/chat")
async def chat(request: ChatRequest):

    graph = await create_graph()

    initial_state = {
        "company": request.company,
        "ticker": "",
        "messages": [
            {
                "role": "user",
                "content": request.message,
            }
        ],
        "financial_data": {},
        "web_data": {},
        "artifacts": {},
    }

    result = await graph.ainvoke(initial_state)

    # Get the final assistant message
    final_message = result["messages"][-1]

    return {
        "response": final_message.content,
        "company": result["company"],
        "ticker": result["ticker"],
    }
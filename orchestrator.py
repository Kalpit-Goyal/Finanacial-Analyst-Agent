import os
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv


load_dotenv()


llm = ChatOpenAI(
    model="kat-coder-pro-v2.5",
    api_key=os.getenv("api_key"),
    base_url="https://api.hcnsec.cn/v1"
)


print("Sending request...")

response = llm.invoke("Say hello in one sentence.")

print("Response:")
print(response.content)
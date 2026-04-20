from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

# Configuração da IA
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-2.0-flash-exp')

app = FastAPI(title="FinGuide AI Backend")

# Modelos de Dados
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: List[ChatMessage]

class SimulationRequest(BaseModel):
    amount: float
    rate: float
    time: int

# System Instruction
SYSTEM_INSTRUCTION = """
Você é o FinGuide AI, um assistente financeiro sênior, amigável e didático.
Seu objetivo é ajudar usuários com dúvidas financeiras básicas, simulações e educação financeira.
... (mesmas diretrizes do frontend)
"""

@app.get("/")
async def root():
    return {"message": "FinGuide AI API is running"}

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        # Formata o histórico para o formato do Gemini
        history = [{"role": m.role, "parts": [m.content]} for m in request.history]
        
        chat = model.start_chat(history=history)
        response = chat.send_message(request.message)
        
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/simulate/compound-interest")
async def simulate_compound(request: SimulationRequest):
    # M = P * (1 + i)^n
    total = request.amount * (1 + (request.rate / 100)) ** request.time
    interest = total - request.amount
    return {
        "total": round(total, 2),
        "interest": round(interest, 2)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

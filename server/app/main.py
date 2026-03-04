"""FastAPI Application - API Gateway & Entrypoint."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.api.routes import chat_router

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    description="RAG Chatbot - Production-grade backend with Session Manager, Redis, PostgreSQL, RAG pipeline.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api/v1")


@app.get("/health")
async def health():
    return {"status": "ok"}

"""Application configuration."""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """App settings from environment."""

    app_name: str = "Amigo AI"
    debug: bool = False

    # Redis - Short-term memory
    redis_url: str = "redis://localhost:6379/0"

    # PostgreSQL - Persistent sessions
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/amigo"

    # RAG / Knowledge Layer
    vector_store_url: str | None = None  # Pinecone, Milvus, etc.
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"

    class Config:
        env_file = ".env"


@lru_cache
def get_settings() -> Settings:
    return Settings()

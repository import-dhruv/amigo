"""FastAPI dependencies."""

from functools import lru_cache

from app.core.config import get_settings
from app.services.memory import RedisCache, PostgresStore
from app.services.session_manager import SessionManager
from app.knowledge.rag_pipeline import RAGPipeline


@lru_cache
def get_redis_cache() -> RedisCache:
    settings = get_settings()
    return RedisCache(settings.redis_url)


@lru_cache
def get_postgres_store() -> PostgresStore:
    settings = get_settings()
    return PostgresStore(settings.database_url)


@lru_cache
def get_rag_pipeline() -> RAGPipeline:
    return RAGPipeline()


@lru_cache
def get_session_manager() -> SessionManager:
    return SessionManager(
        redis_cache=get_redis_cache(),
        postgres_store=get_postgres_store(),
        rag_pipeline=get_rag_pipeline(),
    )

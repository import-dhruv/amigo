"""
Session Manager - Core orchestrator.

Coordinates user journey, retrieves conversation history, manages flow
between memory (Redis/PostgreSQL) and RAG pipeline.
"""

from app.models import ChatRequest, ChatResponse, ChatMessage
from app.services.memory import RedisCache, PostgresStore
from app.knowledge.rag_pipeline import RAGPipeline


class SessionManager:
    """Orchestrates state loading, RAG, and inference."""

    def __init__(
        self,
        redis_cache: RedisCache,
        postgres_store: PostgresStore,
        rag_pipeline: RAGPipeline,
    ) -> None:
        self.redis = redis_cache
        self.postgres = postgres_store
        self.rag = rag_pipeline

    async def process(self, request: ChatRequest) -> ChatResponse:
        """
        Full request-response cycle:
        1. State Loading - fetch history from Redis/PostgreSQL
        2. Context Retrieval - vector search + re-rank
        3. Prompt Assembly - short-term memory + summaries + retrieved context
        4. Inference - model generates response
        5. State Update - save back to DB, return to user
        """
        # 1. Get or create session
        session_id = request.session_id
        if not session_id:
            session_id = await self.postgres.create_or_get_session(
                request.user_id, request.channel_id, "web"
            )

        # 2. Load state (short-term from Redis, long-term from Postgres)
        recent_turns = await self.redis.get_recent_turns(session_id)
        summaries = await self.postgres.get_condensed_summaries(session_id)

        # 3. RAG: retrieve context, assemble prompt, infer
        response_text = await self.rag.generate(
            query=request.message,
            short_term_memory=recent_turns,
            long_term_summaries=summaries,
        )

        # 4. Update state
        await self.redis.append_turn(session_id, "user", request.message)
        await self.redis.append_turn(session_id, "assistant", response_text)
        await self.postgres.save_turn(
            session_id, request.user_id, request.channel_id, "user", request.message
        )
        await self.postgres.save_turn(
            session_id,
            request.user_id,
            request.channel_id,
            "assistant",
            response_text,
        )

        return ChatResponse(message=response_text, session_id=session_id)

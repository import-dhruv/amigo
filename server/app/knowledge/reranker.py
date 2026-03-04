"""
Re-ranker - ColBERT or similar for high relevance before model.

TODO: Implement in RAG pipeline step.
"""

from typing import Any


async def rerank(
    query: str, candidates: list[dict[str, Any]], top_k: int = 3
) -> list[dict[str, Any]]:
    """Re-rank retrieved documents by relevance."""
    # TODO: ColBERT or cross-encoder
    return candidates[:top_k]

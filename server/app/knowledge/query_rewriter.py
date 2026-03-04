"""
Query Rewriter - Transforms ambiguous user queries into context-rich search terms.

TODO: Integrate LLM-based rewriting in RAG pipeline step.
"""


async def rewrite_query(query: str) -> str:
    """Rewrite user query for better vector search."""
    # TODO: LLM call to expand/refine query
    return query

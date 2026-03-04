"""
Redis - Short-term memory (high-speed caching of recent chat turns).

TODO: Implement in state management step.
"""

from typing import Any


class RedisCache:
    """Placeholder for Redis short-term memory."""

    def __init__(self, redis_url: str) -> None:
        self.redis_url = redis_url
        # self.client = redis.from_url(redis_url)

    async def get_recent_turns(self, session_id: str, limit: int = 10) -> list[dict[str, Any]]:
        """Fetch most recent chat turns for a session."""
        # TODO: Redis GET/LRANGE
        return []

    async def append_turn(self, session_id: str, role: str, content: str) -> None:
        """Append a new turn to short-term cache."""
        # TODO: Redis RPUSH, TTL
        pass

    async def invalidate_session(self, session_id: str) -> None:
        """Clear short-term memory for session."""
        # TODO: Redis DEL
        pass

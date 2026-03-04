"""
API schemas for the web frontend (client).
"""

from pydantic import BaseModel, Field
from enum import Enum
from datetime import datetime


class ChatMode(str, Enum):
    """Chat mode from the web UI."""

    NORMAL = "normal"
    DEEPTHINK = "deepthink"


class ChatRequest(BaseModel):
    """Chat request from the web client."""

    message: str = Field(..., description="User message")
    session_id: str | None = Field(None, description="Session ID for conversation continuity")
    mode: ChatMode = Field(ChatMode.NORMAL, description="Normal or DeepThink mode")
    user_id: str = Field(default="web-user", description="User ID (for session management)")
    channel_id: str = Field(default="web", description="Channel ID (web)")


class MessageRole(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"


class ChatMessage(BaseModel):
    """Single message in conversation."""

    role: MessageRole
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class ChatResponse(BaseModel):
    """Chat response for the web client."""

    message: str = Field(..., description="Assistant reply")
    session_id: str = Field(..., description="Session ID for continuity")

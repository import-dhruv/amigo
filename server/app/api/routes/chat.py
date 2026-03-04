"""Chat API - Normalized endpoint for all channels."""

from fastapi import APIRouter, Depends

from app.models import ChatRequest, ChatResponse
from app.services.session_manager import SessionManager
from app.api.deps import get_session_manager

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    session_manager: SessionManager = Depends(get_session_manager),
) -> ChatResponse:
    """
    Chat endpoint for the web client.
    """
    return await session_manager.process(request)

# Feature: Backend Server & Web Client Integration

## Summary

Add FastAPI backend server scaffold and wire the web client (chat bar) to the API. Full request-response flow is in place; Redis, PostgreSQL, and RAG pipeline are placeholders for later implementation.

## Changes

### Server (`server/`)
- FastAPI app with `/api/v1/chat/` endpoint
- Web-focused schemas: `ChatRequest`, `ChatResponse`, `ChatMode` (normal/deepthink)
- Session Manager orchestration layer
- Memory layer placeholders: Redis (short-term), PostgreSQL (long-term)
- RAG pipeline placeholder: query rewriter, vector store, re-ranker

### Client (`client/`)
- `src/lib/api.ts` – `sendMessage()` calls backend
- Chat bar connected to API: `onSend`, loading state, Enter key
- Page shows conversation (user + assistant messages)
- Session ID passed for continuity
- `.env.example` – `NEXT_PUBLIC_API_URL`

## How to Test

```bash
# Terminal 1
cd server && source venv/bin/activate && uvicorn app.main:app --reload

# Terminal 2
cd client && npm run dev
```

1. Open http://localhost:3000
2. Type a message and send (or press Enter)
3. Backend returns placeholder response
4. Messages appear above the chat bar

## Next Steps (Future PRs)

1. Redis + PostgreSQL implementation
2. RAG pipeline (vector store, re-ranker)
3. LLM inference integration

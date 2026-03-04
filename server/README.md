# Amigo AI - Backend Server

Production-grade RAG chatbot backend (FastAPI).

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     API Gateway (FastAPI)                         │
│                    Serves the web client (/)                      │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Session Manager (Orchestrator)                 │
│         State loading → RAG → Inference → State update            │
└─────────────────────────────────────────────────────────────────┘
                    │               │               │
                    ▼               ▼               ▼
        ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
        │     Redis     │ │  PostgreSQL   │ │ RAG Pipeline  │
        │ Short-term    │ │ Long-term     │ │ Query→Vector  │
        │ (recent turns)│ │ (sessions)    │ │ →Re-rank→LLM  │
        └───────────────┘ └───────────────┘ └───────────────┘
```

## Setup

```bash
cd server
python -m venv venv
source venv/bin/activate   # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
cp .env.example .env      # edit with your values
```

## Run

```bash
uvicorn app.main:app --reload
```

API: http://localhost:8000  
Docs: http://localhost:8000/docs

## Web Client

The `client/` folder (Next.js) connects to this API. Run both:

```bash
# Terminal 1 – server
cd server && uvicorn app.main:app --reload

# Terminal 2 – client
cd client && npm run dev
```

Set `NEXT_PUBLIC_API_URL=http://localhost:8000` in `client/.env.local`.

## Implementation Steps

1. **State Management** – Redis + PostgreSQL (sessions, turns)
2. **RAG Pipeline** – Query rewriter, vector store, re-ranker
3. **Inference** – Integrate LLM (Llama 3, Mistral, etc.)

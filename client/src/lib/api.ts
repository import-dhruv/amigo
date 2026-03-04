const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export type ChatMode = "normal" | "deepthink";

export interface ChatResponse {
  message: string;
  session_id: string;
}

export async function sendMessage(
  message: string,
  options?: { sessionId?: string; mode?: ChatMode }
): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/api/v1/chat/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      session_id: options?.sessionId ?? null,
      mode: options?.mode ?? "normal",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `HTTP ${res.status}`);
  }

  return res.json();
}

"use client";

import { useState } from "react";
import { ChatBar } from "@/components/chat/chat-bar";
import { FloatingBackground } from "@/components/chat/floating-background";
import { sendMessage, type ChatMode } from "@/lib/api";

type Message = { role: "user" | "assistant"; content: string };

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend(message: string, mode: ChatMode) {
    if (!message.trim() || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setIsLoading(true);

    try {
      const res = await sendMessage(message, { sessionId: sessionId ?? undefined, mode });
      setSessionId(res.session_id);
      setMessages((prev) => [...prev, { role: "assistant", content: res.message }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${err instanceof Error ? err.message : "Failed to send"}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#0B0B0F] px-4">
      <FloatingBackground />

      <main className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center gap-8">
        <div className="text-center">
          <h1 className="text-xl font-semibold tracking-tight text-zinc-200/90">
            Amigo AI
          </h1>
          <p className="mt-1 text-sm text-zinc-500">Cyber-Noir Minimalism</p>
        </div>

        {messages.length > 0 && (
          <div className="flex w-full max-w-3xl flex-col gap-3 overflow-y-auto max-h-[40vh]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`rounded-2xl px-4 py-3 ${
                  m.role === "user"
                    ? "ml-auto bg-white/10 text-zinc-100"
                    : "mr-auto bg-[#16161D]/60 text-zinc-200"
                }`}
              >
                {m.content}
              </div>
            ))}
          </div>
        )}

        <div className="w-full flex justify-center">
          <ChatBar onSend={handleSend} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}

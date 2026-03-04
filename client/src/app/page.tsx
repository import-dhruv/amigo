import { ChatBar } from "@/components/chat/chat-bar";
import { FloatingBackground } from "@/components/chat/floating-background";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#0B0B0F] px-4">
      <FloatingBackground />

      <main className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center gap-12">
        {/* Optional: logo or title */}
        <div className="text-center">
          <h1 className="text-xl font-semibold tracking-tight text-zinc-200/90">
            Amigo AI
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Cyber-Noir Minimalism
          </p>
        </div>

        {/* Central chat bar */}
        <div className="w-full flex justify-center">
          <ChatBar />
        </div>
      </main>
    </div>
  );
}

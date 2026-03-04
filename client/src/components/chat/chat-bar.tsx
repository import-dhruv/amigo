"use client";

import { useState } from "react";
import {
  Plus,
  Send,
  Mic,
  Lightbulb,
  ChevronDown,
  PenLine,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ChatMode = "normal" | "deepthink";

export function ChatBar() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ChatMode>("normal");

  return (
    <div
      className={cn(
        "chat-bar-glow relative flex w-full max-w-3xl items-center gap-2 rounded-[28px] px-3 py-2",
        "border border-white/10",
        "bg-[#16161D]/60 backdrop-blur-[20px]"
      )}
    >
      {/* Add/Attach button */}
      <button
        type="button"
        aria-label="Add attachment"
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
          "bg-white/5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-zinc-200"
        )}
      >
        <Plus className="h-4 w-4" />
      </button>

      {/* Mode selection - Normal */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-2",
              "bg-white/5 text-zinc-300 transition-colors hover:bg-white/10",
              mode === "normal" && "ring-1 ring-white/20"
            )}
          >
            <PenLine className="h-3.5 w-3.5" />
            <span className="text-sm font-medium">Normal</span>
            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="border-white/10 bg-[#16161D] backdrop-blur-xl"
        >
          <DropdownMenuItem
            onClick={() => setMode("normal")}
            className="text-zinc-200 focus:bg-white/10 focus:text-zinc-100"
          >
            Normal
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setMode("deepthink")}
            className="text-zinc-200 focus:bg-white/10 focus:text-zinc-100"
          >
            DeepThink
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Mode selection - DeepThink */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-2",
              "bg-white/5 text-zinc-300 transition-colors hover:bg-white/10",
              mode === "deepthink" && "ring-1 ring-amber-400/40"
            )}
          >
            <Lightbulb className="h-3.5 w-3.5" />
            <span className="text-sm font-medium">DeepThink</span>
            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="border-white/10 bg-[#16161D] backdrop-blur-xl"
        >
          <DropdownMenuItem
            onClick={() => setMode("deepthink")}
            className="text-zinc-200 focus:bg-white/10 focus:text-zinc-100"
          >
            DeepThink
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setMode("normal")}
            className="text-zinc-200 focus:bg-white/10 focus:text-zinc-100"
          >
            Normal
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Input field */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask anything..."
        className={cn(
          "flex-1 min-w-0 bg-transparent px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500",
          "focus:outline-none"
        )}
        aria-label="Chat input"
      />

      {/* Voice button */}
      <button
        type="button"
        aria-label="Voice input"
        className={cn(
          "flex items-center gap-2 rounded-full px-3 py-2",
          "bg-white/5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-zinc-200"
        )}
      >
        <Mic className="h-3.5 w-3.5" />
        <span className="text-sm font-medium">Voice</span>
      </button>

      {/* Send button */}
      <button
        type="button"
        aria-label="Send message"
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
          "bg-linear-to-r from-[#9D50BB] to-[#6E48AA] text-white",
          "shadow-[0_0_20px_-2px_rgba(157,80,187,0.5)]",
          "transition-all hover:opacity-90 hover:shadow-[0_0_24px_-2px_rgba(157,80,187,0.6)]"
        )}
      >
        <Send className="h-4 w-4" strokeWidth={2} />
      </button>
    </div>
  );
}

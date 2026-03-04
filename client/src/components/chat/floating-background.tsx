"use client";

import { cn } from "@/lib/utils";

const CODE_FRAGMENTS = [
  "const x =",
  "function()",
  "=>",
  "import {",
  "useEffect",
  "async",
  "return",
  "if (",
  "for (",
  "try {",
  "className",
  "useState",
];

const MATH_SYMBOLS = ["∑", "∫", "∂", "∇", "π", "√", "∞", "≈", "≠", "≤", "≥"];

function FloatingSymbol({
  children,
  className,
  delay,
  duration,
  left,
  top,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
  duration: number;
  left: string;
  top: string;
}) {
  return (
    <span
      className={cn(
        "absolute select-none pointer-events-none opacity-[0.15]",
        "animate-float",
        className
      )}
      style={{
        left,
        top,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </span>
  );
}

export function FloatingBackground() {
  const leftGlow = "rgba(255, 120, 80, 0.25)";
  const rightGlow = "rgba(120, 80, 255, 0.25)";

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Ambient gradient orbs */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
        style={{ background: leftGlow }}
      />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
        style={{ background: rightGlow }}
      />

      {/* Floating code fragments - left side (warm glow) */}
      {CODE_FRAGMENTS.slice(0, 6).map((frag, i) => (
        <FloatingSymbol
          key={`code-left-${i}`}
          left={`${5 + i * 8}%`}
          top={`${15 + (i % 5) * 18}%`}
          delay={i * 0.8}
          duration={12 + i * 2}
          className="text-sm font-mono text-orange-400/40"
        >
          {frag}
        </FloatingSymbol>
      ))}

      {/* Floating code fragments - right side (cool glow) */}
      {CODE_FRAGMENTS.slice(6, 12).map((frag, i) => (
        <FloatingSymbol
          key={`code-right-${i}`}
          left={`${55 + i * 6}%`}
          top={`${20 + (i % 4) * 22}%`}
          delay={i * 0.6}
          duration={14 + i}
          className="text-sm font-mono text-blue-400/40"
        >
          {frag}
        </FloatingSymbol>
      ))}

      {/* Math symbols - scattered */}
      {MATH_SYMBOLS.map((sym, i) => (
        <FloatingSymbol
          key={`math-${i}`}
          left={`${10 + (i * 7) % 80}%`}
          top={`${8 + (i * 11) % 85}%`}
          delay={i * 0.5}
          duration={10 + i * 1.5}
          className="text-lg text-purple-300/30"
        >
          {sym}
        </FloatingSymbol>
      ))}
    </div>
  );
}

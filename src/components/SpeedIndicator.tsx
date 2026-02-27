"use client";

import { useEffect, useState } from "react";

export function SpeedIndicator({
  isStreaming,
  tokenCount,
  startTime,
}: {
  isStreaming: boolean;
  tokenCount: number;
  startTime: number | null;
}) {
  const [tokensPerSecond, setTokensPerSecond] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isStreaming || !startTime) {
      if (!isStreaming && tokenCount > 0 && startTime) {
        const finalElapsed = (Date.now() - startTime) / 1000;
        setElapsed(finalElapsed);
        setTokensPerSecond(
          finalElapsed > 0 ? Math.round(tokenCount / finalElapsed) : 0
        );
      }
      return;
    }

    const interval = setInterval(() => {
      const secs = (Date.now() - startTime) / 1000;
      setElapsed(secs);
      setTokensPerSecond(secs > 0.1 ? Math.round(tokenCount / secs) : 0);
    }, 100);

    return () => clearInterval(interval);
  }, [isStreaming, tokenCount, startTime]);

  if (!startTime && tokenCount === 0) return null;

  return (
    <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
      {isStreaming && (
        <div className="flex items-center gap-1.5">
          <div className="relative w-2 h-2">
            <div className="absolute inset-0 rounded-full bg-green-400 pulse-ring" />
            <div className="absolute inset-0 rounded-full bg-green-400" />
          </div>
          <span>Streaming</span>
        </div>
      )}
      {tokensPerSecond > 0 && (
        <span className="speed-badge font-mono text-[#a78bfa]">
          ~{tokensPerSecond} tok/s
        </span>
      )}
      {tokenCount > 0 && (
        <span className="font-mono">{tokenCount} tokens</span>
      )}
      <span className="font-mono">{elapsed.toFixed(1)}s</span>
    </div>
  );
}

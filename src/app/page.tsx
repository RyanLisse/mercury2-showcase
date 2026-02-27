"use client";

import { useChat } from "@ai-sdk/react";
import { useState, Fragment } from "react";
import { Zap, RefreshCcw, Copy, ExternalLink } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
  MessageActions,
  MessageAction,
} from "@/components/ai-elements/message";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { SpeedIndicator } from "@/components/SpeedIndicator";

const SUGGESTIONS = [
  "Explain how diffusion models generate text differently than transformers",
  "Write a Red-Black Tree in TypeScript with full type safety",
  "Design a real-time chat system for 100K concurrent users",
  "Write a sci-fi story about AI that thinks in parallel",
  "Solve: A farmer has 17 sheep. All but 9 run away. How many are left?",
  "Compare Mercury 2 benchmarks against GPT-5 Mini and Claude Haiku",
];

export default function Home() {
  const [streamStart, setStreamStart] = useState<number | null>(null);
  const [tokenCount, setTokenCount] = useState(0);

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    append,
    reload,
    status,
  } = useChat({
    api: "/api/chat",
    onResponse: () => {
      setStreamStart(Date.now());
      setTokenCount(0);
    },
    onFinish: (message) => {
      const words = message.content.split(/\s+/).length;
      setTokenCount(Math.round(words * 1.3));
    },
  });

  const isStreaming = status === "streaming";

  // Estimate tokens during streaming
  if (isStreaming && messages.length > 0) {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role === "assistant" && lastMsg.content) {
      const words = lastMsg.content.split(/\s+/).length;
      const estimate = Math.round(words * 1.3);
      if (estimate !== tokenCount) {
        setTimeout(() => setTokenCount(estimate), 0);
      }
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    append({ role: "user", content: suggestion });
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="min-h-screen flex flex-col hero-gradient">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-[rgba(124,58,237,0.2)]">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-purple-400 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight">Mercury 2</h1>
              <p className="text-[10px] text-muted-foreground">by Inception Labs</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
              <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                ~1000 tok/s
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#7c3aed]/10 text-[#a78bfa] border border-[#7c3aed]/20">
                Diffusion LLM
              </span>
            </div>
            <a
              href="https://www.inceptionlabs.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-[#a78bfa] transition-colors"
            >
              Docs <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
        {isStreaming && <div className="streaming-indicator" />}
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4">
        <div className="flex flex-col h-[calc(100vh-3.5rem)]">
          <Conversation>
            <ConversationContent>
              {!hasMessages ? (
                <>
                  <ConversationEmptyState
                    icon={
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-purple-400 flex items-center justify-center">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                    }
                    title=""
                    description=""
                  >
                    <div className="text-center space-y-4">
                      <Shimmer className="text-4xl md:text-5xl font-bold" duration={3}>
                        Mercury 2
                      </Shimmer>
                      <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                        Reasoning-grade quality at{" "}
                        <span className="text-[#a78bfa] font-semibold">~1,000 tokens/second</span>
                      </p>
                      <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
                        The world&apos;s first diffusion reasoning LLM. 5x faster than leading speed-optimized models.
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mt-6">
                        {[
                          { value: "~1000", unit: "tok/s", label: "Output Speed" },
                          { value: "91.1", unit: "%", label: "AIME 2025" },
                          { value: "128K", unit: "ctx", label: "Context Window" },
                          { value: "5x", unit: "faster", label: "vs Competition" },
                        ].map((stat) => (
                          <div
                            key={stat.label}
                            className="text-center p-3 rounded-xl bg-card border"
                          >
                            <div className="text-xl font-bold font-mono text-[#a78bfa]">
                              {stat.value}
                              <span className="text-[10px] text-muted-foreground ml-1">{stat.unit}</span>
                            </div>
                            <div className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ConversationEmptyState>

                  <div className="mt-6 max-w-2xl mx-auto w-full">
                    <p className="text-xs text-muted-foreground mb-3 text-center">Try a prompt</p>
                    <Suggestions>
                      {SUGGESTIONS.map((s) => (
                        <Suggestion key={s} suggestion={s} onClick={handleSuggestionClick} />
                      ))}
                    </Suggestions>
                  </div>
                </>
              ) : (
                messages.map((message, messageIndex) => (
                  <Fragment key={message.id}>
                    <Message from={message.role as "user" | "assistant"}>
                      <MessageContent>
                        <MessageResponse>{message.content}</MessageResponse>
                      </MessageContent>
                    </Message>
                    {message.role === "assistant" &&
                      messageIndex === messages.length - 1 &&
                      !isStreaming && (
                        <MessageActions>
                          <MessageAction onClick={() => reload()} label="Retry">
                            <RefreshCcw className="size-3" />
                          </MessageAction>
                          <MessageAction
                            onClick={() => navigator.clipboard.writeText(message.content)}
                            label="Copy"
                          >
                            <Copy className="size-3" />
                          </MessageAction>
                        </MessageActions>
                      )}
                  </Fragment>
                ))
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          {/* Speed indicator + Input */}
          <div className="pb-4 pt-2 space-y-2">
            {hasMessages && (
              <SpeedIndicator
                isStreaming={isStreaming}
                tokenCount={tokenCount}
                startTime={streamStart}
              />
            )}

            <form
              onSubmit={handleSubmit}
              className="w-full max-w-3xl mx-auto flex items-end gap-2 rounded-2xl border bg-card p-3"
            >
              <textarea
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as unknown as React.FormEvent);
                  }
                }}
                placeholder="Ask Mercury 2 anything..."
                rows={1}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none min-h-[40px] max-h-[160px] py-2 px-1"
                style={{ fieldSizing: "content" } as React.CSSProperties}
              />
              <button
                type="submit"
                disabled={isStreaming || !input.trim()}
                className="shrink-0 w-9 h-9 rounded-xl bg-[#7c3aed] hover:bg-[#7c3aed]/80 disabled:opacity-30 transition-all flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </form>

            <p className="text-center text-[10px] text-muted-foreground/50">
              Mercury 2 by Inception Labs · Diffusion-based LLM · ~1,000 tokens/sec
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

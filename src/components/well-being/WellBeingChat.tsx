"use client";

import { useState, useEffect, useRef, useCallback, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Heart, Lock, ArrowUp } from "lucide-react";
import { clsx } from "clsx";
import { TypingIndicator } from "@/components/ui";
import { useStreamingText } from "@/hooks/useStreamingText";
import {
  type Mood,
  CRISIS_TRIGGERS,
  WELLBEING_RESPONSES,
  GENERAL_WELLBEING,
} from "@/data/well-being-data";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface WellBeingChatProps {
  initialMood: Mood;
  onCrisisTriggered: () => void;
}

export function WellBeingChat({ initialMood, onCrisisTriggered }: WellBeingChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { displayedText, isStreaming, startStreaming } = useStreamingText(12);
  const streamingIdRef = useRef<string | null>(null);
  const initializedRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, displayedText, isTyping, scrollToBottom]);

  // Initial mood response
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const id = String(Date.now() + Math.random());
    streamingIdRef.current = id;
    setIsTyping(true);

    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages([{ id, role: "assistant", content: "" }]);
      startStreaming(initialMood.response);
    }, 1500);

    return () => clearTimeout(timer);
  }, [initialMood, startStreaming]);

  // Update streaming message content
  useEffect(() => {
    if (streamingIdRef.current && displayedText) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === streamingIdRef.current ? { ...m, content: displayedText } : m
        )
      );
    }
    if (!isStreaming && streamingIdRef.current && displayedText) {
      streamingIdRef.current = null;
    }
  }, [displayedText, isStreaming]);

  const getResponse = useCallback(
    (text: string): string | null => {
      const lower = text.toLowerCase();

      // Check crisis triggers
      for (const trigger of CRISIS_TRIGGERS) {
        if (trigger.test(text)) {
          onCrisisTriggered();
          return null;
        }
      }

      // Check keyword responses
      for (const entry of WELLBEING_RESPONSES) {
        if (entry.keywords.some((kw) => lower.includes(kw))) {
          return entry.response;
        }
      }

      // Random general response
      return GENERAL_WELLBEING[Math.floor(Math.random() * GENERAL_WELLBEING.length)];
    },
    [onCrisisTriggered]
  );

  const handleSend = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming || isTyping) return;

      const userMsg: Message = {
        id: String(Date.now() + Math.random()),
        role: "user",
        content: trimmed,
      };
      setMessages((prev) => [...prev, userMsg]);
      setInputValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      const response = getResponse(trimmed);
      if (!response) return; // crisis triggered

      setIsTyping(true);
      setTimeout(() => {
        const assistantId = String(Date.now() + Math.random());
        streamingIdRef.current = assistantId;
        setIsTyping(false);
        setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);
        startStreaming(response);
      }, 1500);
    },
    [isStreaming, isTyping, getResponse, startStreaming]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const maxHeight = 4 * 24;
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
    }
  };

  const canSend = inputValue.trim().length > 0 && !isStreaming && !isTyping;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] pb-16 md:pb-0 bg-gradient-to-b from-accent-50/30 to-white rounded-2xl overflow-hidden">
      {/* Privacy Badge */}
      <div className="flex items-center justify-center gap-2 py-2.5 bg-accent-50 border-b border-accent-100 text-accent-700 text-xs font-medium">
        <Lock className="w-3.5 h-3.5" />
        <span>This session is private and excluded from analytics</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            const isCurrentlyStreaming =
              msg.id === streamingIdRef.current && isStreaming;

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={clsx(
                  "flex gap-3 mb-4",
                  isUser ? "justify-end" : "justify-start"
                )}
              >
                {/* Assistant avatar */}
                {!isUser && (
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-accent-600" />
                    </div>
                  </div>
                )}

                <div
                  className={clsx(
                    "max-w-[75%] md:max-w-[65%]",
                    isUser && "text-right"
                  )}
                >
                  <div
                    className={clsx(
                      "inline-block px-5 py-3.5 text-[15px] leading-relaxed",
                      isUser
                        ? "bg-accent-600 text-white rounded-3xl rounded-br-lg"
                        : "bg-accent-50/80 text-slate-800 rounded-3xl rounded-bl-lg border border-accent-100"
                    )}
                  >
                    <span className="whitespace-pre-wrap">{msg.content}</span>
                    {isCurrentlyStreaming && (
                      <span className="inline-block w-0.5 h-4 bg-accent-500 animate-pulse ml-0.5 align-middle" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 mb-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-accent-600" />
                </div>
              </div>
              <div className="bg-accent-50/80 rounded-3xl rounded-bl-lg border border-accent-100 px-2">
                <TypingIndicator />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="sticky bottom-0 bg-white border-t border-accent-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] px-4 py-3 pb-16 md:pb-3 rounded-t-xl">
        <div className="flex items-end gap-3 max-w-3xl mx-auto">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              handleInput();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Share what's on your mind..."
            rows={1}
            disabled={isStreaming || isTyping}
            className={clsx(
              "flex-1 resize-none rounded-xl border border-accent-200 bg-accent-50/30 px-4 py-3 text-[15px] text-slate-800",
              "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-400",
              "transition-colors duration-200",
              (isStreaming || isTyping) && "opacity-60 cursor-not-allowed"
            )}
          />
          <button
            onClick={() => handleSend(inputValue)}
            disabled={!canSend}
            className={clsx(
              "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
              canSend
                ? "bg-accent-600 hover:bg-accent-700 text-white shadow-md hover:shadow-lg"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            )}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

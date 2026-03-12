"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChatMessage } from "@/components/coach/ChatMessage";
import { ChatInput } from "@/components/coach/ChatInput";
import { ContextButtons } from "@/components/coach/ContextButtons";
import { SessionSidebar } from "@/components/coach/SessionSidebar";
import { TypingIndicator } from "@/components/ui";
import { useStreamingText } from "@/hooks/useStreamingText";
import {
  WELCOME_MESSAGE,
  CONTEXT_RESPONSES,
  DRIFT_TRIGGERS,
  KEYWORD_RESPONSES,
  GENERAL_RESPONSES,
} from "@/data/coach-responses";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  category?: string;
}

function getCoachResponse(userMessage: string): {
  text: string;
  category?: string;
} {
  // 1. Check drift triggers first
  for (const trigger of DRIFT_TRIGGERS) {
    if (trigger.pattern.test(userMessage)) {
      return { text: trigger.response, category: "Fidelity Alert" };
    }
  }

  // 2. Check keyword responses
  const lowerMessage = userMessage.toLowerCase();
  for (const group of KEYWORD_RESPONSES) {
    if (group.keywords.some((kw) => lowerMessage.includes(kw))) {
      const picked =
        group.responses[Math.floor(Math.random() * group.responses.length)];
      return { text: picked.text, category: picked.category };
    }
  }

  // 3. Fallback to general responses
  const picked =
    GENERAL_RESPONSES[Math.floor(Math.random() * GENERAL_RESPONSES.length)];
  return { text: picked.text, category: picked.category };
}

let nextId = 2;

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: WELCOME_MESSAGE,
    },
  ]);
  const [isResponding, setIsResponding] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<number | null>(
    null
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { displayedText, isStreaming, startStreaming } = useStreamingText(12);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, displayedText, showTyping]);

  const handleSend = useCallback(
    (text: string, category?: string) => {
      if (isResponding) return;

      // Add user message
      const userMsgId = nextId++;
      setMessages((prev) => [
        ...prev,
        { id: userMsgId, role: "user", content: text },
      ]);
      setIsResponding(true);
      setShowTyping(true);

      // Determine response
      let responseText: string;
      let responseCategory: string | undefined;

      if (category && CONTEXT_RESPONSES[category]) {
        responseText = CONTEXT_RESPONSES[category];
        responseCategory = category;
      } else {
        const result = getCoachResponse(text);
        responseText = result.text;
        responseCategory = result.category;
      }

      // Simulate typing delay, then stream response
      setTimeout(() => {
        setShowTyping(false);
        const assistantMsgId = nextId++;
        setStreamingMessageId(assistantMsgId);
        setMessages((prev) => [
          ...prev,
          {
            id: assistantMsgId,
            role: "assistant",
            content: responseText,
            category: responseCategory,
          },
        ]);
        startStreaming(responseText);
      }, 1200);
    },
    [isResponding, startStreaming]
  );

  // When streaming finishes, allow new messages
  useEffect(() => {
    if (!isStreaming && streamingMessageId !== null) {
      setIsResponding(false);
      setStreamingMessageId(null);
    }
  }, [isStreaming, streamingMessageId]);

  const handleContextSelect = useCallback(
    (label: string) => {
      handleSend(label, label);
    },
    [handleSend]
  );

  return (
    <div className="flex h-full -m-4 md:-m-6 -mb-20 md:-mb-6">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Context buttons */}
        <ContextButtons onSelect={handleContextSelect} />

        {/* Messages */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-4 py-6"
        >
          <div className="max-w-3xl mx-auto">
            {messages.map((msg) => {
              const isCurrentlyStreaming =
                msg.id === streamingMessageId && isStreaming;
              return (
                <ChatMessage
                  key={msg.id}
                  role={msg.role}
                  content={
                    isCurrentlyStreaming ? displayedText : msg.content
                  }
                  isStreaming={isCurrentlyStreaming}
                  category={msg.role === "assistant" ? msg.category : undefined}
                />
              );
            })}

            {showTyping && (
              <div className="flex gap-3 mb-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-bl-md px-2">
                  <TypingIndicator />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <ChatInput onSend={(msg) => handleSend(msg)} disabled={isResponding} />
      </div>

      {/* Session sidebar */}
      <SessionSidebar />
    </div>
  );
}

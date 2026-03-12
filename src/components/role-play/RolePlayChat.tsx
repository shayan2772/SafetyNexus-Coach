"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { clsx } from "clsx";
import { Button, TypingIndicator } from "@/components/ui";
import { useStreamingText } from "@/hooks/useStreamingText";
import type { Persona } from "@/data/role-play-data";

interface RolePlayChatProps {
  persona: Persona;
  onEnd: () => void;
  onCoachNote: (note: string) => void;
}

interface ChatMsg {
  id: number;
  role: "user" | "persona";
  content: string;
}

let msgId = 0;

export function RolePlayChat({ persona, onEnd, onCoachNote }: RolePlayChatProps) {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [streamingMsgId, setStreamingMsgId] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { displayedText, isStreaming, startStreaming } = useStreamingText(12);
  const initializedRef = useRef(false);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, displayedText, showTyping]);

  // Initial persona message
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const id = ++msgId;
    const introText = `${persona.scenario} How would you like to begin?`;
    setStreamingMsgId(id);
    setMessages([{ id, role: "persona", content: introText }]);
    startStreaming(introText);
  }, [persona.scenario, startStreaming]);

  // When streaming finishes
  useEffect(() => {
    if (!isStreaming && streamingMsgId !== null) {
      setIsResponding(false);
      setStreamingMsgId(null);
    }
  }, [isStreaming, streamingMsgId]);

  const handlePromptClick = useCallback(
    (prompt: string) => {
      if (isResponding || sessionComplete) return;

      const currentDialogue = persona.dialogues[dialogueIndex];
      if (!currentDialogue) return;

      // Add user message
      const userId = ++msgId;
      setMessages((prev) => [...prev, { id: userId, role: "user", content: prompt }]);
      setIsResponding(true);
      setShowTyping(true);

      // Simulate delay then respond
      setTimeout(() => {
        setShowTyping(false);
        const personaId = ++msgId;
        setStreamingMsgId(personaId);
        setMessages((prev) => [
          ...prev,
          { id: personaId, role: "persona", content: currentDialogue.personaResponse },
        ]);
        startStreaming(currentDialogue.personaResponse);
        onCoachNote(currentDialogue.coachNote);

        const nextIndex = dialogueIndex + 1;
        if (nextIndex >= persona.dialogues.length) {
          setSessionComplete(true);
        }
        setDialogueIndex(nextIndex);
      }, 1200);
    },
    [isResponding, sessionComplete, persona.dialogues, dialogueIndex, startStreaming, onCoachNote]
  );

  const currentPrompt =
    !sessionComplete && dialogueIndex < persona.dialogues.length
      ? persona.dialogues[dialogueIndex].userPrompt
      : null;

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              "w-10 h-10 rounded-full flex items-center justify-center",
              persona.color
            )}
          >
            <span className={clsx("text-lg font-bold", persona.textColor)}>
              {persona.initial}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">{persona.name}</h3>
            <p className="text-xs text-slate-500">{persona.role}</p>
          </div>
        </div>
        <Button variant="danger" size="sm" onClick={onEnd}>
          <X className="w-4 h-4" />
          End Session
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg) => {
            const currentlyStreaming = msg.id === streamingMsgId && isStreaming;
            const isUser = msg.role === "user";

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={clsx(
                  "flex gap-3 mb-4",
                  isUser ? "justify-end" : "justify-start"
                )}
              >
                {/* Persona avatar */}
                {!isUser && (
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className={clsx(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        persona.color
                      )}
                    >
                      <span
                        className={clsx("text-sm font-bold", persona.textColor)}
                      >
                        {persona.initial}
                      </span>
                    </div>
                  </div>
                )}

                <div className={clsx("max-w-[75%] md:max-w-[65%]", isUser && "text-right")}>
                  <div
                    className={clsx(
                      "inline-block px-4 py-3 text-[15px] leading-relaxed",
                      isUser
                        ? "bg-primary-600 text-white rounded-2xl rounded-br-md"
                        : "bg-slate-50 text-slate-800 rounded-2xl rounded-bl-md border border-slate-100"
                    )}
                  >
                    <span className="whitespace-pre-wrap">
                      {currentlyStreaming ? displayedText : msg.content}
                    </span>
                    {currentlyStreaming && (
                      <span className="inline-block w-0.5 h-4 bg-primary-500 animate-pulse ml-0.5 align-middle" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {showTyping && (
            <div className="flex gap-3 mb-4">
              <div className="flex-shrink-0 mt-1">
                <div
                  className={clsx(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    persona.color
                  )}
                >
                  <span className={clsx("text-sm font-bold", persona.textColor)}>
                    {persona.initial}
                  </span>
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

      {/* Suggested prompts / completion */}
      <div className="px-4 py-3 pb-16 md:pb-3 border-t border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto">
          {sessionComplete ? (
            <div className="text-center">
              <Button variant="primary" onClick={onEnd}>
                Session complete — view your debrief
              </Button>
            </div>
          ) : currentPrompt && !isResponding ? (
            <div>
              <p className="text-xs text-slate-400 mb-2">Suggested response:</p>
              <button
                onClick={() => handlePromptClick(currentPrompt)}
                className="text-left w-full px-4 py-3 bg-primary-50 hover:bg-primary-100 border border-primary-200 rounded-xl text-sm text-primary-700 transition-colors duration-150"
              >
                {currentPrompt}
              </button>
            </div>
          ) : (
            <p className="text-xs text-slate-400 text-center">
              Waiting for response...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

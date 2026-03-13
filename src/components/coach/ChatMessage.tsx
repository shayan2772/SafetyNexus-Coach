"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui";
import { clsx } from "clsx";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
  category?: string;
}

export function ChatMessage({
  role,
  content,
  isStreaming,
  category,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={clsx("flex gap-3 mb-4", isUser ? "justify-end" : "justify-start")}
    >
      {/* Assistant avatar */}
      {!isUser && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-600" />
          </div>
        </div>
      )}

      <div
        className={clsx("max-w-[75%] md:max-w-[65%]", isUser && "text-right")}
      >
        {/* Category badge */}
        {!isUser && category && (
          <div className="mb-1.5">
            <Badge variant="info">{category}</Badge>
          </div>
        )}

        {/* Message bubble */}
        <div
          className={clsx(
            "inline-block px-4 py-3 text-[15px] leading-relaxed",
            isUser
              ? "bg-primary-700 text-white rounded-2xl rounded-br-md"
              : "bg-slate-50 text-slate-800 rounded-2xl rounded-bl-md border border-slate-100 border-l-2 border-l-primary-200"
          )}
        >
          <span className="whitespace-pre-wrap">{content}</span>
          {isStreaming && (
            <span className="inline-block w-0.5 h-4 bg-primary-500 animate-pulse ml-0.5 align-middle" />
          )}
        </div>
        {/* Timestamp */}
        <p className={clsx(
          "text-[10px] text-slate-300 mt-1",
          isUser ? "text-right" : "text-left"
        )}>
          {new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
        </p>
      </div>
    </motion.div>
  );
}

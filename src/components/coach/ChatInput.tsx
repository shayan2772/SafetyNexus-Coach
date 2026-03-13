"use client";

import { useState, useRef, useCallback, type KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";
import { clsx } from "clsx";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, disabled, onSend]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const maxHeight = 4 * 24; // ~4 rows
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
    }
  };

  const canSend = value.trim().length > 0 && !disabled;
  const maxChars = 2000;

  const QUICK_REPLIES = [
    "Help with documentation",
    "Explain S&T principles",
    "Risk assessment tips",
    "Court report guidance",
  ];

  return (
    <div className="sticky bottom-0 bg-white border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] px-4 py-3 pb-16 md:pb-3 rounded-t-xl">
      {/* Quick replies */}
      {!disabled && value.length === 0 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-3xl mx-auto mb-2">
          {QUICK_REPLIES.map((reply) => (
            <button
              key={reply}
              onClick={() => onSend(reply)}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-500 hover:bg-primary-50 hover:text-primary-600 border border-slate-200 hover:border-primary-200 transition-all duration-200"
            >
              {reply}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-end gap-3 max-w-3xl mx-auto">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value.slice(0, maxChars));
              handleInput();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
            disabled={disabled}
            className={clsx(
              "w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-800",
              "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400",
              "transition-colors duration-200",
              disabled && "opacity-60 cursor-not-allowed"
            )}
          />
          {value.length > 0 && (
            <span className="absolute bottom-1.5 right-3 text-[10px] text-slate-300">
              {value.length}/{maxChars}
            </span>
          )}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!canSend}
          className={clsx(
            "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
            canSend
              ? "bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          )}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

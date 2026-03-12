"use client";

import { BookOpen, Compass, Shield, CheckCircle } from "lucide-react";
import { clsx } from "clsx";

const CONTEXT_OPTIONS = [
  { label: "Case Consultation", icon: BookOpen },
  { label: "Practice Guidance", icon: Compass },
  { label: "S&T Principles", icon: Shield },
  { label: "Fidelity Check", icon: CheckCircle },
] as const;

interface ContextButtonsProps {
  onSelect: (label: string) => void;
}

export function ContextButtons({ onSelect }: ContextButtonsProps) {
  return (
    <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-slate-100 px-4 py-3">
      <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-3xl mx-auto">
        {CONTEXT_OPTIONS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => onSelect(label)}
            className={clsx(
              "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium",
              "bg-white border border-slate-200 text-slate-600",
              "hover:bg-primary-50 hover:border-primary-300 hover:text-primary-600",
              "transition-all duration-200"
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

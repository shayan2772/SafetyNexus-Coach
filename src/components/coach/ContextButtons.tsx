"use client";

import { motion } from "framer-motion";
import { BookOpen, Compass, Shield, CheckCircle } from "lucide-react";
import { clsx } from "clsx";

const CONTEXT_OPTIONS = [
  { label: "Case Consultation", icon: BookOpen, dot: "bg-blue-400" },
  { label: "Practice Guidance", icon: Compass, dot: "bg-teal-400" },
  { label: "S&T Principles", icon: Shield, dot: "bg-violet-400" },
  { label: "Fidelity Check", icon: CheckCircle, dot: "bg-amber-400" },
] as const;

interface ContextButtonsProps {
  onSelect: (label: string) => void;
}

export function ContextButtons({ onSelect }: ContextButtonsProps) {
  return (
    <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-slate-100 px-4 py-3">
      <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-3xl mx-auto">
        {CONTEXT_OPTIONS.map(({ label, icon: Icon, dot }, index) => (
          <motion.button
            key={label}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            onClick={() => onSelect(label)}
            className={clsx(
              "flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium",
              "bg-gradient-to-b from-white to-slate-50 border border-slate-200 text-slate-600",
              "hover:bg-primary-50 hover:border-primary-300 hover:text-primary-600",
              "transition-all duration-200 shadow-sm"
            )}
          >
            <span className={clsx("w-2 h-2 rounded-full flex-shrink-0", dot)} />
            <Icon className="w-4 h-4" />
            {label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

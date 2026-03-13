"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { clsx } from "clsx";
import { Card, Badge } from "@/components/ui";
import type { Persona } from "@/data/role-play-data";

interface PersonaCardProps {
  persona: Persona;
  selected: boolean;
  onSelect: () => void;
}

const difficultyVariant: Record<string, "success" | "warning" | "danger"> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "danger",
};

export function PersonaCard({ persona, selected, onSelect }: PersonaCardProps) {
  return (
    <Card
      hover
      onClick={onSelect}
      className={clsx(
        "relative transition-colors duration-200 group overflow-hidden",
        selected && "!border-primary-500 border-2 bg-primary-50/50"
      )}
    >
      {/* Subtle background pattern */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-50 to-transparent rounded-bl-full opacity-60 pointer-events-none" />
      <div className="relative flex gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className={clsx(
              "w-14 h-14 rounded-full flex items-center justify-center",
              persona.color
            )}
          >
            <span className={clsx("text-2xl font-bold", persona.textColor)}>
              {persona.initial}
            </span>
          </div>
          {selected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
            >
              <Check className="w-3.5 h-3.5 text-white" />
            </motion.div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-slate-900">{persona.name}</h3>
          <p className="text-sm text-slate-500">{persona.role}</p>
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">
            {persona.scenario}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant={difficultyVariant[persona.difficulty]}>
            {persona.difficulty}
          </Badge>
          <span className="text-xs text-slate-400">
            {persona.dialogues.length} exchanges
          </span>
        </div>
        <span className="text-sm text-primary-600 font-medium group-hover:translate-x-0.5 transition-transform">
          Start &rarr;
        </span>
      </div>
    </Card>
  );
}

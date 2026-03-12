"use client";

import { motion } from "framer-motion";
import { Heart, Lock } from "lucide-react";
import { clsx } from "clsx";
import { MOODS, type Mood } from "@/data/well-being-data";

interface MoodCheckInProps {
  onMoodSelect: (mood: Mood) => void;
}

export function MoodCheckIn({ onMoodSelect }: MoodCheckInProps) {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-to-b from-accent-50/40 to-white rounded-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto px-4"
      >
        <div className="bg-white rounded-3xl shadow-lg border border-accent-100 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-100 mb-5">
              <Heart className="w-7 h-7 text-accent-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
              How are you feeling today?
            </h2>
            <p className="text-slate-500 text-base">
              This is a safe space. Take a moment to check in with yourself.
            </p>
          </div>

          {/* Mood Buttons */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
            {MOODS.map((mood) => (
              <motion.button
                key={mood.id}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onMoodSelect(mood)}
                className={clsx(
                  "flex flex-col items-center justify-center gap-2 px-5 py-4 rounded-2xl border-2 cursor-pointer transition-colors duration-200 min-w-[100px]",
                  mood.color
                )}
              >
                <span className="text-3xl" role="img" aria-label={mood.label}>
                  {mood.emoji}
                </span>
                <span className="text-sm font-semibold">{mood.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Privacy Note */}
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
            <Lock className="w-3.5 h-3.5" />
            <span>
              This session is private and excluded from all analytics
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

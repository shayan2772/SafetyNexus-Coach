"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ progress, className, showLabel = true }: ProgressBarProps) {
  return (
    <div className={clsx("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm text-slate-500">Progress</span>
          <span className="text-sm font-medium text-primary-600">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

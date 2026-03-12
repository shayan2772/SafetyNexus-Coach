"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Eye, CheckCircle, AlertTriangle, Info } from "lucide-react";

interface CoachObserverProps {
  notes: string[];
}

function getNoteIcon(note: string) {
  if (/Excellent|Outstanding|Good/i.test(note)) {
    return <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />;
  }
  if (/Watch|Could|Consider/i.test(note)) {
    return <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />;
  }
  return <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />;
}

export function CoachObserver({ notes }: CoachObserverProps) {
  return (
    <div className="w-80 bg-white border-l border-slate-200 p-4 overflow-y-auto hidden lg:block">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <Eye className="w-5 h-5 text-primary-600" />
        <h3 className="font-semibold text-slate-900">Coach Observations</h3>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        Real-time S&T alignment feedback
      </p>

      {/* Notes */}
      {notes.length === 0 ? (
        <p className="text-sm text-slate-400 italic">
          Observations will appear as the conversation progresses...
        </p>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {notes.map((note, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex gap-2 text-sm text-slate-700 bg-slate-50 rounded-lg p-3 border border-slate-100"
              >
                {getNoteIcon(note)}
                <span>{note}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

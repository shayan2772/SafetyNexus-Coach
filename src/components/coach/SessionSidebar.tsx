"use client";

import { Clock, Plus, ArrowRight } from "lucide-react";
import { DEMO_SESSIONS } from "@/data/coach-responses";
import { clsx } from "clsx";

interface SessionSidebarProps {
  activeSessionId?: number;
}

export function SessionSidebar({ activeSessionId = 1 }: SessionSidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-72 border-l border-slate-200 bg-white">
      {/* Header */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-700 mb-3">
          <Clock className="w-4 h-4" />
          <h3 className="font-semibold text-sm">Session History</h3>
        </div>

        <button
          className={clsx(
            "w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold",
            "bg-primary-600 hover:bg-primary-700 text-white",
            "transition-all duration-200 hover:shadow-md"
          )}
        >
          <Plus className="w-4 h-4" />
          New Session
        </button>
      </div>

      {/* Session list */}
      <div className="flex-1 overflow-y-auto">
        {DEMO_SESSIONS.map((session, idx) => (
          <div key={session.id}>
            <button
              className={clsx(
                "w-full text-left px-4 py-3 transition-colors duration-150",
                activeSessionId === session.id
                  ? "bg-primary-50 border-l-2 border-primary-500"
                  : "hover:bg-slate-50 border-l-2 border-transparent"
              )}
            >
              <p className="font-medium text-sm text-slate-800 truncate">
                {session.title}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{session.date}</p>
              <p className="text-sm text-slate-500 mt-1 truncate">
                {session.preview}
              </p>
            </button>
            {idx < DEMO_SESSIONS.length - 1 && (
              <div className="border-b border-slate-100 mx-4" />
            )}
          </div>
        ))}
      </div>

      {/* Footer link */}
      <div className="p-4 border-t border-slate-100">
        <button className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
          View All Sessions
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}

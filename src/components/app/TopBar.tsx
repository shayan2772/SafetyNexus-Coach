"use client";

import { Menu, Bell } from "lucide-react";
import { DEMO_USER } from "@/lib/constants";

interface TopBarProps {
  onMenuToggle: () => void;
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  const initials = DEMO_USER.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <header className="sticky top-0 z-20 h-16 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-4 md:px-6 shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-sm font-semibold text-slate-800">Dashboard</h2>
          <p className="text-xs text-slate-400 hidden sm:block">
            {DEMO_USER.organization}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-primary-600">
              {initials}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-700">
              {DEMO_USER.name}
            </p>
            <p className="text-xs text-slate-400">{DEMO_USER.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

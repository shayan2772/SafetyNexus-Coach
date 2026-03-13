"use client";

import { usePathname } from "next/navigation";
import { Menu, Bell, Search, ChevronDown, ChevronRight } from "lucide-react";
import { DEMO_USER, MODULES } from "@/lib/constants";

interface TopBarProps {
  onMenuToggle: () => void;
}

function getBreadcrumb(pathname: string): { parent: string; current: string } | null {
  if (pathname === "/dashboard") return null;

  for (const mod of MODULES) {
    if (pathname.startsWith(mod.href)) {
      return { parent: "Dashboard", current: mod.name };
    }
  }
  return { parent: "Dashboard", current: "Page" };
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  const pathname = usePathname();
  const breadcrumb = getBreadcrumb(pathname);

  const initials = DEMO_USER.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <header className="sticky top-0 z-20 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
    >
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
          {breadcrumb ? (
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-slate-400 font-medium">{breadcrumb.parent}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="font-semibold text-slate-800">{breadcrumb.current}</span>
            </div>
          ) : (
            <h2 className="text-sm font-semibold text-slate-800">Dashboard</h2>
          )}
          <p className="text-xs text-slate-400 hidden sm:block">
            {DEMO_USER.organization}
          </p>
        </div>
      </div>

      {/* Center - Search (hidden on mobile) */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <input
            type="text"
            placeholder="Search sessions, cases..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-all"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse-dot" />
        </button>

        {/* User */}
        <button className="flex items-center gap-3 hover:bg-slate-50 rounded-lg px-2 py-1.5 transition-colors">
          <div className="relative">
            <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-primary-600">
                {initials}
              </span>
            </div>
            {/* Online status dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-slate-700">
              {DEMO_USER.name}
            </p>
            <p className="text-xs text-slate-400">{DEMO_USER.role}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-300 hidden sm:block" />
        </button>
      </div>
    </header>
  );
}

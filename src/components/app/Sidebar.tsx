"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  MessageCircle,
  Users,
  ClipboardList,
  Heart,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import { clsx } from "clsx";
import { MODULES } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageCircle,
  Users,
  ClipboardList,
  Heart,
  BarChart3,
};

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  mobile?: boolean;
}

export function Sidebar({ isCollapsed, onToggle, mobile = false }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      href: "/dashboard",
      icon: LayoutDashboard,
      color: "primary",
    },
    ...MODULES.map((mod) => ({
      name: mod.name,
      href: mod.href,
      icon: iconMap[mod.icon] || MessageCircle,
      color: mod.color,
    })),
  ];

  return (
    <aside
      className={clsx(
        "relative",
        mobile
          ? "flex flex-col border-r border-slate-200 h-screen transition-all duration-300 ease-in-out z-30"
          : "hidden md:flex flex-col border-r border-slate-200 h-screen sticky top-0 transition-all duration-300 ease-in-out z-40",
        isCollapsed ? "w-20" : "w-64"
      )}
      style={{
        background: "linear-gradient(180deg, rgba(239,246,255,0.4) 0%, #ffffff 40%)",
      }}
    >
      {/* Logo */}
      <Link
        href="/dashboard"
        className="flex items-center gap-3 px-4 h-16 border-b border-slate-100 shrink-0"
      >
        <div
          className={clsx(
            "flex items-center gap-3 transition-all duration-300",
            !isCollapsed && "bg-primary-50 rounded-xl px-3 py-1.5"
          )}
        >
          <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span
            className={clsx(
              "font-bold text-lg text-slate-800 transition-all duration-300 whitespace-nowrap overflow-hidden",
              isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}
          >
            SafetyNexus
          </span>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item, index) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <div key={item.href}>
              {index === 1 && (
                <div className="mt-2 mb-3">
                  {!isCollapsed && (
                    <span className="text-[10px] uppercase tracking-widest text-slate-300 px-3 font-semibold">
                      Modules
                    </span>
                  )}
                  <div className="border-t border-slate-100 mt-1.5" />
                </div>
              )}
              <div className="relative group">
                <Link
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isCollapsed && "justify-center",
                    isActive
                      ? "bg-primary-50 text-primary-600 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <Icon
                    className={clsx(
                      "w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                      isActive ? "text-primary-600" : "text-slate-400"
                    )}
                  />
                  <span
                    className={clsx(
                      "transition-all duration-300 whitespace-nowrap overflow-hidden",
                      isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                    )}
                  >
                    {item.name}
                  </span>
                  {/* Active indicator bar */}
                  {isActive && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary-600 rounded-l-full" />
                  )}
                </Link>

                {/* Tooltip when collapsed */}
                {isCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 transition-all duration-200 z-50">
                    {item.name}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-800" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="px-3 py-4 border-t border-slate-100 shrink-0">
        <button
          onClick={onToggle}
          className="flex items-center justify-center w-full px-3 py-2.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="ml-2 text-sm font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

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
        mobile
          ? "flex flex-col bg-white border-r border-slate-200 h-screen transition-all duration-300 ease-in-out z-30"
          : "hidden md:flex flex-col bg-white border-r border-slate-200 h-screen sticky top-0 transition-all duration-300 ease-in-out z-30",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <Link
        href="/dashboard"
        className="flex items-center gap-3 px-5 h-16 border-b border-slate-100 shrink-0"
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
                <div className="border-t border-slate-100 my-3" />
              )}
              <div className="relative group">
                <Link
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary-50 text-primary-600 border-l-[3px] border-primary-600"
                      : "text-slate-600 hover:bg-slate-50 border-l-[3px] border-transparent"
                  )}
                >
                  <Icon className={clsx("w-5 h-5 shrink-0", isActive ? "text-primary-600" : "text-slate-400")} />
                  <span
                    className={clsx(
                      "transition-all duration-300 whitespace-nowrap overflow-hidden",
                      isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                    )}
                  >
                    {item.name}
                  </span>
                </Link>

                {/* Tooltip when collapsed */}
                {isCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50">
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
          className="flex items-center justify-center w-full px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors duration-200"
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

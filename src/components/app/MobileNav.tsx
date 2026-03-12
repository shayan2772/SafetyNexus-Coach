"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageCircle,
  Users,
  ClipboardList,
  Heart,
  BarChart3,
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

export function MobileNav() {
  const pathname = usePathname();

  const tabs = [
    { name: "Home", href: "/dashboard", icon: LayoutDashboard },
    ...MODULES.map((mod) => ({
      name: mod.name.split(" ")[0],
      href: mod.href,
      icon: iconMap[mod.icon] || MessageCircle,
    })),
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-30 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around px-1 py-2">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={clsx(
                "flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors min-w-0",
                isActive ? "text-primary-600" : "text-slate-400"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-[10px] font-medium truncate max-w-[56px]">
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

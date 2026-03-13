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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-[env(safe-area-inset-bottom)]"
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        background: "rgba(255, 255, 255, 0.9)",
      }}
    >
      {/* Gradient top border */}
      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #cbd5e1 50%, transparent 100%)",
        }}
      />

      <div className="flex items-center justify-around px-1" style={{ height: "72px" }}>
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
                "flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg transition-all duration-200 min-w-0 relative",
                isActive ? "text-primary-600" : "text-slate-400"
              )}
            >
              {/* Active indicator pill */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-[3px] bg-primary-600 rounded-full" />
              )}
              <Icon
                className={clsx(
                  "shrink-0 transition-all duration-200",
                  isActive ? "w-6 h-6" : "w-5 h-5"
                )}
              />
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

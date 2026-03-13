"use client";

import { motion } from "framer-motion";
import { Users, MessageCircle, Clock, Shield, TrendingUp, TrendingDown } from "lucide-react";
import { CountUpNumber } from "@/components/ui";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  MessageCircle,
  Clock,
  Shield,
};

const colorMap: Record<string, { bg: string; border: string; iconBg: string; iconText: string }> = {
  primary: {
    bg: "bg-blue-50",
    border: "border-l-blue-500",
    iconBg: "bg-blue-100",
    iconText: "text-blue-600",
  },
  accent: {
    bg: "bg-teal-50",
    border: "border-l-teal-500",
    iconBg: "bg-teal-100",
    iconText: "text-teal-600",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-l-blue-500",
    iconBg: "bg-blue-100",
    iconText: "text-blue-600",
  },
  green: {
    bg: "bg-green-50",
    border: "border-l-green-500",
    iconBg: "bg-green-100",
    iconText: "text-green-600",
  },
};

interface KPICardProps {
  label: string;
  value: number;
  change: number;
  changeType: "up" | "down";
  icon: string;
  color: string;
  suffix?: string;
  decimals?: number;
  delay?: number;
}

export function KPICard({
  label,
  value,
  change,
  changeType,
  icon,
  color,
  suffix,
  decimals = 0,
  delay = 0,
}: KPICardProps) {
  const IconComponent = iconMap[icon] || Users;
  const colors = colorMap[color] || colorMap.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-6 border-l-4 ${colors.border}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, delay: delay + 0.5, ease: "easeInOut" }}
          className={`w-10 h-10 rounded-xl ${colors.iconBg} flex items-center justify-center`}
        >
          <IconComponent className={`w-5 h-5 ${colors.iconText}`} />
        </motion.div>
        <span className="text-sm text-slate-500 font-medium">{label}</span>
      </div>

      <div className="text-3xl font-bold text-slate-900 mb-1">
        <CountUpNumber end={value} suffix={suffix} decimals={decimals} />
      </div>

      {/* Mini sparkline */}
      <div className="mb-2">
        <svg width="80" height="20" viewBox="0 0 80 20" className="text-slate-200">
          <polyline
            fill="none"
            stroke={changeType === "up" ? "#22c55e" : "#ef4444"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={
              changeType === "up"
                ? "0,16 12,14 24,15 36,11 48,9 60,7 72,4 80,2"
                : "0,4 12,6 24,5 36,9 48,11 60,13 72,16 80,18"
            }
            opacity="0.7"
          />
        </svg>
      </div>

      <div className="flex items-center gap-1.5">
        {changeType === "up" ? (
          <TrendingUp className="w-4 h-4 text-green-500" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500" />
        )}
        <span
          className={`text-sm font-medium ${
            changeType === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}%
        </span>
        <span className="text-xs text-slate-400 ml-1">vs last period</span>
      </div>
    </motion.div>
  );
}

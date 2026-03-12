"use client";

import Link from "next/link";
import {
  MessageCircle,
  Users,
  ClipboardList,
  Heart,
  BarChart3,
  Clock,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { MODULES, DEMO_USER } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageCircle,
  Users,
  ClipboardList,
  Heart,
  BarChart3,
};

const colorMap: Record<string, { bg: string; text: string; dot: string }> = {
  primary: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    dot: "bg-blue-500",
  },
  violet: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    dot: "bg-purple-500",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-600",
    dot: "bg-amber-500",
  },
  teal: {
    bg: "bg-teal-100",
    text: "text-teal-600",
    dot: "bg-teal-500",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    dot: "bg-blue-500",
  },
};

const recentSessions = [
  {
    title: "Case Consultation: Pattern Analysis",
    module: "Coach",
    color: "primary",
    duration: "24 min",
    date: "Today",
  },
  {
    title: "Role-Play: Court Testimony Practice",
    module: "Role-Play",
    color: "violet",
    duration: "18 min",
    date: "Yesterday",
  },
  {
    title: "Case Map: Johnson Family",
    module: "Case Mapping",
    color: "amber",
    duration: "45 min",
    date: "2 days ago",
  },
  {
    title: "Weekly Check-In",
    module: "Well-Being",
    color: "teal",
    duration: "12 min",
    date: "3 days ago",
  },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate() {
  return new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DashboardPage() {
  const firstName = DEMO_USER.name.split(" ")[0];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <AnimatedSection>
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" />
          <div className="relative">
            <p className="text-primary-100 text-sm mb-1">{formatDate()}</p>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              {getGreeting()}, {firstName}
            </h1>
            <p className="text-primary-100 text-sm mb-4">
              {DEMO_USER.role} at {DEMO_USER.organization}
            </p>
            <p className="text-primary-100/80 text-sm italic max-w-xl">
              &ldquo;Every case is an opportunity to center the safety of
              children and the dignity of survivors.&rdquo;
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Quick Start */}
      <div>
        <AnimatedSection delay={0.1}>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Quick Start
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((mod, index) => {
            const Icon = iconMap[mod.icon] || MessageCircle;
            const colors = colorMap[mod.color] || colorMap.primary;

            return (
              <AnimatedSection key={mod.id} delay={0.15 + index * 0.05}>
                <Link href={mod.href} className="block h-full">
                  <Card className="h-full flex flex-col">
                    <div
                      className={`w-11 h-11 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}
                    >
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-1">
                      {mod.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 flex-1">
                      {mod.description}
                    </p>
                    <span className="text-sm text-primary-600 font-medium hover:underline">
                      Start &rarr;
                    </span>
                  </Card>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>

      {/* Recent Sessions */}
      <AnimatedSection delay={0.4}>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Recent Sessions
        </h2>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm divide-y divide-slate-100">
          {recentSessions.map((session, index) => {
            const colors = colorMap[session.color] || colorMap.primary;

            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 hover:bg-slate-50/50 transition-colors"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${colors.dot}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">
                    {session.title}
                  </p>
                </div>
                <Badge className="hidden sm:inline-flex">{session.module}</Badge>
                <div className="flex items-center gap-1 text-xs text-slate-400 shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{session.duration}</span>
                </div>
                <span className="text-xs text-slate-400 shrink-0 w-20 text-right hidden sm:block">
                  {session.date}
                </span>
              </div>
            );
          })}
        </div>
      </AnimatedSection>
    </div>
  );
}

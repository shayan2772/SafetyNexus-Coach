"use client";

import {
  MessageCircle,
  Users,
  ClipboardList,
  Heart,
  BarChart3,
} from "lucide-react";
import { Card, AnimatedSection } from "@/components/ui";
import { MODULES } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageCircle,
  Users,
  ClipboardList,
  Heart,
  BarChart3,
};

const borderColorMap: Record<string, string> = {
  primary: "border-t-primary-500 hover:border-t-primary-600",
  violet: "border-t-violet-500 hover:border-t-violet-600",
  amber: "border-t-amber-500 hover:border-t-amber-600",
  teal: "border-t-accent-500 hover:border-t-accent-600",
  blue: "border-t-blue-500 hover:border-t-blue-600",
};

const iconBgMap: Record<string, string> = {
  primary: "bg-primary-100 text-primary-600",
  violet: "bg-violet-100 text-violet-600",
  amber: "bg-amber-100 text-amber-600",
  teal: "bg-accent-100 text-accent-600",
  blue: "bg-blue-100 text-blue-600",
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Everything Caseworkers Need
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Five integrated modules designed to support every aspect of Safe &amp; Together-aligned practice.
          </p>
        </AnimatedSection>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((mod, i) => {
            const Icon = iconMap[mod.icon];
            return (
              <AnimatedSection key={mod.id} delay={i * 0.1}>
                <Card
                  className={`border-t-4 ${borderColorMap[mod.color]} transition-all duration-300 h-full`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${iconBgMap[mod.color]} flex items-center justify-center mb-4`}
                  >
                    {Icon && <Icon className="w-6 h-6" />}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {mod.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {mod.description}
                  </p>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

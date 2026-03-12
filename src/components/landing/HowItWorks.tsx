"use client";

import { Shield, LayoutGrid, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/ui";

const steps = [
  {
    number: "1",
    icon: Shield,
    title: "Sign In Securely",
    description:
      "Access your personalized workspace with secure authentication. Your data stays private and protected at all times.",
    color: "bg-primary-100 text-primary-600",
    ring: "ring-primary-200",
  },
  {
    number: "2",
    icon: LayoutGrid,
    title: "Choose Your Module",
    description:
      "Select from five specialized modules \u2014 coaching, role-play, case mapping, well-being, and analytics \u2014 each tailored to your needs.",
    color: "bg-accent-100 text-accent-600",
    ring: "ring-accent-200",
  },
  {
    number: "3",
    icon: Sparkles,
    title: "Get Expert Guidance",
    description:
      "Receive AI-powered, Safe & Together-aligned support in real time. Practice skills, document cases, and build confidence.",
    color: "bg-violet-100 text-violet-600",
    ring: "ring-violet-200",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            How SafetyNexus Works
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Get started in minutes with a simple three-step process designed for busy practitioners.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Connecting dashed lines — hidden on mobile */}
          <div className="hidden md:block absolute top-24 left-[calc(16.67%+40px)] right-[calc(16.67%+40px)] border-t-2 border-dashed border-slate-200" />

          {steps.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.2} className="relative">
              <div className="flex flex-col items-center text-center">
                {/* Step number */}
                <div className="w-8 h-8 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center mb-4 relative z-10">
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-5`}
                >
                  <step.icon className="w-8 h-8" />
                </div>

                {/* Text */}
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-500 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

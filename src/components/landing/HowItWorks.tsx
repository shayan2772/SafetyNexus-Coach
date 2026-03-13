"use client";

import { Shield, LayoutGrid, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
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
    pulseColor: "bg-primary-400",
  },
  {
    number: "2",
    icon: LayoutGrid,
    title: "Choose Your Module",
    description:
      "Select from five specialized modules \u2014 coaching, role-play, case mapping, well-being, and analytics \u2014 each tailored to your needs.",
    color: "bg-accent-100 text-accent-600",
    ring: "ring-accent-200",
    pulseColor: "bg-accent-400",
  },
  {
    number: "3",
    icon: Sparkles,
    title: "Get Expert Guidance",
    description:
      "Receive AI-powered, Safe & Together-aligned support in real time. Practice skills, document cases, and build confidence.",
    color: "bg-violet-100 text-violet-600",
    ring: "ring-violet-200",
    pulseColor: "bg-violet-400",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      {/* Wave separator top */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
        <svg viewBox="0 0 1440 64" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
          <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,40 1440,32 L1440,0 L0,0 Z" fill="rgb(248 250 252)" fillOpacity="0.5" />
        </svg>
      </div>

      {/* Subtle background shapes */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary-50/40 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent-50/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
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
          {/* Animated connecting dashed lines — hidden on mobile */}
          <motion.div
            className="hidden md:block absolute top-24 left-[calc(16.67%+40px)] right-[calc(16.67%+40px)]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
          >
            <div className="border-t-2 border-dashed border-slate-200 w-full" />
          </motion.div>

          {steps.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.2} className="relative">
              <div className="flex flex-col items-center text-center">
                {/* Step number with pulse */}
                <motion.div
                  className="relative mb-4"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                >
                  {/* Pulse ring */}
                  <motion.div
                    className={`absolute inset-0 rounded-full ${step.pulseColor} opacity-20`}
                    initial={{ scale: 1 }}
                    whileInView={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.2 + 0.5, times: [0, 0.5, 1] }}
                  />
                  <div className="w-10 h-10 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center relative z-10 shadow-lg shadow-primary-600/20">
                    {step.number}
                  </div>
                </motion.div>

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

      {/* Wave separator bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg viewBox="0 0 1440 64" className="absolute top-0 w-full h-full" preserveAspectRatio="none">
          <path d="M0,32 C360,0 720,64 1080,32 C1260,16 1380,24 1440,32 L1440,64 L0,64 Z" fill="rgb(248 250 252)" fillOpacity="0.5" />
        </svg>
      </div>
    </section>
  );
}

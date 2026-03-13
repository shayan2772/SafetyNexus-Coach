"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button, Badge, CountUpNumber } from "@/components/ui";
import { APP_DESCRIPTION } from "@/lib/constants";

const chatMessages = [
  {
    role: "user" as const,
    text: "How should I document the perpetrator\u2019s pattern of coercive control?",
    delay: 0.3,
  },
  {
    role: "ai" as const,
    text: "Great question. Start by identifying the specific behaviors that form a pattern \u2014 such as intimidation, isolation, or undermining parenting. Document each with dates and context\u2026",
    delay: 0.8,
  },
  {
    role: "user" as const,
    text: "What about the impact on the children?",
    delay: 1.3,
  },
];

const stats = [
  { value: 500, suffix: "+", label: "Caseworkers" },
  { value: 15000, suffix: "+", label: "Sessions" },
  { value: 3, suffix: "", label: "Countries" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/30 to-white" />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 49px, #64748b 49px, #64748b 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, #64748b 49px, #64748b 50px)",
        }}
      />

      {/* Animated floating circles */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl"
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary-100/15 rounded-full blur-3xl"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-28 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1 lg:max-w-[55%] text-center lg:text-left"
          >
            <Badge className="bg-accent-100 text-accent-700 px-4 py-1.5 text-sm mb-6 inline-flex">
              Built on the Safe &amp; Together Model
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6" style={{ letterSpacing: "-0.02em", textShadow: "0 2px 10px rgba(15, 23, 42, 0.08)" }}>
              Empowering Caseworkers with{" "}
              <span className="gradient-text" style={{ textShadow: "none", filter: "drop-shadow(0 2px 8px rgba(59, 130, 246, 0.15))" }}>AI-Guided Practice Support</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {APP_DESCRIPTION}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
              <Button size="lg">Request a Demo</Button>
              <Link href="/login">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Try the Demo <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <p className="text-sm text-slate-400 mb-8">
              Trusted by organizations across Scotland, New Zealand &amp; Australia
            </p>

            {/* Stats counters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
              className="flex items-center justify-center lg:justify-start gap-0"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center">
                  <div className="text-center px-5">
                    <div className="text-2xl sm:text-3xl font-bold text-slate-900">
                      <CountUpNumber end={stat.value} suffix={stat.suffix} duration={2} />
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400 mt-0.5">{stat.label}</div>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="w-px h-10 bg-slate-200" />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side — animated chat mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex-1 lg:max-w-[45%] w-full hidden sm:block"
          >
            <div className="rounded-2xl border border-slate-200 shadow-2xl shadow-primary-900/5 bg-white overflow-hidden">
              {/* Window top bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs font-medium text-slate-400">
                  SafetyNexus Coach
                </span>
              </div>

              {/* Chat messages */}
              <div className="p-5 space-y-4 min-h-[280px]">
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: msg.delay, ease: "easeOut" }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary-600 text-white rounded-br-md"
                          : "bg-slate-100 text-slate-700 rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

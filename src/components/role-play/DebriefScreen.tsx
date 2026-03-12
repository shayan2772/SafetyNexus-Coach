"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Info } from "lucide-react";
import { clsx } from "clsx";
import { Button, AnimatedSection } from "@/components/ui";
import type { Persona } from "@/data/role-play-data";

interface DebriefScreenProps {
  persona: Persona;
  onPracticeAgain: () => void;
  onBackToScenarios: () => void;
}

function ScoreRing({ score }: { score: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  const color =
    score >= 80
      ? "text-green-500 stroke-green-500"
      : score >= 60
        ? "text-amber-500 stroke-amber-500"
        : "text-red-500 stroke-red-500";

  const trackColor =
    score >= 80
      ? "stroke-green-100"
      : score >= 60
        ? "stroke-amber-100"
        : "stroke-red-100";

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 200);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="8"
          className={trackColor}
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          className={color}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 1.2s ease-out",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={clsx("text-3xl font-bold", color.split(" ")[0])}>
          {animatedScore}
        </span>
        <span className="text-xs text-slate-400">/ 100</span>
      </div>
    </div>
  );
}

export function DebriefScreen({
  persona,
  onPracticeAgain,
  onBackToScenarios,
}: DebriefScreenProps) {
  const { debrief } = persona;

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Session Debrief</h2>
          <p className="text-slate-500 mt-1">
            Conversation with {persona.name}
          </p>
        </div>

        {/* Score */}
        <ScoreRing score={debrief.score} />
        <p className="text-center text-sm text-slate-500 mt-3 mb-8">
          S&T Alignment Score
        </p>

        {/* Strengths */}
        <AnimatedSection delay={0.1}>
          <div className="bg-green-50 rounded-xl p-5 mb-4">
            <h3 className="font-semibold text-green-800 mb-3">Strengths</h3>
            <ul className="space-y-2">
              {debrief.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>

        {/* Improvements */}
        <AnimatedSection delay={0.2}>
          <div className="bg-amber-50 rounded-xl p-5 mb-4">
            <h3 className="font-semibold text-amber-800 mb-3">
              Areas for Improvement
            </h3>
            <ul className="space-y-2">
              {debrief.improvements.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                  <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>

        {/* Key Takeaway */}
        <AnimatedSection delay={0.3}>
          <div className="bg-blue-50 rounded-xl p-5 mb-8">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">Key Takeaway</h3>
                <p className="text-sm text-blue-700 italic">{debrief.keyTakeaway}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={onPracticeAgain}>
            Practice Again
          </Button>
          <Button variant="primary" onClick={onBackToScenarios}>
            Back to Scenarios
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

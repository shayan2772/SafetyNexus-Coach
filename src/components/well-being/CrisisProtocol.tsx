"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Shield, Brain, Baby, Phone } from "lucide-react";
import { clsx } from "clsx";
import {
  CRISIS_RESOURCES,
  type CrisisResource,
  type JurisdictionResources,
} from "@/data/well-being-data";

interface CrisisProtocolProps {
  onSafe: () => void;
}

const CATEGORY_CONFIG: Record<
  CrisisResource["category"],
  { label: string; bg: string; border: string; icon: React.ReactNode; textColor: string }
> = {
  A: {
    label: "Personal Safety",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: <Shield className="w-5 h-5 text-red-600" />,
    textColor: "text-red-800",
  },
  B: {
    label: "Mental Health Support",
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: <Brain className="w-5 h-5 text-amber-600" />,
    textColor: "text-amber-800",
  },
  C: {
    label: "Child Safety",
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: <Baby className="w-5 h-5 text-blue-600" />,
    textColor: "text-blue-800",
  },
};

function ResourceGroup({
  category,
  resources,
}: {
  category: CrisisResource["category"];
  resources: CrisisResource[];
}) {
  const config = CATEGORY_CONFIG[category];

  return (
    <div className={clsx("rounded-xl border p-4 md:p-5 mb-6", config.bg, config.border)}>
      <div className="flex items-center gap-2 mb-3">
        {config.icon}
        <h3 className={clsx("font-bold text-sm uppercase tracking-wide", config.textColor)}>
          {config.label}
        </h3>
      </div>
      <div className="space-y-3">
        {resources.map((resource) => (
          <div
            key={resource.phone}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white rounded-lg p-3 border border-slate-100"
          >
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-900 text-sm">{resource.name}</p>
              <p className="text-slate-500 text-xs mt-0.5">{resource.description}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-xl font-mono font-bold text-slate-800">
                {resource.phone}
              </span>
              <a
                href={`tel:${resource.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CrisisProtocol({ onSafe }: CrisisProtocolProps) {
  const [activeJurisdiction, setActiveJurisdiction] = useState(0);

  const jurisdiction: JurisdictionResources = CRISIS_RESOURCES[activeJurisdiction];
  const categoryA = jurisdiction.resources.filter((r) => r.category === "A");
  const categoryB = jurisdiction.resources.filter((r) => r.category === "B");
  const categoryC = jurisdiction.resources.filter((r) => r.category === "C");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-50 bg-white overflow-y-auto"
    >
      {/* Top Bar with heartbeat animation */}
      <div className="bg-red-500 text-white px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <motion.div
            animate={{
              scale: [1, 1.25, 1, 1.2, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.3,
            }}
          >
            <AlertTriangle className="w-6 h-6" />
          </motion.div>
          <h1 className="text-lg font-bold">Crisis Support Activated</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        {/* Priority Message */}
        <p className="text-lg md:text-xl text-slate-800 font-medium text-center mb-8">
          Your safety is our priority. The resources below are available 24/7.
        </p>

        {/* Jurisdiction Tabs */}
        <div className="flex rounded-xl overflow-hidden border border-slate-200 mb-6">
          {CRISIS_RESOURCES.map((jur, idx) => (
            <button
              key={jur.name}
              onClick={() => setActiveJurisdiction(idx)}
              className={clsx(
                "flex-1 py-3 px-2 text-sm font-semibold transition-colors duration-200 text-center",
                idx === activeJurisdiction
                  ? "bg-red-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              <span className="mr-1.5">{jur.flag}</span>
              {jur.name}
            </button>
          ))}
        </div>

        {/* Resources by Category */}
        <ResourceGroup category="A" resources={categoryA} />
        <ResourceGroup category="B" resources={categoryB} />
        <ResourceGroup category="C" resources={categoryC} />

        {/* I'm Safe Button */}
        <div className="mt-8 mb-6">
          <button
            onClick={onSafe}
            className="w-full bg-accent-600 hover:bg-accent-700 text-white text-lg font-bold py-4 rounded-xl transition-colors duration-200"
          >
            I&apos;m Safe
          </button>
          <p className="text-center text-slate-400 text-sm mt-2">
            Click when you feel ready to return
          </p>
        </div>
      </div>
    </motion.div>
  );
}

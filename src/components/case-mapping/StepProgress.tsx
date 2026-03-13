"use client";

import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { useState } from "react";
import { CASE_STEPS } from "@/data/case-mapping-data";

interface StepNavProps {
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
}

const STEP_GROUPS = [
  { label: "Case Information", steps: [1, 2, 3] },
  { label: "Perpetrator Pattern", steps: [4, 5, 6] },
  { label: "Impact & Strengths", steps: [7, 8, 9, 10] },
  { label: "Assessment & Actions", steps: [11, 12] },
];

export function StepNav({ currentStep, completedSteps, onStepClick }: StepNavProps) {
  const totalCompleted = completedSteps.length;
  const progress = Math.round((totalCompleted / 12) * 100);

  return (
    <>
      {/* Desktop: vertical sidebar nav */}
      <div className="hidden lg:flex flex-col w-72 shrink-0 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden h-fit sticky top-4">
        {/* Progress header */}
        <div className="p-5 border-b border-slate-100 bg-gradient-to-br from-primary-50/60 to-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-slate-700">Case Map Progress</h3>
            <span className="text-sm font-bold text-primary-600">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">{totalCompleted} of 12 steps completed</p>
        </div>

        {/* Step groups */}
        <div className="p-3 space-y-1">
          {STEP_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="text-[10px] uppercase tracking-widest text-slate-300 font-semibold px-3 pt-3 pb-1.5">
                {group.label}
              </p>
              {group.steps.map((stepNum) => {
                const step = CASE_STEPS[stepNum - 1];
                const isCurrent = stepNum === currentStep;
                const isCompleted = completedSteps.includes(stepNum);

                return (
                  <button
                    key={stepNum}
                    onClick={() => onStepClick(stepNum)}
                    className={clsx(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group",
                      isCurrent
                        ? "bg-primary-50 shadow-sm"
                        : "hover:bg-slate-50"
                    )}
                  >
                    {/* Step indicator */}
                    <div
                      className={clsx(
                        "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all",
                        isCurrent && "bg-primary-600 text-white shadow-sm",
                        isCompleted && !isCurrent && "bg-accent-500 text-white",
                        !isCurrent && !isCompleted && "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                      )}
                    >
                      {isCompleted && !isCurrent ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        stepNum
                      )}
                    </div>

                    {/* Step title */}
                    <span
                      className={clsx(
                        "text-sm truncate transition-colors",
                        isCurrent
                          ? "font-semibold text-primary-700"
                          : isCompleted
                          ? "text-slate-600"
                          : "text-slate-400 group-hover:text-slate-600"
                      )}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: dropdown step selector */}
      <MobileStepSelector
        currentStep={currentStep}
        completedSteps={completedSteps}
        progress={progress}
        onStepClick={onStepClick}
      />
    </>
  );
}

function MobileStepSelector({
  currentStep,
  completedSteps,
  progress,
  onStepClick,
}: StepNavProps & { progress: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const currentStepData = CASE_STEPS[currentStep - 1];

  return (
    <div className="lg:hidden sticky top-0 z-10 -mx-4 px-4 -mt-4 pt-4 pb-3 bg-slate-50/95 backdrop-blur-sm">
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-3">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Current step button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-primary-600 text-white flex items-center justify-center text-xs font-bold">
            {currentStep}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-800">{currentStepData.title}</p>
            <p className="text-xs text-slate-400">Step {currentStep} of 12 &middot; {progress}% complete</p>
          </div>
        </div>
        <ChevronDown
          className={clsx(
            "w-5 h-5 text-slate-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-4 right-4 top-full mt-1 bg-white rounded-xl border border-slate-200 shadow-lg z-20 max-h-80 overflow-y-auto"
        >
          {CASE_STEPS.map((step) => {
            const isCurrent = step.number === currentStep;
            const isCompleted = completedSteps.includes(step.number);

            return (
              <button
                key={step.number}
                onClick={() => {
                  onStepClick(step.number);
                  setIsOpen(false);
                }}
                className={clsx(
                  "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-slate-50 last:border-b-0",
                  isCurrent ? "bg-primary-50" : "hover:bg-slate-50"
                )}
              >
                <div
                  className={clsx(
                    "w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0",
                    isCurrent && "bg-primary-600 text-white",
                    isCompleted && !isCurrent && "bg-accent-500 text-white",
                    !isCurrent && !isCompleted && "bg-slate-100 text-slate-400"
                  )}
                >
                  {isCompleted && !isCurrent ? <Check className="w-3 h-3" /> : step.number}
                </div>
                <span
                  className={clsx(
                    "text-sm",
                    isCurrent ? "font-semibold text-primary-700" : "text-slate-600"
                  )}
                >
                  {step.title}
                </span>
              </button>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

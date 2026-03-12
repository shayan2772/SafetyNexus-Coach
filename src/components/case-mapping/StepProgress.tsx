"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { clsx } from "clsx";
import { ProgressBar } from "@/components/ui";
import { CASE_STEPS } from "@/data/case-mapping-data";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
}

export function StepProgress({ currentStep, totalSteps, completedSteps }: StepProgressProps) {
  const progress = (completedSteps.length / totalSteps) * 100;

  return (
    <>
      {/* Mobile: simple progress */}
      <div className="md:hidden space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-slate-500">
            {CASE_STEPS[currentStep - 1].title}
          </span>
        </div>
        <ProgressBar progress={progress} showLabel={false} />
      </div>

      {/* Desktop: horizontal step indicators */}
      <div className="hidden md:block overflow-x-auto py-2">
        <div className="flex items-start justify-between min-w-[800px]">
          {CASE_STEPS.map((step, index) => {
            const isCompleted = completedSteps.includes(step.number);
            const isCurrent = step.number === currentStep;
            const isUpcoming = !isCompleted && !isCurrent;

            return (
              <div key={step.number} className="flex items-start flex-1">
                <div className="flex flex-col items-center w-full">
                  {/* Circle + connector line */}
                  <div className="flex items-center w-full">
                    {/* Left line */}
                    {index > 0 && (
                      <div
                        className={clsx(
                          "h-0.5 flex-1",
                          completedSteps.includes(CASE_STEPS[index - 1].number) || isCompleted
                            ? "bg-accent-500"
                            : "bg-slate-200"
                        )}
                      />
                    )}

                    {/* Circle */}
                    <motion.div
                      layout
                      className={clsx(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300",
                        isCurrent && "bg-primary-600 text-white ring-4 ring-primary-100",
                        isCompleted && "bg-accent-500 text-white",
                        isUpcoming && "bg-slate-200 text-slate-400"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        step.number
                      )}
                    </motion.div>

                    {/* Right line */}
                    {index < CASE_STEPS.length - 1 && (
                      <div
                        className={clsx(
                          "h-0.5 flex-1",
                          isCompleted ? "bg-accent-500" : "bg-slate-200"
                        )}
                      />
                    )}
                  </div>

                  {/* Title */}
                  <span
                    className={clsx(
                      "text-xs mt-1.5 text-center leading-tight max-w-[80px] truncate",
                      isCurrent ? "text-primary-600 font-medium" : "text-slate-400"
                    )}
                    title={step.title}
                  >
                    {step.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

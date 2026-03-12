"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Button } from "@/components/ui";
import { CASE_STEPS } from "@/data/case-mapping-data";
import { StepProgress } from "@/components/case-mapping/StepProgress";
import { StepForm } from "@/components/case-mapping/StepForm";
import { DocumentUpload } from "@/components/case-mapping/DocumentUpload";
import { CasePreview } from "@/components/case-mapping/CasePreview";

const SAMPLE_DATA: Record<string, unknown> = {
  caseId: "DV-2026-0847",
  date: "2026-03-10",
  workerName: "Sarah Mitchell",
  referralSource: "Police Referral",
  referralReason:
    "Police attended the family home on 8 March 2026 following a 999 call from a neighbour reporting shouting and sounds of objects breaking. On arrival, the perpetrator had left. The survivor was distressed with visible bruising on her left arm. Two children (ages 7 and 4) were present and witnessed the incident.",
  priorInvolvement:
    "Three previous police callouts in the past 18 months. A referral was made to children's services in September 2025 but was closed after initial assessment. The survivor has previously attended a local women's centre for support.",
  perpName: "David Morrison",
  perpRelationship: "Father",
  perpDemographics:
    "Age 34, employed as a delivery driver. History of alcohol misuse. No known engagement with perpetrator programmes.",
  behaviorTypes: [
    "Physical violence",
    "Emotional/psychological abuse",
    "Financial/economic control",
    "Isolation from support networks",
    "Using children as leverage",
    "Threats and intimidation",
    "Damage to property",
  ],
  patternDescription:
    "The perpetrator demonstrates an escalating pattern of coercive control spanning at least 3 years. Physical violence has increased in severity from pushing and grabbing to punching and throwing objects. The perpetrator controls household finances, providing a small weekly allowance and monitoring all spending. He has systematically isolated the survivor from her family by creating conflict during visits and monitoring phone communications. He frequently uses the children as leverage, threatening to seek sole custody if she leaves, and undermining her parenting in front of the children.",
  riskLevel: "High",
  childImpacts: [
    "Behavioral changes (withdrawal, aggression)",
    "Sleep disturbances or nightmares",
    "Anxiety, hypervigilance, or fear responses",
    "Academic decline or school difficulties",
  ],
  protectiveActions:
    "The survivor has consistently maintained the children's school attendance and daily routines despite extreme duress. She has developed a safety plan with the children, including a code word. She has quietly maintained contact with her sister despite the perpetrator's efforts to isolate her. She has begun saving small amounts of money in a separate, hidden account.",
  actionTypes: [
    "Safety planning with survivor",
    "Perpetrator intervention program referral",
    "Legal protection order",
    "Children's therapeutic support",
    "Multi-agency risk assessment conference (MARAC)",
  ],
};

export default function CaseMapping() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, unknown>>(SAMPLE_DATA);
  const [viewMode, setViewMode] = useState<"wizard" | "preview">("wizard");
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const currentStepData = CASE_STEPS[currentStep - 1];

  const handleFieldChange = useCallback((fieldId: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  }, []);

  const goToStep = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
    setViewMode("wizard");
  };

  const handleNext = () => {
    setCompletedSteps((prev) =>
      prev.includes(currentStep) ? prev : [...prev, currentStep]
    );
    if (currentStep < 12) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  };

  const handleReview = () => {
    setCompletedSteps((prev) =>
      prev.includes(currentStep) ? prev : [...prev, currentStep]
    );
    setViewMode("preview");
  };

  const handleEdit = (stepNumber: number) => {
    goToStep(stepNumber);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  if (viewMode === "preview") {
    return (
      <div className="max-w-5xl mx-auto">
        <CasePreview
          formData={formData}
          steps={CASE_STEPS}
          onEdit={handleEdit}
          onDownload={() => {}}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Sticky progress */}
      <div className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur-sm py-3 -mx-4 px-4 md:-mx-6 md:px-6">
        <StepProgress
          currentStep={currentStep}
          totalSteps={12}
          completedSteps={completedSteps}
        />
      </div>

      {/* Step form with transitions */}
      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
              <StepForm
                step={currentStepData}
                formData={formData}
                onChange={handleFieldChange}
              />

              {/* Document upload on steps 2 and 4 */}
              {(currentStep === 2 || currentStep === 4) && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <DocumentUpload />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between pb-4">
        <Button
          variant="secondary"
          onClick={handlePrev}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {currentStep === 12 ? (
          <Button onClick={handleReview}>
            <Eye className="w-4 h-4" />
            Review Case Map
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Next Step
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

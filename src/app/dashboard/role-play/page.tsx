"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";
import { Button, AnimatedSection } from "@/components/ui";
import { PersonaCard } from "@/components/role-play/PersonaCard";
import { RolePlayChat } from "@/components/role-play/RolePlayChat";
import { CoachObserver } from "@/components/role-play/CoachObserver";
import { DebriefScreen } from "@/components/role-play/DebriefScreen";
import { PERSONAS } from "@/data/role-play-data";
import type { Persona } from "@/data/role-play-data";

type ViewState = "selection" | "active" | "debrief";

export default function RolePlayPage() {
  const [view, setView] = useState<ViewState>("selection");
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [coachNotes, setCoachNotes] = useState<string[]>([]);

  const handleStart = useCallback(() => {
    if (!selectedPersona) return;
    setCoachNotes([]);
    setView("active");
  }, [selectedPersona]);

  const handleEnd = useCallback(() => {
    setView("debrief");
  }, []);

  const handleCoachNote = useCallback((note: string) => {
    setCoachNotes((prev) => [...prev, note]);
  }, []);

  const handlePracticeAgain = useCallback(() => {
    setCoachNotes([]);
    setView("active");
  }, []);

  const handleBackToScenarios = useCallback(() => {
    setSelectedPersona(null);
    setCoachNotes([]);
    setView("selection");
  }, []);

  return (
    <AnimatePresence mode="wait">
      {view === "selection" && (
        <motion.div
          key="selection"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-7 h-7 text-primary-600" />
              <h1 className="text-2xl font-bold text-slate-900">
                Role-Play Simulator
              </h1>
            </div>
            <p className="text-slate-500">
              Practice challenging conversations in a safe environment
            </p>
          </div>

          {/* Persona grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {PERSONAS.map((persona, i) => (
              <AnimatedSection key={persona.id} delay={i * 0.1}>
                <PersonaCard
                  persona={persona}
                  selected={selectedPersona?.id === persona.id}
                  onSelect={() => setSelectedPersona(persona)}
                />
              </AnimatedSection>
            ))}
          </div>

          {/* Start button */}
          <div className="flex justify-center">
            <Button
              variant="primary"
              size="lg"
              disabled={!selectedPersona}
              onClick={handleStart}
            >
              Start Role-Play
            </Button>
          </div>
        </motion.div>
      )}

      {view === "active" && selectedPersona && (
        <motion.div
          key="active"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="flex h-full -m-4 md:-m-6 -mb-20 md:-mb-6"
        >
          <RolePlayChat
            key={selectedPersona.id + (coachNotes.length === 0 ? "-fresh" : "")}
            persona={selectedPersona}
            onEnd={handleEnd}
            onCoachNote={handleCoachNote}
          />
          <CoachObserver notes={coachNotes} />
        </motion.div>
      )}

      {view === "debrief" && selectedPersona && (
        <motion.div
          key="debrief"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          <DebriefScreen
            persona={selectedPersona}
            onPracticeAgain={handlePracticeAgain}
            onBackToScenarios={handleBackToScenarios}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

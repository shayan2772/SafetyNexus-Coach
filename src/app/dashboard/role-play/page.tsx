"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Play, Sparkles } from "lucide-react";
import { Button, AnimatedSection, Badge } from "@/components/ui";
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Role-Play Simulator
                </h1>
                <p className="text-sm text-slate-400">
                  Practice challenging conversations in a safe environment
                </p>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="bg-gradient-to-r from-purple-50 to-primary-50 rounded-2xl p-5 mb-8 border border-purple-100/50">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-1">How it works</p>
                <p className="text-sm text-slate-500">
                  Select a scenario below, then practice your conversation using suggested S&T-aligned responses.
                  A coach will observe and provide real-time feedback. After the session, you&apos;ll receive a detailed debrief with your alignment score.
                </p>
              </div>
            </div>
          </div>

          {/* Persona grid */}
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Choose a Scenario</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {PERSONAS.map((persona, i) => (
              <AnimatedSection key={persona.id} delay={i * 0.1}>
                <PersonaCard
                  persona={persona}
                  selected={selectedPersona?.id === persona.id}
                  onSelect={() => setSelectedPersona(persona)}
                  onStart={() => {
                    setSelectedPersona(persona);
                    setCoachNotes([]);
                    setView("active");
                  }}
                />
              </AnimatedSection>
            ))}
          </div>

          {/* Start button */}
          <AnimatedSection delay={0.4}>
            <div className="flex justify-center">
              <Button
                variant="primary"
                size="lg"
                disabled={!selectedPersona}
                onClick={handleStart}
                className="min-w-[200px]"
              >
                <Play className="w-4 h-4" />
                Start Role-Play
              </Button>
            </div>
          </AnimatedSection>
        </motion.div>
      )}

      {view === "active" && selectedPersona && (
        <motion.div
          key="active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex gap-0 -m-4 md:-m-6 -mb-20 md:-mb-6"
          style={{ height: "calc(100vh - 4rem)" }}
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
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

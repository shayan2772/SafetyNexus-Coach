"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoodCheckIn } from "@/components/well-being/MoodCheckIn";
import { WellBeingChat } from "@/components/well-being/WellBeingChat";
import { CrisisProtocol } from "@/components/well-being/CrisisProtocol";
import type { Mood } from "@/data/well-being-data";

type Phase = "checkin" | "chat" | "crisis";

export default function WellBeingPage() {
  const [phase, setPhase] = useState<Phase>("checkin");
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const handleMoodSelect = (mood: Mood) => {
    if (mood.id === "crisis") {
      setPhase("crisis");
    } else {
      setSelectedMood(mood);
      setPhase("chat");
    }
  };

  const handleCrisisTriggered = () => {
    setPhase("crisis");
  };

  const handleSafe = () => {
    if (selectedMood) {
      setPhase("chat");
    } else {
      setPhase("checkin");
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-accent-50/20 to-transparent -m-4 md:-m-6 p-4 md:p-6">
      <AnimatePresence mode="wait">
        {phase === "checkin" && (
          <motion.div
            key="checkin"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            <MoodCheckIn onMoodSelect={handleMoodSelect} />
          </motion.div>
        )}

        {phase === "chat" && selectedMood && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            <WellBeingChat
              initialMood={selectedMood}
              onCrisisTriggered={handleCrisisTriggered}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {phase === "crisis" && (
        <CrisisProtocol onSafe={handleSafe} />
      )}
    </div>
  );
}

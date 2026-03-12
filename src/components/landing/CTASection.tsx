"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";

const floatingCircles = [
  { size: 120, top: "10%", left: "5%", opacity: 0.05, duration: 6 },
  { size: 80, top: "60%", right: "10%", opacity: 0.08, duration: 8 },
  { size: 200, bottom: "5%", left: "30%", opacity: 0.04, duration: 10 },
  { size: 60, top: "20%", right: "25%", opacity: 0.1, duration: 7 },
  { size: 150, bottom: "20%", right: "5%", opacity: 0.05, duration: 9 },
];

export function CTASection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 to-primary-800 overflow-hidden">
      {/* Floating circles */}
      {floatingCircles.map((circle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: circle.size,
            height: circle.size,
            top: circle.top,
            left: circle.left,
            right: circle.right,
            bottom: circle.bottom,
            opacity: circle.opacity,
          }}
          animate={{ y: [-12, 12, -12] }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-5"
        >
          Ready to Transform Your Practice?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg text-white/80 mb-10 max-w-xl mx-auto"
        >
          Join organizations across the globe using AI-powered coaching to deliver
          safer, more effective domestic violence practice.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <Button
            size="lg"
            className="bg-white text-primary-700 hover:bg-white/90 hover:shadow-xl shadow-lg"
          >
            Request a Demo
          </Button>

          <Link
            href="/login"
            className="text-sm text-white/70 hover:text-white hover:underline transition-colors"
          >
            Or try the demo now &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { Star } from "lucide-react";
import { Card, AnimatedSection } from "@/components/ui";

const testimonials = [
  {
    quote:
      "SafetyNexus has transformed how our team approaches case documentation. The AI coach keeps us grounded in the S&T model.",
    name: "Dr. Emma Richardson",
    role: "Program Director, Scottish DV Services",
    initials: "ER",
    org: "Scottish DV Services",
  },
  {
    quote:
      "The role-play simulator gave me confidence I never had before. Practicing difficult conversations in a safe space has been invaluable.",
    name: "James Kowalski",
    role: "Senior Caseworker, NZ Family Services",
    initials: "JK",
    org: "NZ Family Services",
  },
  {
    quote:
      "Having 24/7 access to S&T-aligned guidance means our caseworkers no longer feel isolated when handling complex cases.",
    name: "Aroha Williams",
    role: "Team Lead, Australian Child Protection",
    initials: "AW",
    org: "Australian Child Protection",
  },
];

const elevationClasses = [
  "shadow-sm",
  "shadow-md -translate-y-1",
  "shadow-sm",
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-primary-50/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Trusted by Practitioners Worldwide
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Hear from the people using SafetyNexus every day to improve outcomes for families.
          </p>
        </AnimatedSection>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.15}>
              <Card hover={false} className={`h-full flex flex-col ${elevationClasses[i]}`}>
                {/* Large decorative quote mark */}
                <div className="text-6xl leading-none text-primary-100 font-serif select-none -mb-2">
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-slate-600 leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Divider */}
                <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
                  {/* Avatar with initials */}
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 font-semibold text-sm flex items-center justify-center">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>

                {/* Organization badge */}
                <div className="mt-4 pt-3 border-t border-slate-50">
                  <span className="inline-block text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                    {t.org}
                  </span>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

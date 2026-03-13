"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Mail, Lock, ArrowLeft, Quote } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DEMO_USER } from "@/lib/constants";

const testimonials = [
  {
    quote: "SafetyNexus transformed how our team approaches case documentation.",
    name: "Dr. Emma Richardson",
    role: "Program Director",
  },
  {
    quote: "The AI coach keeps me grounded in the Safe & Together model every day.",
    name: "James Kowalski",
    role: "Senior Caseworker",
  },
  {
    quote: "Having 24/7 access to S&T-aligned guidance has been a game-changer.",
    name: "Aroha Williams",
    role: "Team Lead",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(true);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSignIn = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-white to-primary-50/40 overflow-hidden">
      {/* Subtle dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #64748b 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Decorative floating circles */}
      <motion.div
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-primary-200/20 blur-3xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent-200/20 blur-3xl"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[30%] right-[10%] w-[300px] h-[300px] rounded-full bg-primary-200/20 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] rounded-full bg-accent-200/20 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Login card with gradient border effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Gradient border wrapper */}
        <div className="rounded-2xl bg-gradient-to-br from-primary-400 via-accent-400 to-primary-400 p-[1.5px]">
          <div className="rounded-2xl bg-white shadow-2xl p-6 md:p-8">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-8 h-8 text-primary-600" />
                <span className="text-2xl font-bold gradient-text">SafetyNexus</span>
              </div>
              <p className="text-slate-500 text-sm text-center">
                Sign in to your practice support platform
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignIn();
              }}
              className="space-y-5"
            >
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    defaultValue={DEMO_USER.email}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="password"
                    type="password"
                    defaultValue="demo12345"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="remember" className="text-sm text-slate-600">
                  Remember me
                </label>
              </div>

              {/* Sign In button */}
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Demo Mode
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Info text */}
            <p className="text-xs text-slate-400 text-center mb-6">
              This is a demo environment. Click Sign In to explore.
            </p>

            {/* Back to home */}
            <Link
              href="/"
              className="flex items-center justify-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </div>

        {/* Mini testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 text-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-1"
            >
              <Quote className="w-4 h-4 text-primary-300" />
              <p className="text-sm text-slate-500 italic max-w-xs">
                &ldquo;{testimonials[testimonialIndex].quote}&rdquo;
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {testimonials[testimonialIndex].name} &middot; {testimonials[testimonialIndex].role}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = true, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={clsx(
        "bg-white rounded-2xl shadow-sm border border-slate-100 p-6",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

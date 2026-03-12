"use client";

import { clsx } from "clsx";

interface SkeletonProps {
  variant?: "text" | "title" | "card" | "circle" | "chart";
  className?: string;
  count?: number;
}

export function SkeletonLoader({ variant = "text", className, count = 1 }: SkeletonProps) {
  const baseClass = "bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-[length:200%_100%] animate-shimmer";

  const variantClasses = {
    text: "h-4 rounded w-full",
    title: "h-8 rounded w-48",
    card: "h-40 rounded-2xl w-full",
    circle: "w-10 h-10 rounded-full",
    chart: "h-64 rounded-2xl w-full",
  };

  return (
    <div className={clsx("space-y-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={clsx(baseClass, variantClasses[variant])} />
      ))}
    </div>
  );
}

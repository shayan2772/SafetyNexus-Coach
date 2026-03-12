"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface CountUpNumberProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function CountUpNumber({
  end,
  duration = 1.5,
  suffix = "",
  prefix = "",
  decimals = 0,
}: CountUpNumberProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end * Math.pow(10, decimals)) / Math.pow(10, decimals));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{decimals > 0 ? count.toFixed(decimals) : count}{suffix}
    </span>
  );
}

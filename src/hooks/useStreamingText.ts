"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useStreamingText(speed: number = 15) {
  const [displayedText, setDisplayedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [fullText, setFullText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);

  const startStreaming = useCallback(
    (text: string) => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setFullText(text);
      setDisplayedText("");
      setIsStreaming(true);
      indexRef.current = 0;

      intervalRef.current = setInterval(() => {
        indexRef.current += 1;
        if (indexRef.current >= text.length) {
          setDisplayedText(text);
          setIsStreaming(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
        } else {
          setDisplayedText(text.slice(0, indexRef.current));
        }
      }, speed);
    },
    [speed]
  );

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { displayedText, isStreaming, startStreaming, fullText };
}

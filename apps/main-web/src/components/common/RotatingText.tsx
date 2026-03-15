"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  prefix: string;
  words: string[];
  descriptions?: string[];
  interval?: number;
  className?: string;
  descriptionClassName?: string;
}

export default function RotatingText({
  prefix,
  words,
  descriptions,
  interval = 2000,
  className = "",
  descriptionClassName = "",
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);
  const measureRef = useRef<HTMLDivElement>(null);

  // Measure the widest word once on mount to fix the container width
  useEffect(() => {
    if (measureRef.current) {
      const spans = measureRef.current.querySelectorAll("span");
      let widest = 0;
      spans.forEach((span) => {
        widest = Math.max(widest, span.offsetWidth);
      });
      setMaxWidth(widest);
    }
  }, [words]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <div className="flex flex-col items-center">
      {/* Hidden measurement container */}
      <div
        ref={measureRef}
        aria-hidden
        className={`pointer-events-none absolute opacity-0 ${className}`}
      >
        {words.map((word) => (
          <span key={word} className="inline-block">
            {word}
          </span>
        ))}
      </div>

      {/* Title row: fixed prefix + rotating word */}
      <div className={`flex items-baseline ${className}`}>
        <span className="shrink-0">
          <span className="gradient-text">{prefix.replace(/_/g, "")}</span>
          <span className="ml-2 text-white">{prefix.includes("_") ? "_" : ""}</span>
        </span>
        <div
          className="relative ml-1 overflow-hidden"
          style={{ width: maxWidth || "auto" }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              initial={{ y: -40, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: 40, opacity: 0, filter: "blur(4px)" }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="text-white inline-block"
            >
              {words[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Description below the title */}
      {descriptions && descriptions.length > 0 && (
        <div className="mt-10 min-h-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${currentIndex}`}
              initial={{ y: -20, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: 20, opacity: 0, filter: "blur(4px)" }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.1,
              }}
              className={`text-white ${descriptionClassName}`}
            >
              {descriptions[currentIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

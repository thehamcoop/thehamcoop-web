"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface UseScrollAnimationOptions {
  threshold?: number;
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);
  const { threshold = 0.2, y = 60, duration = 0.8, delay = 0, stagger = 0.15 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const children = stagger ? Array.from(element.children) : [element];

    gsap.set(children, { opacity: 0, y });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(children, {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger: stagger > 0 ? stagger : 0,
            ease: "power3.out",
          });
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, y, duration, delay, stagger]);

  return ref;
}

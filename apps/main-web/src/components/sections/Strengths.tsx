"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ITEMS = [
  {
    number: "01",
    label: "특허보유",
    sub: "",
    side: "left" as const,
  },
  {
    number: "02",
    label: "자격증 발급 기관",
    sub: "",
    side: "right" as const,
  },
  {
    number: "03",
    label: "자체 브랜드 상품 개발·유통",
    sub: "",
    side: "left" as const,
  },
  {
    number: "04",
    label: "인스타 팔로워 7k",
    sub: "",
    side: "right" as const,
  },
];

// Each item gets an equal chunk of scroll.
// Within each chunk: appear → hold → disappear (except last item stays)
// 0~0.08: main text
// 0.08~1.0 split into 4 equal slots of ~0.23 each
// Slot boundaries: 0.08, 0.31, 0.54, 0.77, 1.0
// Within each slot:
//   first 35% = fade in, middle 30% = hold, last 35% = fade out (up)
//   last item: fade in then hold forever

function getItemKeyframes(index: number, total: number) {
  const slotStart = 0.08 + (index * 0.84) / total;
  const slotEnd = 0.08 + ((index + 1) * 0.84) / total;
  const slotLen = slotEnd - slotStart;

  const fadeInEnd = slotStart + slotLen * 0.2;
  const holdEnd = slotStart + slotLen * 0.5;
  const isLast = index === total - 1;

  // y values: 300 (below screen) → 0 (center) → -400 (above screen, half out)
  // opacity fades out only at the end when element is half off-screen
  if (isLast) {
    return {
      opacity: { input: [slotStart, fadeInEnd], output: [0, 1] },
      y: { input: [slotStart, fadeInEnd], output: [300, 0] },
    };
  }

  const fadeOutStart = slotStart + slotLen * 0.75;

  return {
    opacity: {
      input: [slotStart, fadeInEnd, fadeOutStart, slotEnd],
      output: [0, 1, 1, 0],
    },
    y: {
      input: [slotStart, fadeInEnd, holdEnd, slotEnd],
      output: [300, 0, 0, -400],
    },
  };
}

export default function Strengths() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Main text
  const mainOpacity = useTransform(scrollYProgress, [0.0, 0.08], [0, 1]);
  const mainY = useTransform(scrollYProgress, [0.0, 0.08], [50, 0]);

  // Award text - appears with last item
  const awardOpacity = useTransform(scrollYProgress, [0.82, 0.9], [0, 1]);
  const awardY = useTransform(scrollYProgress, [0.82, 0.9], [20, 0]);

  // Item animations
  const keyframes = ITEMS.map((_, i) => getItemKeyframes(i, ITEMS.length));

  const item0Opacity = useTransform(
    scrollYProgress,
    keyframes[0].opacity.input,
    keyframes[0].opacity.output,
  );
  const item0Y = useTransform(
    scrollYProgress,
    keyframes[0].y.input,
    keyframes[0].y.output,
  );

  const item1Opacity = useTransform(
    scrollYProgress,
    keyframes[1].opacity.input,
    keyframes[1].opacity.output,
  );
  const item1Y = useTransform(
    scrollYProgress,
    keyframes[1].y.input,
    keyframes[1].y.output,
  );

  const item2Opacity = useTransform(
    scrollYProgress,
    keyframes[2].opacity.input,
    keyframes[2].opacity.output,
  );
  const item2Y = useTransform(
    scrollYProgress,
    keyframes[2].y.input,
    keyframes[2].y.output,
  );

  const item3Opacity = useTransform(
    scrollYProgress,
    keyframes[3].opacity.input,
    keyframes[3].opacity.output,
  );
  const item3Y = useTransform(
    scrollYProgress,
    keyframes[3].y.input,
    keyframes[3].y.output,
  );

  const itemAnimations = [
    { opacity: item0Opacity, y: item0Y },
    { opacity: item1Opacity, y: item1Y },
    { opacity: item2Opacity, y: item2Y },
    { opacity: item3Opacity, y: item3Y },
  ];

  return (
    <section ref={containerRef} id="strengths" className="relative h-[500vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-white">
        <div className="relative h-full w-full max-w-7xl px-6">
          {/* Center: Main headline (stays visible) */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
            style={{ opacity: mainOpacity, y: mainY }}
          >
            <h2 className="text-5xl font-black leading-tight text-[#27272a] md:text-6xl lg:text-8xl">
              더함협동조합은
            </h2>
            <h2 className="mt-2 text-5xl font-black leading-tight text-[#27272a] md:text-6xl lg:text-8xl">
              <span
                className="inline-block px-5 py-1 text-white"
                style={{
                  background: "linear-gradient(135deg, #6c5ce7 0%, #4f46e5 50%, #3b82f6 100%)",
                  transform: "skewX(-4deg)",
                }}
              >
                <span style={{ display: "inline-block", transform: "skewX(4deg)" }}>
                  OO과 OO
                </span>
              </span>
              <span className="ml-3">을 잘합니다</span>
            </h2>
          </motion.div>

          {/* Alternating side items */}
          {ITEMS.map((item, index) => {
            const isLeft = item.side === "left";
            return (
              <motion.div
                key={item.number}
                className="absolute flex flex-col items-center gap-4"
                style={{
                  top: "50%",
                  translateY: "-50%",
                  ...(isLeft ? { left: "-3%" } : { right: "-3%" }),
                  opacity: itemAnimations[index].opacity,
                  y: itemAnimations[index].y,
                }}
              >
                <div
                  className="flex h-60 w-60 items-center justify-center overflow-hidden rounded-full border-2 border-white/10 lg:h-80 lg:w-80"
                  style={{
                    background:
                      "linear-gradient(135deg, #1e1e3a 0%, #16213e 100%)",
                  }}
                >
                  <span className="text-6xl font-bold text-[#27272a]/40 lg:text-8xl">
                    {item.number}
                  </span>
                </div>
                <p className="text-3xl font-bold text-[#27272a] lg:text-5xl">
                  {item.label}
                </p>
                <p className="text-lg text-[#27272a]/60 lg:text-xl">
                  {item.sub}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

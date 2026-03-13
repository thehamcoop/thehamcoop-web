"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ITEMS = [
  {
    number: "01",
    label: "장관상 수상",
    sub: "AI 과학기술정보통신부",
    side: "left" as const,
  },
  {
    number: "02",
    label: "교육 플랫폼 1위",
    sub: "패스트캠퍼스 강의 랭킹",
    side: "right" as const,
  },
  {
    number: "03",
    label: "대기업 파트너십",
    sub: "롯데, 코람코 등",
    side: "left" as const,
  },
  {
    number: "04",
    label: "자체 SaaS 제품",
    sub: "제품 개발 역량 보유",
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

  const fadeInEnd = slotStart + slotLen * 0.3;
  const holdEnd = slotStart + slotLen * 0.6;
  const isLast = index === total - 1;

  if (isLast) {
    // Last item: fade in and stay
    return {
      opacity: { input: [slotStart, fadeInEnd], output: [0, 1] },
      scale: { input: [slotStart, fadeInEnd], output: [0, 1] },
      y: { input: [slotStart, fadeInEnd], output: [40, 0] },
    };
  }

  return {
    opacity: {
      input: [slotStart, fadeInEnd, holdEnd, slotEnd],
      output: [0, 1, 1, 0],
    },
    scale: {
      input: [slotStart, fadeInEnd, holdEnd, slotEnd],
      output: [0, 1, 1, 0.8],
    },
    y: {
      input: [slotStart, fadeInEnd, holdEnd, slotEnd],
      output: [40, 0, 0, -80],
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

  const item0Opacity = useTransform(scrollYProgress, keyframes[0].opacity.input, keyframes[0].opacity.output);
  const item0Scale = useTransform(scrollYProgress, keyframes[0].scale.input, keyframes[0].scale.output);
  const item0Y = useTransform(scrollYProgress, keyframes[0].y.input, keyframes[0].y.output);

  const item1Opacity = useTransform(scrollYProgress, keyframes[1].opacity.input, keyframes[1].opacity.output);
  const item1Scale = useTransform(scrollYProgress, keyframes[1].scale.input, keyframes[1].scale.output);
  const item1Y = useTransform(scrollYProgress, keyframes[1].y.input, keyframes[1].y.output);

  const item2Opacity = useTransform(scrollYProgress, keyframes[2].opacity.input, keyframes[2].opacity.output);
  const item2Scale = useTransform(scrollYProgress, keyframes[2].scale.input, keyframes[2].scale.output);
  const item2Y = useTransform(scrollYProgress, keyframes[2].y.input, keyframes[2].y.output);

  const item3Opacity = useTransform(scrollYProgress, keyframes[3].opacity.input, keyframes[3].opacity.output);
  const item3Scale = useTransform(scrollYProgress, keyframes[3].scale.input, keyframes[3].scale.output);
  const item3Y = useTransform(scrollYProgress, keyframes[3].y.input, keyframes[3].y.output);

  const itemAnimations = [
    { opacity: item0Opacity, scale: item0Scale, y: item0Y },
    { opacity: item1Opacity, scale: item1Scale, y: item1Y },
    { opacity: item2Opacity, scale: item2Scale, y: item2Y },
    { opacity: item3Opacity, scale: item3Scale, y: item3Y },
  ];

  return (
    <section ref={containerRef} id="strengths" className="relative h-[500vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-black">
        <div className="relative h-full w-full max-w-7xl px-6">
          {/* Center: Main headline (stays visible) */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
            style={{ opacity: mainOpacity, y: mainY }}
          >
            <h2 className="text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
              대모산개발단은
            </h2>
            <h2 className="mt-2 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
              <span
                className="inline-block rounded-md px-3 py-1"
                style={{
                  background:
                    "linear-gradient(135deg, #6c5ce7 0%, #4f46e5 50%, #3b82f6 100%)",
                }}
              >
                AI 개발과 교육
              </span>
              을 잘합니다
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
                  ...(isLeft ? { left: "3%" } : { right: "3%" }),
                  opacity: itemAnimations[index].opacity,
                  scale: itemAnimations[index].scale,
                  y: itemAnimations[index].y,
                }}
              >
                <div
                  className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border-2 border-white/10 lg:h-64 lg:w-64"
                  style={{
                    background:
                      "linear-gradient(135deg, #1e1e3a 0%, #16213e 100%)",
                  }}
                >
                  <span className="text-5xl font-bold text-white/30 lg:text-7xl">
                    {item.number}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white lg:text-4xl">
                  {item.label}
                </p>
                <p className="text-lg text-white/50 lg:text-xl">{item.sub}</p>
              </motion.div>
            );
          })}

          {/* Bottom award text */}
          <motion.p
            className="absolute inset-x-0 bottom-[8%] z-10 text-center text-lg font-semibold text-white/90 md:text-xl"
            style={{ opacity: awardOpacity, y: awardY }}
          >
            2025 AI분야 과학기술정보통신부 장관상 수상
          </motion.p>
        </div>
      </div>
    </section>
  );
}

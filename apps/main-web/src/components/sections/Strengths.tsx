"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ITEMS = [
  {
    number: "01",
    label: "특허보유",
    sub: "",
    side: "left" as const,
    image: "/images/goodat/good1.png",
  },
  {
    number: "02",
    label: "자격증 발급 기관",
    sub: "",
    side: "right" as const,
    image: "/images/goodat/good2.png",
  },
  {
    number: "03",
    label: "자체 브랜드 상품 개발·유통",
    sub: "",
    side: "left" as const,
    image: "/images/goodat/good4.png",
  },
  {
    number: "04",
    label: "인스타 팔로워 7k",
    sub: "",
    side: "right" as const,
    image: "/images/goodat/good3.png",
  },
];

function getItemKeyframes(index: number, total: number) {
  const slotStart = 0.08 + (index * 0.84) / total;
  const slotEnd = 0.08 + ((index + 1) * 0.84) / total;
  const slotLen = slotEnd - slotStart;

  const fadeInEnd = slotStart + slotLen * 0.2;
  const holdEnd = slotStart + slotLen * 0.5;
  const isLast = index === total - 1;

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

// 모바일용: 텍스트가 먼저 나타나고 위로 사라진 후, 아이템이 하나씩 나타났다 사라짐
function getMobileItemKeyframes(index: number, total: number) {
  // 0~0.12: 메인 텍스트 표시
  // 0.12~0.2: 메인 텍스트 사라짐
  // 0.2~1.0: 아이템 4개가 순차적으로
  const itemStart = 0.2 + (index * 0.8) / total;
  const itemEnd = 0.2 + ((index + 1) * 0.8) / total;
  const itemLen = itemEnd - itemStart;

  const fadeInEnd = itemStart + itemLen * 0.25;
  const holdEnd = itemStart + itemLen * 0.55;
  const isLast = index === total - 1;

  if (isLast) {
    return {
      opacity: { input: [itemStart, fadeInEnd], output: [0, 1] },
      y: { input: [itemStart, fadeInEnd], output: [200, 0] },
    };
  }

  const fadeOutStart = itemStart + itemLen * 0.75;

  return {
    opacity: {
      input: [itemStart, fadeInEnd, fadeOutStart, itemEnd],
      output: [0, 1, 1, 0],
    },
    y: {
      input: [itemStart, fadeInEnd, holdEnd, itemEnd],
      output: [200, 0, 0, -200],
    },
  };
}

export default function Strengths() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // === 데스크톱 애니메이션 ===
  const mainOpacity = useTransform(scrollYProgress, [0.0, 0.08], [0, 1]);
  const mainY = useTransform(scrollYProgress, [0.0, 0.08], [50, 0]);

  const keyframes = ITEMS.map((_, i) => getItemKeyframes(i, ITEMS.length));

  const item0Opacity = useTransform(scrollYProgress, keyframes[0].opacity.input, keyframes[0].opacity.output);
  const item0Y = useTransform(scrollYProgress, keyframes[0].y.input, keyframes[0].y.output);
  const item1Opacity = useTransform(scrollYProgress, keyframes[1].opacity.input, keyframes[1].opacity.output);
  const item1Y = useTransform(scrollYProgress, keyframes[1].y.input, keyframes[1].y.output);
  const item2Opacity = useTransform(scrollYProgress, keyframes[2].opacity.input, keyframes[2].opacity.output);
  const item2Y = useTransform(scrollYProgress, keyframes[2].y.input, keyframes[2].y.output);
  const item3Opacity = useTransform(scrollYProgress, keyframes[3].opacity.input, keyframes[3].opacity.output);
  const item3Y = useTransform(scrollYProgress, keyframes[3].y.input, keyframes[3].y.output);

  const itemAnimations = [
    { opacity: item0Opacity, y: item0Y },
    { opacity: item1Opacity, y: item1Y },
    { opacity: item2Opacity, y: item2Y },
    { opacity: item3Opacity, y: item3Y },
  ];

  // === 모바일 애니메이션 ===
  const mMainOpacity = useTransform(scrollYProgress, [0.0, 0.06, 0.12, 0.2], [0, 1, 1, 0]);
  const mMainY = useTransform(scrollYProgress, [0.0, 0.06, 0.12, 0.2], [40, 0, 0, -100]);

  const mKeyframes = ITEMS.map((_, i) => getMobileItemKeyframes(i, ITEMS.length));

  const mItem0Opacity = useTransform(scrollYProgress, mKeyframes[0].opacity.input, mKeyframes[0].opacity.output);
  const mItem0Y = useTransform(scrollYProgress, mKeyframes[0].y.input, mKeyframes[0].y.output);
  const mItem1Opacity = useTransform(scrollYProgress, mKeyframes[1].opacity.input, mKeyframes[1].opacity.output);
  const mItem1Y = useTransform(scrollYProgress, mKeyframes[1].y.input, mKeyframes[1].y.output);
  const mItem2Opacity = useTransform(scrollYProgress, mKeyframes[2].opacity.input, mKeyframes[2].opacity.output);
  const mItem2Y = useTransform(scrollYProgress, mKeyframes[2].y.input, mKeyframes[2].y.output);
  const mItem3Opacity = useTransform(scrollYProgress, mKeyframes[3].opacity.input, mKeyframes[3].opacity.output);
  const mItem3Y = useTransform(scrollYProgress, mKeyframes[3].y.input, mKeyframes[3].y.output);

  const mItemAnimations = [
    { opacity: mItem0Opacity, y: mItem0Y },
    { opacity: mItem1Opacity, y: mItem1Y },
    { opacity: mItem2Opacity, y: mItem2Y },
    { opacity: mItem3Opacity, y: mItem3Y },
  ];

  if (isMobile) {
    return (
      <section ref={containerRef} id="strengths" className="relative h-[400vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-white">
          <div className="relative flex h-full w-full flex-col items-center justify-center px-6">
            {/* 메인 텍스트: 나타났다가 위로 사라짐 */}
            <motion.div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
              style={{ opacity: mMainOpacity, y: mMainY }}
            >
              <h2 className="text-3xl font-black leading-tight text-[#27272a]">
                더함협동조합은
              </h2>
              <h2 className="mt-2 text-3xl font-black leading-tight text-[#27272a]">
                <span
                  className="inline-block px-3 pb-2 pt-0 text-white align-middle"
                  style={{
                    background: "linear-gradient(135deg, #6c5ce7 0%, #4f46e5 50%, #3b82f6 100%)",
                    transform: "skewX(-4deg)",
                  }}
                >
                  <span style={{ display: "inline-block", transform: "skewX(4deg)", fontSize: "0.7em" }}>
                    기획과 운영
                  </span>
                </span>
                <span className="ml-2">을 잘합니다</span>
              </h2>
            </motion.div>

            {/* 아이템: 하나씩 나타났다 위로 사라짐 */}
            {ITEMS.map((item, index) => (
              <motion.div
                key={item.number}
                className="absolute flex flex-col items-center gap-3"
                style={{
                  opacity: mItemAnimations[index].opacity,
                  y: mItemAnimations[index].y,
                }}
              >
                <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border-2 border-white/10">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.label}
                      className="h-[92%] w-[92%] object-cover object-top"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-[#27272a]/40">
                      {item.number}
                    </span>
                  )}
                </div>
                <p className="text-xl font-bold text-[#27272a]">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // === 데스크톱 레이아웃 ===
  return (
    <section ref={containerRef} id="strengths" className="relative h-[500vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-white">
        <div className="relative h-full w-full max-w-7xl px-6">
          {/* Center: Main headline */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
            style={{ opacity: mainOpacity, y: mainY }}
          >
            <h2 className="text-5xl font-black leading-tight text-[#27272a] md:text-6xl lg:text-8xl">
              더함협동조합은
            </h2>
            <h2 className="mt-2 text-5xl font-black leading-tight text-[#27272a] md:text-6xl lg:text-8xl">
              <span
                className="inline-block px-4 pb-3 pt-0 text-white align-middle"
                style={{
                  background: "linear-gradient(135deg, #6c5ce7 0%, #4f46e5 50%, #3b82f6 100%)",
                  transform: "skewX(-4deg)",
                }}
              >
                <span style={{ display: "inline-block", transform: "skewX(4deg)", fontSize: "0.7em" }}>
                  기획과 운영
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
                  className="flex h-72 w-72 items-center justify-center overflow-hidden rounded-full border-2 border-white/10 lg:h-96 lg:w-96"
                  style={{
                    background:
                      item.image ? undefined : "linear-gradient(135deg, #1e1e3a 0%, #16213e 100%)",
                  }}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.label}
                      className="h-[92%] w-[92%] object-cover object-top"
                    />
                  ) : (
                    <span className="text-6xl font-bold text-[#27272a]/40 lg:text-8xl">
                      {item.number}
                    </span>
                  )}
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

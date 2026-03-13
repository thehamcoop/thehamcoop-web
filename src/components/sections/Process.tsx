"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROCESS_CARDS = [
  {
    title: "대금을 다 내고도\n결과물을 못받았어요",
    description:
      "선금만 받고 연락이 두절되거나, 완성도가 낮은 결과물을 납품받아 사실상 처음부터 다시 개발해야 하는 상황이 발생하고 있어요.",
  },
  {
    title: "계약서에 쓰인 내용이\n전혀 지켜지지 않아요",
    description:
      "계약서에 하자보수 대응 시간과 처리 기간이 적혀 있지만, 소통도 잘 안되고 하자보수 기간이 상당히 늘어지고 있어요.",
  },
  {
    title: "개발사가 너무\n능력이 없어요",
    description:
      "기본적인 기능조차 제대로 구현하지 못하고, 일정은 계속 지연되며, 기술적 이해도가 부족해 커뮤니케이션 자체가 어려워요.",
  },
  {
    title: "계획에 없던\n비용이 자꾸만\n추가돼요",
    description:
      "처음 견적과 달리 개발 도중 추가 비용을 계속 요구하며, 범위가 명확하지 않아 비용이 눈덩이처럼 불어나고 있어요.",
  },
];

export default function Process() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROCESS_CARDS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="process"
      className="overflow-visible bg-black px-6 pt-20 pb-0 md:px-12 lg:px-20"
    >
      <h2 className="mb-12 text-3xl font-bold text-white md:text-5xl">
        대표님이 걱정하는 문제를
        <br />
        분명히 알고 있습니다
      </h2>

      {/* 모바일: 세로 배치 + 순환 애니메이션 */}
      <div className="flex flex-col gap-4 md:hidden">
        {PROCESS_CARDS.map((card, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.div
              key={index}
              animate={{
                backgroundColor: isActive ? "#6C5CE7" : "#FFFFFF",
              }}
              transition={{ duration: 0.4 }}
              className="h-90 cursor-pointer rounded-2xl p-6"
              onClick={() => setActiveIndex(index)}
            >
              <h3
                className="text-xl leading-tight font-bold"
                style={{
                  whiteSpace: "pre-line",
                  color: isActive ? "#FFFFFF" : "#000000",
                }}
              >
                {card.title}
              </h3>
              <motion.p
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 text-sm leading-relaxed text-white/80"
              >
                {card.description}
              </motion.p>
            </motion.div>
          );
        })}
      </div>

      {/* 데스크톱: 가로 아코디언 */}
      <div className="hidden h-140 gap-4 md:flex">
        {PROCESS_CARDS.map((card, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={index}
              layout
              className="relative cursor-pointer overflow-hidden rounded-2xl"
              style={{
                flex: isActive ? 3 : 1,
                backgroundColor: isActive ? "#6C5CE7" : "#FFFFFF",
                color: isActive ? "#FFFFFF" : "#000000",
              }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => setActiveIndex(index)}
            >
              <div className="flex h-full flex-col justify-between p-8">
                <h3
                  className="text-2xl leading-tight font-bold md:text-3xl"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {card.title}
                </h3>

                <AnimatePresence>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                      className="mt-auto text-base leading-relaxed opacity-90 md:text-lg"
                    >
                      {card.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 걱정 마세요 배너 - 섹션 경계에 걸침 */}
      <div className="relative z-10 mt-16 flex items-center justify-center translate-y-1/2">
        <div
          className="inline-block rounded-2xl bg-[#6C5CE7] px-16 py-8 text-center"
          style={{ transform: "rotate(-3deg)" }}
        >
          <span className="text-4xl font-bold text-white md:text-6xl">
            걱정 마세요!
          </span>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const PARTNERS = [
  "FIRA | 한국수산자원공단",
  "KORAMCO",
  "Fast campus",
  "과학기술정보통신부",
  "LOTTE WORLD",
  "홀트아동복지회",
];

// 끊김 없는 루프를 위해 리스트 복제
const duplicated = [...PARTNERS, ...PARTNERS];

function LogoColumn({
  direction,
  align = "left",
}: {
  direction: "down" | "up";
  align?: "left" | "right";
}) {
  const itemH = 120; // 각 로고 아이템 높이(px)
  const totalH = PARTNERS.length * itemH;

  const yFrom = direction === "down" ? 0 : -totalH;
  const yTo = direction === "down" ? -totalH : 0;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        className="flex flex-col"
        animate={{ y: [yFrom, yTo] }}
        transition={{
          y: {
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {duplicated.map((name, i) => (
          <div
            key={i}
            className={`flex h-30 items-center px-6 text-lg font-semibold text-white opacity-50 ${align === "right" ? "justify-end text-right" : ""}`}
          >
            {name}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Partners() {
  return (
    <section className="relative flex h-screen items-center overflow-hidden bg-black">
      {/* 왼쪽 로고 열 */}
      <div className="absolute top-0 bottom-0 left-0 w-1/4">
        <LogoColumn direction="down" />
      </div>

      {/* 중앙 텍스트 */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-4 text-2xl font-bold text-[#6C5CE7] md:text-4xl">
          대모산개발단은 지금
        </p>
        <h2 className="text-4xl leading-tight font-bold text-white md:text-6xl">
          외주 개발과 IT 교육에서
          <br />
          많은 협력사와 프로젝트를
          <br />
          진행 중입니다
        </h2>
      </div>

      {/* 오른쪽 로고 열 */}
      <div className="absolute top-0 right-0 bottom-0 w-1/4">
        <LogoColumn direction="up" align="right" />
      </div>
    </section>
  );
}

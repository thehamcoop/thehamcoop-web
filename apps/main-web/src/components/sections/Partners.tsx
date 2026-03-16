"use client";

import { motion } from "framer-motion";

const ALL_PARTNERS = [
  "/images/partners/part1 1.svg",
  "/images/partners/part2 1.svg",
  "/images/partners/part3 1.svg",
  "/images/partners/part4 1.svg",
  "/images/partners/part5 1.svg",
  "/images/partners/part6 1.svg",
  "/images/partners/part7 1.svg",
  "/images/partners/part8 1.svg",
  "/images/partners/part9 1.svg",
  "/images/partners/part10 1.svg",
  "/images/partners/part11 1.svg",
  "/images/partners/part12 1.svg",
  "/images/partners/part13 1.svg",
  "/images/partners/part14 1.svg",
  "/images/partners/part15 1.svg",
  "/images/partners/part16 1.svg",
  "/images/partners/part17 1.svg",
  "/images/partners/part18 1.svg",
  "/images/partners/part19 1.svg",
  "/images/partners/part20 1.svg",
  "/images/partners/part21 1.svg",
  "/images/partners/part22 1.svg",
  "/images/partners/part23 1.svg",
  "/images/partners/part24 1.svg",
  "/images/partners/part25 1.svg",
  "/images/partners/part26 1.svg",
  "/images/partners/part27 1.svg",
  "/images/partners/part28 1.svg",
];

// 왼쪽/오른쪽 열에 반씩 배분
const LEFT_PARTNERS = ALL_PARTNERS.slice(0, 14);
const RIGHT_PARTNERS = ALL_PARTNERS.slice(14);

function LogoColumn({
  partners,
  direction,
  align = "left",
}: {
  partners: string[];
  direction: "down" | "up";
  align?: "left" | "right";
}) {
  const duplicated = [...partners, ...partners];
  const itemH = 120;
  const totalH = partners.length * itemH;

  const yFrom = direction === "down" ? 0 : -totalH;
  const yTo = direction === "down" ? -totalH : 0;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        className="flex flex-col"
        animate={{ y: [yFrom, yTo] }}
        transition={{
          y: {
            duration: 45,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {duplicated.map((src, i) => (
          <div
            key={i}
            className={`flex h-30 items-center px-6 ${align === "right" ? "justify-end" : ""}`}
          >
            <img src={src} alt="" className="h-14 brightness-0 invert opacity-50" />
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
      <div className="absolute top-0 bottom-0 left-4 w-1/4">
        <LogoColumn partners={LEFT_PARTNERS} direction="down" />
      </div>

      {/* 중앙 텍스트 */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-4 text-2xl font-bold text-[#6C5CE7] md:text-4xl">
          더함협동조합은 지금
        </p>
        <h2 className="text-4xl leading-tight font-bold text-white md:text-6xl">
          대학교육과 제품 개발 분야에서
          <br />
          많은 협력사와 프로젝트를
          <br />
          진행 중입니다
        </h2>
      </div>

      {/* 오른쪽 로고 열 */}
      <div className="absolute top-0 right-4 bottom-0 w-1/4">
        <LogoColumn partners={RIGHT_PARTNERS} direction="up" align="right" />
      </div>
    </section>
  );
}

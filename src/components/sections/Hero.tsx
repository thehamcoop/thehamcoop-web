"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-start justify-center overflow-hidden bg-text-primary pt-32 md:pt-40">
      {/* 배경 빗각 THEHAMCOOP 텍스트 */}
      <div
        className="pointer-events-none absolute top-[50%] left-0 right-0 flex justify-center"
        aria-hidden="true"
      >
        <span
          className="whitespace-nowrap text-[14.8vw] leading-none font-black text-[#5BC8C8] select-none"
          style={{ transform: "rotate(-10deg)" }}
        >
          THEHAMCOOP
        </span>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* 소제목 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-base font-medium text-black md:text-lg"
        >
          무책임한 업체들 때문에 많이 힘드셨죠?
        </motion.p>

        {/* 메인 타이틀 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-10 text-3xl leading-tight font-bold text-black md:text-5xl lg:text-6xl"
        >
          창업·제품 기획·교육·판매·투자까지
          <br />
          전문가와 함께 진짜 비즈니스를 시작하세요
        </motion.h1>

        {/* CTA 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-row gap-4"
        >
          <a
            href="#about"
            className="rounded-full border bg-white px-8 py-4 text-base font-semibold transition-colors hover:bg-gray-50"
            style={{ borderColor: "#2DB7C1", color: "#2DB7C1" }}
          >
            회사 소개서
          </a>
          <a
            href="#contact"
            className="rounded-full bg-linear-to-r from-accent-purple to-accent-blue px-8 py-4 text-base font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-accent-purple/25"
          >
            상담하기
          </a>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { PORTFOLIO_ITEMS } from "@/constants/site";

const DESKTOP_TEXT_WIDTH = 580;
const DESKTOP_CARD_WIDTH = 500;

function PortfolioCard({ item }: { item: (typeof PORTFOLIO_ITEMS)[number] }) {
  return (
    <div
      className="shrink-0 flex h-full w-screen flex-col md:h-screen md:w-125"
      style={{ backgroundColor: item.bgColor }}
    >
      {/* Mockup area */}
      <div className="group relative flex h-[55%] flex-col items-center justify-center overflow-hidden p-8">
        <span className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[80px] font-black leading-none text-white opacity-10 md:text-[120px]">
          {item.title}
        </span>
        <div className="relative z-10 w-52 md:w-85">
          <div className="rounded-t-lg border-[3px] border-gray-700 bg-gray-900 p-1">
            <div className="aspect-16/10 overflow-hidden rounded-sm bg-gray-200">
              <div className="h-full w-full bg-white" />
            </div>
          </div>
          <div className="mx-auto -ml-[5%] h-3 w-[110%] rounded-b-xl bg-gray-700" />
          <div className="mx-auto h-1 w-[30%] rounded-b bg-gray-500" />
        </div>

        <Link
          href={`/portfolio/${item.slug}`}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black">
            포트폴리오 보기
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 12l4-4-4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>

      <div className="px-6 pb-12 pt-6 text-center md:px-8">
        <h3 className="text-3xl font-bold tracking-wide text-white md:text-5xl">
          {item.title}
        </h3>
        <p className="mt-4 text-base text-white/80 md:text-lg">
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function calc() {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        const cw = window.innerWidth;
        const totalCardsWidth = PORTFOLIO_ITEMS.length * cw;
        const distance = totalCardsWidth - window.innerWidth;
        setScrollDistance(Math.max(0, distance));
      } else {
        const totalContentWidth =
          DESKTOP_TEXT_WIDTH + PORTFOLIO_ITEMS.length * DESKTOP_CARD_WIDTH;
        const distance = totalContentWidth - window.innerWidth;
        setScrollDistance(Math.max(0, distance));
      }
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  const scrollMultiplier = 2;
  const sectionHeight = `calc(100vh + ${scrollDistance * scrollMultiplier}px)`;

  if (isMobile) {
    return (
      <section
        id="portfolio"
        ref={containerRef}
        className="relative"
        style={{ height: sectionHeight }}
      >
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-white">
          {/* 상단: 제목 + 전체보기 */}
          <div className="flex shrink-0 items-start justify-between px-5 pt-20 pb-4">
            <h2 className="text-2xl leading-tight font-bold text-black">
              대기업이
              <br />
              대모산개발단을
              <br />
              찾는 이유
            </h2>
            <a
              href="#portfolio-detail"
              className="mt-1 inline-flex shrink-0 items-center gap-1 rounded-full bg-[#3b2fc0] px-4 py-2 text-xs font-medium text-white"
            >
              전체보기
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 12l4-4-4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* 하단: 가로 스크롤 카드 */}
          <motion.div
            className="flex min-h-0 flex-1 items-stretch"
            style={{ x }}
          >
            {PORTFOLIO_ITEMS.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // 데스크톱 레이아웃
  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="relative"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 flex h-screen overflow-hidden">
        {/* Left fixed text area */}
        <div
          className="relative z-20 shrink-0 flex flex-col justify-center bg-white px-12 lg:px-16"
          style={{ width: DESKTOP_TEXT_WIDTH }}
        >
          <h2 className="text-5xl leading-tight font-bold text-black lg:text-6xl">
            대기업이
            <br />
            대모산개발단을
            <br />
            찾는 이유
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            설립 1년 미만,
            <br />
            대기업 포함 수십 건의 프로젝트 성공
          </p>
          <div className="mt-8">
            <a
              href="#portfolio-detail"
              className="inline-flex items-center gap-2 rounded-full bg-[#3b2fc0] px-6 py-3 text-sm font-medium text-white transition-shadow hover:shadow-lg hover:shadow-[#3b2fc0]/30"
            >
              포트폴리오 전체보기
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="ml-1"
              >
                <path
                  d="M6 12l4-4-4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Right scrollable cards */}
        <motion.div
          className="absolute top-0 left-0 z-10 flex h-screen"
          style={{ x }}
        >
          <div className="shrink-0" style={{ width: DESKTOP_TEXT_WIDTH }} />
          {PORTFOLIO_ITEMS.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

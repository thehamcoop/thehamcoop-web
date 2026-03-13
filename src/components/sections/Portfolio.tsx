"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PORTFOLIO_ITEMS } from "@/constants/site";

const TEXT_AREA_WIDTH = 500;
const CARD_WIDTH = 500;

function PortfolioCard({
  item,
}: {
  item: (typeof PORTFOLIO_ITEMS)[number];
}) {
  return (
    <div
      className="shrink-0 h-screen flex flex-col"
      style={{ backgroundColor: item.bgColor, width: CARD_WIDTH }}
    >
      {/* Mockup area */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden p-8">
        <span className="absolute inset-0 flex items-center justify-center text-[120px] font-black opacity-10 text-white select-none leading-none">
          {item.title}
        </span>
        <div className="relative z-10 w-85">
          <div className="rounded-t-lg border-[3px] border-gray-700 bg-gray-900 p-1">
            <div className="aspect-16/10 rounded-sm bg-gray-200 overflow-hidden">
              <div className="h-full w-full bg-white" />
            </div>
          </div>
          <div className="mx-auto h-3 w-[110%] -ml-[5%] rounded-b-xl bg-gray-700" />
          <div className="mx-auto h-1 w-[30%] rounded-b bg-gray-500" />
        </div>
      </div>

      <div className="px-8 pb-12 pt-4 text-center">
        <h3 className="text-2xl font-bold text-white tracking-wide">
          {item.title}
        </h3>
        <p className="mt-2 text-sm text-white/80">{item.subtitle}</p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    function calc() {
      const totalContentWidth =
        TEXT_AREA_WIDTH + PORTFOLIO_ITEMS.length * CARD_WIDTH;
      // How far we need to scroll so the last card's right edge meets the viewport's right edge
      const distance = totalContentWidth - window.innerWidth;
      setScrollDistance(Math.max(0, distance));
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

  // Container height = 1 screen (sticky) + scrollDistance for the horizontal travel
  const sectionHeight = `calc(100vh + ${scrollDistance}px)`;

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="relative"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen flex overflow-hidden">
        {/* Left fixed text area */}
        <div className="relative z-20 shrink-0 flex flex-col justify-center px-12 lg:px-16 bg-bg-primary" style={{ width: TEXT_AREA_WIDTH }}>
          <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
            대기업이
            <br />
            대모산개발단을
            <br />
            찾는 이유
          </h2>
          <p className="mt-6 text-text-secondary leading-relaxed">
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
          <div className="shrink-0" style={{ width: TEXT_AREA_WIDTH }} />
          {PORTFOLIO_ITEMS.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

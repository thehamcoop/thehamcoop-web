"use client";

import { useRef, useState, useEffect } from "react";
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
      {/* Image area */}
      <div className="relative flex h-[55%] items-center justify-center overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex h-[45%] flex-col items-center px-6 pt-10 text-center md:px-8 md:pt-14">
        <h3 className="text-lg font-bold tracking-wide text-white md:text-[1.65rem]">
          {item.title}
        </h3>
        <p className="mt-3 whitespace-pre-line text-sm text-white/80 md:text-base">
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

  const sectionHeight = `calc(100vh + ${scrollDistance}px)`;

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
              많은 기업들이
              <br />
              더함협동조합을
              <br />
              찾는 이유
            </h2>
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
            많은 기업들이
            <br />
            더함협동조합을
            <br />
            찾는 이유
          </h2>
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

"use client";

import { useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const VIDEOS = [
  {
    title: "2025 IoT RE:DESIGN THON (인터뷰포함)",
    image: "/images/youtubes/youtube1.png",
    url: "https://www.youtube.com/watch?v=_Q26osPjOXY&t=3s",
  },
  {
    title: "스케치영상ㅣ RE-UP Cycle Thon(GREEN TECH MAKER)",
    image: "/images/youtubes/youtube2.png",
    url: "https://www.youtube.com/watch?v=tvZnXH1nAUA&t=35s",
  },
  {
    title: "[한국항공대학교 대학일자리플러스센터] 2025 창업 아이디어 경진대회",
    image: "/images/youtubes/youtube3.png",
    url: "https://www.youtube.com/watch?v=YzgohIBbHxo",
  },
  {
    title: "2025 서울과학기술대학교 제품 개발 패키지",
    image: "/images/youtubes/youtube4.png",
    url: "https://www.youtube.com/watch?v=J0MJuTj3rs8",
  },
  {
    title: "2025 충청권 ICT이노베이션스퀘어 개발 역량 강화 멘토링 | (주)페어엑스 이범준 대표 강연",
    image: "/images/youtubes/youtube5.png",
    url: "https://www.youtube.com/watch?v=NmAuVE1Qfpg",
  },
];

const DRAG_THRESHOLD = 50;

export default function Channel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const dragX = useMotionValue(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  const handleDragEnd = () => {
    const x = dragX.get();
    if (x < -DRAG_THRESHOLD) {
      handleNext();
    } else if (x > DRAG_THRESHOLD) {
      handlePrev();
    }
  };

  const getVisibleIndices = () => {
    const prev = (activeIndex - 1 + VIDEOS.length) % VIDEOS.length;
    const next = (activeIndex + 1) % VIDEOS.length;
    return [prev, activeIndex, next];
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section className="min-h-screen bg-white px-6 py-24 md:px-12 lg:px-20">
      {/* 상단: 제목 + 버튼 */}
      <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <h2 className="text-3xl leading-tight font-bold text-black md:text-5xl">
          더합협동조합의 전문성을
          <br />
          유튜브에서 확인해 보세요
        </h2>
        <a
          href="https://www.youtube.com/@thehamcoop"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-3xl px-7 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: "linear-gradient(to right, #2DB7C1, #1A8A91)" }}
        >
          유튜브 채널 바로가기 →
        </a>
      </div>

      {/* 중앙: 카드 슬라이더 (드래그 가능) */}
      <motion.div
        className="relative flex cursor-grab items-center justify-center gap-6 overflow-hidden py-8 select-none active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: dragX }}
        onDragEnd={handleDragEnd}
      >
        {visibleIndices.map((videoIdx, pos) => {
          const video = VIDEOS[videoIdx];
          const isCenter = pos === 1;

          return (
            <motion.div
              key={`${activeIndex}-${pos}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isCenter ? 1 : 0.4,
                scale: isCenter ? 1 : 0.9,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`shrink-0 ${isCenter ? "w-full max-w-md" : "hidden w-full max-w-md md:block"}`}
            >
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                style={{ pointerEvents: isCenter ? "auto" : "none" }}
              >
                {/* 썸네일 */}
                <div className="aspect-video overflow-hidden rounded-3xl">
                  <img
                    src={video.image}
                    alt={video.title}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
                {/* 제목 */}
                <p className="mt-4 text-sm leading-relaxed text-gray-700 md:text-base">
                  {video.title}
                </p>
              </a>
            </motion.div>
          );
        })}
      </motion.div>

      {/* 하단: 좌우 버튼 */}
      <div className="mt-12 flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-300 text-xl text-gray-600 transition-colors hover:border-[#6C5CE7] hover:text-[#6C5CE7]"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-300 text-xl text-gray-600 transition-colors hover:border-[#6C5CE7] hover:text-[#6C5CE7]"
        >
          &gt;
        </button>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const VIDEOS = [
  {
    title: "AI로 4분 만에 광고 여러 개를 자동 생성하는 방법 (왕초보도 가능)",
    thumbnail: "이 영상보다 더 자세한\nAI 광고 자동화 영상은 없습니다",
    color: "#1a1a2e",
  },
  {
    title: "언제까지 '사람'의 시간과 맞바꾸실 건가요?",
    thumbnail: "직원 5명 몫,\n제가 혼자 합니다",
    color: "#16213e",
  },
  {
    title: '"돈 버는 것 외엔 의미 없습니다" | 대모산개발단 CEO 고성현',
    thumbnail: "성공은 운을 기다리지 않습니다\n우리는 직접 만들었습니다",
    color: "#0f3460",
  },
  {
    title: "바이브코딩으로 실제 서비스 런칭하기",
    thumbnail: "코딩 없이\n서비스 만들기",
    color: "#1a1a2e",
  },
  {
    title: "스타트업 MVP, 2주 만에 완성하는 법",
    thumbnail: "빠르게 만들고\n빠르게 검증하세요",
    color: "#16213e",
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
          className="shrink-0 rounded-full bg-[#6C5CE7] px-8 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90"
        >
          유튜브 채널 바로가기 &gt;
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
              {/* 썸네일 */}
              <div
                className="pointer-events-none flex aspect-video items-center justify-center rounded-3xl p-8"
                style={{ backgroundColor: video.color }}
              >
                <p
                  className="text-center text-xl font-bold text-white md:text-2xl"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {video.thumbnail}
                </p>
              </div>
              {/* 제목 */}
              <p className="pointer-events-none mt-4 text-sm leading-relaxed text-gray-700 md:text-base">
                {video.title}
              </p>
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

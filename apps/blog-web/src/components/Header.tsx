"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex items-center justify-between px-2 py-4 md:px-4 lg:px-6 xl:px-8 2xl:px-10">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-4 text-xl font-bold">
            <img
              src="/images/thehamcoop-logo.svg"
              alt="logo"
              className="h-8 w-8"
            />
            <div className="flex flex-col items-center leading-tight">
              <span style={{ color: "#164761" }}>더함 협동조합</span>
              <span
                className="text-[0.60rem] font-semibold tracking-wide"
                style={{ color: "#164761" }}
              >
                THEHAM COOPERATIVE
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900"
            >
              블로그
            </Link>
          </nav>
        </div>

        {/* 오른쪽: 검색 + 문의하기 */}
        <div className="hidden items-center gap-5 md:flex">
          {/* 검색 영역 */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "15rem", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="게시글 검색..."
                  className="mr-3 rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700 outline-none transition-colors focus:border-gray-300 focus:bg-white"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }
                  }}
                />
              )}
            </AnimatePresence>
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isSearchOpen) setSearchQuery("");
              }}
              className="flex items-center justify-center rounded-md p-2 text-gray-400 transition-all hover:bg-gray-50 hover:text-gray-600"
              aria-label="검색"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </div>

          {/* 문의하기 버튼 */}
          <a
            href="https://www.thehamcoop.kr/consultation"
            className="rounded-3xl px-5 py-2 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              background: "linear-gradient(to right, #2DB7C1, #1A8A91)",
            }}
          >
            문의하기
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="메뉴 열기"
        >
          <span
            className={`h-0.5 w-6 bg-gray-900 transition-transform ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-gray-900 transition-opacity ${isMenuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-gray-900 transition-transform ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 bg-white md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                블로그
              </Link>
              <a
                href="https://www.thehamcoop.kr/consultation"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                문의하기
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

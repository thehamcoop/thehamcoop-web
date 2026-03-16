"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex items-center justify-between px-4 py-4 md:px-8 lg:px-12">
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

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900"
            >
              블로그
            </Link>
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://www.thehamcoop.kr"
            className="rounded-3xl border px-5 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
            style={{ borderColor: "#2DB7C1", color: "#2DB7C1" }}
          >
            홈페이지
          </a>
          <a
            href="https://www.thehamcoop.kr/consultation"
            className="rounded-3xl px-5 py-2 text-sm font-medium text-white transition-shadow hover:shadow-lg"
            style={{
              background: "linear-gradient(to right, #2DB7C1, #1A8A91)",
            }}
          >
            상담 신청
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
                href="https://www.thehamcoop.kr"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                홈페이지
              </a>
              <a
                href="https://www.thehamcoop.kr/consultation"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                상담 신청
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

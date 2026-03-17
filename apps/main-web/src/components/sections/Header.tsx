"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE } from "@/constants/site";

const BLOG_URL = process.env.NEXT_PUBLIC_BLOG_URL || "http://localhost:3001";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex items-center justify-between px-2 py-4 md:px-4 lg:px-6 xl:px-8 2xl:px-10">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-4 text-xl font-bold">
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
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900"
            >
              블로그
            </a>
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/files/theham-profile.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-3xl border px-5 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
            style={{ borderColor: "#2DB7C1", color: "#2DB7C1" }}
          >
            회사 소개
          </a>
          <a
            href="/consultation"
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
              <a
                href={BLOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                블로그
              </a>
              <a
                href="/files/theham-profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className=" text-gray-600 transition-colors hover:text-gray-900"
              >
                회사 소개
              </a>
              <a
                href="/consultation"
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

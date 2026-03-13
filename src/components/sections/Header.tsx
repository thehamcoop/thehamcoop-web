"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE } from "@/constants/site";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border-default/50 bg-bg-primary/80 backdrop-blur-lg">
      <div className="mx-auto flex items-center justify-between px-6 py-4 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
        <a href="#" className="text-xl font-bold">
          <span className="gradient-text">{SITE.name}</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-lg bg-linear-to-r from-accent-purple to-accent-blue px-5 py-2 text-sm font-medium text-white transition-shadow hover:shadow-lg hover:shadow-accent-purple/25"
          >
            상담 신청
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="메뉴 열기"
        >
          <span
            className={`h-0.5 w-6 bg-text-primary transition-transform ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-text-primary transition-opacity ${isMenuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-text-primary transition-transform ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
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
            className="border-t border-border-default bg-bg-primary md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

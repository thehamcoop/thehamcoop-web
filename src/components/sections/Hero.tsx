"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/common/SectionContainer";
import Button from "@/components/common/Button";
import { HERO } from "@/constants/site";

export default function Hero() {
  return (
    <SectionContainer className="flex min-h-screen items-center pt-20">
      <div className="flex w-full flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent-purple/30 bg-accent-purple/10 px-4 py-2 text-sm text-accent-purple"
        >
          <span className="h-2 w-2 rounded-full bg-accent-purple" />
          {HERO.badge}
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 text-3xl font-bold leading-tight md:text-5xl lg:text-6xl"
        >
          큰 돈 내고 개발 외주 맡기기
          <br />
          <span className="gradient-text">불안하셨죠?</span>
        </motion.h1>

        {/* Sub headline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-12 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl"
        >
          2026 AI 과기부장관상 수상 개발팀과
          <br className="hidden sm:block" />
          진짜 비즈니스를 시작하세요
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Button variant="primary" size="lg" href="#contact">
            {HERO.cta.primary}
          </Button>
          <Button variant="outline" size="lg" href="#portfolio">
            {HERO.cta.secondary}
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-text-muted"
          >
            <span className="text-xs">Scroll Down</span>
            <div className="h-8 w-5 rounded-full border border-text-muted p-1">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2 w-1.5 rounded-full bg-text-muted"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}

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
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-purple/30 bg-accent-purple/10 px-4 py-2 text-sm text-accent-purple"
        >
          <span className="h-2 w-2 rounded-full bg-accent-purple" />
          {HERO.badge}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 whitespace-pre-line text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
        >
          {HERO.title.split("\n").map((line, i) => (
            <span key={i}>
              {i === 1 ? <span className="gradient-text">{line}</span> : line}
              {i === 0 && <br />}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-10 max-w-2xl text-lg text-text-secondary md:text-xl"
        >
          {HERO.subtitle}
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

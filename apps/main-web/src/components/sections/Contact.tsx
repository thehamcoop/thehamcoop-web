"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/common/SectionContainer";
import Button from "@/components/common/Button";

export default function Contact() {
  return (
    <SectionContainer id="contact" className="py-40">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            제대로 잘, 개발할 자신 있습니다
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-lg text-white/70">
            불필요한 시행착오 없이 가장 빠른 프로세스로 완성합니다
          </p>
          <Button variant="primary" size="lg">
            무료 상담 신청
          </Button>
        </motion.div>
      </div>
    </SectionContainer>
  );
}

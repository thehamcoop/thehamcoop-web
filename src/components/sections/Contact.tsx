"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/common/SectionContainer";
import Button from "@/components/common/Button";

export default function Contact() {
  return (
    <SectionContainer id="contact">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-2 text-sm font-medium text-accent-blue">
            Contact Us
          </p>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            프로젝트를 <span className="gradient-text">시작</span>해 보세요
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-text-secondary">
            어떤 프로젝트든 부담 없이 상담해 주세요. 비즈니스 목표에 맞는 최적의
            솔루션을 제안드리겠습니다.
          </p>
          <Button variant="primary" size="lg">
            무료 상담 신청하기
          </Button>
        </motion.div>
      </div>
    </SectionContainer>
  );
}

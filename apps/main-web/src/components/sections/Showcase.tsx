"use client";

import { motion } from "framer-motion";
import SectionContainer from "@/components/common/SectionContainer";
import RotatingText from "@/components/common/RotatingText";

export default function Showcase() {
  return (
    <SectionContainer className="flex min-h-screen items-center bg-bg-secondary">
      <div className="flex w-full flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <RotatingText
            prefix="DE_"
            words={["CHEAT", "MODEV", "FAILURE"]}
            descriptions={[
              "부풀림 없이 정직한 견적으로 클라이언트가 손해보지 않는 구조를 만듭니다",
              "결과물은 클라이언트의 비즈니스 성과를 만들어 냅니다",
              "애매한 약속 대신 명확한 범위와 산출물로 변수를 제거합니다",
            ]}
            interval={3000}
            className="text-6xl font-extrabold tracking-tight md:text-8xl lg:text-9xl xl:text-[10rem]"
            descriptionClassName="text-base text-text-secondary md:text-lg lg:text-xl"
          />
        </motion.div>
      </div>
    </SectionContainer>
  );
}

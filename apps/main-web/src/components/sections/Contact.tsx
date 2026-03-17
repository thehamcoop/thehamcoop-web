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
          <h2 className="mb-12 text-4xl font-bold text-white md:text-6xl">
            함께 할 준비가 되어 있습니다.
          </h2>

          <Button variant="primary" size="lg" href="/consultation">
            문의사항 작성하기
          </Button>
        </motion.div>
      </div>
    </SectionContainer>
  );
}

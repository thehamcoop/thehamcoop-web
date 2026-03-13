"use client";

import AnimatedSection from "@/components/common/AnimatedSection";
import SectionContainer from "@/components/common/SectionContainer";
import { STRENGTHS } from "@/constants/site";

export default function Strengths() {
  return (
    <SectionContainer id="strengths" className="bg-bg-secondary">
      <AnimatedSection>
        <p className="mb-2 text-sm font-medium text-accent-blue">
          Why DemoDev
        </p>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          데모데브를 선택하는 <span className="gradient-text">이유</span>
        </h2>
        <p className="mb-12 max-w-xl text-text-secondary">
          검증된 실력과 신뢰를 바탕으로 최고의 결과를 만듭니다.
        </p>
      </AnimatedSection>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {STRENGTHS.map((item, index) => (
          <AnimatedSection key={item.number} delay={index * 0.1}>
            <div className="rounded-xl border border-border-default bg-bg-card p-6 transition-all duration-300 hover:border-accent-blue/50">
              <span className="gradient-text text-3xl font-bold">
                {item.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </SectionContainer>
  );
}

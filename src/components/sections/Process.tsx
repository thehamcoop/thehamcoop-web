"use client";

import AnimatedSection from "@/components/common/AnimatedSection";
import SectionContainer from "@/components/common/SectionContainer";
import { PROCESS_STEPS } from "@/constants/site";

export default function Process() {
  return (
    <SectionContainer id="process">
      <AnimatedSection>
        <p className="mb-2 text-sm font-medium text-accent-cyan">Process</p>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          프로젝트 <span className="gradient-text">진행 과정</span>
        </h2>
        <p className="mb-12 max-w-xl text-text-secondary">
          체계적인 프로세스로 프로젝트를 성공적으로 이끕니다.
        </p>
      </AnimatedSection>

      <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Connecting line */}
        <div className="absolute top-12 right-0 left-0 hidden h-px bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan lg:block" />

        {PROCESS_STEPS.map((step, index) => (
          <AnimatedSection key={step.step} delay={index * 0.15}>
            <div className="relative rounded-xl border border-border-default bg-bg-card p-6 text-center">
              {/* Step number circle */}
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-accent-purple to-accent-blue text-lg font-bold text-white">
                {step.step}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </SectionContainer>
  );
}

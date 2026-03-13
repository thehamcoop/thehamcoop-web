"use client";

import Image from "next/image";
import AnimatedSection from "@/components/common/AnimatedSection";
import SectionContainer from "@/components/common/SectionContainer";
import { PORTFOLIO_ITEMS } from "@/constants/site";

export default function Portfolio() {
  return (
    <SectionContainer id="portfolio">
      <AnimatedSection>
        <p className="mb-2 text-sm font-medium text-accent-purple">Portfolio</p>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          우리가 만든 <span className="gradient-text">성과</span>
        </h2>
        <p className="mb-12 max-w-xl text-text-secondary">
          다양한 산업 분야에서 비즈니스 성과를 만들어온 프로젝트입니다.
        </p>
      </AnimatedSection>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PORTFOLIO_ITEMS.map((item, index) => (
          <AnimatedSection key={item.id} delay={index * 0.1}>
            <div className="group cursor-pointer overflow-hidden rounded-xl border border-border-default bg-bg-card transition-all duration-300 hover:border-accent-purple/50 hover:shadow-lg hover:shadow-accent-purple/5">
              {/* Image placeholder */}
              <div className="relative aspect-video overflow-hidden bg-bg-tertiary">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Fallback gradient when image is missing */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-accent-blue/20" />
              </div>
              {/* Content */}
              <div className="p-5">
                <span className="text-xs text-accent-purple">{item.category}</span>
                <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-text-secondary">
                  {item.description}
                </p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </SectionContainer>
  );
}

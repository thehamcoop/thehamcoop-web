"use client";

import AnimatedSection from "@/components/common/AnimatedSection";
import SectionContainer from "@/components/common/SectionContainer";
import { TEAM_MEMBERS } from "@/constants/site";

export default function Team() {
  return (
    <SectionContainer id="team" className="bg-bg-secondary">
      <AnimatedSection>
        <p className="mb-2 text-sm font-medium text-accent-purple">Team</p>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          함께하는 <span className="gradient-text">팀</span>
        </h2>
        <p className="mb-12 max-w-xl text-text-secondary">
          각 분야 최고의 전문가들이 프로젝트를 이끕니다.
        </p>
      </AnimatedSection>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM_MEMBERS.map((member, index) => (
          <AnimatedSection key={member.name} delay={index * 0.1}>
            <div className="flex items-center gap-4 rounded-xl border border-border-default bg-bg-card p-5 transition-all duration-300 hover:border-accent-purple/50">
              {/* Avatar placeholder */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-purple to-accent-blue text-lg font-bold text-white">
                {member.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-accent-purple">{member.role}</p>
                <p className="text-xs text-text-muted">{member.credential}</p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </SectionContainer>
  );
}

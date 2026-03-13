export const SITE = {
  name: "DemoDev",
  title: "DemoDev - Creative Development Agency",
  description: "비즈니스 성과를 만드는 개발 파트너",
  url: "https://www.demodev.io",
} as const;

export const NAV_LINKS = [
  { label: "포트폴리오", href: "#portfolio" },
  { label: "강점", href: "#strengths" },
  { label: "프로세스", href: "#process" },
  { label: "팀", href: "#team" },
  { label: "문의하기", href: "#contact" },
] as const;

export const HERO = {
  badge: "2025 AI 과학기술정보통신부 장관상 수상",
  title: "비즈니스 성과를 만드는\n개발 파트너",
  subtitle:
    "단순한 외주가 아닌, 비즈니스 성과를 함께 고민하는 개발 파트너십을 제공합니다.",
  cta: {
    primary: "상담 신청하기",
    secondary: "회사 소개서 보기",
  },
} as const;

export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "LOTTEWORLD",
    subtitle: "롯데월드 디지털 경험 혁신",
    image: "/images/portfolio/lotte-world.jpg",
    bgColor: "#1a1a2e",
  },
  {
    id: 2,
    title: "HOLT",
    subtitle: "홀트아동복지회 플랫폼 리뉴얼",
    image: "/images/portfolio/holt.jpg",
    bgColor: "#2d6a4f",
  },
  {
    id: 3,
    title: "GOMPYO",
    subtitle: "MZ세대 타겟 브랜드 디지털 전환",
    image: "/images/portfolio/gompyo.jpg",
    bgColor: "#f5f0e8",
  },
  {
    id: 4,
    title: "FIRA",
    subtitle: "글로벌 패션 브랜드 이커머스",
    image: "/images/portfolio/fira.jpg",
    bgColor: "#0d1b2a",
  },
  {
    id: 5,
    title: "KORAMCO",
    subtitle: "코람코 내부 ERP 시스템",
    image: "/images/portfolio/koramco.jpg",
    bgColor: "#8b1a1a",
  },
  {
    id: 6,
    title: "AIM",
    subtitle: "에임 AOS · IOS 앱 및 백오피스",
    image: "/images/portfolio/aim.jpg",
    bgColor: "#7ecfc0",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "상담 & 기획",
    description: "비즈니스 목표를 파악하고 최적의 개발 전략을 설계합니다.",
  },
  {
    step: "02",
    title: "디자인",
    description: "사용자 경험 중심의 UI/UX 디자인을 진행합니다.",
  },
  {
    step: "03",
    title: "개발",
    description: "최신 기술 스택으로 안정적인 서비스를 구현합니다.",
  },
  {
    step: "04",
    title: "런칭 & 운영",
    description: "배포 후에도 지속적인 유지보수와 성과 분석을 제공합니다.",
  },
] as const;

export const STRENGTHS = [
  {
    number: "01",
    title: "정부 장관상 수상",
    description: "AI 과학기술정보통신부 장관상 수상으로 기술력을 인정받았습니다.",
  },
  {
    number: "02",
    title: "교육 플랫폼 1위",
    description: "패스트캠퍼스 등 주요 교육 플랫폼에서 강의 랭킹 1위를 달성했습니다.",
  },
  {
    number: "03",
    title: "대기업 파트너십",
    description: "롯데, 코람코 등 대기업과의 파트너십을 통해 검증된 실력을 보유하고 있습니다.",
  },
  {
    number: "04",
    title: "자체 SaaS 제품",
    description: "자체 SaaS 제품을 개발하여 제품 개발 역량을 갖추고 있습니다.",
  },
  {
    number: "05",
    title: "YouTube 채널 운영",
    description: "개발 관련 유튜브 채널을 운영하며 지식을 공유합니다.",
  },
] as const;

export const TEAM_MEMBERS = [
  { name: "김대표", role: "CEO", credential: "AI 장관상 수상" },
  { name: "이기술", role: "CTO", credential: "개발 대회 수상" },
  { name: "박디자인", role: "Design Lead", credential: "UX 전문가" },
  { name: "최개발", role: "Lead Developer", credential: "풀스택 엔지니어" },
  { name: "정기획", role: "PM", credential: "프로젝트 매니저" },
  { name: "한마케팅", role: "Marketing", credential: "그로스 해커" },
] as const;

export const FOOTER = {
  companyName: "데모데브",
  address: "서울특별시 강남구",
  phone: "02-1234-5678",
  email: "contact@demodev.io",
  copyright: "2025 DemoDev. All rights reserved.",
} as const;

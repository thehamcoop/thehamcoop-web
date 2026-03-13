# DemoDev Clone

[demodev.io](https://www.demodev.io/)를 클론한 다크 모드 기반 랜딩 페이지 프로젝트입니다.
Next.js App Router, TypeScript, Tailwind CSS를 기반으로 Framer Motion과 GSAP을 활용한 인터랙티브 애니메이션을 구현합니다.

---

## Tech Stack

| 영역 | 기술 |
|------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion, GSAP |
| Image | next/image 최적화 |

---

## Getting Started

### 요구사항

- Node.js 18.17 이상

### 설치

```bash
git clone https://github.com/your-username/demodev-clone.git
cd demodev-clone
npm install
```

### 실행

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

개발 서버 실행 후 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

---

## Project Structure

```
src/
├── app/
│   ├── globals.css                 # 다크 모드 컬러 시스템 (@theme)
│   ├── layout.tsx                  # 루트 레이아웃
│   └── page.tsx                    # 메인 페이지 (섹션 조합)
│
├── components/
│   ├── common/                     # 공통 UI 컴포넌트
│   │   ├── AnimatedSection.tsx     # Framer Motion 스크롤 애니메이션
│   │   ├── Button.tsx              # 버튼 (primary / secondary / outline)
│   │   └── SectionContainer.tsx    # 섹션 래퍼 (max-width, padding)
│   │
│   └── sections/                   # 페이지 섹션 컴포넌트
│       ├── Header.tsx              # 고정 헤더 + 모바일 메뉴
│       ├── Hero.tsx                # 히어로 섹션
│       ├── Portfolio.tsx           # 포트폴리오 그리드
│       ├── Strengths.tsx           # 강점 카드
│       ├── Process.tsx             # 프로세스 단계
│       ├── Team.tsx                # 팀 소개
│       ├── Contact.tsx             # CTA 섹션
│       └── Footer.tsx              # 푸터
│
├── constants/
│   └── site.ts                     # 텍스트, 이미지 경로 중앙 관리
│
└── hooks/
    └── useScrollAnimation.ts       # GSAP 스크롤 애니메이션 훅
```

```
public/
└── images/
    └── portfolio/                  # 포트폴리오 이미지 에셋
```

---

## Animation System

이 프로젝트는 **Framer Motion**과 **GSAP** 두 가지 애니메이션 라이브러리를 용도에 맞게 분리하여 사용합니다.

### Framer Motion — 선언적 UI 애니메이션

React 컴포넌트와 자연스럽게 통합되는 선언적 애니메이션에 사용합니다.

- **`AnimatedSection`** — 스크롤 시 fade-in-up 효과를 적용하는 공통 래퍼 컴포넌트
  - `whileInView`로 뷰포트 진입 시 자동 트리거
  - `delay` prop으로 카드 리스트의 순차 등장 구현
  - `viewport={{ once: true }}`로 한 번만 실행

```tsx
// 사용 예시 — 0.1초 간격으로 순차 등장
{items.map((item, i) => (
  <AnimatedSection key={item.id} delay={i * 0.1}>
    <Card {...item} />
  </AnimatedSection>
))}
```

- **`Button`** — `whileHover` / `whileTap`으로 마이크로 인터랙션 적용
- **`Header`** — `AnimatePresence`로 모바일 메뉴 열기/닫기 전환 애니메이션

### GSAP — 고급 스크롤 애니메이션

IntersectionObserver와 결합하여 세밀한 제어가 필요한 애니메이션에 사용합니다.

- **`useScrollAnimation`** 훅 — 요소가 뷰포트에 진입하면 자식 요소들이 stagger로 순차 등장

```tsx
// 사용 예시
const ref = useScrollAnimation<HTMLDivElement>({
  y: 60,           // 시작 위치 (아래에서 위로)
  duration: 0.8,   // 애니메이션 시간
  stagger: 0.15,   // 자식 요소 간 딜레이
});

return <div ref={ref}>{children}</div>;
```

---

## Dark Mode Design

demodev.io의 깊이감 있는 다크 UI를 재현하기 위해 Tailwind CSS v4의 `@theme` 디렉티브로 커스텀 컬러 시스템을 구성했습니다.

### Color Palette

| 토큰 | 값 | 용도 |
|------|----|------|
| `bg-primary` | `#0a0a0f` | 메인 배경 |
| `bg-secondary` | `#111118` | 섹션 교차 배경 |
| `bg-tertiary` | `#1a1a24` | 카드 내부, 입력 필드 |
| `bg-card` | `#16161e` | 카드 배경 |
| `text-primary` | `#f0f0f5` | 본문 텍스트 |
| `text-secondary` | `#a0a0b8` | 보조 텍스트 |
| `text-muted` | `#6b6b80` | 비활성 텍스트 |
| `accent-purple` | `#8b5cf6` | 메인 포인트 컬러 |
| `accent-blue` | `#3b82f6` | 보조 포인트 컬러 |
| `accent-indigo` | `#6366f1` | 인터랙션 |
| `accent-cyan` | `#06b6d4` | 프로세스 섹션 강조 |

### Design Utilities

- **`.gradient-text`** — 보라-파랑 그라디언트 텍스트 효과
- **`.gradient-border`** — `::before` 마스크 기반 그라디언트 보더
- 커스텀 스크롤바 스타일링 (다크 테마 통일)

---

## License

This project is for educational purposes only.

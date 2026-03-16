export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  thumbnail: string;
  content: string;
}

export const POSTS: Post[] = [
  {
    slug: "startup-camp-2025",
    title: "2025 창업캠프 성공적으로 마무리",
    description:
      "전문가 멘토링과 PBL 기반 프로그램으로 참가자들의 아이디어를 시제품으로 구현한 창업캠프 후기입니다.",
    date: "2025-03-10",
    category: "행사",
    thumbnail: "/images/placeholder.jpg",
    content: `
## 2025 창업캠프를 성공적으로 마무리했습니다.

이번 캠프에서는 총 30팀이 참가하여 아이디어 구현부터 시제품 제작, 발표 및 시상까지 진행되었습니다.

### 주요 프로그램
- 전문가 멘토링 세션
- PBL 기반 제작 워크숍
- 최종 발표 및 시상식

참가자들의 열정적인 참여 덕분에 뜻깊은 행사가 되었습니다.
    `,
  },
  {
    slug: "angel-investment-meetup",
    title: "엔젤투자 밋업 설명회 개최 안내",
    description:
      "IR 피칭, 패널토의, 네트워킹으로 구성된 엔젤투자 밋업 설명회를 개최합니다.",
    date: "2025-02-20",
    category: "공지",
    thumbnail: "/images/placeholder.jpg",
    content: `
## 엔젤투자 밋업 설명회

더함 협동조합에서 엔젤투자 밋업 설명회를 개최합니다.

### 프로그램 구성
- IR 피칭 + 패널토의
- 네트워킹 세션
- 투자심사보고서 작성 실습

많은 관심과 참여 부탁드립니다.
    `,
  },
  {
    slug: "patent-registration",
    title: "더함 협동조합 특허 등록 완료",
    description:
      "더함 협동조합이 자체 개발 기술에 대한 특허 등록을 완료했습니다.",
    date: "2025-01-15",
    category: "소식",
    thumbnail: "/images/placeholder.jpg",
    content: `
## 특허 등록을 완료했습니다

더함 협동조합의 기술력을 인정받아 특허 등록을 완료하게 되었습니다.

앞으로도 지속적인 연구개발을 통해 더 나은 서비스를 제공하겠습니다.
    `,
  },
];

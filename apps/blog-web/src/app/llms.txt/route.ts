import { createClient } from "@supabase/supabase-js";
import { SITE } from "@/constants/site";

const CATEGORY_MAP: Record<string, string> = {
  education: "교육",
  manufacturing: "시제품 제작 & 제조",
  marketing: "마케팅 & 유통",
  rnd: "R&D",
};

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, category_slug, author_name, created_at")
    .order("created_at", { ascending: false });

  const postList = (posts ?? [])
    .map(
      (p) =>
        `- [${p.title}](${SITE.url}/posts/${p.id}) (${CATEGORY_MAP[p.category_slug] || p.category_slug}, ${p.author_name}, ${p.created_at.slice(0, 10)})`
    )
    .join("\n");

  const body = `# ${SITE.name}

> ${SITE.description}

## 사이트 정보
- URL: ${SITE.url}
- 언어: 한국어
- 운영: 더함협동조합
- 주소: 충청남도 천안시 서북구 충무로 143-10(쌍용동)
- 연락처: 070-7954-6965
- 이메일: contact@thehamcoop.kr

## 카테고리
- 교육
- 시제품 제작 & 제조
- 마케팅 & 유통
- R&D

## 블로그 글 목록
${postList}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

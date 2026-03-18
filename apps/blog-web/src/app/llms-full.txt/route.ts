import { createClient } from "@supabase/supabase-js";
import { SITE } from "@/constants/site";
import { blocksToPlainText } from "@/lib/contentUtils";

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
    .select("*")
    .order("created_at", { ascending: false });

  const postSections = (posts ?? [])
    .map((p) => {
      let plainText = "";
      try {
        const blocks = JSON.parse(p.content);
        plainText = blocksToPlainText(blocks);
      } catch {
        plainText = "";
      }

      return `## ${p.title}

- URL: ${SITE.url}/posts/${p.id}
- 카테고리: ${CATEGORY_MAP[p.category_slug] || p.category_slug}
- 작성자: ${p.author_name}
- 작성일: ${p.created_at.slice(0, 10)}

${plainText}

---`;
    })
    .join("\n\n");

  const body = `# ${SITE.name} - 전체 콘텐츠

> ${SITE.description}

${postSections}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

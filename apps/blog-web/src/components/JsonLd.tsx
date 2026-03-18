import type { Post } from "@/types/database.types";
import { SITE, FOOTER } from "@/constants/site";

const CATEGORY_MAP: Record<string, string> = {
  education: "교육",
  manufacturing: "시제품 제작 & 제조",
  marketing: "마케팅 & 유통",
  rnd: "R&D",
};

export default function JsonLd({
  post,
  description,
}: {
  post: Post;
  description: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    url: `${SITE.url}/posts/${post.id}`,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: post.author_name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: FOOTER.phone,
        email: FOOTER.email,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/posts/${post.id}`,
    },
    ...(post.thumbnail_url && {
      image: post.thumbnail_url,
    }),
    articleSection: CATEGORY_MAP[post.category_slug] || post.category_slug,
    inLanguage: "ko",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import type { Post } from "@/types/database.types";
import { SITE } from "@/constants/site";
import { blocksToPlainText } from "@/lib/contentUtils";
import PostDetailClient from "./PostDetailClient";
import JsonLd from "@/components/JsonLd";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getPost(id: string): Promise<Post | null> {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  return data as Post | null;
}

function getDescription(content: string): string {
  try {
    const blocks = JSON.parse(content);
    const text = blocksToPlainText(blocks);
    return text.slice(0, 160).trim() || SITE.description;
  } catch {
    return SITE.description;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return { title: "포스트를 찾을 수 없습니다" };
  }

  const description = getDescription(post.content);
  const url = `${SITE.url}/posts/${post.id}`;

  return {
    title: post.title,
    description,
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url,
      siteName: SITE.name,
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      locale: SITE.locale,
      ...(post.thumbnail_url && {
        images: [
          {
            url: post.thumbnail_url,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      ...(post.thumbnail_url && { images: [post.thumbnail_url] }),
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) notFound();

  const description = getDescription(post.content);

  return (
    <>
      <JsonLd post={post} description={description} />
      <PostDetailClient post={post} />
    </>
  );
}

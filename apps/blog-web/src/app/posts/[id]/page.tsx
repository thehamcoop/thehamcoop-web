"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Post } from "@/types/database.types";
import DynamicViewer from "@/components/DynamicViewer";

const CATEGORY_MAP: Record<string, string> = {
  education: "교육",
  manufacturing: "시제품 제작 & 제조",
  marketing: "마케팅 & 유통",
  rnd: "R&D",
};

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id as string)
        .single();

      setPost(data as Post | null);
      setLoading(false);
    }

    if (id) fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-gray-400">로딩 중...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            포스트를 찾을 수 없습니다.
          </h1>
          <Link
            href="/"
            className="mt-4 inline-block text-sm text-accent hover:underline"
          >
            ← 블로그로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-3xl px-4 py-16 md:px-8"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800"
      >
        ← 블로그로 돌아가기
      </Link>

      <div className="mt-8">
        <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent-dark">
          {CATEGORY_MAP[post.category_slug] || post.category_slug}
        </span>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
          {post.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-gray-400">
          <span>{post.author_name}</span>
          <span>·</span>
          <span>{formatDate(post.created_at)}</span>
        </div>
      </div>

      {/* BlockNote 본문 렌더링 */}
      <div className="mt-10">
        <DynamicViewer content={post.content} />
      </div>
    </motion.article>
  );
}

"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { POSTS } from "@/constants/posts";

export default function PostDetail() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            포스트를 찾을 수 없습니다.
          </h1>
          <Link
            href="/"
            className="mt-4 inline-block text-sm text-[#2DB7C1] hover:underline"
          >
            &larr; 블로그로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

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
        &larr; 블로그로 돌아가기
      </Link>

      <div className="mt-8">
        <span className="inline-block rounded-full bg-[#2DB7C1]/10 px-3 py-1 text-xs font-medium text-[#1A8A91]">
          {post.category}
        </span>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-gray-400">{post.date}</p>
      </div>

      <div className="mt-10 whitespace-pre-line text-base leading-relaxed text-gray-700">
        {post.content}
      </div>
    </motion.article>
  );
}

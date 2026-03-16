"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { POSTS } from "@/constants/posts";

export default function BlogHome() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
          블로그
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          더함 협동조합의 소식과 이야기를 전합니다.
        </p>
      </motion.div>

      {/* Post List */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={`/posts/${post.slug}`} className="group block">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
                {/* Thumbnail */}
                <div className="aspect-video w-full bg-gradient-to-br from-[#2DB7C1]/20 to-[#1A8A91]/20" />

                {/* Content */}
                <div className="p-5">
                  <span className="inline-block rounded-full bg-[#2DB7C1]/10 px-3 py-1 text-xs font-medium text-[#1A8A91]">
                    {post.category}
                  </span>
                  <h2 className="mt-3 text-lg font-bold text-gray-900 transition-colors group-hover:text-[#2DB7C1]">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                    {post.description}
                  </p>
                  <p className="mt-4 text-xs text-gray-400">{post.date}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

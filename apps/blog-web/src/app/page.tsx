"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { POSTS } from "@/constants/posts";

const CATEGORIES = [
  "전체",
  "교육",
  "시제품 제작 & 제조",
  "마케팅 & 유통",
  "R&D",
];

export default function BlogHome() {
  const [activeCategory, setActiveCategory] = useState("전체");

  const filteredPosts =
    activeCategory === "전체"
      ? POSTS
      : POSTS.filter((post) => post.category === activeCategory);

  return (
    <div>
      {/* Hero Banner */}
      <section
        className="relative overflow-hidden bg-[#1a1a3e]"
        style={{ padding: "8rem 2rem" }}
      >
        {/* Decorative shapes */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 h-full w-1/2 bg-linear-to-bl from-[#2d2d6e]/80 to-transparent" />
          <div className="absolute bottom-0 left-1/4 h-1/2 w-1/2 bg-linear-to-t from-[#3a1a5e]/40 to-transparent" />
        </div>
        <div
          className="relative"
          style={{ maxWidth: "64rem", margin: "0 auto" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold text-white md:text-3xl"
          >
            대한민국에서 교육을 가장 잘하는 곳
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base"
          >
            <p>더함협동조합이 직접 운영한 교육, 행사를 공유합니다.</p>
            <p>더함협동조합과 함께 성장하세요</p>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs + Post List */}
      <section
        style={{ maxWidth: "64rem", margin: "0 auto", padding: "2.5rem 2rem" }}
      >
        {/* Category Tabs */}
        <div className="hide-scrollbar mb-10 flex items-center gap-3 overflow-x-auto pb-3">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap rounded-full text-base font-semibold transition-all duration-200 ${
                activeCategory === category
                  ? "bg-[#1a1a3e] text-white shadow-sm px-12 py-5"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-200 hover:text-gray-700 px-10 py-4"
              }`}
            >
              {category}
            </button>
          ))}
          <Link
            href="/admin/write"
            className="ml-auto whitespace-nowrap rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            + 글 작성
          </Link>
        </div>

        {/* Post Grid - 3 columns */}
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link href={`/posts/${post.slug}`} className="group block">
                {/* Thumbnail */}
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-linear-to-br from-accent/20 to-accent-dark/20">
                  {post.thumbnail &&
                    post.thumbnail !== "/images/placeholder.jpg" && (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    )}
                </div>

                {/* Content */}
                <div className="mt-4">
                  <h2 className="text-base font-bold text-gray-900 transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                    {post.description}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                    <span className="text-accent-dark">{post.category}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

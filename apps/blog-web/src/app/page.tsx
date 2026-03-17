"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Post } from "@/types/database.types";
import { useAdmin } from "@/context/AdminContext";

const CATEGORIES = [
  { value: "all", label: "전체" },
  { value: "education", label: "교육" },
  { value: "manufacturing", label: "시제품 제작 & 제조" },
  { value: "marketing", label: "마케팅 & 유통" },
  { value: "rnd", label: "R&D" },
];

export default function BlogHome() {
  const { isAdmin } = useAdmin();
  const [activeCategory, setActiveCategory] = useState("all");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);

      let query = supabase
        .from("posts")
        .select("*")
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false });

      if (activeCategory !== "all") {
        query = query.eq("category_slug", activeCategory);
      }

      const { data } = await query;
      setPosts((data as Post[]) || []);
      setLoading(false);
    }

    fetchPosts();
  }, [activeCategory]);

  const getCategoryLabel = (slug: string) => {
    return CATEGORIES.find((c) => c.value === slug)?.label || slug;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      {/* Hero Banner */}
      <section
        className="relative overflow-hidden bg-[#1a1a3e]"
        style={{ padding: "8rem 2rem" }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 h-full w-1/2 bg-linear-to-bl from-[#2d2d6e]/80 to-transparent" />
          <div className="absolute bottom-0 left-1/4 h-1/2 w-1/2 bg-linear-to-t from-[#3a1a5e]/40 to-transparent" />
        </div>
        <div
          className="relative"
          style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 2rem" }}
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
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === category.value
                  ? "bg-[#1a1a3e] text-white shadow-sm px-6 py-2.5"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-200 hover:text-gray-700 px-5 py-2"
              }`}
            >
              {category.label}
            </button>
          ))}
          {isAdmin && (
            <Link
              href="/admin/write"
              style={{
                marginLeft: "auto",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.375rem 1rem",
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "#1a1a3e",
                border: "1px solid rgba(26,26,62,0.25)",
                borderRadius: "0.5rem",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
              글 작성
            </Link>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center text-sm text-gray-400">
            글을 불러오는 중...
          </div>
        )}

        {/* Empty */}
        {!loading && posts.length === 0 && (
          <div className="py-20 text-center text-sm text-gray-400">
            아직 작성된 글이 없습니다.
          </div>
        )}

        {/* Post Grid - 3 columns */}
        {!loading && posts.length > 0 && (
          <div
            className="grid gap-8"
            style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link href={`/posts/${post.id}`} className="group block">
                  {/* Thumbnail */}
                  <div className="aspect-video w-full overflow-hidden rounded-lg bg-linear-to-br from-accent/20 to-accent-dark/20">
                    {post.thumbnail_url && (
                      <img
                        src={post.thumbnail_url}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="mt-4">
                    <h2 className="text-base font-bold text-gray-900 transition-colors group-hover:text-accent">
                      {post.is_pinned && (
                        <span className="mr-1.5 text-accent">[고정]</span>
                      )}
                      {post.title}
                    </h2>
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                      <span className="text-accent-dark">
                        {getCategoryLabel(post.category_slug)}
                      </span>
                      <span>·</span>
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

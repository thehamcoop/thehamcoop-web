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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>로딩 중...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827" }}
          >
            포스트를 찾을 수 없습니다.
          </h1>
          <Link
            href="/"
            style={{
              display: "inline-block",
              marginTop: "1rem",
              fontSize: "0.875rem",
              color: "#2DB7C1",
            }}
          >
            ← 블로그로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      {/* ── 상단 헤더 영역 ── */}
      <div
        style={{
          backgroundColor: "#1a1a3e",
          padding: "3rem 1.5rem 3.5rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: "48rem", margin: "0 auto" }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            블로그로 돌아가기
          </Link>

          <div style={{ marginTop: "1.5rem" }}>
            <span
              style={{
                display: "inline-block",
                padding: "0.25rem 0.875rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#2DB7C1",
                backgroundColor: "rgba(45,183,193,0.15)",
                borderRadius: "9999px",
              }}
            >
              {CATEGORY_MAP[post.category_slug] || post.category_slug}
            </span>
            <h1
              style={{
                marginTop: "1rem",
                fontSize: "2.25rem",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.25,
              }}
            >
              {post.title}
            </h1>
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <span>{post.author_name}</span>
              <span>·</span>
              <span>{formatDate(post.created_at)}</span>
              <span>·</span>
              <span>조회 {post.views}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── 본문 ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{
          maxWidth: "48rem",
          margin: "0 auto",
          padding: "2.5rem 1.5rem 4rem",
        }}
      >
        <DynamicViewer content={post.content} />
      </motion.div>
    </div>
  );
}

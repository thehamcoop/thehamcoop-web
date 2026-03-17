"use client";

import { useParams, useRouter } from "next/navigation";
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
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!confirm("이 게시글을 삭제하시겠습니까?")) return;

    setDeleting(true);
    await supabase.from("attachments").delete().eq("post_id", id as string);
    const { error } = await supabase.from("posts").delete().eq("id", id as string);

    if (error) {
      alert("삭제에 실패했습니다.");
      setDeleting(false);
    } else {
      router.push("/");
    }
  };

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
          style={{ maxWidth: "48rem", margin: "0 auto", padding: "0 1.5rem" }}
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
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {formatDate(post.created_at)}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.375rem 1rem",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: "rgba(255,150,150,0.9)",
                  border: "1px solid rgba(255,150,150,0.35)",
                  borderRadius: "0.5rem",
                  background: "none",
                  cursor: deleting ? "not-allowed" : "pointer",
                  opacity: deleting ? 0.5 : 1,
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
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
                {deleting ? "삭제 중..." : "삭제"}
              </button>
              <Link
                href={`/admin/edit/${post.id}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.375rem 1rem",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
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
                수정
              </Link>
              </div>
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

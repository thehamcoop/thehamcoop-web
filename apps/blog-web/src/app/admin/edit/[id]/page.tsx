"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import DynamicEditor from "@/components/DynamicEditor";
import { updatePost } from "@/app/admin/write/actions";
import { supabase } from "@/lib/supabase";
import type { Post } from "@/types/database.types";

const CATEGORIES = [
  { value: "education", label: "교육" },
  { value: "manufacturing", label: "시제품 제작 & 제조" },
  { value: "marketing", label: "마케팅 & 유통" },
  { value: "rnd", label: "R&D" },
];

export default function AdminEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [categorySlug, setCategorySlug] = useState("education");
  const [isPinned, setIsPinned] = useState(false);
  const [content, setContent] = useState("");
  const [initialContent, setInitialContent] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id as string)
        .single();

      if (data) {
        const post = data as Post;
        setTitle(post.title);
        setCategorySlug(post.category_slug);
        setIsPinned(post.is_pinned);
        setContent(post.content);
        setInitialContent(post.content);
      }
      setLoading(false);
    }

    if (id) fetchPost();
  }, [id]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setMessage({ type: "error", text: "제목을 입력해주세요." });
      return;
    }
    if (!content || content === "[]") {
      setMessage({ type: "error", text: "본문을 작성해주세요." });
      return;
    }

    setSaving(true);
    setMessage(null);

    const result = await updatePost({
      id: id as string,
      title,
      category_slug: categorySlug,
      content,
      is_pinned: isPinned,
    });

    setSaving(false);

    if (result.success) {
      setMessage({ type: "success", text: "글이 수정되었습니다." });
      setTimeout(() => router.push(`/posts/${id}`), 1000);
    } else {
      setMessage({
        type: "error",
        text: result.error || "수정에 실패했습니다.",
      });
    }
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

  return (
    <div
      style={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
      }}
    >
      {/* ── Sticky Header ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid rgba(229,231,235,0.6)",
          backgroundColor: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div
          style={{
            maxWidth: "56rem",
            margin: "0 auto",
            padding: "0.875rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => router.back()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#6b7280",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <svg
              width="18"
              height="18"
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
            뒤로가기
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {saving && (
              <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                저장 중...
              </span>
            )}
            <button
              onClick={handleSubmit}
              disabled={saving}
              style={{
                padding: "0.625rem 1.75rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: "#1a1a3e",
                border: "none",
                borderRadius: "0.625rem",
                cursor: saving ? "not-allowed" : "pointer",
                opacity: saving ? 0.5 : 1,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!saving) {
                  e.currentTarget.style.backgroundColor = "#2a2a5e";
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#1a1a3e";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)";
              }}
            >
              수정하기
            </button>
          </div>
        </div>
      </div>

      {/* ── 알림 메시지 ── */}
      {message && (
        <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "1rem 1.5rem 0" }}>
          <div
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              backgroundColor: message.type === "success" ? "#ecfdf5" : "#fef2f2",
              color: message.type === "success" ? "#047857" : "#dc2626",
            }}
          >
            {message.text}
          </div>
        </div>
      )}

      {/* ── 메인 카드 ── */}
      <div
        style={{
          maxWidth: "56rem",
          margin: "0 auto",
          padding: "2.5rem 1.5rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "1rem",
            border: "1px solid rgba(229,231,235,0.8)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          {/* 메타데이터 섹션 */}
          <div style={{ padding: "2.5rem 2.5rem 1.5rem" }}>
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  fontSize: "2.25rem",
                  fontWeight: 700,
                  color: "#1a1a2e",
                  lineHeight: 1.2,
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1rem" }}>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                style={{
                  appearance: "none",
                  padding: "0.375rem 2rem 0.375rem 0.875rem",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "#4b5563",
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "9999px",
                  cursor: "pointer",
                  outline: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.5rem center",
                }}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.375rem 0.875rem",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "#4b5563",
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "9999px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  style={{ width: "0.875rem", height: "0.875rem", accentColor: "#1a1a3e" }}
                />
                상단 고정
              </label>
            </div>
          </div>

          {/* 구분선 */}
          <div style={{ margin: "0 2.5rem" }}>
            <div style={{ height: "1px", backgroundColor: "#f3f4f6" }} />
          </div>

          {/* 에디터 영역 */}
          <div style={{ padding: "1.5rem 2.5rem 2.5rem" }}>
            {initialContent && (
              <DynamicEditor
                onChange={setContent}
                initialContent={initialContent}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Suspense, useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Post } from "@/types/database.types";
import { getThumbnailStyle } from "@/components/ThumbnailPicker";
import { useAdmin } from "@/context/AdminContext";
import {
  bulkDeletePosts,
  bulkUpdateCategory,
  updatePostOrder,
} from "@/app/admin/manage/actions";

const CATEGORIES = [
  { value: "all", label: "전체" },
  { value: "education", label: "교육" },
  { value: "manufacturing", label: "시제품 제작 & 제조" },
  { value: "marketing", label: "마케팅 & 유통" },
  { value: "rnd", label: "R&D" },
];

function BlogContent() {
  const { isAdmin } = useAdmin();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [activeCategory, setActiveCategory] = useState("all");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // 관리 모드 상태
  const [isManageMode, setIsManageMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [orderChanged, setOrderChanged] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);

      let query = supabase
        .from("posts")
        .select("*")
        .order("is_pinned", { ascending: false })
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (activeCategory !== "all") {
        query = query.eq("category_slug", activeCategory);
      }

      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
      }

      const { data } = await query;
      setPosts((data as Post[]) || []);
      setLoading(false);
    }

    fetchPosts();
  }, [activeCategory, searchQuery]);

  // 관리 모드 종료 시 선택/순서변경 초기화
  useEffect(() => {
    if (!isManageMode) {
      setSelectedIds(new Set());
      setOrderChanged(false);
      setShowCategoryModal(false);
    }
  }, [isManageMode]);

  // 메시지 자동 숨김
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

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

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectedIds((prev) => {
      if (prev.size === posts.length) return new Set();
      return new Set(posts.map((p) => p.id));
    });
  }, [posts]);

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`${selectedIds.size}개의 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`)) return;

    setSaving(true);
    const result = await bulkDeletePosts(Array.from(selectedIds));
    setSaving(false);

    if (result.success) {
      setPosts((prev) => prev.filter((p) => !selectedIds.has(p.id)));
      setSelectedIds(new Set());
      setMessage({ type: "success", text: `${result.deletedCount}개 게시글이 삭제되었습니다.` });
    } else {
      setMessage({ type: "error", text: result.error || "삭제에 실패했습니다." });
    }
  };

  const handleBulkCategoryChange = async (categorySlug: string) => {
    if (selectedIds.size === 0) return;

    setSaving(true);
    const result = await bulkUpdateCategory(Array.from(selectedIds), categorySlug);
    setSaving(false);
    setShowCategoryModal(false);

    if (result.success) {
      setPosts((prev) =>
        prev.map((p) =>
          selectedIds.has(p.id) ? { ...p, category_slug: categorySlug } : p
        )
      );
      setSelectedIds(new Set());
      setMessage({ type: "success", text: `${result.updatedCount}개 게시글의 카테고리가 변경되었습니다.` });
    } else {
      setMessage({ type: "error", text: result.error || "카테고리 변경에 실패했습니다." });
    }
  };

  const handleSaveOrder = async () => {
    setSaving(true);
    const updates = posts.map((p, i) => ({ id: p.id, sort_order: (i + 1) * 10 }));
    const result = await updatePostOrder(updates);
    setSaving(false);

    if (result.success) {
      setOrderChanged(false);
      setMessage({ type: "success", text: "순서가 저장되었습니다." });
    } else {
      setMessage({ type: "error", text: result.error || "순서 저장에 실패했습니다." });
    }
  };

  // 드래그앤드롭 상태
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    dragOverItem.current = index;
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      const newPosts = [...posts];
      const [removed] = newPosts.splice(dragItem.current, 1);
      newPosts.splice(dragOverItem.current, 0, removed);
      setPosts(newPosts);
      setOrderChanged(true);
    }
    dragItem.current = null;
    dragOverItem.current = null;
    setDragOverIndex(null);
  };

  return (
    <div>
      {/* Hero Banner */}
      <section
        className="relative overflow-hidden bg-[#164761]"
        style={{ padding: "8rem 2rem" }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 h-full w-1/2 bg-linear-to-bl from-accent-dark/30 to-transparent" />
          <div className="absolute bottom-0 left-1/4 h-1/2 w-1/2 bg-linear-to-t from-accent/20 to-transparent" />
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
        {/* 메시지 알림 */}
        {message && (
          <div
            style={{
              padding: "0.75rem 1rem",
              marginBottom: "1rem",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              background: message.type === "success" ? "#ecfdf5" : "#fef2f2",
              color: message.type === "success" ? "#065f46" : "#991b1b",
              border: `1px solid ${message.type === "success" ? "#a7f3d0" : "#fecaca"}`,
            }}
          >
            {message.text}
          </div>
        )}

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
            <>
              <button
                onClick={() => setIsManageMode((prev) => !prev)}
                style={{
                  marginLeft: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.375rem 1rem",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: isManageMode ? "#fff" : "#1a1a3e",
                  background: isManageMode ? "#1a1a3e" : "transparent",
                  border: "1px solid rgba(26,26,62,0.25)",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
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
                  <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
                {isManageMode ? "관리 종료" : "관리"}
              </button>
              <Link
                href="/admin/write"
                style={{
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
            </>
          )}
        </div>

        {/* 검색 중 표시 */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-[#164761]">
                &ldquo;{searchQuery}&rdquo;
              </span>{" "}
              검색 결과
            </p>
            <Link
              href="/"
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              검색 초기화
            </Link>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center text-sm text-gray-400">
            글을 불러오는 중...
          </div>
        )}

        {/* Empty */}
        {!loading && posts.length === 0 && (
          <div className="py-20 text-center text-sm text-gray-400">
            {searchQuery
              ? "검색 결과가 없습니다."
              : "아직 작성된 글이 없습니다."}
          </div>
        )}

        {/* 관리 모드: 그리드 + 체크박스 오버레이 */}
        {!loading && posts.length > 0 && isManageMode && (
          <>
            {/* 관리 툴바 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                marginBottom: "1.5rem",
                background: "#f9fafb",
                borderRadius: "0.5rem",
                border: "1px solid #e5e7eb",
                flexWrap: "wrap",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: "#374151",
                  userSelect: "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.size === posts.length && posts.length > 0}
                  onChange={toggleSelectAll}
                  style={{ width: "1rem", height: "1rem", accentColor: "#1a1a3e" }}
                />
                전체선택
              </label>

              <span
                style={{
                  fontSize: "0.8125rem",
                  color: "#6b7280",
                  marginRight: "auto",
                }}
              >
                {selectedIds.size > 0
                  ? `${selectedIds.size}개 선택됨`
                  : `총 ${posts.length}개`}
              </span>

              <button
                onClick={handleBulkDelete}
                disabled={selectedIds.size === 0 || saving}
                style={{
                  padding: "0.375rem 0.875rem",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: selectedIds.size > 0 ? "#dc2626" : "#9ca3af",
                  background: selectedIds.size > 0 ? "#fef2f2" : "#f3f4f6",
                  border: `1px solid ${selectedIds.size > 0 ? "#fecaca" : "#e5e7eb"}`,
                  borderRadius: "0.375rem",
                  cursor: selectedIds.size > 0 ? "pointer" : "not-allowed",
                  transition: "all 0.15s",
                }}
              >
                삭제
              </button>

              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowCategoryModal((prev) => !prev)}
                  disabled={selectedIds.size === 0 || saving}
                  style={{
                    padding: "0.375rem 0.875rem",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: selectedIds.size > 0 ? "#1a1a3e" : "#9ca3af",
                    background: selectedIds.size > 0 ? "#eef2ff" : "#f3f4f6",
                    border: `1px solid ${selectedIds.size > 0 ? "#c7d2fe" : "#e5e7eb"}`,
                    borderRadius: "0.375rem",
                    cursor: selectedIds.size > 0 ? "pointer" : "not-allowed",
                    transition: "all 0.15s",
                  }}
                >
                  카테고리 변경
                </button>

                {showCategoryModal && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 4px)",
                      right: 0,
                      background: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      zIndex: 20,
                      minWidth: "10rem",
                      overflow: "hidden",
                    }}
                  >
                    {CATEGORIES.filter((c) => c.value !== "all").map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => handleBulkCategoryChange(cat.value)}
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "0.625rem 1rem",
                          fontSize: "0.8125rem",
                          textAlign: "left",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#374151",
                          transition: "background 0.1s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#f3f4f6")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleSaveOrder}
                disabled={!orderChanged || saving}
                style={{
                  padding: "0.375rem 0.875rem",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: orderChanged ? "#fff" : "#9ca3af",
                  background: orderChanged ? "#1a1a3e" : "#f3f4f6",
                  border: `1px solid ${orderChanged ? "#1a1a3e" : "#e5e7eb"}`,
                  borderRadius: "0.375rem",
                  cursor: orderChanged ? "pointer" : "not-allowed",
                  transition: "all 0.15s",
                }}
              >
                {saving ? "저장 중..." : "순서 저장"}
              </button>
            </div>

            {/* 카테고리 모달 배경 (클릭시 닫기) */}
            {showCategoryModal && (
              <div
                style={{ position: "fixed", inset: 0, zIndex: 10 }}
                onClick={() => setShowCategoryModal(false)}
              />
            )}

            {/* 그리드 뷰 (드래그앤드롭) */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {posts.map((post, index) => {
                const isSelected = selectedIds.has(post.id);
                const isDragOver = dragOverIndex === index;
                return (
                  <div
                    key={post.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    style={{
                      position: "relative",
                      cursor: "grab",
                      opacity: dragItem.current === index ? 0.5 : 1,
                      transition: "opacity 0.15s",
                    }}
                  >
                    {/* 드롭 위치 표시 */}
                    {isDragOver && dragItem.current !== index && (
                      <div style={{
                        position: "absolute",
                        inset: -4,
                        border: "2px dashed #1a1a3e",
                        borderRadius: "0.75rem",
                        zIndex: 5,
                        pointerEvents: "none",
                      }} />
                    )}

                    {/* 체크박스 오버레이 */}
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleSelect(post.id);
                      }}
                      style={{
                        position: "absolute",
                        top: "0.5rem",
                        left: "0.5rem",
                        zIndex: 10,
                        width: "1.5rem",
                        height: "1.5rem",
                        borderRadius: "0.25rem",
                        background: isSelected ? "#1a1a3e" : "rgba(255,255,255,0.9)",
                        border: isSelected ? "2px solid #1a1a3e" : "2px solid #d1d5db",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      }}
                    >
                      {isSelected && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>

                    {/* 선택 시 테두리 표시 */}
                    <div
                      style={{
                        borderRadius: "0.5rem",
                        border: isSelected ? "2px solid #1a1a3e" : "2px solid transparent",
                        transition: "border-color 0.15s",
                      }}
                    >
                      <Link href={`/posts/${post.id}`} className="group block" draggable={false} onClick={(e) => e.preventDefault()}>
                        {/* Thumbnail */}
                        <div
                          className="aspect-video w-full overflow-hidden rounded-lg bg-white"
                          style={{ position: "relative" }}
                        >
                          <img
                            src={post.thumbnail_url || "/images/default-thumbnail.svg"}
                            alt={post.title}
                            className="block"
                            style={getThumbnailStyle(post.thumbnail_position)}
                            draggable={false}
                          />
                        </div>

                        {/* Content */}
                        <div className="mt-4">
                          <h2 className="text-base font-bold text-gray-900 transition-colors group-hover:text-accent">
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
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* 일반 모드: 3열 그리드 */}
        {!loading && posts.length > 0 && !isManageMode && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link href={`/posts/${post.id}`} className="group block">
                  {/* Thumbnail */}
                  <div
                    className="aspect-video w-full overflow-hidden rounded-lg bg-white"
                    style={{ position: "relative" }}
                  >
                    <img
                      src={
                        post.thumbnail_url || "/images/default-thumbnail.svg"
                      }
                      alt={post.title}
                      className="block"
                      style={getThumbnailStyle(post.thumbnail_position)}
                    />
                  </div>

                  {/* Content */}
                  <div className="mt-4">
                    <h2 className="text-base font-bold text-gray-900 transition-colors group-hover:text-accent">
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

export default function BlogHome() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-sm text-gray-400">로딩 중...</p>
        </div>
      }
    >
      <BlogContent />
    </Suspense>
  );
}

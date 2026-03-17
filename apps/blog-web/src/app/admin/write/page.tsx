"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DynamicEditor from "@/components/DynamicEditor";
import { savePost } from "./actions";

const CATEGORIES = [
  { value: "education", label: "교육" },
  { value: "manufacturing", label: "시제품 제작 & 제조" },
  { value: "marketing", label: "마케팅 & 유통" },
  { value: "rnd", label: "R&D" },
];

export default function AdminWritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [categorySlug, setCategorySlug] = useState("education");
  const [isPinned, setIsPinned] = useState(false);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

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

    const result = await savePost({
      title,
      category_slug: categorySlug,
      content,
      author_name: "관리자",
      is_pinned: isPinned,
    });

    setSaving(false);

    if (result.success) {
      setMessage({ type: "success", text: "글이 성공적으로 저장되었습니다." });
      setTitle("");
      setCategorySlug("notice");
      setIsPinned(false);
      setContent("");
    } else {
      setMessage({
        type: "error",
        text: result.error || "저장에 실패했습니다.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-text-primary"
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

          <div className="flex items-center gap-3">
            {saving && (
              <span className="text-xs text-gray-400">저장 중...</span>
            )}
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="rounded-lg bg-[#1a1a3e] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#2a2a5e] hover:shadow-md disabled:opacity-50"
            >
              게시하기
            </button>
          </div>
        </div>
      </header>

      {/* ── 알림 메시지 ── */}
      {message && (
        <div className="mx-auto max-w-4xl px-6 pt-4">
          <div
            className={`rounded-lg px-4 py-3 text-sm font-medium transition-all ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {message.text}
          </div>
        </div>
      )}

      {/* ── 메인 카드 ── */}
      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-2xl border border-gray-200/80 bg-white shadow-sm">
          {/* 메타데이터 섹션 */}
          <div className="space-y-4 px-10 pt-10 pb-6">
            {/* 제목 */}
            <div className="group relative">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                className="w-full border-none bg-transparent text-4xl font-bold text-text-primary outline-none placeholder:text-gray-200"
              />
              <div className="mt-2 h-0.5 origin-left scale-x-0 bg-[#1a1a3e] transition-transform duration-300 group-focus-within:scale-x-100" />
            </div>

            {/* 카테고리 & 상단 고정 */}
            <div className="flex items-center gap-4 pt-2">
              <div className="relative">
                <select
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  className="cursor-pointer appearance-none rounded-full border border-gray-200 bg-gray-50 py-1.5 pr-8 pl-3.5 text-xs font-medium text-gray-600 outline-none transition-all hover:border-gray-300 hover:bg-gray-100 focus:border-[#1a1a3e] focus:bg-white"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-gray-400"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>

              <label className="flex cursor-pointer items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-xs font-medium text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="h-3.5 w-3.5 accent-[#1a1a3e]"
                />
                상단 고정
              </label>
            </div>
          </div>

          {/* 구분선 */}
          <div className="mx-10">
            <div className="h-px bg-gray-100" />
          </div>

          {/* 에디터 영역 */}
          <div className="px-10 pt-6 pb-10">
            <DynamicEditor onChange={setContent} />
          </div>
        </div>
      </main>
    </div>
  );
}

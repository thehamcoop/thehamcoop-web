"use client";

import { useState } from "react";
import DynamicEditor from "@/components/DynamicEditor";
import { savePost } from "./actions";

const CATEGORIES = [
  { value: "notice", label: "공지사항" },
  { value: "press", label: "보도자료" },
  { value: "video", label: "영상" },
  { value: "education", label: "교육" },
  { value: "manufacturing", label: "시제품 제작 & 제조" },
  { value: "marketing", label: "마케팅 & 유통" },
  { value: "rnd", label: "R&D" },
];

export default function AdminWritePage() {
  const [title, setTitle] = useState("");
  const [categorySlug, setCategorySlug] = useState("notice");
  const [isPinned, setIsPinned] = useState(false);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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
      setMessage({ type: "error", text: result.error || "저장에 실패했습니다." });
    }
  };

  return (
    <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">새 글 작성</h1>
        <p className="mt-1 text-sm text-gray-400">블로그에 게시할 새 글을 작성합니다.</p>
      </div>

      {/* 메시지 */}
      {message && (
        <div
          className={`mb-6 rounded-lg px-4 py-3 text-sm font-medium ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* 폼 영역 */}
      <div className="space-y-6">
        {/* 제목 */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#1a1a2e]">
            제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="글 제목을 입력하세요"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-[#1a1a2e] outline-none transition-colors placeholder:text-gray-300 focus:border-[#1a1a3e]"
          />
        </div>

        {/* 카테고리 + 상단 고정 */}
        <div className="flex items-end gap-6">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-semibold text-[#1a1a2e]">
              카테고리
            </label>
            <select
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#1a1a2e] outline-none transition-colors focus:border-[#1a1a3e]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 px-4 py-3">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="h-4 w-4 accent-[#1a1a3e]"
            />
            <span className="text-sm font-medium text-[#1a1a2e] whitespace-nowrap">상단 고정</span>
          </label>
        </div>

        {/* 에디터 */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#1a1a2e]">
            본문
          </label>
          <DynamicEditor onChange={setContent} />
        </div>

        {/* 저장 버튼 */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="rounded-xl bg-[#1a1a3e] px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "저장 중..." : "게시하기"}
          </button>
        </div>
      </div>
    </div>
  );
}

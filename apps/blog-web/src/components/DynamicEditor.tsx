"use client";

import dynamic from "next/dynamic";

const DynamicEditor = dynamic(() => import("@/components/Editor"), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50"
      style={{ minHeight: "400px" }}
    >
      <p className="text-sm text-gray-400">에디터 로딩 중...</p>
    </div>
  ),
});

export default DynamicEditor;

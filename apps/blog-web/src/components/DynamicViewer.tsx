"use client";

import dynamic from "next/dynamic";

const DynamicViewer = dynamic(() => import("@/components/Viewer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-20">
      <p className="text-sm text-gray-400">본문 로딩 중...</p>
    </div>
  ),
});

export default DynamicViewer;

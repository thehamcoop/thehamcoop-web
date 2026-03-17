"use client";

import { useState, useEffect, useCallback } from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

interface ViewerProps {
  content: string;
}

export default function Viewer({ content }: ViewerProps) {
  const editor = useCreateBlockNote({
    initialContent: JSON.parse(content),
  });

  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const handleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG" && target.closest(".viewer-wrapper")) {
      e.preventDefault();
      e.stopPropagation();
      setLightboxSrc((target as HTMLImageElement).src);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [handleClick]);

  return (
    <div className="viewer-wrapper">
      <BlockNoteView editor={editor} theme="light" editable={false} />

      {/* 이미지 확대 라이트박스 */}
      {lightboxSrc && (
        <div
          onClick={() => setLightboxSrc(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.8)",
            cursor: "zoom-out",
            padding: "2rem",
          }}
        >
          <img
            src={lightboxSrc}
            alt=""
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: "0.5rem",
            }}
          />
        </div>
      )}

      <style jsx global>{`
        .viewer-wrapper .bn-editor {
          font-family: var(--font-sans);
          padding: 0;
        }
        .viewer-wrapper .bn-container {
          border: none;
          border-radius: 0;
        }
        .viewer-wrapper [data-content-type="codeBlock"] {
          background-color: #F1F1F5 !important;
          border-radius: 0.5rem;
        }
        .viewer-wrapper [data-content-type="codeBlock"] code,
        .viewer-wrapper [data-content-type="codeBlock"] pre,
        .viewer-wrapper [data-content-type="codeBlock"] span,
        .viewer-wrapper [data-content-type="codeBlock"] * {
          color: #111111 !important;
        }
        .viewer-wrapper [data-text-color="gray"] .bn-inline-content {
          font-size: 0;
          line-height: 0;
          display: block;
          width: 100%;
          border-top: 1px solid #d1d5db;
          padding-top: 0.75rem;
          margin: 0.75rem 0;
        }
        .viewer-wrapper .bn-block-outer {
          padding-left: 0 !important;
        }
        .viewer-wrapper .bn-side-menu {
          display: none !important;
        }
        .viewer-wrapper img {
          cursor: zoom-in;
        }
        .viewer-wrapper .bn-file-default-preview,
        .viewer-wrapper [data-content-type="image"] a[download] {
          display: none !important;
        }
      `}</style>
    </div>
  );
}

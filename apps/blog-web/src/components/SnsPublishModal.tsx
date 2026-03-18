"use client";

import { useState, useMemo } from "react";
import {
  blocksToPlainText,
  blocksToHtml,
  extractFirstImageUrl,
} from "@/lib/contentUtils";
import {
  publishToInstagram,
  publishToNaverBlog,
} from "@/app/admin/write/webhookActions";

type Platform = "instagram" | "naver";

interface SnsPublishModalProps {
  postId: string;
  title: string;
  content: string; // BlockNote JSON string
  thumbnailUrl: string;
  onClose: () => void;
}

export default function SnsPublishModal({
  postId,
  title,
  content,
  thumbnailUrl,
  onClose,
}: SnsPublishModalProps) {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const blocks = useMemo(() => {
    try {
      return JSON.parse(content);
    } catch {
      return [];
    }
  }, [content]);

  const defaultCaption = useMemo(() => blocksToPlainText(blocks), [blocks]);
  const defaultHtml = useMemo(() => blocksToHtml(blocks), [blocks]);
  const firstImage = useMemo(
    () => thumbnailUrl || extractFirstImageUrl(blocks) || "",
    [thumbnailUrl, blocks]
  );

  // 인스타그램 수정 가능 필드
  const [instaCaption, setInstaCaption] = useState("");
  const [instaImage, setInstaImage] = useState("");

  // 네이버 블로그 수정 가능 필드
  const [naverTitle, setNaverTitle] = useState("");
  const [naverContent, setNaverContent] = useState("");

  const handleSelectPlatform = (p: Platform) => {
    setPlatform(p);
    setResult(null);
    if (p === "instagram") {
      setInstaCaption(defaultCaption);
      setInstaImage(firstImage);
    } else {
      setNaverTitle(title);
      setNaverContent(defaultHtml);
    }
  };

  const handlePublish = async () => {
    if (!platform) return;
    setPublishing(true);
    setResult(null);

    let res: { success: boolean; error?: string };

    if (platform === "instagram") {
      res = await publishToInstagram({
        postId,
        thumbnailUrl: instaImage,
        caption: instaCaption,
      });
    } else {
      res = await publishToNaverBlog({
        postId,
        title: naverTitle,
        content: naverContent,
      });
    }

    setPublishing(false);

    if (res.success) {
      setResult({
        type: "success",
        text:
          platform === "instagram"
            ? "인스타그램에 발행되었습니다!"
            : "네이버 블로그에 발행되었습니다!",
      });
    } else {
      setResult({ type: "error", text: res.error || "발행에 실패했습니다." });
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "1rem",
          width: "100%",
          maxWidth: "40rem",
          maxHeight: "85vh",
          overflow: "auto",
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
        }}
      >
        {/* 헤더 */}
        <div
          style={{
            padding: "1.5rem 2rem",
            borderBottom: "1px solid #f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>
            SNS 발행
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#9ca3af",
              fontSize: "1.25rem",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: "1.5rem 2rem" }}>
          {/* 플랫폼 선택 */}
          {!platform && (
            <div>
              <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1rem" }}>
                발행할 플랫폼을 선택하세요
              </p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  onClick={() => handleSelectPlatform("instagram")}
                  style={{
                    flex: 1,
                    padding: "2rem 1.5rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "0.75rem",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#E1306C";
                    e.currentTarget.style.backgroundColor = "#fdf2f8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.backgroundColor = "#fff";
                  }}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto" }}>
                      <rect x="2" y="2" width="20" height="20" rx="5" stroke="#E1306C" strokeWidth="2" />
                      <circle cx="12" cy="12" r="5" stroke="#E1306C" strokeWidth="2" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="#E1306C" />
                    </svg>
                  </div>
                  <div style={{ fontWeight: 600, color: "#1a1a2e", fontSize: "0.95rem" }}>
                    인스타그램
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.25rem" }}>
                    썸네일 + 캡션
                  </div>
                </button>

                <button
                  onClick={() => handleSelectPlatform("naver")}
                  style={{
                    flex: 1,
                    padding: "2rem 1.5rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "0.75rem",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#03C75A";
                    e.currentTarget.style.backgroundColor = "#f0fdf4";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.backgroundColor = "#fff";
                  }}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto" }}>
                      <rect x="2" y="2" width="20" height="20" rx="3" stroke="#03C75A" strokeWidth="2" />
                      <text
                        x="12"
                        y="16"
                        textAnchor="middle"
                        fill="#03C75A"
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                      >
                        N
                      </text>
                    </svg>
                  </div>
                  <div style={{ fontWeight: 600, color: "#1a1a2e", fontSize: "0.95rem" }}>
                    네이버 블로그
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.25rem" }}>
                    제목 + 본문
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* 인스타그램 미리보기 */}
          {platform === "instagram" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <button
                  onClick={() => setPlatform(null)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    padding: 0,
                  }}
                >
                  ← 돌아가기
                </button>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#E1306C",
                    backgroundColor: "#fdf2f8",
                    padding: "0.25rem 0.625rem",
                    borderRadius: "9999px",
                  }}
                >
                  인스타그램
                </span>
              </div>

              {/* 썸네일 미리보기 */}
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "0.5rem",
                }}
              >
                썸네일 이미지 URL
              </label>
              <input
                type="text"
                value={instaImage}
                onChange={(e) => setInstaImage(e.target.value)}
                placeholder="이미지 URL을 입력하세요"
                style={{
                  width: "100%",
                  padding: "0.625rem 0.875rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  fontSize: "0.85rem",
                  outline: "none",
                  boxSizing: "border-box",
                  marginBottom: "0.75rem",
                }}
              />
              {instaImage && (
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    maxHeight: "280px",
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                    backgroundColor: "#f3f4f6",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={instaImage}
                    alt="인스타그램 썸네일 미리보기"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              {/* 캡션 */}
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "0.5rem",
                }}
              >
                캡션
              </label>
              <textarea
                value={instaCaption}
                onChange={(e) => setInstaCaption(e.target.value)}
                rows={10}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  marginTop: "0.25rem",
                }}
              >
                {instaCaption.length} / 2,200자
              </p>
            </div>
          )}

          {/* 네이버 블로그 미리보기 */}
          {platform === "naver" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <button
                  onClick={() => setPlatform(null)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    padding: 0,
                  }}
                >
                  ← 돌아가기
                </button>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#03C75A",
                    backgroundColor: "#f0fdf4",
                    padding: "0.25rem 0.625rem",
                    borderRadius: "9999px",
                  }}
                >
                  네이버 블로그
                </span>
              </div>

              {/* 제목 */}
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "0.5rem",
                }}
              >
                제목
              </label>
              <input
                type="text"
                value={naverTitle}
                onChange={(e) => setNaverTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.625rem 0.875rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  fontWeight: 600,
                  outline: "none",
                  boxSizing: "border-box",
                  marginBottom: "1rem",
                }}
              />

              {/* 본문 HTML 미리보기 */}
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "0.5rem",
                }}
              >
                본문 (HTML)
              </label>
            </div>
          )}

          {/* 네이버 미리보기/HTML 탭 - 별도 상태로 관리 */}
          {platform === "naver" && <NaverContentEditor html={naverContent} onChange={setNaverContent} />}

          {/* 결과 메시지 */}
          {result && (
            <div
              style={{
                marginTop: "1rem",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                backgroundColor: result.type === "success" ? "#ecfdf5" : "#fef2f2",
                color: result.type === "success" ? "#047857" : "#dc2626",
              }}
            >
              {result.text}
            </div>
          )}

          {/* 발행 버튼 */}
          {platform && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.75rem",
                marginTop: "1.5rem",
                paddingTop: "1.25rem",
                borderTop: "1px solid #f3f4f6",
              }}
            >
              <button
                onClick={onClose}
                style={{
                  padding: "0.625rem 1.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#6b7280",
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.625rem",
                  cursor: "pointer",
                }}
              >
                닫기
              </button>
              <button
                onClick={handlePublish}
                disabled={publishing}
                style={{
                  padding: "0.625rem 1.75rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#fff",
                  backgroundColor:
                    platform === "instagram" ? "#E1306C" : "#03C75A",
                  border: "none",
                  borderRadius: "0.625rem",
                  cursor: publishing ? "not-allowed" : "pointer",
                  opacity: publishing ? 0.5 : 1,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  transition: "all 0.2s",
                }}
              >
                {publishing ? "발행 중..." : "발행하기"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── 네이버 본문 편집기 (미리보기 / HTML 탭) ── */
function NaverContentEditor({
  html,
  onChange,
}: {
  html: string;
  onChange: (v: string) => void;
}) {
  const [tab, setTab] = useState<"preview" | "html">("preview");

  return (
    <div>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <button
          onClick={() => setTab("preview")}
          style={{
            padding: "0.375rem 0.875rem",
            fontSize: "0.75rem",
            fontWeight: tab === "preview" ? 600 : 400,
            color: tab === "preview" ? "#03C75A" : "#9ca3af",
            backgroundColor: tab === "preview" ? "#f0fdf4" : "transparent",
            border: `1px solid ${tab === "preview" ? "#03C75A" : "#e5e7eb"}`,
            borderRadius: "0.375rem",
            cursor: "pointer",
          }}
        >
          미리보기
        </button>
        <button
          onClick={() => setTab("html")}
          style={{
            padding: "0.375rem 0.875rem",
            fontSize: "0.75rem",
            fontWeight: tab === "html" ? 600 : 400,
            color: tab === "html" ? "#03C75A" : "#9ca3af",
            backgroundColor: tab === "html" ? "#f0fdf4" : "transparent",
            border: `1px solid ${tab === "html" ? "#03C75A" : "#e5e7eb"}`,
            borderRadius: "0.375rem",
            cursor: "pointer",
          }}
        >
          HTML 편집
        </button>
      </div>

      {tab === "preview" ? (
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            padding: "1.25rem",
            minHeight: "200px",
            maxHeight: "300px",
            overflow: "auto",
            fontSize: "0.9rem",
            lineHeight: 1.7,
            color: "#374151",
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <textarea
          value={html}
          onChange={(e) => onChange(e.target.value)}
          rows={12}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            fontSize: "0.8rem",
            fontFamily: "monospace",
            lineHeight: 1.5,
            resize: "vertical",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      )}
    </div>
  );
}

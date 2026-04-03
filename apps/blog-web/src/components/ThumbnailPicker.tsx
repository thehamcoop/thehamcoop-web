"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const DEFAULT_THUMBNAIL = "/images/default-thumbnail.svg";
const ASPECT = 16 / 9;

interface ThumbnailPickerProps {
  content: string;
  thumbnailUrl: string;
  thumbnailPosition: string;
  onChange: (url: string, position: string) => void;
}

export function parseCrop(pos: string) {
  if (!pos || pos.includes("%")) return { x: 0, y: 0, w: 100, h: 100 };
  const p = pos.split(" ").map(Number);
  return { x: p[0] ?? 0, y: p[1] ?? 0, w: p[2] ?? 100, h: p[3] ?? 100 };
}

function encodeCrop(x: number, y: number, w: number, h: number) {
  const r = (n: number) => Math.round(n * 10) / 10;
  return `${r(x)} ${r(y)} ${r(w)} ${r(h)}`;
}

function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }

function extractAllImageUrls(content: string): string[] {
  if (!content || content === "[]") return [];
  try {
    const blocks = JSON.parse(content);
    const urls: string[] = [];
    (function walk(items: any[]) {
      for (const item of items) {
        if (item.type === "image" && item.props?.url) urls.push(item.props.url);
        if (item.children) walk(item.children);
      }
    })(blocks);
    return urls;
  } catch { return []; }
}

type Handle = "move" | "nw" | "ne" | "sw" | "se";

export default function ThumbnailPicker({ content, thumbnailUrl, thumbnailPosition, onChange }: ThumbnailPickerProps) {
  const images = extractAllImageUrls(content);
  const [editing, setEditing] = useState(false);
  const [showSelector, setShowSelector] = useState(false);

  const crop = parseCrop(thumbnailPosition);
  const currentUrl = thumbnailUrl || (images.length > 0 ? images[0] : DEFAULT_THUMBNAIL);
  const isDefault = currentUrl === DEFAULT_THUMBNAIL;

  const canvasRef = useRef<HTMLDivElement>(null);
  const activeHandle = useRef<Handle | null>(null);
  const startRef = useRef({ mx: 0, my: 0, crop: { ...crop } });

  const applyCrop = useCallback((x: number, y: number, w: number, h: number) => {
    // Ensure crop stays within 0-100 bounds
    w = clamp(w, 15, 100);
    h = clamp(h, 8, 100);
    x = clamp(x, 0, 100 - w);
    y = clamp(y, 0, 100 - h);
    onChange(currentUrl, encodeCrop(x, y, w, h));
  }, [currentUrl, onChange]);

  const onHandleDown = useCallback((e: React.MouseEvent, handle: Handle) => {
    e.preventDefault();
    e.stopPropagation();
    activeHandle.current = handle;
    startRef.current = { mx: e.clientX, my: e.clientY, crop: { ...crop } };
  }, [crop]);

  useEffect(() => {
    if (!editing) return;
    const onMove = (e: MouseEvent) => {
      if (!activeHandle.current || !canvasRef.current) return;
      e.preventDefault();
      const rect = canvasRef.current.getBoundingClientRect();
      const dx = ((e.clientX - startRef.current.mx) / rect.width) * 100;
      const dy = ((e.clientY - startRef.current.my) / rect.height) * 100;
      const s = startRef.current.crop;
      const mode = activeHandle.current;
      const cRatio = rect.width / rect.height; // canvas aspect ratio

      if (mode === "move") {
        applyCrop(s.x + dx, s.y + dy, s.w, s.h);
        return;
      }

      // For resize: compute new width from dx, derive height from 16:9 ratio
      // adjusted for the canvas aspect ratio
      let nw: number, nh: number, nx: number, ny: number;

      if (mode === "se") {
        nw = clamp(s.w + dx, 15, 100 - s.x);
        nh = (nw / ASPECT) * cRatio;
        if (s.y + nh > 100) { nh = 100 - s.y; nw = (nh * ASPECT) / cRatio; }
        nx = s.x; ny = s.y;
      } else if (mode === "ne") {
        nw = clamp(s.w + dx, 15, 100 - s.x);
        nh = (nw / ASPECT) * cRatio;
        ny = s.y + s.h - nh;
        if (ny < 0) { ny = 0; nh = s.y + s.h; nw = (nh * ASPECT) / cRatio; }
        nx = s.x;
      } else if (mode === "sw") {
        nw = clamp(s.w - dx, 15, s.x + s.w);
        nh = (nw / ASPECT) * cRatio;
        nx = s.x + s.w - nw;
        if (nx < 0) { nx = 0; nw = s.x + s.w; nh = (nw / ASPECT) * cRatio; }
        ny = s.y;
        if (ny + nh > 100) { nh = 100 - ny; nw = (nh * ASPECT) / cRatio; nx = s.x + s.w - nw; }
      } else { // nw
        nw = clamp(s.w - dx, 15, s.x + s.w);
        nh = (nw / ASPECT) * cRatio;
        nx = s.x + s.w - nw;
        ny = s.y + s.h - nh;
        if (nx < 0) { nx = 0; nw = s.x + s.w; nh = (nw / ASPECT) * cRatio; ny = s.y + s.h - nh; }
        if (ny < 0) { ny = 0; nh = s.y + s.h; nw = (nh * ASPECT) / cRatio; nx = s.x + s.w - nw; }
      }

      applyCrop(nx, ny, nw, nh);
    };
    const onUp = () => { activeHandle.current = null; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [editing, applyCrop]);

  return (
    <div style={{ marginTop: "2rem" }}>
      <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#374151", marginBottom: "0.5rem" }}>커버 이미지</div>

      {!editing ? (
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "0.75rem", overflow: "hidden", border: "1px solid #e5e7eb", backgroundColor: "#f3f4f6" }}>
          <CroppedImage src={currentUrl} crop={crop} />
          <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", display: "flex", gap: "0.375rem" }}>
            {!isDefault && <Btn onClick={() => setEditing(true)}>위치 조정</Btn>}
            <Btn onClick={() => setShowSelector(true)}>이미지 변경</Btn>
          </div>
        </div>
      ) : (
        <div>
          {/* Canvas: image with crop overlay */}
          <div ref={canvasRef} style={{ position: "relative", width: "100%", borderRadius: "0.75rem", overflow: "hidden", border: "2px solid #1a1a3e", lineHeight: 0 }}>
            {/* Base image */}
            <img src={currentUrl} alt="" draggable={false} style={{ display: "block", width: "100%", height: "auto", filter: "brightness(0.4)" }} />

            {/* Crop box: clip to show bright image */}
            <div
              onMouseDown={(e) => onHandleDown(e, "move")}
              style={{
                position: "absolute",
                left: `${crop.x}%`, top: `${crop.y}%`,
                width: `${crop.w}%`, height: `${crop.h}%`,
                border: "2px solid rgba(255,255,255,0.9)",
                borderRadius: 2,
                cursor: "move",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              {/* Bright image clipped to crop area */}
              <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                <img
                  src={currentUrl} alt="" draggable={false}
                  style={{
                    display: "block",
                    position: "absolute",
                    // Scale image to fill the full canvas size, offset to align
                    width: `${100 / crop.w * 100}%`,
                    height: `${100 / crop.h * 100}%`,
                    left: `${-crop.x / crop.w * 100}%`,
                    top: `${-crop.y / crop.h * 100}%`,
                    maxWidth: "none",
                    maxHeight: "none",
                  }}
                />
              </div>

              {/* Corner handles */}
              {(["nw","ne","sw","se"] as const).map((c) => (
                <div key={c} onMouseDown={(e) => onHandleDown(e, c)} style={{
                  position: "absolute", width: 12, height: 12,
                  background: "#fff", border: "1px solid #666", borderRadius: 2,
                  cursor: `${c}-resize`, zIndex: 5,
                  ...(c[0]==="n" ? {top:-6} : {bottom:-6}),
                  ...(c[1]==="w" ? {left:-6} : {right:-6}),
                }} />
              ))}

              <div style={{ position: "absolute", bottom: 3, right: 5, fontSize: 10, color: "rgba(255,255,255,0.85)", fontWeight: 600, textShadow: "0 1px 3px rgba(0,0,0,0.6)", pointerEvents: "none" }}>16:9</div>
            </div>
          </div>

          <div style={{ marginTop: "0.5rem", display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => setEditing(false)} style={{ padding: "0.5rem 1.25rem", fontSize: "0.8125rem", fontWeight: 600, color: "#fff", backgroundColor: "#1a1a3e", border: "none", borderRadius: "0.5rem", cursor: "pointer" }}>완료</button>
          </div>
        </div>
      )}

      {showSelector && <SelectorModal images={images} currentUrl={currentUrl} onSelect={(url) => { onChange(url, "0 0 100 100"); setShowSelector(false); }} onClose={() => setShowSelector(false)} />}
    </div>
  );
}

function CroppedImage({ src, crop }: { src: string; crop: ReturnType<typeof parseCrop> }) {
  if (crop.w >= 99 && crop.h >= 99) {
    return <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
  }
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <img src={src} alt="" draggable={false} style={{
        position: "absolute",
        width: `${(100/crop.w)*100}%`, height: `${(100/crop.h)*100}%`,
        left: `${-(crop.x/crop.w)*100}%`, top: `${-(crop.y/crop.h)*100}%`,
        maxWidth: "none", maxHeight: "none",
      }} />
    </div>
  );
}

function Btn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return <button onClick={onClick} style={{ padding: "0.375rem 0.75rem", fontSize: "0.75rem", fontWeight: 500, color: "#fff", backgroundColor: "rgba(0,0,0,0.5)", border: "none", borderRadius: "0.375rem", cursor: "pointer", backdropFilter: "blur(4px)" }}>{children}</button>;
}

function SelectorModal({ images, currentUrl, onSelect, onClose }: { images: string[]; currentUrl: string; onSelect: (url: string) => void; onClose: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: "#fff", borderRadius: "1rem", padding: "1.5rem", maxWidth: "36rem", width: "90vw", maxHeight: "80vh", overflow: "auto", boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}>
        <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#1a1a2e", marginBottom: "1rem" }}>커버 이미지 선택</div>
        <div style={{ fontSize: "0.75rem", fontWeight: 500, color: "#6b7280", marginBottom: "0.5rem" }}>기본 이미지</div>
        <div onClick={() => onSelect("/images/default-thumbnail.svg")} style={{ width: "8rem", aspectRatio: "16/9", borderRadius: "0.5rem", overflow: "hidden", cursor: "pointer", border: currentUrl === "/images/default-thumbnail.svg" ? "2.5px solid #1a1a3e" : "2px solid #e5e7eb", marginBottom: "1rem" }}>
          <img src="/images/default-thumbnail.svg" alt="기본" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        {images.length > 0 && (
          <>
            <div style={{ fontSize: "0.75rem", fontWeight: 500, color: "#6b7280", marginBottom: "0.5rem" }}>본문 이미지</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.5rem" }}>
              {images.map((url, i) => (
                <div key={i} onClick={() => onSelect(url)} style={{ aspectRatio: "16/9", borderRadius: "0.5rem", overflow: "hidden", cursor: "pointer", border: url === currentUrl ? "2.5px solid #1a1a3e" : "2px solid #e5e7eb", position: "relative" }}>
                  <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  {url === currentUrl && <div style={{ position: "absolute", top: 4, right: 4, width: 20, height: 20, borderRadius: "50%", backgroundColor: "#1a1a3e", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></div>}
                </div>
              ))}
            </div>
          </>
        )}
        <button onClick={onClose} style={{ marginTop: "1rem", width: "100%", padding: "0.625rem", fontSize: "0.8125rem", fontWeight: 500, color: "#6b7280", backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "0.5rem", cursor: "pointer" }}>닫기</button>
      </div>
    </div>
  );
}

export function getThumbnailStyle(position: string | undefined): React.CSSProperties {
  const crop = parseCrop(position || "");
  if (crop.w >= 99 && crop.h >= 99) {
    return { width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" };
  }
  return {
    position: "absolute",
    width: `${(100/crop.w)*100}%`,
    height: `${(100/crop.h)*100}%`,
    left: `${-(crop.x/crop.w)*100}%`,
    top: `${-(crop.y/crop.h)*100}%`,
    maxWidth: "none",
    maxHeight: "none",
  };
}

"use client";

import { useState } from "react";
import { SITE, FOOTER } from "@/constants/site";
import { useAdmin } from "@/context/AdminContext";

const MAIN_URL = process.env.NEXT_PUBLIC_MAIN_URL || "http://localhost:3000";

export default function Footer() {
  const { isAdmin, login, logout } = useAdmin();
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    const success = await login(password);
    if (success) {
      setShowModal(false);
      setPassword("");
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <footer className="border-t border-gray-200 bg-gray-50 px-6 py-12 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-2">
          <span className="text-xl font-bold" style={{ color: "#164761" }}>
            더함협동조합
          </span>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            {SITE.description}
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-gray-900">바로가기</h4>
          <ul className="flex flex-col gap-2">
            <li>
              <a
                href={`${MAIN_URL}/consultation`}
                className="text-sm text-gray-500 transition-colors hover:text-gray-900"
              >
                문의하기
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-gray-900">연락처</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-500">
            <li>{FOOTER.address}</li>
            <li>{FOOTER.phone}</li>
            <li>{FOOTER.email}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-gray-200 pt-6 text-left text-xs leading-relaxed text-gray-400">
        <p>상호명: 더함협동조합</p>
        <p>대표자: 김남현</p>
        <p>사업자 등록 번호: 707-81-03048</p>
        <p>주소: 충청남도 천안시 서북구 충무로 143-10(쌍용동)</p>
        <p>유선전화: 070-7954-6965</p>
        <div className="mt-2 flex items-center justify-between">
          <p>Copyright &copy; 2023 더함협동조합. All rights reserved.</p>
          {isAdmin ? (
            <button
              onClick={logout}
              className="text-xs text-gray-300 transition-colors hover:text-gray-500"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="text-xs text-gray-300 transition-colors hover:text-gray-500"
            >
              Admin
            </button>
          )}
        </div>
      </div>

      {/* 비밀번호 모달 */}
      {showModal && (
        <div
          onClick={() => {
            setShowModal(false);
            setPassword("");
            setError(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "0.75rem",
              padding: "2rem",
              width: "100%",
              maxWidth: "20rem",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#1a1a2e",
                marginBottom: "1rem",
              }}
            >
              관리자 인증
            </h3>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin();
              }}
              placeholder="비밀번호 입력"
              autoFocus
              style={{
                width: "100%",
                padding: "0.625rem 0.875rem",
                fontSize: "0.875rem",
                border: `1px solid ${error ? "#ef4444" : "#e5e7eb"}`,
                borderRadius: "0.5rem",
                outline: "none",
              }}
            />
            {error && (
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#ef4444",
                  marginTop: "0.5rem",
                }}
              >
                비밀번호가 일치하지 않습니다.
              </p>
            )}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginTop: "1rem",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => {
                  setShowModal(false);
                  setPassword("");
                  setError(false);
                }}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: "#6b7280",
                  backgroundColor: "transparent",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                }}
              >
                취소
              </button>
              <button
                onClick={handleLogin}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  backgroundColor: "#1a1a3e",
                  border: "none",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

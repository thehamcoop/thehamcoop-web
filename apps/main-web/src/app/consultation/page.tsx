"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const VISIT_CHANNELS = [
  "검색엔진",
  "SNS",
  "지인 추천",
  "블로그",
  "유튜브",
  "뉴스/기사",
  "전시/행사",
  "기타",
];

export default function ConsultationPage() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    message: "",
  });

  function toggleChannel(ch: string) {
    setSelectedChannels((prev) =>
      prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch],
    );
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) {
      alert("개인정보 수집에 동의해주세요.");
      return;
    }
    alert("상담 신청이 완료되었습니다. 감사합니다!");
  }

  return (
    <div className="relative min-h-screen">
      {/* Left: Logo Section — starts full-width, shrinks to 50% */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "50%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:items-center md:justify-center"
        style={{ backgroundColor: "#000830" }}
      >
        <div className="flex flex-col items-center gap-4">
          <img
            src="/images/thehamcoop-logo.svg"
            alt="logo"
            className="h-16 w-16"
          />
          <div className="flex flex-col items-center leading-tight">
            <span className="text-2xl font-bold text-white">더함 협동조합</span>
            <span className="text-xs font-semibold tracking-widest text-white/60">
              THEHAM COOPERATIVE
            </span>
          </div>
        </div>
      </motion.div>

      {/* Mobile: Logo section — starts full screen, shrinks to auto */}
      <motion.div
        initial={{ height: "100vh" }}
        animate={{ height: "auto" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className="sticky top-0 z-20 flex items-center justify-center bg-[#000830] md:hidden"
      >
        {/* Full logo — visible initially, hidden after shrink */}
        <motion.div
          initial={{ opacity: 1, position: "absolute" }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <img
            src="/images/thehamcoop-logo.svg"
            alt="logo"
            className="h-16 w-16"
          />
          <div className="flex flex-col items-center leading-tight">
            <span className="text-2xl font-bold text-white">더함 협동조합</span>
            <span className="text-xs font-semibold tracking-widest text-white/60">
              THEHAM COOPERATIVE
            </span>
          </div>
        </motion.div>

        {/* Compact header — fades in and stays fixed */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="flex flex-col items-center py-4"
        >
          <span className="text-lg font-bold text-white">더함 협동조합</span>
          <span className="text-[0.6rem] font-semibold tracking-widest text-white/60">
            THEHAM COOPERATIVE
          </span>
        </motion.div>
      </motion.div>

      {/* Form Section — slides in from bottom (mobile) or right (desktop) */}
      {isMobile !== null && (
        <motion.div
          key={isMobile ? "mobile" : "desktop"}
          initial={isMobile ? { y: "100vh" } : { x: "100%" }}
          animate={isMobile ? { y: 0 } : { x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: isMobile ? 0.5 : 0 }}
          className="relative z-10 flex min-h-[70vh] items-start justify-center bg-white md:min-h-screen md:items-center md:ml-[50%] md:w-1/2"
        >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl space-y-8 px-8 py-12 md:px-16"
        >
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800"
          >
            &larr; 홈으로 돌아가기
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">상담 신청</h1>
            <p className="mt-2 text-sm text-gray-500">
              아래 양식을 작성해 주시면 빠르게 연락드리겠습니다.
            </p>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#2DB7C1] focus:ring-1 focus:ring-[#2DB7C1]"
                placeholder="홍길동"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#2DB7C1] focus:ring-1 focus:ring-[#2DB7C1]"
                placeholder="010-0000-0000"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#2DB7C1] focus:ring-1 focus:ring-[#2DB7C1]"
              placeholder="example@email.com"
            />
          </div>

          {/* Company */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              회사/기관명
            </label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#2DB7C1] focus:ring-1 focus:ring-[#2DB7C1]"
              placeholder="소속 회사 또는 기관"
            />
          </div>

          {/* Visit Channel Tags */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              방문 경로 <span className="text-gray-400">(복수 선택 가능)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {VISIT_CHANNELS.map((ch) => {
                const selected = selectedChannels.includes(ch);
                return (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => toggleChannel(ch)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      selected
                        ? "border-[#2DB7C1] bg-[#2DB7C1] text-white"
                        : "border-gray-300 text-gray-600 hover:border-[#2DB7C1] hover:text-[#2DB7C1]"
                    }`}
                  >
                    {ch}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              추가 문의 사항
            </label>
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#2DB7C1] focus:ring-1 focus:ring-[#2DB7C1]"
              placeholder="프로젝트에 대해 간단히 설명해 주세요."
            />
          </div>

          {/* Privacy Agreement */}
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded accent-[#2DB7C1]"
            />
            <span className="text-sm leading-relaxed text-gray-600">
              <span className="font-medium text-gray-900">
                개인정보 수집 및 이용에 동의합니다.
              </span>{" "}
              상담 목적으로 이름, 연락처, 이메일을 수집하며 상담 완료 후
              지체없이 파기합니다.
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg py-4 text-base font-semibold text-white transition-shadow hover:shadow-lg"
            style={{
              background: "linear-gradient(to right, #2DB7C1, #1A8A91)",
            }}
          >
            제출하기
          </button>
        </form>
        </motion.div>
      )}
    </div>
  );
}

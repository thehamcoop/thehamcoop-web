"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const VISIT_CHANNELS = [
  "유튜브",
  "구글 검색",
  "네이버 검색",
  "네이버 블로그",
  "인블로그",
  "지인 추천",
  "GPT 검색",
  "그 외",
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
  const [otherChannel, setOtherChannel] = useState("");
  const [budget, setBudget] = useState("");
  const [taskType, setTaskType] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
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
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: isMobile ? 0.5 : 0,
          }}
          className="relative z-10 flex min-h-[70vh] items-start justify-center bg-white md:min-h-screen md:items-center md:ml-[50%] md:w-1/2"
        >
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl space-y-8 px-4 py-12 md:px-8"
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
                문의사항을 아래 형식에 맞춰 남겨주시길 바랍니다.
              </p>
              <p className="mt-4 text-sm text-gray-500">
                검토 후 3영업일 이내에 회신 드리겠습니다.
              </p>
            </div>

            {/* Visit Channel Tags */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                방문 경로 <span className="text-red-500">*</span>{" "}
                <span className="text-gray-400">(복수 선택 가능)</span>
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
              {selectedChannels.includes("그 외") && (
                <div className="mt-3">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    그 외 방문경로{" "}
                    <span className="text-gray-400">
                      (구체적으로 작성 부탁드립니다.)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={otherChannel}
                    onChange={(e) => setOtherChannel(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#2DB7C1] focus:ring-1 focus:ring-[#2DB7C1]"
                    placeholder="방문경로를 입력해주세요."
                  />
                </div>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                성함 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#2DB7C1] focus:ring-1 focus:ring-[#2DB7C1]"
                placeholder="고객명을 입력해주세요."
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#2DB7C1] focus:ring-1 focus:ring-[#2DB7C1]"
                placeholder="연락처를 입력해주세요."
              />
            </div>

            {/* Company */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                기관/직함 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company"
                required
                value={form.company}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#2DB7C1] focus:ring-1 focus:ring-[#2DB7C1]"
                placeholder="ex) 더합협동조합/이사장"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#2DB7C1] focus:ring-1 focus:ring-[#2DB7C1]"
                placeholder="이메일을 입력해주세요."
              />
            </div>

            {/* Message */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                프로젝트 한 줄 설명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#2DB7C1] focus:ring-1 focus:ring-[#2DB7C1]"
                placeholder="프로젝트 이름을 입력해주세요."
              />
            </div>

            {/* Budget */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                희망 견적 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 text-sm text-gray-900 outline-none focus:border-[#2DB7C1] focus:ring-1 focus:ring-[#2DB7C1]"
                  placeholder="예상 견적을 입력해주세요."
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  원
                </span>
              </div>
            </div>

            {/* Task Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                의뢰 업무 <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {["운영 문의", "교육 문의", "상담"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTaskType(type)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      taskType === type
                        ? "border-[#2DB7C1] bg-[#2DB7C1] text-white"
                        : "border-gray-300 text-gray-600 hover:border-[#2DB7C1] hover:text-[#2DB7C1]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Request Detail */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                의뢰 내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                name="detail"
                rows={5}
                required
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#2DB7C1] focus:ring-1 focus:ring-[#2DB7C1]"
                placeholder="의뢰 내용을 입력해주세요."
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                의뢰 파일
              </label>
              <p className="mb-2 text-sm text-gray-400">
                ({files.length}/30) 최대 30mb 파일만 업로드 할 수 있어요.
              </p>
              {files.length > 0 && (
                <div className="mb-2 flex flex-col gap-1">
                  {files.map((file, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700"
                    >
                      <span className="truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFiles((prev) => prev.filter((_, idx) => idx !== i))
                        }
                        className="ml-2 text-gray-400 hover:text-red-500"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <label className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-[#2DB7C1] hover:text-[#2DB7C1]">
                + 파일 업로드
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) {
                      const newFiles = Array.from(e.target.files).filter(
                        (f) => f.size <= 30 * 1024 * 1024,
                      );
                      setFiles((prev) => [...prev, ...newFiles].slice(0, 30));
                    }
                    e.target.value = "";
                  }}
                />
              </label>
            </div>

            {/* Privacy Agreement */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  개인정보 수집동의 <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  전문보기
                </button>
              </div>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#2DB7C1]"
                />
                <span className="text-sm text-gray-600">네, 동의합니다.</span>
              </label>
            </div>

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

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowPrivacyModal(false)}
        >
          <div
            className="mx-4 max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              개인정보 수집 및 이용 동의
            </h3>
            <div className="space-y-4 text-sm leading-relaxed text-gray-600">
              <p>
                <strong className="text-gray-900">1. 수집 항목</strong>
                <br />
                성함, 연락처, 이메일, 기관/직함, 프로젝트 정보, 의뢰 내용
              </p>
              <p>
                <strong className="text-gray-900">2. 수집 목적</strong>
                <br />
                상담 신청 접수 및 회신, 프로젝트 관련 커뮤니케이션
              </p>
              <p>
                <strong className="text-gray-900">3. 보유 및 이용 기간</strong>
                <br />
                수집 목적 달성 후 지체 없이 파기합니다. 단, 관련 법령에 의해
                보존이 필요한 경우 해당 기간 동안 보관합니다.
              </p>
              <p>
                <strong className="text-gray-900">4. 동의 거부 권리</strong>
                <br />
                개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 다만,
                동의를 거부하실 경우 상담 신청이 제한될 수 있습니다.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowPrivacyModal(false)}
              className="mt-6 w-full rounded-lg py-3 text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(to right, #2DB7C1, #1A8A91)",
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

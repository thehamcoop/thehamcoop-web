"use client";

const TEAM_MEMBERS = [
  {
    name: "오승민",
    role: "CEO",
    credentials: [
      "과기부 산하 기관 최연소 자문위원",
      "예창패 등 다수 정부지원사업 경험",
      "패스트 캠퍼스 AI/개발 강의 분야 1위",
      "2025년 AI 분야 과기부 장관상",
      "대기업/대규모 프로젝트 경험",
      "前 더빙 스타트업 AI 엔지니어",
    ],
  },
  {
    name: "강연우",
    role: "COO",
    credentials: [
      "자사 자동화시스템 총괄",
      "예창패 등 정부지원사업 경험 다수",
      "前 더빙 스타트업 AI 엔지니어",
    ],
  },
  {
    name: "김형주",
    role: "CTO",
    credentials: [
      "제 18회 임베디드SW경진대회",
      "자율주행자동차 부문 수상",
      "영재고등학교 졸업",
      "예창패 등 다수 정부지원사업 경험",
      "前 더빙 스타트업 AI 엔지니어",
    ],
  },
  {
    name: "안승원",
    role: "CCO",
    credentials: [
      "패스트캠퍼스 1위 강의 런칭",
      "NCA 바이브코딩 강사",
      "오즈코딩스쿨 KDT 강사",
      "패스트캠퍼스 IT 교육 강사",
      "대모산개발단 유튜브 채널운영",
    ],
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="min-h-screen bg-white px-6 pt-32 pb-24 md:px-12 lg:px-20"
    >
      <h2 className="mb-16 text-3xl font-bold text-black md:text-5xl">
        최고 전문 인력이
        <br />
        오직 대표님을 위해 일합니다
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.name}
            className="rounded-2xl border border-gray-200 bg-white p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <h3 className="text-xl font-bold text-black">{member.name}</h3>
              <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                {member.role}
              </span>
            </div>

            <ul className="space-y-1.5">
              {member.credentials.map((cred, i) => (
                <li key={i} className="text-sm leading-relaxed text-gray-600">
                  {cred}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "더함협동조합";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
        }}
      >
        {/* 로고 */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 48 48"
          fill="none"
        >
          <circle cx="41.5" cy="6.5" r="4.5" fill="#24536A" />
          <path
            d="M25.7627 18C28.1027 18 30 19.8973 30 22.2373V43.7627C30 46.1027 28.1027 48 25.7627 48H17V31H0V22.2373C0 19.8973 1.89727 18 4.2373 18H25.7627ZM19 29H19.0908V28.9092H19V29Z"
            fill="#F16D71"
          />
          <path
            opacity="0.8"
            d="M30 18H48V25.8213C48 28.6813 45.6813 31 42.8213 31H22.1787C19.3187 31 17 28.6813 17 25.8213V5.17871C17 2.31867 19.3187 0 22.1787 0H30V18ZM28.2725 19.7275H28.3662V19.6338H28.2725V19.7275Z"
            fill="#2DB7C1"
          />
          <path
            opacity="0.8"
            d="M25.7627 18C28.1027 18 30 19.8973 30 22.2373V31H22.1787C19.3187 31 17 28.6813 17 25.8213V18H25.7627ZM19 29H19.0908V28.9092H19V29ZM28.2725 19.7275H28.3662V19.6338H28.2725V19.7275Z"
            fill="#24536A"
          />
        </svg>

        {/* 한글 이름 */}
        <div
          style={{
            marginTop: 32,
            fontSize: 56,
            fontWeight: 800,
            color: "#164761",
            letterSpacing: "-0.02em",
          }}
        >
          더함협동조합
        </div>

        {/* 영어 이름 */}
        <div
          style={{
            marginTop: 8,
            fontSize: 20,
            fontWeight: 600,
            color: "#164761",
            letterSpacing: "0.15em",
          }}
        >
          THEHAM COOPERATIVE
        </div>
      </div>
    ),
    { ...size }
  );
}

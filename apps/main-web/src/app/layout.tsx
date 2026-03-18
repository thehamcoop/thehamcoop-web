import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://thehamcoop.vercel.app";
const DESCRIPTION =
  "더함협동조합은 창업 제품 기획부터 시제품 제작, 런칭, 판매, 투자 및 교육까지 모든 과정을 함께 합니다.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "더함협동조합",
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "더함협동조합",
    title: "더함협동조합",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "더함협동조합",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="min-h-screen bg-bg-primary font-sans text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}

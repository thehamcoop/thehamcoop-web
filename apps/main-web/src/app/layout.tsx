import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/constants/site";
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "더함협동조합",
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE.url,
    siteName: "더함협동조합",
    title: "더함협동조합",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "더함협동조합",
    description: SITE.description,
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

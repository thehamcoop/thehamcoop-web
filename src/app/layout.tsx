import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demodev Clone",
  description: "Demodev Clone with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DemoDev Clone",
  description: "DemoDev Clone - Creative Development Agency",
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

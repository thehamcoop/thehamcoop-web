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
      <body className="min-h-screen bg-bg-primary font-sans text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}

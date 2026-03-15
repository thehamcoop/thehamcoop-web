import { notFound } from "next/navigation";
import Link from "next/link";
import { PORTFOLIO_ITEMS } from "@/constants/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = PORTFOLIO_ITEMS.find((p) => p.slug === slug);

  if (!item) return notFound();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6">
      <h1
        className="text-6xl font-black tracking-wide"
        style={{ color: item.bgColor }}
      >
        {item.title}
      </h1>
      <p className="text-lg text-text-secondary">{item.subtitle}</p>
      <Link
        href="/#portfolio"
        className="mt-4 rounded-full border border-border-default px-6 py-2 text-sm text-text-secondary transition-colors hover:bg-bg-card hover:text-text-primary"
      >
        &larr; 돌아가기
      </Link>
    </main>
  );
}

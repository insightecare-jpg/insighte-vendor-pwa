import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/services/shared/ServicePageTemplate";
import { SERVICE_REGISTRY, getServiceBySlug } from "@/lib/services/registry";

// ─── GENERATE METADATA ───────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svcData = getServiceBySlug(slug);

  if (!svcData) {
    return { title: "Service Not Found | Insighte" };
  }

  return {
    title: svcData.metadata?.title || `${svcData.hero.headline} | Insighte`,
    description: svcData.metadata?.description || svcData.hero.subheadline,
    keywords: svcData.metadata?.keywords,
    openGraph: {
      title: svcData.metadata?.title || svcData.hero.headline,
      description: svcData.metadata?.description || svcData.hero.subheadline,
      type: "website",
    },
  };
}

// ─── GENERATE STATIC PARAMS ──────────────────────────────────────────────────

export async function generateStaticParams() {
  return Object.keys(SERVICE_REGISTRY).map((slug) => ({
    slug,
  }));
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svcData = getServiceBySlug(slug);

  if (!svcData) {
    notFound();
  }

  // Derive service name from headline or slug
  const serviceName = svcData.hero.headline.split(' in ')[0] || "Service";

  return <ServicePageTemplate data={svcData} serviceName={serviceName} slug={slug} />;
}

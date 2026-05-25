import { notFound } from "next/navigation";
import Script from "next/script";
import type { Metadata } from "next";
import { coreDefinitions, getDefinitionBySlug, SOURCE } from "@/data/ssi-definitions";
import DefinitionTemplate from "@/components/DefinitionTemplate";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return coreDefinitions.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const def = getDefinitionBySlug(params.slug);
  if (!def) return {};
  const url = `https://vetssi.com/ssi-definitions/core/${def.slug}`;
  const description = def.tagline;
  return {
    title: def.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${def.title} | VETSSI`,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${def.title} | VETSSI`,
      description,
    },
  };
}

export default function CoreDefinitionPage({ params }: Props) {
  const def = getDefinitionBySlug(params.slug);
  if (!def) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://vetssi.com" },
      { "@type": "ListItem", position: 2, name: "SSI Definitions", item: "https://vetssi.com/ssi-definitions" },
      { "@type": "ListItem", position: 3, name: "Core Definitions", item: "https://vetssi.com/ssi-definitions/core" },
      { "@type": "ListItem", position: 4, name: def.title, item: `https://vetssi.com/ssi-definitions/core/${def.slug}` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: def.title,
    description: def.tagline,
    url: `https://vetssi.com/ssi-definitions/core/${def.slug}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "VETSSI SSI Definitions Framework",
      url: "https://vetssi.com/ssi-definitions",
    },
    isBasedOn: {
      "@type": "ScholarlyArticle",
      name: SOURCE.full,
      identifier: `doi:${SOURCE.doi}`,
    },
  };

  return (
    <>
      <Script
        id={`schema-breadcrumb-${def.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id={`schema-defined-term-${def.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <DefinitionTemplate definition={def} />
    </>
  );
}

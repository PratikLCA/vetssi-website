import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Mail, BookOpen, Video, Building2, Users } from "lucide-react";
import type { Metadata } from "next";
import { protocols, getProtocolBySlug, type ProtocolStep } from "@/data/protocols";
import { videos } from "@/data/videos";
import { getPathwayBySlug } from "@/data/pathways";
import { getRoleBySlug } from "@/data/roles";
import MiddleBlock from "@/components/MiddleBlock";
import AudienceStepsTabs from "@/components/AudienceStepsTabs";
import CalloutBox from "@/components/CalloutBox";
import CollapsibleSection from "@/components/CollapsibleSection";
import DownloadButton from "@/components/DownloadButton";
import LinkedProtocolList from "@/components/LinkedProtocolList";
import Tag from "@/components/Tag";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return protocols.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const protocol = getProtocolBySlug(params.slug);
  if (!protocol) return {};
  const url = `https://vetssi.com/protocols/${protocol.slug}`;
  const description = protocol.clinicalObjective.split(".")[0] + ".";
  return {
    title: protocol.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${protocol.title} | VETSSI`,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${protocol.title} | VETSSI`,
      description,
    },
  };
}

const phaseConfig = {
  "pre-case-planning": { label: "Pre-Case Planning", className: "badge-pre-case-planning" },
  preoperative: { label: "Preoperative", className: "badge-preoperative" },
  intraoperative: { label: "Intraoperative", className: "badge-intraoperative" },
  postoperative: { label: "Postoperative", className: "badge-postoperative" },
};

function StepItem({ step, index }: { step: ProtocolStep; index: number }) {
  if (typeof step === "string") {
    return (
      <li className="flex gap-4">
        <span className="flex-shrink-0 w-7 h-7 bg-navy text-white text-xs font-medium flex items-center justify-center">
          {index + 1}
        </span>
        <p className="text-sm leading-relaxed text-text-primary pt-1">{step}</p>
      </li>
    );
  }
  return (
    <li className="flex gap-4">
      <span className="flex-shrink-0 w-7 h-7 bg-navy text-white text-xs font-medium flex items-center justify-center">
        {index + 1}
      </span>
      <div className="pt-0.5">
        <p className="font-serif text-base font-medium text-navy mb-2">{step.title}</p>
        <ul className="space-y-1.5 ml-1">
          {step.details.map((d, j) => (
            <li key={j} className="text-sm leading-relaxed text-text-primary flex gap-2">
              <span className="text-steel mt-1">·</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function ProtocolPage({ params }: Props) {
  const protocol = getProtocolBySlug(params.slug);
  if (!protocol) notFound();

  const config = phaseConfig[protocol.phase];

  const pathwayObjs = protocol.pathways
    .map((slug) => getPathwayBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const roleObjs = protocol.roles
    .map((slug) => getRoleBySlug(slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const relatedVideos = protocol.relatedVideos
    .map((slug) => videos.find((v) => v.slug === slug))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));

  const editSubject = encodeURIComponent(`Suggest edit: ${protocol.title}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://vetssi.com" },
      { "@type": "ListItem", position: 2, name: "Protocols", item: "https://vetssi.com/protocols" },
      { "@type": "ListItem", position: 3, name: protocol.title, item: `https://vetssi.com/protocols/${protocol.slug}` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: protocol.title,
    description: protocol.clinicalObjective.split(".")[0] + ".",
    url: `https://vetssi.com/protocols/${protocol.slug}`,
    publisher: { "@type": "Organization", name: "VETSSI", url: "https://vetssi.com" },
  };

  return (
    <div className="bg-cream min-h-screen">
      <Script id={`schema-breadcrumb-${protocol.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id={`schema-article-${protocol.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {/* Breadcrumb */}
      <div className="border-b border-warm-gray bg-white no-print">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-text-muted">
            <Link href="/" className="hover:text-navy transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/protocols" className="hover:text-navy transition-colors">
              Protocols
            </Link>
            <span>/</span>
            <span className="text-navy">{protocol.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ─── Main Content ─── */}
          <div className="flex-1 min-w-0 protocol-content">
            <Link
              href="/protocols"
              className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-navy transition-colors mb-6 no-print"
            >
              <ArrowLeft size={12} />
              Back to Protocol Library
            </Link>

            {/* Phase badge */}
            <div className="mb-2">
              <span
                className={`inline-block text-xs font-medium px-2.5 py-1 ${config.className}`}
              >
                {config.label}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-navy mb-5 leading-tight">
              {protocol.title}
            </h1>

            {/* Pathway + role tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {pathwayObjs.map((p) => (
                <Tag
                  key={p.slug}
                  label={p.name}
                  variant="pathway"
                  size="md"
                  href={`/contamination-pathways#${p.slug}`}
                />
              ))}
              {roleObjs.map((r) => (
                <Tag
                  key={r.slug}
                  label={r.title.split(" / ")[0]}
                  variant="role"
                  size="md"
                  href={`/roles#${r.slug}`}
                />
              ))}
            </div>

            {/* Clinical Objective */}
            <section className="mb-8">
              <h2 className="font-serif text-lg font-medium text-navy mb-3">
                Clinical Objective
              </h2>
              <p className="text-sm leading-relaxed text-text-primary">
                {protocol.clinicalObjective}
              </p>
            </section>

            {/* Why This Matters */}
            {protocol.whyThisMatters && (
              <section className="mb-8">
                <h2 className="font-serif text-lg font-medium text-navy mb-3">
                  Why This Matters
                </h2>
                <p className="text-sm leading-relaxed text-text-primary">
                  {protocol.whyThisMatters}
                </p>
              </section>
            )}

            <hr className="border-warm-gray mb-8" />

            {/* Critical Control Points */}
            {protocol.criticalControlPoints.length > 0 && (
              <section className="mb-8">
                <h2 className="font-serif text-lg font-medium text-navy mb-4">
                  Critical Control Points
                </h2>
                <ul className="space-y-2.5">
                  {protocol.criticalControlPoints.map((c, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 bg-steel rounded-full mt-2" />
                      <p className="text-sm leading-relaxed text-text-primary">{c}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Middle Block (interactive checklist/table/go-no-go) */}
            {protocol.middleBlock && <MiddleBlock block={protocol.middleBlock} />}

            {/* Step-by-step Protocol */}
            {protocol.audienceVersions ? (
              <AudienceStepsTabs
                versions={protocol.audienceVersions}
                defaultSteps={protocol.steps}
                defaultPitfalls={protocol.pitfalls}
              />
            ) : (
              <>
                <section className="mb-8">
                  <h2 className="font-serif text-lg font-medium text-navy mb-5">
                    Step-by-Step Protocol
                  </h2>
                  <ol className="space-y-4">
                    {protocol.steps.map((step, i) => (
                      <StepItem key={i} step={step} index={i} />
                    ))}
                  </ol>
                </section>

                <section className="mb-8">
                  <h2 className="font-serif text-lg font-medium text-navy mb-4">Key Pitfalls</h2>
                  <ul className="space-y-3">
                    {protocol.pitfalls.map((pitfall, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-steel rounded-full mt-2" />
                        <p className="text-sm leading-relaxed text-text-primary">{pitfall}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {/* Expert Insight */}
            <CalloutBox title="What Actually Matters">
              <p>{protocol.expertInsight}</p>
            </CalloutBox>

            {/* Supporting Evidence */}
            <div className="mt-8">
              <CollapsibleSection title="Supporting Evidence">
                <div className="space-y-4 pt-2">
                  {protocol.evidence.map((item, i) => (
                    <div
                      key={i}
                      className="border-b border-warm-gray pb-4 last:border-b-0 last:pb-0"
                    >
                      <p className="text-sm text-text-primary leading-relaxed mb-1">
                        {item.citation}
                      </p>
                      {item.doi && (
                        <p className="text-xs text-text-muted">
                          DOI:{" "}
                          <a
                            href={`https://doi.org/${item.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-steel hover:underline"
                          >
                            {item.doi}
                          </a>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>
          </div>

          {/* ─── Sidebar ─── */}
          <aside className="lg:w-80 flex-shrink-0 no-print">
            <div className="lg:sticky lg:top-24 space-y-6">
              <DownloadButton />

              {/* Controlled Pathways */}
              {pathwayObjs.length > 0 && (
                <div className="card bg-white border border-warm-gray p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 size={14} className="text-steel" />
                    <h3 className="text-xs font-medium text-navy nav-link">
                      Controlled Pathways
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {pathwayObjs.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/contamination-pathways#${p.slug}`}
                        className="block text-sm text-steel hover:text-navy transition-colors leading-snug"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Owned By */}
              {roleObjs.length > 0 && (
                <div className="card bg-white border border-warm-gray p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Users size={14} className="text-steel" />
                    <h3 className="text-xs font-medium text-navy nav-link">Owned By</h3>
                  </div>
                  <div className="space-y-2">
                    {roleObjs.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/roles#${r.slug}`}
                        className="block text-sm text-steel hover:text-navy transition-colors leading-snug"
                      >
                        {r.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Protocols */}
              {protocol.relatedProtocols.length > 0 && (
                <div className="card bg-white border border-warm-gray p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen size={14} className="text-steel" />
                    <h3 className="text-xs font-medium text-navy nav-link">
                      Related Protocols
                    </h3>
                  </div>
                  <LinkedProtocolList protocolSlugs={protocol.relatedProtocols} />
                </div>
              )}

              {/* Related Videos */}
              {relatedVideos.length > 0 && (
                <div className="card bg-white border border-warm-gray p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Video size={14} className="text-steel" />
                    <h3 className="text-xs font-medium text-navy nav-link">Related Videos</h3>
                  </div>
                  <div className="space-y-3">
                    {relatedVideos.map((rv) => (
                      <div key={rv.slug} className="flex gap-3 items-start">
                        <div className="w-14 h-10 bg-navy-mid flex-shrink-0 flex items-center justify-center">
                          <span className="text-white/60 text-xs">▶</span>
                        </div>
                        <Link
                          href="/videos"
                          className="text-sm text-steel hover:text-navy transition-colors leading-snug"
                        >
                          {rv.title}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggest edit */}
              <div className="card bg-white border border-warm-gray p-5">
                <a
                  href={`mailto:info@vetssi.com?subject=${editSubject}`}
                  className="flex items-center gap-2 text-sm text-text-muted hover:text-navy transition-colors"
                >
                  <Mail size={14} className="text-steel" />
                  Suggest an edit
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { protocols, getProtocolBySlug } from "@/data/protocols";
import { videos } from "@/data/videos";
import CalloutBox from "@/components/CalloutBox";
import CollapsibleSection from "@/components/CollapsibleSection";
import DownloadButton from "@/components/DownloadButton";
import { ArrowLeft, Mail, BookOpen, Video } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return protocols.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const protocol = getProtocolBySlug(params.slug);
  if (!protocol) return {};
  return { title: protocol.title };
}

const phaseConfig = {
  preoperative:   { label: "Preoperative",   className: "badge-preoperative" },
  intraoperative: { label: "Intraoperative", className: "badge-intraoperative" },
  postoperative:  { label: "Postoperative",  className: "badge-postoperative" },
};

export default function ProtocolPage({ params }: Props) {
  const protocol = getProtocolBySlug(params.slug);
  if (!protocol) notFound();

  const config = phaseConfig[protocol.phase];

  const relatedProtocols = protocol.relatedProtocols
    .map((slug) => protocols.find((p) => p.slug === slug))
    .filter(Boolean);

  const relatedVideos = protocol.relatedVideos
    .map((slug) => videos.find((v) => v.slug === slug))
    .filter(Boolean);

  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-warm-gray bg-white">
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
          {/* ─── Main Content (70%) ─── */}
          <div className="flex-1 min-w-0 protocol-content">
            {/* Back link */}
            <Link
              href="/protocols"
              className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-navy transition-colors mb-6"
            >
              <ArrowLeft size={12} />
              Back to Protocol Library
            </Link>

            {/* Phase badge + Title */}
            <div className="mb-2">
              <span className={`inline-block text-xs font-medium px-2.5 py-1 ${config.className}`}>
                {config.label}
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-navy mb-6 leading-tight">
              {protocol.title}
            </h1>

            {/* Clinical Objective */}
            <div className="mb-8">
              <h2 className="font-serif text-lg font-medium text-navy mb-3">Clinical Objective</h2>
              <p className="text-sm leading-relaxed text-text-primary">{protocol.clinicalObjective}</p>
            </div>

            {/* Divider */}
            <hr className="border-warm-gray mb-8" />

            {/* Step-by-step */}
            <div className="mb-8">
              <h2 className="font-serif text-lg font-medium text-navy mb-5">Protocol Steps</h2>
              <ol className="space-y-4">
                {protocol.steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 bg-navy text-white text-xs font-medium flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-text-primary pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Key Pitfalls */}
            <div className="mb-8">
              <h2 className="font-serif text-lg font-medium text-navy mb-4">Key Pitfalls to Avoid</h2>
              <ul className="space-y-3">
                {protocol.pitfalls.map((pitfall, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-steel rounded-full mt-2" />
                    <p className="text-sm leading-relaxed text-text-primary">{pitfall}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Expert Insight Callout */}
            <CalloutBox>
              <p>{protocol.expertInsight}</p>
            </CalloutBox>

            {/* Supporting Evidence (collapsible) */}
            <div className="mt-8">
              <CollapsibleSection title="Supporting Evidence">
                <div className="space-y-4 pt-2">
                  {protocol.evidence.map((item, i) => (
                    <div key={i} className="border-b border-warm-gray pb-4 last:border-b-0 last:pb-0">
                      <p className="text-sm text-text-primary leading-relaxed mb-1">{item.citation}</p>
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

          {/* ─── Sidebar (30%) ─── */}
          <aside className="lg:w-72 flex-shrink-0 no-print">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Download button */}
              <DownloadButton />

              {/* Related Protocols */}
              {relatedProtocols.length > 0 && (
                <div className="card bg-white border border-warm-gray p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen size={14} className="text-steel" />
                    <h3 className="text-xs font-medium text-navy nav-link">Related Protocols</h3>
                  </div>
                  <div className="space-y-3">
                    {relatedProtocols.map(
                      (rp) =>
                        rp && (
                          <Link
                            key={rp.slug}
                            href={`/protocols/${rp.slug}`}
                            className="block text-sm text-steel hover:text-navy transition-colors leading-snug"
                          >
                            {rp.title}
                          </Link>
                        )
                    )}
                  </div>
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
                    {relatedVideos.map(
                      (rv) =>
                        rv && (
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
                        )
                    )}
                  </div>
                </div>
              )}

              {/* Contribute link */}
              <div className="card bg-white border border-warm-gray p-5">
                <a
                  href="mailto:contribute@vetssi.com?subject=Protocol Suggestion"
                  className="flex items-center gap-2 text-sm text-text-muted hover:text-navy transition-colors"
                >
                  <Mail size={14} className="text-steel" />
                  Suggest an edit or contribute
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

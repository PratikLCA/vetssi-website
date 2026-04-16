import PageHeader from "@/components/PageHeader";
import { publications, guidelines, downloadableTools, getFeaturedPublication } from "@/data/resources";
import { ExternalLink, Download, BookOpen, FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Resource Hub" };

export default function ResourcesPage() {
  const featuredPub = getFeaturedPublication();
  const otherPubs = publications.filter((p) => !p.featured);

  return (
    <>
      <PageHeader
        title="Resource Hub"
        subtitle="Publications, guidelines, and downloadable tools for SSI prevention in practice"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Featured — Vezzoni Review */}
        {featuredPub && (
          <div className="mb-16">
            <p className="nav-link text-steel mb-4">Featured Publication</p>
            <div className="card bg-navy text-white border border-navy p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-white/10 border border-white/20 flex items-center justify-center">
                    <BookOpen size={28} className="text-white/70" />
                  </div>
                </div>
                <div>
                  <p className="nav-link text-steel-light mb-2">Systematic Review</p>
                  <h2 className="font-serif text-2xl md:text-3xl font-medium mb-2 leading-snug">
                    {featuredPub.title}
                  </h2>
                  <p className="text-white/60 text-sm mb-1">
                    {featuredPub.authors} — <em>{featuredPub.journal}</em>, {featuredPub.year}
                  </p>
                  <p className="text-white/60 text-xs mb-5">DOI: {featuredPub.doi}</p>
                  {featuredPub.abstract && (
                    <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-2xl">
                      {featuredPub.abstract}
                    </p>
                  )}
                  <a
                    href={`https://doi.org/${featuredPub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-steel hover:bg-steel-light text-white px-6 py-3 text-sm font-medium transition-colors"
                  >
                    Access Paper
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Key Publications */}
            <div>
              <p className="nav-link text-steel mb-4">Key Publications</p>
              <div className="space-y-0 border border-warm-gray bg-white">
                {otherPubs.map((pub, i) => (
                  <div
                    key={pub.id}
                    className={`p-6 ${i < otherPubs.length - 1 ? "border-b border-warm-gray" : ""}`}
                  >
                    <p className="text-sm text-text-muted mb-1">{pub.authors}</p>
                    <p className="font-serif text-base font-medium text-navy mb-1 leading-snug">
                      <em>{pub.title}</em>
                    </p>
                    <p className="text-xs text-text-muted mb-3">
                      {pub.journal}, {pub.year}
                    </p>
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-steel text-xs hover:text-navy transition-colors"
                    >
                      View Paper
                      <ExternalLink size={11} />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Guidelines */}
            <div>
              <p className="nav-link text-steel mb-4">Clinical Guidelines</p>
              <div className="space-y-0 border border-warm-gray bg-white">
                {guidelines.map((g, i) => (
                  <div
                    key={g.id}
                    className={`p-6 flex items-start justify-between gap-4 ${
                      i < guidelines.length - 1 ? "border-b border-warm-gray" : ""
                    }`}
                  >
                    <div>
                      <p className="font-serif text-base font-medium text-navy mb-1 leading-snug">
                        {g.title}
                      </p>
                      <p className="text-xs text-text-muted">
                        {g.organization} — {g.year}
                      </p>
                    </div>
                    <a
                      href={g.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 inline-flex items-center gap-1.5 text-steel text-xs hover:text-navy transition-colors mt-1"
                    >
                      View
                      <ExternalLink size={11} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Downloadable Tools sidebar */}
          <div>
            <p className="nav-link text-steel mb-4">Downloadable Tools</p>
            <div className="space-y-4">
              {downloadableTools.map((tool) => (
                <div key={tool.id} className="card bg-white border border-warm-gray p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <FileText size={18} className="text-steel flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-serif text-base font-medium text-navy mb-1 leading-snug">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-text-muted">{tool.fileType} · {tool.fileSize}</p>
                    </div>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed mb-4">{tool.description}</p>
                  <button className="inline-flex items-center gap-1.5 text-steel text-xs font-medium hover:text-navy transition-colors">
                    <Download size={12} />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

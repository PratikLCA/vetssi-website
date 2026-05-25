import { ExternalLink, Download, BookOpen } from "lucide-react";
import { SOURCE } from "@/data/ssi-definitions";

interface AjvrCitationFootnoteProps {
  // Compact variant for in-page Source sections; full variant for page footers.
  variant?: "compact" | "full";
}

// Footnote-style acknowledgment of the 2026 AJVR consensus paper —
// the foundational reference for every page in the SSI Definitions Framework.
// Used on the landing, core index, every definition detail page, the wound
// classification page, and the surveillance page.

export default function AjvrCitationFootnote({
  variant = "full",
}: AjvrCitationFootnoteProps) {
  if (variant === "compact") {
    return (
      <div className="bg-white border-l-4 border-steel border-y border-r border-warm-gray p-5">
        <p className="nav-link text-steel mb-3">Foundational reference</p>
        <p className="text-sm text-text-primary leading-relaxed mb-1">
          {SOURCE.authors}{" "}
          <em className="text-navy">{SOURCE.title}</em>{" "}
          <span className="text-text-muted">
            {SOURCE.journal}, {SOURCE.year}.
          </span>
        </p>
        <p className="text-xs text-text-muted mb-4">
          DOI:{" "}
          <a
            href={SOURCE.doiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-steel hover:underline"
          >
            {SOURCE.doi}
          </a>{" "}
          · {SOURCE.license}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={SOURCE.journalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs nav-link text-steel hover:text-navy transition-colors"
          >
            View on AVMA Journals
            <ExternalLink size={11} />
          </a>
          <span className="text-text-muted text-xs">·</span>
          <a
            href={SOURCE.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs nav-link text-steel hover:text-navy transition-colors"
          >
            Download PDF
            <Download size={11} />
          </a>
        </div>
      </div>
    );
  }

  // Full variant — page footer treatment, mirrors resources Featured Publication.
  return (
    <section className="bg-navy text-white no-print">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 bg-white/10 border border-white/20 flex items-center justify-center">
              <BookOpen size={22} className="text-white/70" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="nav-link text-steel-light mb-2">Foundational reference</p>
            <p className="font-serif text-lg md:text-xl font-medium leading-snug mb-2">
              {SOURCE.title}
            </p>
            <p className="text-white/70 text-sm mb-1">
              {SOURCE.authors} — <em>{SOURCE.journal}</em>, {SOURCE.year}
            </p>
            <p className="text-white/50 text-xs mb-5">
              DOI: {SOURCE.doi} · {SOURCE.license}
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-2xl">
              Every definition, criterion, surveillance term, and wound class on these pages derives from this expert consensus. Consensus text on each page paraphrases the paper; clinical interpretation, gray zones, and misclassification scenarios are VETSSI editorial.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={SOURCE.journalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-steel hover:bg-steel-light text-white px-5 py-2.5 text-sm font-medium transition-colors"
              >
                View on AVMA Journals
                <ExternalLink size={13} />
              </a>
              <a
                href={SOURCE.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white px-5 py-2.5 text-sm font-medium transition-colors"
              >
                Download PDF
                <Download size={13} />
              </a>
              <a
                href={SOURCE.doiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white px-5 py-2.5 text-sm font-medium transition-colors"
              >
                doi.org/{SOURCE.doi}
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

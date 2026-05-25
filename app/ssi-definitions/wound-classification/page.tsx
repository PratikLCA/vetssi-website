import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CollapsibleSection from "@/components/CollapsibleSection";
import WoundClassifier from "@/components/WoundClassifier";
import BiologySpectrum from "@/components/BiologySpectrum";
import AjvrCitationFootnote from "@/components/AjvrCitationFootnote";
import { SOURCE } from "@/data/ssi-definitions";
import { woundClasses } from "@/data/wound-classification";

export const metadata: Metadata = {
  title: "Wound Classification",
  description:
    "Surgical Wound Classification (SWC I–IV) with clinical interpretation, the interactive 'Classify This Wound' decision tool, and the contamination → infection biology spectrum. Based on the 2026 AJVR expert consensus.",
  alternates: { canonical: "https://vetssi.com/ssi-definitions/wound-classification" },
  openGraph: {
    title: "Wound Classification | VETSSI",
    description:
      "SWC I–IV with clinical interpretation, an interactive classifier, and the contamination → infection biology spectrum.",
    url: "https://vetssi.com/ssi-definitions/wound-classification",
    type: "article",
  },
};

export default function WoundClassificationPage() {
  return (
    <>
      <PageHeader
        title="Wound Classification"
        subtitle="SWC I–IV with clinical interpretation, the interactive Classify This Wound tool, and the contamination → infection biology spectrum."
      />

      {/* Breadcrumb */}
      <div className="border-b border-warm-gray bg-white no-print">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-text-muted">
            <Link href="/" className="hover:text-navy transition-colors">Home</Link>
            <span>/</span>
            <Link href="/ssi-definitions" className="hover:text-navy transition-colors">SSI Definitions</Link>
            <span>/</span>
            <span className="text-navy">Wound Classification</span>
          </nav>
          <p className="nav-link text-steel mt-3">
            Based on the{" "}
            <a
              href={SOURCE.journalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-navy transition-colors inline-flex items-center gap-1"
            >
              {SOURCE.short}
              <ExternalLink size={11} />
            </a>
            .
          </p>
        </div>
      </div>

      {/* Section: SWC I–IV cards */}
      <section className="bg-cream border-b border-warm-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
          <p className="nav-link text-steel mb-2">Section 01</p>
          <h2 className="font-serif text-3xl font-medium text-navy mb-3">
            Surgical Wound Classification (SWC I–IV)
          </h2>
          <p className="text-base text-text-muted font-light max-w-3xl mb-10 leading-relaxed">
            Four classes ordered by degree of contamination at the time of surgery. Each entry pairs the consensus definition with clinical interpretation, SSI-risk and antimicrobial implications, veterinary examples, and the most common classification errors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {woundClasses.map((wc) => (
              <article
                key={wc.id}
                className="card bg-white border border-warm-gray p-6 flex flex-col"
              >
                <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                  <span className="font-serif text-3xl font-medium text-navy">{wc.label}</span>
                  <span className="font-serif text-xl text-steel">{wc.name}</span>
                </div>

                {/* Consensus voice */}
                <div className="bg-cream border-l-4 border-steel px-4 py-3 my-4">
                  <p className="nav-link text-steel mb-1">From the 2026 AJVR consensus</p>
                  <p className="font-serif italic text-sm leading-relaxed text-navy">
                    {wc.consensus}
                  </p>
                  {wc.note && (
                    <p className="text-xs text-text-muted not-italic font-sans mt-2 pt-2 border-t border-steel/30">
                      <span className="nav-link text-steel mr-1.5">Note</span>
                      {wc.note}
                    </p>
                  )}
                </div>

                {/* Interpretation voice */}
                <div className="bg-white border-l-4 border-navy border-y border-r border-warm-gray px-4 py-3 mb-4">
                  <p className="nav-link text-navy mb-1">VETSSI clinical interpretation</p>
                  <p className="text-sm leading-relaxed text-text-primary">{wc.interpretation}</p>
                </div>

                {/* Implications grid */}
                <dl className="grid grid-cols-1 gap-3 text-sm mb-4">
                  <Implication label="SSI risk" value={wc.risk} />
                  <Implication label="Antimicrobial implication" value={wc.antimicrobial} />
                  <Implication label="Benchmarking implication" value={wc.benchmarking} />
                </dl>

                {/* Examples + errors as accordions */}
                <div className="mt-auto space-y-2">
                  <CollapsibleSection title="Veterinary examples">
                    <ul className="space-y-1.5 pt-2 text-sm text-text-primary">
                      {wc.examples.map((ex, i) => (
                        <li key={i} className="flex gap-2.5">
                          <span className="w-1.5 h-1.5 bg-steel rounded-full mt-2 flex-shrink-0" />
                          <span className="leading-relaxed">{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleSection>
                  <CollapsibleSection title="Common classification errors">
                    <ul className="space-y-1.5 pt-2 text-sm text-text-primary">
                      {wc.errors.map((err, i) => (
                        <li key={i} className="flex gap-2.5">
                          <span className="w-1.5 h-1.5 bg-navy rounded-full mt-2 flex-shrink-0" />
                          <span className="leading-relaxed">{err}</span>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleSection>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Classifier */}
      <section className="bg-white border-b border-warm-gray">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-14">
          <p className="nav-link text-steel mb-2">Section 02</p>
          <h2 className="font-serif text-3xl font-medium text-navy mb-3">
            Classify This Wound
          </h2>
          <p className="text-base text-text-muted font-light max-w-2xl mb-8 leading-relaxed">
            An ordered yes/no decision flow that follows the SWC I–IV criteria. The first qualifying YES determines the class. If you answer NO to all four, the result is SWC I.
          </p>
          <WoundClassifier />
        </div>
      </section>

      {/* Section: Biology spectrum */}
      <section className="bg-cream">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-14">
          <p className="nav-link text-steel mb-2">Section 03</p>
          <h2 className="font-serif text-3xl font-medium text-navy mb-3">
            Contamination, Colonization &amp; Infection
          </h2>
          <p className="text-base text-text-muted font-light max-w-2xl mb-8 leading-relaxed">
            Four biological states on a single spectrum. The boundary between colonization and infection is not a culture result — it is whether the tissue is reacting.
          </p>
          <BiologySpectrum />
        </div>
      </section>

      <AjvrCitationFootnote variant="full" />
    </>
  );
}

function Implication({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="nav-link text-steel mb-1">{label}</dt>
      <dd className="text-sm text-text-primary leading-relaxed">{value}</dd>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, AlertCircle, ClipboardCheck } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SurveillanceTimeline from "@/components/SurveillanceTimeline";
import AjvrCitationFootnote from "@/components/AjvrCitationFootnote";
import { SOURCE } from "@/data/ssi-definitions";
import {
  surveillanceTypes,
  surveillanceTerms,
  surveillanceWhyStandardize,
} from "@/data/surveillance";

export const metadata: Metadata = {
  title: "Surveillance Framework",
  description:
    "Active vs. passive SSI surveillance, the 30-day timeline (Day 0 → Day 10–14 → Week 4 → Day 30), surveillance terms, and the 'surveillance effect.' Based on the 2026 AJVR expert consensus.",
  alternates: { canonical: "https://vetssi.com/ssi-definitions/surveillance" },
  openGraph: {
    title: "Surveillance Framework | VETSSI",
    description:
      "Active vs. passive SSI surveillance, the 30-day timeline, and the surveillance effect.",
    url: "https://vetssi.com/ssi-definitions/surveillance",
    type: "article",
  },
};

export default function SurveillancePage() {
  return (
    <>
      <PageHeader
        title="Surveillance Framework"
        subtitle="Active vs. passive surveillance, the 30-day timeline, surveillance terms, and the 'surveillance effect.'"
      />

      <div className="border-b border-warm-gray bg-white no-print">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-text-muted">
            <Link href="/" className="hover:text-navy transition-colors">Home</Link>
            <span>/</span>
            <Link href="/ssi-definitions" className="hover:text-navy transition-colors">SSI Definitions</Link>
            <span>/</span>
            <span className="text-navy">Surveillance</span>
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

      {/* 01 Active vs Passive — framed as quality improvement */}
      <section className="bg-cream border-b border-warm-gray">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-14">
          <p className="nav-link text-steel mb-2">Section 01</p>
          <h2 className="font-serif text-3xl font-medium text-navy mb-3">
            Active vs. Passive Surveillance
          </h2>
          <p className="text-base text-text-muted font-light max-w-3xl mb-8 leading-relaxed">
            Surveillance is a quality-improvement function, not bureaucracy. The choice between active and passive surveillance determines whether your SSI rate is signal or noise.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {surveillanceTypes.map((s) => (
              <article key={s.id} className="card bg-white border border-warm-gray p-6">
                <h3 className="font-serif text-xl font-medium text-navy mb-3">{s.name}</h3>

                <div className="bg-cream border-l-4 border-steel px-4 py-3 mb-4">
                  <p className="nav-link text-steel mb-1">From the 2026 AJVR consensus</p>
                  <p className="font-serif italic text-sm leading-relaxed text-navy">
                    {s.consensus}
                  </p>
                </div>

                <div className="bg-white border-l-4 border-navy border-y border-r border-warm-gray px-4 py-3">
                  <p className="nav-link text-navy mb-1">VETSSI clinical interpretation</p>
                  <p className="text-sm leading-relaxed text-text-primary">{s.interpretation}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 02 Timeline */}
      <section className="bg-white border-b border-warm-gray">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-14">
          <p className="nav-link text-steel mb-2">Section 02</p>
          <h2 className="font-serif text-3xl font-medium text-navy mb-3">
            30-Day Active Surveillance Timeline
          </h2>
          <p className="text-base text-text-muted font-light max-w-3xl mb-10 leading-relaxed">
            Two rechecks are recommended within the active window: at suture removal (Day 10–14) and at Week 4. Direct wound inspection by the operating surgeon is the preferred method.
          </p>

          <SurveillanceTimeline />

          <p className="text-xs text-text-muted mt-8 italic">
            Any SSI linked to the procedure after Day 30 is still recorded, with its appearance interval — the surveillance window is the active-monitoring period, not the definition of SSI.
          </p>
        </div>
      </section>

      {/* 03 Surveillance terms */}
      <section className="bg-cream border-b border-warm-gray">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-14">
          <p className="nav-link text-steel mb-2">Section 03</p>
          <h2 className="font-serif text-3xl font-medium text-navy mb-8">
            Surveillance Terms
          </h2>

          <dl className="space-y-0 border border-warm-gray bg-white">
            {surveillanceTerms.map((t, i) => (
              <div
                key={t.id}
                className={`p-6 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 ${
                  i < surveillanceTerms.length - 1 ? "border-b border-warm-gray" : ""
                }`}
              >
                <dt className="font-serif text-base font-medium text-navy">{t.name}</dt>
                <dd className="text-sm text-text-primary leading-relaxed">{t.consensus}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 04 Why standardized definitions matter */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-14">
          <p className="nav-link text-steel mb-2">Section 04</p>
          <h2 className="font-serif text-3xl font-medium text-navy mb-3">
            {surveillanceWhyStandardize.title}
          </h2>
          <p className="text-base text-text-muted font-light max-w-3xl mb-8 leading-relaxed">
            {surveillanceWhyStandardize.intro}
          </p>

          <ul className="space-y-3 mb-10">
            {surveillanceWhyStandardize.points.map((pt, i) => (
              <li key={i} className="flex gap-3">
                <ClipboardCheck size={16} className="text-steel mt-0.5 flex-shrink-0" />
                <p className="text-sm leading-relaxed text-text-primary">{pt}</p>
              </li>
            ))}
          </ul>

          {/* Surveillance effect callout */}
          <div className="callout-box">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={16} className="text-steel flex-shrink-0" />
              <span className="text-xs font-medium text-steel nav-link">
                The Surveillance Effect
              </span>
            </div>
            <p className="text-sm text-text-primary leading-relaxed">
              {surveillanceWhyStandardize.surveillanceEffect}
            </p>
          </div>
        </div>
      </section>

      <AjvrCitationFootnote variant="full" />
    </>
  );
}

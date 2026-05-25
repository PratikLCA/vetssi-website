import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers, ClipboardCheck, Activity, GitBranch, ExternalLink } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import AjvrCitationFootnote from "@/components/AjvrCitationFootnote";
import { SOURCE } from "@/data/ssi-definitions";

export const metadata: Metadata = {
  title: "SSI Definitions Framework",
  description:
    "Standardized veterinary terminology for classifying, monitoring, and preventing surgical site infections. Based on the 2026 AJVR expert consensus on veterinary SSI definitions.",
  alternates: { canonical: "https://vetssi.com/ssi-definitions" },
  openGraph: {
    title: "SSI Definitions Framework | VETSSI",
    description:
      "Standardized veterinary terminology for classifying, monitoring, and preventing surgical site infections.",
    url: "https://vetssi.com/ssi-definitions",
    type: "article",
  },
};

const entryCards = [
  {
    href: "/ssi-definitions/core",
    title: "Core SSI Definitions",
    body: "The five tissue-layer definitions — SSI (parent), Superficial, Deep, Organ/Bone/Space, and Implant-Associated — each rendered through a shared template with two voices: consensus and clinical interpretation.",
    cta: "Browse definitions",
    icon: Layers,
  },
  {
    href: "/ssi-definitions/wound-classification",
    title: "Wound Classification",
    body: "SWC I–IV with clinical interpretation, risk profiles, and an interactive 'Classify This Wound' decision tool. Includes the contamination → colonization → infection biology spectrum.",
    cta: "Open classification",
    icon: ClipboardCheck,
  },
  {
    href: "/ssi-definitions/surveillance",
    title: "Surveillance Framework",
    body: "Active vs. passive surveillance, the 30-day timeline (Day 0 → Day 10–14 → Week 4 → Day 30), surveillance terms, and the 'surveillance effect.'",
    cta: "Open surveillance",
    icon: Activity,
  },
  {
    href: "/contamination-pathways",
    title: "Contamination Pathways",
    body: "The eight pathways through which infection enters the surgical field — the system these definitions describe and prevent. Cross-linked from every Core Definition.",
    cta: "Open pathways",
    icon: GitBranch,
  },
];

export default function SsiDefinitionsLandingPage() {
  return (
    <>
      <PageHeader
        title="SSI Definitions Framework"
        subtitle="Standardized veterinary terminology for classifying, monitoring, and preventing surgical site infections."
      />

      {/* Intro */}
      <section className="bg-white border-b border-warm-gray">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <p className="text-base text-text-primary leading-relaxed">
            Reliable SSI prevention begins with a shared language. This framework translates expert consensus terminology into clinically usable definitions — linked to contamination pathways, protocols, surgical workflows, surveillance systems, and team responsibilities.
          </p>
          <p className="nav-link text-steel mt-6">
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
      </section>

      {/* Entry cards */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <p className="nav-link text-steel mb-2">Enter the framework</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-navy mb-10">
            Four dimensions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {entryCards.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.href}
                  href={c.href}
                  className="card bg-white border border-warm-gray p-6 group hover:border-steel transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <Icon size={18} className="text-steel" />
                    <h3 className="font-serif text-xl font-medium text-navy">{c.title}</h3>
                  </div>
                  <p className="text-sm text-text-primary leading-relaxed mb-5">{c.body}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs nav-link text-steel group-hover:text-navy transition-colors">
                    {c.cta}
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <AjvrCitationFootnote variant="full" />
    </>
  );
}

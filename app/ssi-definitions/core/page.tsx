import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import AjvrCitationFootnote from "@/components/AjvrCitationFootnote";
import SsiClassificationMap from "@/components/SsiClassificationMap";
import { SOURCE } from "@/data/ssi-definitions";

export const metadata: Metadata = {
  title: "Core SSI Definitions",
  description:
    "Five tissue-layer SSI definitions — SSI, Superficial Incisional, Deep Incisional, Organ/Bone/Space, and Implant-Associated — based on the 2026 AJVR expert consensus.",
  alternates: { canonical: "https://vetssi.com/ssi-definitions/core" },
  openGraph: {
    title: "Core SSI Definitions | VETSSI",
    description:
      "Five tissue-layer SSI definitions, each rendered through a shared template with consensus and clinical interpretation.",
    url: "https://vetssi.com/ssi-definitions/core",
    type: "article",
  },
};

export default function CoreDefinitionsIndexPage() {
  return (
    <>
      <PageHeader
        title="Core SSI Definitions"
        subtitle="Five tissue-layer definitions, depth-ordered. Each page renders through one shared template — consensus, clinical interpretation, diagnostic criteria, gray zones, misclassification scenarios, and system connections."
      />

      <section className="bg-white border-b border-warm-gray">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-10">
          <p className="nav-link text-steel">
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

      <section className="bg-cream">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-14">
          <p className="nav-link text-steel mb-2">By tissue depth</p>
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-navy mb-3">
            The SSI Classification System
          </h2>
          <p className="text-base text-text-muted font-light max-w-3xl mb-8 leading-relaxed">
            Click any band to open its definition. The categories are depth-ordered and anatomical, not arbitrary — Superficial through Organ/Bone/Space, with Implant-Associated reported separately because its biology is distinct.
          </p>
          <SsiClassificationMap />
        </div>
      </section>

      <AjvrCitationFootnote variant="full" />
    </>
  );
}

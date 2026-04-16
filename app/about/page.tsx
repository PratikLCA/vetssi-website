import ContributorCard from "@/components/ContributorCard";
import { getFeaturedContributor } from "@/data/contributors";
import { Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About VETSSI" };

export default function AboutPage() {
  const vezzoni = getFeaturedContributor();

  return (
    <div className="bg-cream">
      {/* Page header */}
      <div className="bg-navy text-white hero-pattern">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <p className="nav-link text-steel-light mb-4">About the Platform</p>
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-5 leading-tight">
              About VETSSI
            </h1>
            <p className="text-white/70 font-light text-lg leading-relaxed">
              A global resource for veterinary surgical site infection prevention — independent, evidence-based, and built by surgeons for surgeons.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 space-y-14">
        {/* Mission */}
        <section>
          <p className="nav-link text-steel mb-3">Mission</p>
          <h2 className="font-serif text-2xl font-medium text-navy mb-5">Why VETSSI Exists</h2>
          <p className="text-base text-text-primary leading-relaxed">
            VETSSI exists to translate the best available evidence on SSI prevention into practical tools that veterinary
            surgeons can use every day. The platform bridges the gap between published research and clinical implementation
            — making evidence-based prevention protocols accessible, usable, and actionable in practice settings ranging
            from single-surgeon clinics to major referral hospitals.
          </p>
        </section>

        <hr className="border-warm-gray" />

        {/* Why This Matters */}
        <section>
          <p className="nav-link text-steel mb-3">Context</p>
          <h2 className="font-serif text-2xl font-medium text-navy mb-5">Why This Matters</h2>
          <p className="text-base text-text-primary leading-relaxed mb-4">
            Surgical site infections are among the most common and costly complications in veterinary surgery, estimated
            to affect 2–5% of clean procedures and significantly higher rates in contaminated cases. Each SSI represents
            patient morbidity, extended hospitalization, additional antibiotic exposure, and significant financial and
            emotional burden for the owner.
          </p>
          <p className="text-base text-text-primary leading-relaxed mb-4">
            The evidence base for SSI prevention in veterinary surgery has grown substantially over the past two decades,
            but translation of this evidence into consistent clinical practice has lagged. Many preventable SSIs occur in
            practices that have no structured prevention protocol in place — not from lack of competence, but lack of
            accessible, synthesized guidance.
          </p>
          <p className="text-base text-text-primary leading-relaxed">
            VETSSI was created to change this. Every protocol on this platform is designed to be immediately implementable
            and grounded in the best available evidence.
          </p>
        </section>

        <hr className="border-warm-gray" />

        {/* Editorial Philosophy */}
        <section>
          <p className="nav-link text-steel mb-3">Editorial Standards</p>
          <h2 className="font-serif text-2xl font-medium text-navy mb-5">Editorial Philosophy</h2>
          <p className="text-base text-text-primary leading-relaxed mb-4">
            Protocols on VETSSI are developed through a structured editorial process. Each protocol begins with a
            systematic review of the relevant literature, graded by evidence quality and clinical applicability. Draft
            protocols are reviewed by at least one specialist with direct clinical experience in the protocol domain.
          </p>
          <p className="text-base text-text-primary leading-relaxed mb-4">
            Protocols are treated as living documents. As new evidence emerges, existing protocols are updated to reflect
            current best practice. The date of last review is tracked for every protocol. Surgeons who identify outdated
            information or propose evidence-based modifications are encouraged to contribute.
          </p>
          <p className="text-base text-text-primary leading-relaxed">
            Where evidence is limited or conflicting, this is explicitly noted. VETSSI does not overstate the certainty
            of its recommendations — clarity about uncertainty is as important as clinical guidance.
          </p>
        </section>

        <hr className="border-warm-gray" />

        {/* Lead Expert */}
        {vezzoni && (
          <section>
            <p className="nav-link text-steel mb-4">Lead Expert</p>
            <ContributorCard contributor={vezzoni} featured />
          </section>
        )}

        <hr className="border-warm-gray" />

        {/* Independence Statement */}
        <section>
          <p className="nav-link text-steel mb-3">Independence</p>
          <h2 className="font-serif text-2xl font-medium text-navy mb-5">Independence Statement</h2>
          <div className="callout-box">
            <p className="text-sm leading-relaxed text-text-primary">
              VETSSI is an independent educational platform. It is not affiliated with any commercial entity and accepts
              no advertising or sponsorship. All content reflects the independent judgment of its contributors. No
              pharmaceutical, device, or commercial company has editorial influence over any protocol, recommendation, or
              content on this platform. The integrity of the evidence base and the independence of clinical guidance are
              non-negotiable commitments of this project.
            </p>
          </div>
        </section>

        <hr className="border-warm-gray" />

        {/* Contact */}
        <section>
          <p className="nav-link text-steel mb-3">Contact</p>
          <h2 className="font-serif text-2xl font-medium text-navy mb-5">Get in Touch</h2>
          <p className="text-base text-text-muted leading-relaxed mb-5">
            For editorial enquiries, contribution proposals, corrections, or general questions about the platform:
          </p>
          <a
            href="mailto:info@vetssi.com"
            className="inline-flex items-center gap-2 text-steel hover:text-navy transition-colors text-sm font-medium"
          >
            <Mail size={15} />
            info@vetssi.com
          </a>
        </section>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Shield, Brain, Users, ArrowRight } from "lucide-react";
import ProtocolCard from "@/components/ProtocolCard";
import ContributorCard from "@/components/ContributorCard";
import { protocols } from "@/data/protocols";
import { pathways } from "@/data/pathways";
import { getFeaturedContributor } from "@/data/contributors";

export default function HomePage() {
  // One card per phase for the featured section
  const featuredProtocols = [
    protocols.find((p) => p.phase === "preoperative")!,
    protocols.find((p) => p.phase === "intraoperative")!,
    protocols.find((p) => p.phase === "postoperative")!,
  ];

  const featuredContributor = getFeaturedContributor();

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="hero-pattern bg-navy text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="nav-link text-steel-light mb-6 tracking-widest">
              VETSSI — Veterinary Surgical Site Infection Prevention Hub
            </p>
            <h1
              className="font-serif text-4xl md:text-6xl font-medium leading-tight mb-6"
              style={{ letterSpacing: "-0.01em" }}
            >
              Surgical Site Infection Prevention in Veterinary Surgery
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-10 max-w-2xl">
              Evidence-based protocols. Expert techniques. Real-world implementation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/protocols"
                className="inline-flex items-center gap-2 bg-steel hover:bg-steel-light text-white px-7 py-3.5 text-sm font-medium nav-link transition-colors"
              >
                Explore Protocols
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/videos"
                className="inline-flex items-center gap-2 border border-white/40 hover:border-white text-white px-7 py-3.5 text-sm font-medium nav-link transition-colors"
              >
                View Surgical Techniques
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mission Strip ─── */}
      <section className="bg-white border-b border-warm-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-start">
              <div className="w-10 h-10 flex items-center justify-center bg-cream border border-warm-gray mb-5">
                <Shield size={20} className="text-steel" />
              </div>
              <h3 className="font-serif text-xl font-medium text-navy mb-2">Evidence-Based</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Built on peer-reviewed veterinary surgical literature, graded by evidence quality and clinical applicability.
              </p>
            </div>

            <div className="flex flex-col items-start">
              <div className="w-10 h-10 flex items-center justify-center bg-cream border border-warm-gray mb-5">
                <Brain size={20} className="text-steel" />
              </div>
              <h3 className="font-serif text-xl font-medium text-navy mb-2">Systems Thinking</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                SSI prevention is multi-factorial, not a single intervention. This platform addresses all domains of the surgical pathway.
              </p>
            </div>

            <div className="flex flex-col items-start">
              <div className="w-10 h-10 flex items-center justify-center bg-cream border border-warm-gray mb-5">
                <Users size={20} className="text-steel" />
              </div>
              <h3 className="font-serif text-xl font-medium text-navy mb-2">Expert-Driven</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Developed and reviewed by leading veterinary surgeons with decades of clinical experience in SSI prevention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Protocols ─── */}
      <section className="bg-cream border-b border-warm-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="nav-link text-steel mb-2">By Phase of Care</p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-navy">
                Prevention Protocols
              </h2>
            </div>
            <Link
              href="/protocols"
              className="hidden md:inline-flex items-center gap-1.5 text-steel text-sm font-medium hover:text-navy transition-colors"
            >
              View All Protocols
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProtocols.map((protocol) => (
              <ProtocolCard key={protocol.slug} protocol={protocol} />
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              href="/protocols"
              className="inline-flex items-center gap-1.5 text-steel text-sm font-medium hover:text-navy transition-colors"
            >
              View All Protocols <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Contamination Pathways Teaser ─── */}
      <section className="bg-navy-mid text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <p className="nav-link text-steel-light mb-4">Contamination Pathways</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-5 leading-tight">
              SSI Prevention Is Not One Thing
            </h2>
            <p className="text-white/70 font-light leading-relaxed mb-8 text-base">
              Surgical site infections arise from eight distinct pathways — from the surgical team and patient,
              through the operating room environment, the sterile field, instruments and implants, surgical
              technique, intraoperative adjuncts, and postoperative care. No single intervention prevents SSI in
              isolation. Each pathway has its own protocols and its own owners.
            </p>

            {/* Pathway pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {pathways.map((p) => (
                <Link
                  key={p.slug}
                  href={`/contamination-pathways#${p.slug}`}
                  className="px-4 py-2 border border-white/20 text-sm text-white/80 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-colors"
                >
                  {p.name}
                </Link>
              ))}
            </div>

            <Link
              href="/contamination-pathways"
              className="inline-flex items-center gap-2 text-steel-light hover:text-white text-sm font-medium nav-link transition-colors"
            >
              Explore Contamination Pathways
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Featured Contributor ─── */}
      {featuredContributor && (
        <section className="bg-white border-b border-warm-gray">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="nav-link text-steel mb-2">Expert Network</p>
                <h2 className="font-serif text-3xl md:text-4xl font-medium text-navy">
                  Expert Contributors
                </h2>
              </div>
              <Link
                href="/contributors"
                className="hidden md:inline-flex items-center gap-1.5 text-steel text-sm font-medium hover:text-navy transition-colors"
              >
                View All Contributors
                <ArrowRight size={14} />
              </Link>
            </div>

            <ContributorCard contributor={featuredContributor} featured />

            <div className="mt-8 md:hidden">
              <Link
                href="/contributors"
                className="inline-flex items-center gap-1.5 text-steel text-sm font-medium hover:text-navy transition-colors"
              >
                View All Contributors <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Building2, Users, CheckCircle2 } from "lucide-react";
import CollapsibleSection from "@/components/CollapsibleSection";
import AjvrCitationFootnote from "@/components/AjvrCitationFootnote";
import {
  type Definition,
  coreDefinitions,
  pathwayRef,
  protocolRef,
  roleRef,
} from "@/data/ssi-definitions";

interface DefinitionTemplateProps {
  definition: Definition;
}

// Shared renderer for every Core SSI Definition detail page.
// Fixed section order (01–11). Two visually distinct voices:
// Consensus uses cream/steel/serif-italic; Interpretation uses white/navy/sans.

export default function DefinitionTemplate({ definition }: DefinitionTemplateProps) {
  const d = definition;

  const pathwayLinks = d.pathways.map((k) => ({ key: k, ...pathwayRef[k] }));
  const protocolLinks = d.protocols.map((k) => ({ key: k, ...protocolRef[k] }));
  const roleLinks = d.roles.map((k) => ({ key: k, ...roleRef[k] }));

  return (
    <>
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-warm-gray bg-white no-print">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-text-muted">
            <Link href="/" className="hover:text-navy transition-colors">Home</Link>
            <span>/</span>
            <Link href="/ssi-definitions" className="hover:text-navy transition-colors">SSI Definitions</Link>
            <span>/</span>
            <Link href="/ssi-definitions/core" className="hover:text-navy transition-colors">Core Definitions</Link>
            <span>/</span>
            <span className="text-navy">{d.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ─── Main column ─── */}
          <div className="flex-1 min-w-0 protocol-content">
            <Link
              href="/ssi-definitions/core"
              className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-navy transition-colors mb-6 no-print"
            >
              <ArrowLeft size={12} />
              Back to Core Definitions
            </Link>

            {/* Depth indicator */}
            <div className="mb-2">
              <span className="inline-block text-xs font-medium px-2.5 py-1 border border-steel text-steel bg-white uppercase tracking-wider">
                {d.short}
              </span>
            </div>

            {/* Title + tagline */}
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-navy mb-3 leading-tight">
              {d.title}
            </h1>
            <p className="text-base text-text-muted font-light mb-10 leading-relaxed max-w-3xl">
              {d.tagline}
            </p>

            {/* 01 — Consensus Definition */}
            <section className="mb-10">
              <SectionKicker n="01" label="Consensus Definition" />
              <ConsensusBlock>
                <p className="mb-3">{d.consensus}</p>
                {d.consensusNote && (
                  <p className="text-sm text-text-muted not-italic font-sans mt-4 pt-4 border-t border-steel/30">
                    <span className="nav-link text-steel mr-2">Note</span>
                    {d.consensusNote}
                  </p>
                )}
              </ConsensusBlock>
            </section>

            {/* 02 — Clinical Interpretation */}
            <section className="mb-10">
              <SectionKicker n="02" label="VETSSI Clinical Interpretation" />
              <InterpretationBlock>
                <p>{d.interpretation}</p>
              </InterpretationBlock>
            </section>

            {/* 03 — Why This Matters */}
            <section className="mb-10">
              <SectionKicker n="03" label="Why This Matters Clinically" />
              <p className="text-sm leading-relaxed text-text-primary">{d.whyItMatters}</p>
            </section>

            <hr className="border-warm-gray mb-10" />

            {/* 04 — Diagnostic Criteria */}
            <section className="mb-10">
              <SectionKicker n="04" label="Diagnostic Criteria" />
              <ul className="space-y-2.5">
                {d.criteria.map((c, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2 size={16} className="text-steel mt-0.5 flex-shrink-0" />
                    <p className="text-sm leading-relaxed text-text-primary">{c}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* 05 — Clinical Signs */}
            <section className="mb-10">
              <SectionKicker n="05" label="Clinical Signs" />
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {d.signs.map((s, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="w-1.5 h-1.5 bg-steel rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm leading-relaxed text-text-primary">{s}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 06 — Practical Clinical Examples */}
            <section className="mb-10">
              <SectionKicker n="06" label="Practical Clinical Examples" />
              <div className="space-y-4">
                {d.examples.map((ex, i) => (
                  <div key={i} className="border-l-2 border-warm-gray pl-4 py-1">
                    <p className="nav-link text-steel mb-1">{ex.proc}</p>
                    <p className="text-sm leading-relaxed text-text-primary">{ex.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-warm-gray mb-10" />

            {/* 07 — Diagnostic Gray Zones */}
            <section className="mb-10">
              <SectionKicker n="07" label="Diagnostic Gray Zones" />
              <p className="text-xs text-text-muted mb-4 italic">
                Differential reasoning at the bedside. Expand for the clinical breakdown.
              </p>
              <div className="space-y-2">
                {d.grayZones.map((g, i) => (
                  <CollapsibleSection key={i} title={g.title} defaultOpen={i === 0}>
                    <dl className="space-y-3 pt-2 text-sm leading-relaxed text-text-primary">
                      <ReasoningRow label="Why it is genuinely a gray zone" value={g.why} />
                      <ReasoningRow label="Distinguishing features" value={g.features} />
                      <ReasoningRow label="How to follow up" value={g.followUp} />
                      <ReasoningRow label="Why it matters for surveillance" value={g.surveillance} />
                    </dl>
                  </CollapsibleSection>
                ))}
              </div>
            </section>

            {/* 08 — Common Misclassification Scenarios */}
            <section className="mb-10">
              <SectionKicker n="08" label="Common Misclassification Scenarios" />
              <p className="text-xs text-text-muted mb-4 italic">
                The recurring ways this definition is mis-applied — and what to do instead.
              </p>
              <div className="space-y-2">
                {d.misclassification.map((m, i) => (
                  <CollapsibleSection key={i} title={m.title} defaultOpen={i === 0}>
                    <dl className="space-y-3 pt-2 text-sm leading-relaxed text-text-primary">
                      <ReasoningRow label="Why it happens" value={m.why} />
                      <ReasoningRow label="Clinical consequence" value={m.clinical} />
                      <ReasoningRow label="Surveillance consequence" value={m.surveillance} />
                      <ReasoningRow label="The fix" value={m.fix} />
                    </dl>
                  </CollapsibleSection>
                ))}
              </div>
            </section>

            <hr className="border-warm-gray mb-10" />

            {/* 09 — Connected Across the System */}
            <section className="mb-10">
              <SectionKicker n="09" label="Connected Across the System" />
              <p className="text-xs text-text-muted mb-5 italic">
                How this definition links into the contamination pathways, protocols, and roles that produce or prevent it.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <ConnectionCard icon={<Building2 size={14} className="text-steel" />} title="Pathways">
                  {pathwayLinks.map((p) => (
                    <ConnectionLink key={p.key} href={p.href} label={p.name} />
                  ))}
                </ConnectionCard>

                <ConnectionCard icon={<BookOpen size={14} className="text-steel" />} title="Protocols">
                  {protocolLinks.map((p) => (
                    <ConnectionLink key={p.key} href={p.href} label={p.name} />
                  ))}
                </ConnectionCard>

                <ConnectionCard icon={<Users size={14} className="text-steel" />} title="Roles">
                  {roleLinks.map((r) => (
                    <ConnectionLink key={r.key} href={r.href} label={r.name} />
                  ))}
                </ConnectionCard>
              </div>
            </section>

            {/* 10 — Surveillance Implications */}
            <section className="mb-10">
              <SectionKicker n="10" label="Surveillance Implications" />
              <p className="text-sm leading-relaxed text-text-primary">{d.surveillance}</p>
            </section>

            <hr className="border-warm-gray mb-10" />

            {/* 11 — Source */}
            <section className="mb-4">
              <SectionKicker n="11" label="Source" />
              <AjvrCitationFootnote variant="compact" />
            </section>
          </div>

          {/* ─── Sidebar ─── */}
          <aside className="lg:w-72 flex-shrink-0 no-print">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="card bg-white border border-warm-gray p-5">
                <p className="nav-link text-steel mb-3">On this page</p>
                <ul className="space-y-2 text-sm">
                  <SidebarJump label="Consensus Definition" />
                  <SidebarJump label="Clinical Interpretation" />
                  <SidebarJump label="Why This Matters" />
                  <SidebarJump label="Diagnostic Criteria" />
                  <SidebarJump label="Clinical Signs" />
                  <SidebarJump label="Clinical Examples" />
                  <SidebarJump label="Gray Zones" />
                  <SidebarJump label="Misclassification" />
                  <SidebarJump label="Connections" />
                  <SidebarJump label="Surveillance" />
                  <SidebarJump label="Source" />
                </ul>
              </div>

              <div className="card bg-white border border-warm-gray p-5">
                <p className="nav-link text-steel mb-3">Other Core Definitions</p>
                <OtherDefinitions currentSlug={d.slug} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>

    <AjvrCitationFootnote variant="full" />
    </>
  );
}

// ─── Sub-components ───

function SectionKicker({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-4">
      <span className="font-serif text-steel-light text-lg">{n}</span>
      <h2 className="font-serif text-xl font-medium text-navy">{label}</h2>
    </div>
  );
}

// Consensus voice — scientific authority, paraphrased from AJVR.
function ConsensusBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-cream border-l-4 border-steel pl-5 pr-5 py-4">
      <p className="nav-link text-steel mb-2">From the 2026 AJVR consensus</p>
      <div className="font-serif italic text-base leading-relaxed text-navy">{children}</div>
    </div>
  );
}

// Interpretation voice — VETSSI editorial layer.
function InterpretationBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border-l-4 border-navy pl-5 pr-5 py-4 border-y border-r border-warm-gray">
      <p className="nav-link text-navy mb-2">VETSSI clinical interpretation</p>
      <div className="text-sm leading-relaxed text-text-primary">{children}</div>
    </div>
  );
}

function ReasoningRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="nav-link text-steel mb-1">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function ConnectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card bg-white border border-warm-gray p-4">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="text-xs font-medium text-navy nav-link">{title}</h3>
      </div>
      <ul className="space-y-1.5">{children}</ul>
    </div>
  );
}

function ConnectionLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-2 text-sm text-steel hover:text-navy transition-colors py-0.5"
      >
        <ArrowRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
        <span className="leading-snug">{label}</span>
      </Link>
    </li>
  );
}

function SidebarJump({ label }: { label: string }) {
  return (
    <li className="text-text-muted leading-snug">
      <span>{label}</span>
    </li>
  );
}

function OtherDefinitions({ currentSlug }: { currentSlug: string }) {
  return (
    <ul className="space-y-2">
      {coreDefinitions
        .filter((d) => d.slug !== currentSlug)
        .map((d) => (
          <li key={d.slug}>
            <Link
              href={`/ssi-definitions/core/${d.slug}`}
              className="group flex items-center gap-2 text-sm text-steel hover:text-navy transition-colors py-0.5"
            >
              <ArrowRight size={12} className="opacity-60 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              <span className="leading-snug">{d.short}</span>
            </Link>
          </li>
        ))}
    </ul>
  );
}

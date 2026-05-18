import {
  Users,
  User,
  Building2,
  Shield,
  Wrench,
  Scissors,
  Syringe,
  Bandage,
  type LucideIcon,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import JumpNav from "@/components/JumpNav";
import CalloutBox from "@/components/CalloutBox";
import LinkedProtocolList from "@/components/LinkedProtocolList";
import Tag from "@/components/Tag";
import { pathways } from "@/data/pathways";
import { getRoleBySlug } from "@/data/roles";

const iconMap: Record<string, LucideIcon> = {
  Users,
  User,
  Building2,
  Shield,
  Wrench,
  Scissors,
  Syringe,
  Bandage,
};

export const metadata = {
  title: "Contamination Pathways",
  description:
    "Where surgical site infections come from — and how each pathway can be controlled. Covers patient, surgical team, instruments, implants, and OR environment.",
  alternates: { canonical: "https://vetssi.com/contamination-pathways" },
  openGraph: { title: "Contamination Pathways | VETSSI", url: "https://vetssi.com/contamination-pathways" },
};

export default function ContaminationPathwaysPage() {
  const navItems = pathways.map((p) => ({ id: p.slug, label: p.name }));

  return (
    <>
      <PageHeader
        title="Contamination Pathways"
        subtitle="Where surgical site infections come from — and how each pathway can be controlled."
      />

      <JumpNav items={navItems} ariaLabel="Jump to pathway" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {pathways.map((pathway) => {
          const Icon = iconMap[pathway.icon] ?? Shield;
          const ownedRoles = pathway.ownedBy
            .map((slug) => getRoleBySlug(slug))
            .filter((r): r is NonNullable<typeof r> => Boolean(r));

          return (
            <section
              key={pathway.slug}
              id={pathway.slug}
              className="border-b border-warm-gray py-14 first:pt-0 last:border-b-0 scroll-mt-32"
            >
              <div className="flex items-start gap-5 mb-6">
                <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-cream border border-warm-gray">
                  <Icon size={22} className="text-steel" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl font-medium text-navy leading-tight">
                    {pathway.name}
                  </h2>
                  <p className="text-text-muted text-base font-light leading-relaxed mt-2 max-w-3xl">
                    {pathway.subtitle}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h3 className="nav-link text-steel mb-3">Overview</h3>
                    <p className="text-text-primary leading-relaxed">
                      {pathway.riskExplanation}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="nav-link text-steel mb-3">Why It Matters</h3>
                      <ul className="space-y-2">
                        {pathway.whyItMatters.map((w, i) => (
                          <li
                            key={i}
                            className="text-sm text-text-primary leading-relaxed flex gap-2"
                          >
                            <span className="text-steel mt-1">·</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="nav-link text-steel mb-3">Mechanisms</h3>
                      <ul className="space-y-2">
                        {pathway.mechanisms.map((m, i) => (
                          <li
                            key={i}
                            className="text-sm text-text-primary leading-relaxed flex gap-2"
                          >
                            <span className="text-steel mt-1">·</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <CalloutBox title="Critical Insight">{pathway.criticalInsight}</CalloutBox>

                  <div>
                    <h3 className="nav-link text-steel mb-4">Linked Protocols</h3>
                    <LinkedProtocolList protocolSlugs={pathway.linkedProtocols} />
                  </div>
                </div>

                <aside className="space-y-8">
                  <div>
                    <h3 className="nav-link text-steel mb-4">Owned By</h3>
                    <div className="flex flex-wrap gap-2">
                      {ownedRoles.map((r) => (
                        <Tag
                          key={r.slug}
                          label={r.title.split(" / ")[0]}
                          variant="role"
                          size="md"
                          href={`/roles#${r.slug}`}
                        />
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

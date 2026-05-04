import { Role } from "@/data/roles";
import { getPathwayBySlug } from "@/data/pathways";
import CalloutBox from "./CalloutBox";
import LinkedProtocolList from "./LinkedProtocolList";
import Tag from "./Tag";

interface RoleSectionProps {
  role: Role;
}

export default function RoleSection({ role }: RoleSectionProps) {
  const controlledPathways = role.controlledPathways
    .map((slug) => getPathwayBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section
      id={role.slug}
      className="border-b border-warm-gray py-14 first:pt-0 last:border-b-0 scroll-mt-32"
    >
      <h2 className="font-serif text-3xl md:text-4xl font-medium text-navy mb-4 leading-tight">
        {role.title}
      </h2>

      <p className="text-text-muted text-base leading-relaxed max-w-3xl mb-10">
        {role.overview}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
        <div>
          <h3 className="nav-link text-steel mb-4">Responsibilities</h3>
          <ul className="space-y-2">
            {role.responsibilities.map((r, i) => (
              <li key={i} className="text-sm text-text-primary leading-relaxed flex gap-2">
                <span className="text-steel mt-1">·</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="nav-link text-steel mb-4">Critical Moments</h3>
          <ul className="space-y-2">
            {role.criticalMoments.map((m, i) => (
              <li key={i} className="text-sm text-text-primary leading-relaxed flex gap-2">
                <span className="text-steel mt-1">·</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="nav-link text-steel mb-4">Common Failure Points</h3>
          <ul className="space-y-2">
            {role.failurePoints.map((f, i) => (
              <li key={i} className="text-sm text-text-primary leading-relaxed flex gap-2">
                <span className="text-steel mt-1">·</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {role.insight && <CalloutBox title="Insight">{role.insight}</CalloutBox>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
        <div className="lg:col-span-2">
          <h3 className="nav-link text-steel mb-4">Protocols This Role Owns</h3>
          <LinkedProtocolList protocolSlugs={role.linkedProtocols} />
        </div>

        <div>
          <h3 className="nav-link text-steel mb-4">Contamination Pathways Controlled</h3>
          <div className="flex flex-wrap gap-2">
            {controlledPathways.map((p) => (
              <Tag
                key={p.slug}
                label={p.name}
                variant="pathway"
                size="md"
                href={`/contamination-pathways#${p.slug}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

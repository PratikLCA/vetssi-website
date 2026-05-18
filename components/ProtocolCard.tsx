import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Protocol } from "@/data/protocols";
import { getPathwayBySlug } from "@/data/pathways";
import { getRoleBySlug } from "@/data/roles";
import Tag from "./Tag";

const phaseConfig = {
  "pre-case-planning": { label: "Pre-Case Planning", className: "badge-pre-case-planning" },
  preoperative: { label: "Preoperative", className: "badge-preoperative" },
  intraoperative: { label: "Intraoperative", className: "badge-intraoperative" },
  postoperative: { label: "Postoperative", className: "badge-postoperative" },
};

interface ProtocolCardProps {
  protocol: Protocol;
}

export default function ProtocolCard({ protocol }: ProtocolCardProps) {
  const config = phaseConfig[protocol.phase];

  const pathwayTags = protocol.pathways
    .map((slug) => getPathwayBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const roleTags = protocol.roles
    .map((slug) => getRoleBySlug(slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const visibleTags = [...pathwayTags.slice(0, 2), ...roleTags.slice(0, 2)];
  const hiddenCount =
    pathwayTags.length + roleTags.length - visibleTags.length;

  return (
    <div className="card bg-white border border-warm-gray flex flex-col">
      <div className="p-6 flex flex-col flex-1">
        {/* Phase badge */}
        <div className="mb-4">
          <span
            className={`inline-block text-xs font-medium px-2.5 py-1 ${config.className}`}
          >
            {config.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-medium text-navy leading-snug mb-3">
          {protocol.title}
        </h3>

        {/* Pathway + role tags */}
        {(pathwayTags.length > 0 || roleTags.length > 0) && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {pathwayTags.slice(0, 2).map((p) => (
              <Tag key={p.slug} label={p.name} variant="pathway" size="sm" />
            ))}
            {roleTags.slice(0, 2).map((r) => (
              <Tag key={r.slug} label={r.title.split(" / ")[0]} variant="role" size="sm" />
            ))}
            {hiddenCount > 0 && (
              <span className="inline-block text-[0.65rem] px-2 py-0.5 text-text-muted self-center">
                +{hiddenCount}
              </span>
            )}
          </div>
        )}

        {/* Clinical objective (truncated) */}
        <p className="text-sm text-text-muted leading-relaxed flex-1 mb-5">
          {protocol.clinicalObjective.split(".")[0]}.
        </p>

        {/* Link */}
        <Link
          href={`/protocols/${protocol.slug}`}
          className="inline-flex items-center gap-1.5 text-steel text-sm font-medium hover:text-navy transition-colors group"
        >
          View Protocol
          <ArrowRight
            size={14}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}

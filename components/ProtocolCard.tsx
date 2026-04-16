import Link from "next/link";
import { Protocol } from "@/data/protocols";
import { ArrowRight } from "lucide-react";

const phaseConfig = {
  preoperative: {
    label: "Preoperative",
    className: "badge-preoperative",
  },
  intraoperative: {
    label: "Intraoperative",
    className: "badge-intraoperative",
  },
  postoperative: {
    label: "Postoperative",
    className: "badge-postoperative",
  },
};

interface ProtocolCardProps {
  protocol: Protocol;
}

export default function ProtocolCard({ protocol }: ProtocolCardProps) {
  const config = phaseConfig[protocol.phase];

  return (
    <div className="card bg-white border border-warm-gray flex flex-col">
      <div className="p-6 flex flex-col flex-1">
        {/* Phase badge */}
        <div className="mb-4">
          <span className={`inline-block text-xs font-medium px-2.5 py-1 ${config.className}`}>
            {config.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-medium text-navy leading-snug mb-3">
          {protocol.title}
        </h3>

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
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

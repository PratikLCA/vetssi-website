import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProtocolBySlug } from "@/data/protocols";

const phaseConfig = {
  preoperative: { label: "Preoperative", className: "badge-preoperative" },
  intraoperative: { label: "Intraoperative", className: "badge-intraoperative" },
  postoperative: { label: "Postoperative", className: "badge-postoperative" },
};

interface LinkedProtocolListProps {
  protocolSlugs: string[];
  emptyMessage?: string;
}

export default function LinkedProtocolList({
  protocolSlugs,
  emptyMessage = "No protocols linked.",
}: LinkedProtocolListProps) {
  const items = protocolSlugs
    .map((slug) => getProtocolBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (items.length === 0) {
    return <p className="text-sm text-text-muted">{emptyMessage}</p>;
  }

  return (
    <ul className="divide-y divide-warm-gray border-t border-b border-warm-gray">
      {items.map((p) => {
        const cfg = phaseConfig[p.phase];
        return (
          <li key={p.slug}>
            <Link
              href={`/protocols/${p.slug}`}
              className="flex items-center gap-4 py-3 group hover:bg-cream transition-colors px-2 -mx-2"
            >
              <span
                className={`shrink-0 inline-block text-[0.65rem] font-medium px-2 py-0.5 ${cfg.className}`}
              >
                {cfg.label}
              </span>
              <span className="font-serif text-base text-navy flex-1 group-hover:text-steel transition-colors">
                {p.title}
              </span>
              <ArrowRight
                size={14}
                className="text-text-muted group-hover:text-steel group-hover:translate-x-0.5 transition-all shrink-0"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

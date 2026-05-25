import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { coreDefinitions } from "@/data/ssi-definitions";

// Depth-ordered, anatomical "SSI Classification System" map.
// Skin/subcutaneous → fascia/muscle → organ/bone/space → implant.
// The SSI parent sits as a header band above the four depth bands.
// Each band links to its definition page.

const depthAccent: Record<number, { bg: string; border: string; depthLabel: string }> = {
  0: { bg: "bg-navy text-white", border: "border-navy", depthLabel: "Parent definition" },
  1: { bg: "bg-cream", border: "border-steel-light", depthLabel: "Skin & subcutaneous tissue" },
  2: { bg: "bg-cream", border: "border-steel", depthLabel: "Fascia & muscle" },
  3: { bg: "bg-cream", border: "border-navy-mid", depthLabel: "Body cavity, organ, or bone" },
  4: { bg: "bg-navy-mid text-white", border: "border-navy", depthLabel: "Implant — biofilm disease" },
};

export default function SsiClassificationMap() {
  const parent = coreDefinitions.find((d) => d.depth === 0);
  const children = coreDefinitions.filter((d) => d.depth > 0).sort((a, b) => a.depth - b.depth);

  return (
    <div>
      {/* Parent band */}
      {parent && (
        <Link
          href={`/ssi-definitions/core/${parent.slug}`}
          className={`group block ${depthAccent[0].bg} border-l-4 ${depthAccent[0].border} p-5 hover:opacity-95 transition-opacity`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="nav-link text-steel-light mb-1">{depthAccent[0].depthLabel}</p>
              <p className="font-serif text-2xl font-medium leading-snug">{parent.title}</p>
              <p className="text-sm text-white/70 mt-1 max-w-2xl">{parent.tagline}</p>
            </div>
            <ArrowRight size={18} className="text-white/70 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </div>
        </Link>
      )}

      {/* Depth bands */}
      <ol className="mt-2 space-y-1">
        {children.map((d) => {
          const accent = depthAccent[d.depth];
          const isImplant = d.depth === 4;
          return (
            <li key={d.slug}>
              <Link
                href={`/ssi-definitions/core/${d.slug}`}
                className={`group block ${accent.bg} border-l-4 ${accent.border} border-y border-r border-warm-gray p-5 hover:border-l-navy transition-colors`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                      <span className={`font-serif text-3xl font-medium leading-none ${isImplant ? "text-white" : "text-steel-light"}`}>
                        {d.depth}
                      </span>
                      <p className={`nav-link ${isImplant ? "text-white/70" : "text-steel"}`}>
                        {accent.depthLabel}
                      </p>
                    </div>
                    <p className={`font-serif text-xl font-medium leading-snug ${isImplant ? "text-white" : "text-navy"}`}>
                      {d.title}
                    </p>
                    <p className={`text-sm mt-1 leading-relaxed max-w-2xl ${isImplant ? "text-white/70" : "text-text-primary"}`}>
                      {d.tagline}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className={`group-hover:translate-x-1 transition-transform flex-shrink-0 ${
                      isImplant ? "text-white/70" : "text-text-muted group-hover:text-steel"
                    }`}
                  />
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

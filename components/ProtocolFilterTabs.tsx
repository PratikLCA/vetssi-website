"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { pathways } from "@/data/pathways";
import { roles } from "@/data/roles";

export type FilterMode = "phase" | "pathway" | "role";

const modeLabels: Record<FilterMode, string> = {
  phase: "By Phase",
  pathway: "By Pathway",
  role: "By Role",
};

const phaseValues = [
  { value: "preoperative", label: "Preoperative" },
  { value: "intraoperative", label: "Intraoperative" },
  { value: "postoperative", label: "Postoperative" },
];

const pathwayValues = pathways.map((p) => ({ value: p.slug, label: p.name }));
const roleValues = roles.map((r) => ({ value: r.slug, label: r.title.split(" / ")[0] }));

const valuesForMode: Record<FilterMode, { value: string; label: string }[]> = {
  phase: phaseValues,
  pathway: pathwayValues,
  role: roleValues,
};

export function readFilterFromParams(params: URLSearchParams): {
  mode: FilterMode;
  value: string | null;
} {
  const mode = (params.get("mode") as FilterMode) ?? "phase";
  if (!["phase", "pathway", "role"].includes(mode)) {
    return { mode: "phase", value: null };
  }
  const value = params.get("value");
  return { mode, value };
}

export default function ProtocolFilterTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { mode, value } = readFilterFromParams(searchParams);
  const values = valuesForMode[mode];

  const setParams = (newMode: FilterMode, newValue: string | null) => {
    const params = new URLSearchParams();
    params.set("mode", newMode);
    if (newValue) params.set("value", newValue);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-4">
      {/* Mode tabs */}
      <div className="flex flex-wrap gap-0 border-b border-warm-gray">
        {(Object.keys(modeLabels) as FilterMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setParams(m, null)}
            className={`nav-link px-5 py-3 -mb-px transition-colors ${
              mode === m
                ? "text-steel border-b-2 border-steel"
                : "text-text-muted hover:text-navy"
            }`}
          >
            {modeLabels[m]}
          </button>
        ))}
      </div>

      {/* Value chips for active mode */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setParams(mode, null)}
          className={`nav-link px-4 py-2 border transition-colors ${
            !value
              ? "bg-steel text-white border-steel"
              : "bg-white text-text-muted border-warm-gray hover:border-steel hover:text-steel"
          }`}
        >
          All
        </button>
        {values.map((v) => (
          <button
            key={v.value}
            onClick={() => setParams(mode, v.value)}
            className={`nav-link px-4 py-2 border transition-colors ${
              value === v.value
                ? "bg-steel text-white border-steel"
                : "bg-white text-text-muted border-warm-gray hover:border-steel hover:text-steel"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}

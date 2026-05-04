"use client";

import { useSearchParams } from "next/navigation";
import ProtocolCard from "@/components/ProtocolCard";
import ProtocolFilterTabs, { readFilterFromParams } from "@/components/ProtocolFilterTabs";
import {
  protocols,
  getProtocolsByPhase,
  getProtocolsByPathway,
  getProtocolsByRole,
  type Protocol,
} from "@/data/protocols";
import { getPathwayBySlug } from "@/data/pathways";
import { getRoleBySlug } from "@/data/roles";

export default function ProtocolsClient() {
  const searchParams = useSearchParams();
  const { mode, value } = readFilterFromParams(searchParams);

  let filtered: Protocol[] = protocols;
  let activeLabel: string | null = null;

  if (value) {
    if (mode === "phase") {
      filtered = getProtocolsByPhase(value as Protocol["phase"]);
      activeLabel = value;
    } else if (mode === "pathway") {
      filtered = getProtocolsByPathway(value);
      activeLabel = getPathwayBySlug(value)?.name ?? value;
    } else if (mode === "role") {
      filtered = getProtocolsByRole(value);
      activeLabel = getRoleBySlug(value)?.title ?? value;
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
      <div className="mb-8">
        <ProtocolFilterTabs />
      </div>

      <p className="text-sm text-text-muted mb-6">
        {filtered.length} protocol{filtered.length !== 1 ? "s" : ""}
        {activeLabel ? ` — ${activeLabel}` : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="border border-warm-gray bg-white p-10 text-center">
          <p className="text-text-muted">No protocols match this filter combination.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((protocol) => (
            <ProtocolCard key={protocol.slug} protocol={protocol} />
          ))}
        </div>
      )}
    </div>
  );
}

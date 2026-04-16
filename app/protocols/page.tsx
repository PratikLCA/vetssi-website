"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import ProtocolCard from "@/components/ProtocolCard";
import PhaseFilterComponent, { PhaseFilter } from "@/components/PhaseFilter";
import { protocols } from "@/data/protocols";

export default function ProtocolsPage() {
  const [activePhase, setActivePhase] = useState<PhaseFilter>("all");

  const filtered =
    activePhase === "all"
      ? protocols
      : protocols.filter((p) => p.phase === activePhase);

  return (
    <>
      <PageHeader
        title="Protocol Library"
        subtitle="Evidence-based prevention protocols organized by phase of care"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Filter bar */}
        <div className="mb-8">
          <PhaseFilterComponent active={activePhase} onChange={setActivePhase} />
        </div>

        {/* Results count */}
        <p className="text-sm text-text-muted mb-6">
          {filtered.length} protocol{filtered.length !== 1 ? "s" : ""}
          {activePhase !== "all" ? ` — ${activePhase}` : ""}
        </p>

        {/* Protocol grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((protocol) => (
            <ProtocolCard key={protocol.slug} protocol={protocol} />
          ))}
        </div>
      </div>
    </>
  );
}

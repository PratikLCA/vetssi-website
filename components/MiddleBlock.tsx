"use client";

import { useState } from "react";
import type {
  MiddleBlock as MiddleBlockType,
} from "@/data/protocols";

// ─── Shared helpers ───────────────────────────────────────────────────────────

const tierStyles = {
  standard: "bg-[#E6F4F1] text-[#0D6E5B] border border-[#A3D4CB]",
  elevated: "bg-[#FEF3E2] text-[#7D5A1E] border border-[#F0C98A]",
  high: "bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]",
} as const;

const tierLabels = { standard: "Standard", elevated: "Elevated", high: "High" } as const;

const actionStyles = {
  proceed: "bg-[#E6F4F1] text-[#0D6E5B] border border-[#A3D4CB]",
  modify: "bg-[#FEF3E2] text-[#7D5A1E] border border-[#F0C98A]",
  defer: "bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]",
} as const;

const actionDefaultLabels = { proceed: "Proceed", modify: "Modify plan", defer: "Defer surgery" } as const;

// Shared navy-header card wrapper
function CardBlock({ header, children }: { header: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-warm-gray overflow-hidden">
      <div className="bg-navy text-white text-xs font-medium uppercase tracking-wider px-4 py-2.5">
        {header}
      </div>
      {children}
    </div>
  );
}

// Shared checkbox item
function CheckItem({ label, note }: { label: string; note?: string }) {
  return (
    <label className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-cream transition-colors border-b border-warm-gray last:border-b-0">
      <input
        type="checkbox"
        className="mt-0.5 flex-shrink-0 w-4 h-4"
        style={{ accentColor: "var(--steel)" }}
      />
      <div>
        <span className="text-sm font-medium text-text-primary">{label}</span>
        {note && <p className="text-xs text-text-muted mt-0.5">{note}</p>}
      </div>
    </label>
  );
}

// ─── Type A: Risk Tier Block ──────────────────────────────────────────────────

function RiskTierBlock({
  block,
}: {
  block: Extract<MiddleBlockType, { type: "risk-tier" }>;
}) {
  return (
    <section className="mb-8">
      <h2 className="font-serif text-lg font-medium text-navy mb-3">{block.sectionTitle}</h2>
      {block.intro && <p className="text-sm text-text-muted mb-4">{block.intro}</p>}

      {/* Two-column checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <CardBlock header="Patient Factors">
          <div>
            {block.patientFactors.map((item, i) => (
              <CheckItem key={i} label={item.label} note={item.note} />
            ))}
          </div>
        </CardBlock>

        <CardBlock header="Procedural Factors">
          <div>
            {block.proceduralFactors.map((item, i) => (
              <CheckItem key={i} label={item.label} note={item.note} />
            ))}
          </div>
        </CardBlock>
      </div>

      {/* Tier assignment table */}
      <h2 className="font-serif text-lg font-medium text-navy mb-3">Tier Assignment</h2>
      <div className="bg-white border border-warm-gray overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-xs font-medium uppercase tracking-wider px-4 py-2.5 text-left w-28">
                Tier
              </th>
              <th className="text-xs font-medium uppercase tracking-wider px-4 py-2.5 text-left">
                Criteria
              </th>
              <th className="text-xs font-medium uppercase tracking-wider px-4 py-2.5 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {block.tiers.map((tier, i) => (
              <tr key={i} className="border-t border-warm-gray align-top">
                <td className="px-4 py-3">
                  <span
                    className={`inline-block text-xs font-medium px-2.5 py-1 uppercase tracking-wide ${tierStyles[tier.level]}`}
                  >
                    {tierLabels[tier.level]}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-text-primary">{tier.criteria}</td>
                <td className="px-4 py-3 text-sm text-text-primary">{tier.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── Type B: Screening Table Block ───────────────────────────────────────────

function ScreeningTableBlock({
  block,
}: {
  block: Extract<MiddleBlockType, { type: "screening-table" }>;
}) {
  return (
    <section className="mb-8">
      <h2 className="font-serif text-lg font-medium text-navy mb-3">{block.sectionTitle}</h2>
      {block.intro && <p className="text-sm text-text-muted mb-4">{block.intro}</p>}

      {/* Screening table */}
      <div className="bg-white border border-warm-gray overflow-hidden mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-xs font-medium uppercase tracking-wider px-4 py-2.5 text-left w-44">
                Assessment Domain
              </th>
              <th className="text-xs font-medium uppercase tracking-wider px-4 py-2.5 text-left">
                Finding
              </th>
              <th className="text-xs font-medium uppercase tracking-wider px-4 py-2.5 text-left w-44">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {block.domains.map((domain, di) =>
              domain.rows.map((row, ri) => (
                <tr key={`${di}-${ri}`} className="border-t border-warm-gray align-top">
                  {ri === 0 && (
                    <td
                      rowSpan={domain.rows.length}
                      className="px-4 py-3 text-sm font-medium text-navy align-top border-r border-warm-gray bg-cream/50"
                    >
                      {domain.domain}
                    </td>
                  )}
                  <td className="px-4 py-3 text-sm text-text-primary">{row.finding}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs font-medium px-2.5 py-1 ${actionStyles[row.action]}`}
                    >
                      {row.actionLabel ?? actionDefaultLabels[row.action]}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Day-of checklist */}
      <h2 className="font-serif text-lg font-medium text-navy mb-3">{block.dayOfTitle}</h2>
      <CardBlock header="Day-of-Surgery Screening">
        <div>
          {block.dayOfItems.map((item, i) => (
            <CheckItem key={i} label={item.label} note={item.note} />
          ))}
        </div>
      </CardBlock>
    </section>
  );
}

// ─── Type C: Planning Checklist Block ────────────────────────────────────────

function PlanningChecklistBlock({
  block,
}: {
  block: Extract<MiddleBlockType, { type: "planning-checklist" }>;
}) {
  return (
    <section className="mb-8">
      <h2 className="font-serif text-lg font-medium text-navy mb-3">{block.sectionTitle}</h2>
      {block.intro && <p className="text-sm text-text-muted mb-4">{block.intro}</p>}

      {/* Two-column checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {block.groups.map((group, gi) => (
          <CardBlock key={gi} header={group.header}>
            <div>
              {group.items.map((item, ii) => (
                <CheckItem key={ii} label={item.label} note={item.note} />
              ))}
            </div>
          </CardBlock>
        ))}
      </div>

      {/* Parameters table */}
      {block.parameters.length > 0 && (
        <>
          <h2 className="font-serif text-lg font-medium text-navy mb-3">
            {block.parametersTitle}
          </h2>
          {block.parametersIntro && (
            <p className="text-sm text-text-muted mb-4">{block.parametersIntro}</p>
          )}
          <div className="bg-white border border-warm-gray overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-xs font-medium uppercase tracking-wider px-4 py-2.5 text-left w-56">
                    Parameter
                  </th>
                  <th className="text-xs font-medium uppercase tracking-wider px-4 py-2.5 text-left">
                    Planned Value / Decision
                  </th>
                </tr>
              </thead>
              <tbody>
                {block.parameters.map((param, i) => (
                  <tr key={i} className="border-t border-warm-gray">
                    <td className="px-4 py-3 text-sm font-medium text-text-primary border-r border-warm-gray bg-cream/30">
                      {param.label}
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        placeholder={param.placeholder}
                        className="w-full border border-warm-gray px-3 py-1.5 text-sm text-text-primary bg-white focus:outline-none focus:border-steel transition-colors"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}

// ─── Type D: Prophylaxis Plan Block ──────────────────────────────────────────

function ProphylaxisPlanBlock({
  block,
}: {
  block: Extract<MiddleBlockType, { type: "prophylaxis-plan" }>;
}) {
  return (
    <section className="mb-8">
      <h2 className="font-serif text-lg font-medium text-navy mb-3">{block.sectionTitle}</h2>
      {block.intro && <p className="text-sm text-text-muted mb-4">{block.intro}</p>}

      {/* Parameters card */}
      <div className="bg-white border border-warm-gray overflow-hidden mb-6">
        <div className="bg-navy text-white text-xs font-medium uppercase tracking-wider px-4 py-2.5">
          {block.planTitle}
        </div>
        <div>
          {block.parameters.map((param, i) => (
            <div key={i} className="grid grid-cols-[180px_1fr] border-t border-warm-gray first:border-t-0">
              <div className="px-4 py-3 text-sm font-medium text-navy bg-cream/30 border-r border-warm-gray flex items-center">
                {param.label}
              </div>
              <div className="px-4 py-3">
                <input
                  type="text"
                  placeholder={param.placeholder}
                  className="w-full border border-warm-gray px-3 py-1.5 text-sm text-text-primary bg-white focus:outline-none focus:border-steel transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timing visual */}
      <h2 className="font-serif text-lg font-medium text-navy mb-3">Timing Reference</h2>
      <div className="bg-white border border-warm-gray p-5 mb-6">
        <p className="text-sm font-medium text-navy mb-4">
          Target window: administration 30–60 minutes before incision
        </p>
        <div className="relative h-3 bg-warm-gray overflow-visible mb-8">
          {/* Target window */}
          <div
            className="absolute h-full"
            style={{ left: "15%", width: "25%", backgroundColor: "#4ade80" }}
          />
          {/* Incision marker */}
          <div
            className="absolute w-0.5 bg-navy"
            style={{ left: "40%", top: "-50%", height: "200%" }}
          />
          {/* Redose marker */}
          <div
            className="absolute w-0.5"
            style={{ left: "70%", top: "-50%", height: "200%", backgroundColor: "#b45309" }}
          />
        </div>
        <div className="flex flex-wrap gap-5 text-xs text-text-muted">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 flex-shrink-0" style={{ backgroundColor: "#4ade80" }} />
            Target administration window
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 flex-shrink-0 bg-navy" />
            Incision
          </span>
          <span className="flex items-center gap-2">
            <span
              className="w-3 h-3 flex-shrink-0"
              style={{ backgroundColor: "#b45309" }}
            />
            Redose trigger (if applicable)
          </span>
        </div>
      </div>

      {/* Confirmation checklist */}
      <h2 className="font-serif text-lg font-medium text-navy mb-3">
        {block.confirmationTitle}
      </h2>
      <CardBlock header="Prophylaxis Confirmation">
        <div>
          {block.confirmationItems.map((item, i) => (
            <CheckItem key={i} label={item.label} note={item.note} />
          ))}
        </div>
      </CardBlock>
    </section>
  );
}

// ─── Type E: Go/No-Go Block ───────────────────────────────────────────────────

function GoNoGoBlock({
  block,
}: {
  block: Extract<MiddleBlockType, { type: "gonogo" }>;
}) {
  const [states, setStates] = useState<Record<string, "pass" | "fail" | null>>({});

  const toggle = (key: string, value: "pass" | "fail") => {
    setStates((prev) => ({ ...prev, [key]: prev[key] === value ? null : value }));
  };

  return (
    <section className="mb-8">
      <h2 className="font-serif text-lg font-medium text-navy mb-3">{block.sectionTitle}</h2>
      {block.intro && <p className="text-sm text-text-muted mb-4">{block.intro}</p>}

      <div className="space-y-4">
        {block.groups.map((group, gi) => (
          <CardBlock key={gi} header={group.header}>
            <div>
              {group.items.map((item, ii) => {
                const key = `${gi}-${ii}`;
                const state = states[key] ?? null;
                return (
                  <div
                    key={ii}
                    className="flex items-center gap-4 px-4 py-3 border-b border-warm-gray last:border-b-0"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary">{item.label}</p>
                      <p className="text-xs text-text-muted mt-0.5">{item.note}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => toggle(key, "pass")}
                        className={`text-xs font-medium px-3 py-1.5 border uppercase tracking-wide transition-colors ${
                          state === "pass"
                            ? "bg-[#16a34a] border-[#16a34a] text-white"
                            : "bg-[#f0fdf4] border-[#bbf7d0] text-[#15803d] hover:bg-[#dcfce7]"
                        }`}
                      >
                        Pass
                      </button>
                      <button
                        onClick={() => toggle(key, "fail")}
                        className={`text-xs font-medium px-3 py-1.5 border uppercase tracking-wide transition-colors ${
                          state === "fail"
                            ? "bg-[#dc2626] border-[#dc2626] text-white"
                            : "bg-[#fef2f2] border-[#fecaca] text-[#b91c1c] hover:bg-[#fee2e2]"
                        }`}
                      >
                        Fail
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBlock>
        ))}
      </div>

      {block.warning && (
        <div className="mt-4 border border-[#F0C98A] border-l-4 border-l-[#b45309] bg-[#FEF3E2] p-4">
          <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "#b45309" }}>
            ⚠ {block.warning.label}
          </p>
          <p className="text-sm text-text-primary">{block.warning.text}</p>
        </div>
      )}
    </section>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function MiddleBlock({ block }: { block: MiddleBlockType }) {
  switch (block.type) {
    case "risk-tier":
      return <RiskTierBlock block={block} />;
    case "screening-table":
      return <ScreeningTableBlock block={block} />;
    case "planning-checklist":
      return <PlanningChecklistBlock block={block} />;
    case "prophylaxis-plan":
      return <ProphylaxisPlanBlock block={block} />;
    case "gonogo":
      return <GoNoGoBlock block={block} />;
    default:
      return null;
  }
}

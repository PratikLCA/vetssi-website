"use client";

import { useState } from "react";
import type { ProtocolStep } from "@/data/protocols";

type AudienceVersion = { steps: ProtocolStep[]; pitfalls?: string[] };

interface Props {
  versions: { staff: AudienceVersion; surgeon: AudienceVersion };
  defaultSteps: ProtocolStep[];
  defaultPitfalls: string[];
}

function StepItem({ step, index }: { step: ProtocolStep; index: number }) {
  if (typeof step === "string") {
    return (
      <li className="flex gap-4">
        <span className="flex-shrink-0 w-7 h-7 bg-navy text-white text-xs font-medium flex items-center justify-center">
          {index + 1}
        </span>
        <p className="text-sm leading-relaxed text-text-primary pt-1">{step}</p>
      </li>
    );
  }
  return (
    <li className="flex gap-4">
      <span className="flex-shrink-0 w-7 h-7 bg-navy text-white text-xs font-medium flex items-center justify-center">
        {index + 1}
      </span>
      <div className="pt-0.5">
        <p className="font-serif text-base font-medium text-navy mb-2">{step.title}</p>
        <ul className="space-y-1.5 ml-1">
          {step.details.map((d, j) => (
            <li key={j} className="text-sm leading-relaxed text-text-primary flex gap-2">
              <span className="text-steel mt-1">·</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

type Audience = "staff" | "surgeon";

const tabs: { key: Audience; label: string }[] = [
  { key: "staff", label: "Staff" },
  { key: "surgeon", label: "Surgeon" },
];

export default function AudienceStepsTabs({ versions, defaultSteps, defaultPitfalls }: Props) {
  const [active, setActive] = useState<Audience>("staff");

  const version = versions[active];
  const steps = version.steps.length > 0 ? version.steps : defaultSteps;
  const pitfalls = version.pitfalls && version.pitfalls.length > 0 ? version.pitfalls : defaultPitfalls;

  return (
    <>
      <section className="mb-8">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <h2 className="font-serif text-lg font-medium text-navy">Step-by-Step Protocol</h2>
          <div className="flex border border-warm-gray overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={`nav-link px-4 py-1.5 text-xs transition-colors ${
                  active === tab.key
                    ? "bg-navy text-white"
                    : "bg-white text-text-muted hover:text-navy"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <StepItem key={i} step={step} index={i} />
          ))}
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="font-serif text-lg font-medium text-navy mb-4">Key Pitfalls</h2>
        <ul className="space-y-3">
          {pitfalls.map((pitfall, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-1.5 h-1.5 bg-steel rounded-full mt-2" />
              <p className="text-sm leading-relaxed text-text-primary">{pitfall}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

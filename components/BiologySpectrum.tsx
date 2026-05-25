"use client";

import { useState } from "react";
import { Microscope } from "lucide-react";
import { woundStatusSpectrum, type WoundStatusId } from "@/data/wound-classification";

// Interactive contamination → colonization → critical colonization → infection
// spectrum. Click a stage to see the consensus + plain-language breakdown.

const stageAccent: Record<WoundStatusId, string> = {
  contamination: "border-steel-light/40",
  colonization: "border-steel/60",
  "critical-colonization": "border-steel",
  infection: "border-navy",
};

const stageDot: Record<WoundStatusId, string> = {
  contamination: "bg-steel-light/40",
  colonization: "bg-steel/60",
  "critical-colonization": "bg-steel",
  infection: "bg-navy",
};

export default function BiologySpectrum() {
  const [active, setActive] = useState<WoundStatusId>(woundStatusSpectrum[0].id);
  const current = woundStatusSpectrum.find((s) => s.id === active) ?? woundStatusSpectrum[0];

  return (
    <div>
      {/* Stage selector */}
      <ol className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
        {woundStatusSpectrum.map((s, i) => {
          const isActive = s.id === active;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setActive(s.id)}
                className={`w-full text-left bg-white border-t-4 ${stageAccent[s.id]} ${
                  isActive ? "border-x border-b border-warm-gray shadow-sm" : "border-x border-b border-transparent hover:border-warm-gray"
                } p-4 transition-all`}
                aria-pressed={isActive}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${stageDot[s.id]}`} />
                  <span className="nav-link text-steel">Stage {i + 1}</span>
                </div>
                <p className="font-serif text-base font-medium text-navy leading-snug">
                  {s.name}
                </p>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Detail panel */}
      <div className="bg-cream border border-warm-gray p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="nav-link text-steel mb-2">From the 2026 AJVR consensus</p>
            <p className="font-serif italic text-base leading-relaxed text-navy">
              {current.consensus}
            </p>
          </div>
          <div>
            <p className="nav-link text-navy mb-2">In plain terms</p>
            <p className="text-sm leading-relaxed text-text-primary">{current.plain}</p>
          </div>
        </div>
      </div>

      {/* Cultures-alone panel */}
      <div className="mt-6 callout-box">
        <div className="flex items-center gap-2 mb-3">
          <Microscope size={16} className="text-steel flex-shrink-0" />
          <span className="text-xs font-medium text-steel nav-link">
            Why cultures alone are insufficient
          </span>
        </div>
        <div className="text-sm text-text-primary leading-relaxed space-y-2">
          <p>
            A positive culture from a wound typically reflects <strong className="font-medium">colonization</strong> — not infection. Most surgical and superficial wounds carry bacteria. Culture cannot distinguish a colonizer from a pathogen on its own.
          </p>
          <p>
            The consensus draws the line at <strong className="font-medium">tissue reaction</strong>. Bacteria multiplying alongside a quiet wound is colonization; bacteria multiplying with the wound reacting is infection. That is why every SSI definition pairs an objective finding with a clinical sign — a culture is one piece of evidence, never the whole diagnosis.
          </p>
        </div>
      </div>
    </div>
  );
}

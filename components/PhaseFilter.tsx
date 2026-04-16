"use client";

export type PhaseFilter = "all" | "preoperative" | "intraoperative" | "postoperative";

interface PhaseFilterProps {
  active: PhaseFilter;
  onChange: (phase: PhaseFilter) => void;
}

const phases: { value: PhaseFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "preoperative", label: "Preoperative" },
  { value: "intraoperative", label: "Intraoperative" },
  { value: "postoperative", label: "Postoperative" },
];

export default function PhaseFilterComponent({ active, onChange }: PhaseFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {phases.map((phase) => (
        <button
          key={phase.value}
          onClick={() => onChange(phase.value)}
          className={`nav-link px-4 py-2 border transition-colors ${
            active === phase.value
              ? "bg-steel text-white border-steel"
              : "bg-white text-text-muted border-warm-gray hover:border-steel hover:text-steel"
          }`}
        >
          {phase.label}
        </button>
      ))}
    </div>
  );
}

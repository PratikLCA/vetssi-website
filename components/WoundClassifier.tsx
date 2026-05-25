"use client";

import { useState } from "react";
import { AlertTriangle, ArrowLeft, RotateCcw, HelpCircle } from "lucide-react";
import {
  woundClassifierQuestions,
  classifyWound,
  woundClasses,
  type ClassifierAnswers,
  type WoundClass,
} from "@/data/wound-classification";

// "Classify This Wound" — ordered yes/no decision tool.
// First YES short-circuits to the result, mirroring classifyWound() logic
// (infection → IV, grossContam → III, locationContam → III, tractEntered → II,
// all NO → I). Always shows a prominent decision-support disclaimer.

const accentByClass: Record<string, string> = {
  "swc-1": "border-steel-light/60",
  "swc-2": "border-steel",
  "swc-3": "border-warm-gray bg-cream",
  "swc-4": "border-navy",
};

function buildAnswers(history: boolean[]): ClassifierAnswers {
  const a: ClassifierAnswers = {
    infection: false,
    grossContam: false,
    locationContam: false,
    tractEntered: false,
  };
  woundClassifierQuestions.forEach((q, i) => {
    if (i < history.length) {
      a[q.id] = history[i];
    }
  });
  return a;
}

function rationaleFor(history: boolean[]): { result: WoundClass; rationale: string } {
  // First YES wins.
  for (let i = 0; i < history.length; i++) {
    if (history[i]) {
      const q = woundClassifierQuestions[i];
      const a = buildAnswers(history);
      const result = classifyWound(a);
      return {
        result,
        rationale: `Classified as ${result.label} (${result.name}) because the answer to "${q.q}" was yes. ${result.consensus}`,
      };
    }
  }
  // All NO so far — only valid result is SWC I if all four questions were answered NO.
  const result = woundClasses[0];
  return {
    result,
    rationale: `Classified as ${result.label} (${result.name}) because no contamination, infection, location-driven contamination, or tract entry was indicated. ${result.consensus}`,
  };
}

export default function WoundClassifier() {
  const [history, setHistory] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const step = history.length;
  const question = woundClassifierQuestions[step];

  // Result conditions: either a YES has been given (short-circuit) OR all four
  // questions have been answered NO.
  const shouldShowResult =
    done || history.some((h) => h === true) || history.length === woundClassifierQuestions.length;

  function answer(value: boolean) {
    const next = [...history, value];
    setHistory(next);
    if (value || next.length === woundClassifierQuestions.length) {
      setDone(true);
    }
  }

  function back() {
    if (history.length === 0) return;
    setHistory(history.slice(0, -1));
    setDone(false);
  }

  function reset() {
    setHistory([]);
    setDone(false);
  }

  return (
    <div className="bg-white border border-warm-gray">
      {/* Disclaimer — always visible */}
      <div className="bg-cream border-b border-warm-gray p-4 flex items-start gap-3">
        <AlertTriangle size={16} className="text-steel mt-0.5 flex-shrink-0" />
        <p className="text-xs text-text-primary leading-relaxed">
          <span className="font-medium">Decision support — not a verdict.</span>{" "}
          This tool helps you think through SWC classification using the consensus criteria. Final classification is a clinical judgment by the attending veterinarian, in the context of the full case.
        </p>
      </div>

      {/* Body */}
      <div className="p-6">
        {!shouldShowResult && question && (
          <QuestionStep
            stepNumber={step + 1}
            totalSteps={woundClassifierQuestions.length}
            prompt={question.q}
            help={question.help}
            onYes={() => answer(true)}
            onNo={() => answer(false)}
            onBack={step > 0 ? back : undefined}
          />
        )}

        {shouldShowResult && <ResultStep history={history} onReset={reset} onBack={back} />}
      </div>
    </div>
  );
}

function QuestionStep({
  stepNumber,
  totalSteps,
  prompt,
  help,
  onYes,
  onNo,
  onBack,
}: {
  stepNumber: number;
  totalSteps: number;
  prompt: string;
  help: string;
  onYes: () => void;
  onNo: () => void;
  onBack?: () => void;
}) {
  return (
    <div>
      <p className="nav-link text-steel mb-3">
        Question {stepNumber} of {totalSteps}
      </p>
      <p className="font-serif text-xl font-medium text-navy leading-snug mb-3">
        {prompt}
      </p>
      <div className="flex items-start gap-2 mb-6 text-xs text-text-muted leading-relaxed">
        <HelpCircle size={12} className="text-steel mt-0.5 flex-shrink-0" />
        <p>{help}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onYes}
          className="px-6 py-2.5 bg-navy text-white text-sm font-medium hover:bg-steel transition-colors"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={onNo}
          className="px-6 py-2.5 border border-warm-gray text-navy text-sm font-medium hover:border-steel hover:text-steel transition-colors"
        >
          No
        </button>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="ml-auto inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-navy transition-colors"
          >
            <ArrowLeft size={12} />
            Back
          </button>
        )}
      </div>
    </div>
  );
}

function ResultStep({
  history,
  onReset,
  onBack,
}: {
  history: boolean[];
  onReset: () => void;
  onBack: () => void;
}) {
  const { result, rationale } = rationaleFor(history);
  const accent = accentByClass[result.id] ?? "border-warm-gray";

  return (
    <div>
      <p className="nav-link text-steel mb-3">Suggested classification</p>

      <div className={`bg-white border-l-4 ${accent} border-y border-r border-warm-gray p-5 mb-5`}>
        <div className="flex items-baseline gap-3 mb-2 flex-wrap">
          <span className="font-serif text-3xl font-medium text-navy">{result.label}</span>
          <span className="font-serif text-xl text-steel">{result.name}</span>
        </div>
        <p className="text-sm text-text-primary leading-relaxed mb-3">{rationale}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-warm-gray text-xs">
          <div>
            <p className="nav-link text-steel mb-1">SSI risk</p>
            <p className="text-text-primary leading-relaxed">{result.risk}</p>
          </div>
          <div>
            <p className="nav-link text-steel mb-1">Antimicrobial implication</p>
            <p className="text-text-primary leading-relaxed">{result.antimicrobial}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-5 py-2 bg-navy text-white text-sm font-medium hover:bg-steel transition-colors"
        >
          <RotateCcw size={12} />
          Classify another wound
        </button>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-5 py-2 border border-warm-gray text-navy text-sm font-medium hover:border-steel hover:text-steel transition-colors"
        >
          <ArrowLeft size={12} />
          Change previous answer
        </button>
      </div>
    </div>
  );
}

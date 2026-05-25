// Wound classification (SWC I–IV) and the "Classify This Wound" decision logic.
// All clinical content derived from the 2026 AJVR expert consensus paper
// (Verwilghen et al., doi.org/10.2460/ajvr.25.03.0099), Tables 13 and 14.
// "Consensus" fields paraphrase the paper; interpretation, risk, errors,
// and examples are VETSSI editorial.

export type WoundClassId = "swc-1" | "swc-2" | "swc-3" | "swc-4";

export interface WoundClass {
  id: WoundClassId;
  label: string;
  name: string;
  consensus: string;
  note: string;
  interpretation: string;
  risk: string;
  antimicrobial: string;
  benchmarking: string;
  examples: string[];
  errors: string[];
  procedures: string[];
}

export const woundClasses: WoundClass[] = [
  {
    id: "swc-1",
    label: "SWC I",
    name: "Clean",
    consensus:
      "An uninfected surgical wound in which no inflammation is present and the respiratory, alimentary, genital, or urinary tracts are NOT entered. Clean wounds can be primarily closed and, if necessary, drained with closed drainage.",
    note: "Operative incisions following nonpenetrating (blunt) trauma belong here if none of those tracts were entered.",
    interpretation:
      "The cleanest category — elective soft-tissue and orthopedic surgery where no contaminated lumen is opened. The bar is genuinely strict: no inflammation, no tract entered.",
    risk: "Lowest baseline SSI risk. Any clean-wound SSI deserves scrutiny — the contamination source is most likely the team, environment, instruments, or technique rather than the patient.",
    antimicrobial: "Routine prophylaxis is often not required for clean procedures; decisions follow patient factors, implant use, and duration.",
    benchmarking: "Clean-wound SSI rate is the most sensitive indicator of surgical-process quality and the classic surgeon-feedback metric.",
    examples: [
      "Elective TPLO (no arthrotomy contamination)",
      "Total hip replacement",
      "Exploratory procedures that do not enter a hollow viscus",
      "Mass removal not involving a tract",
    ],
    errors: [
      "Logging a wound as clean when a tract was briefly entered (it is clean-contaminated)",
      "Calling a wound clean despite pre-existing inflammation",
    ],
    procedures: ["Orthopedic implant surgery", "Elective soft-tissue surgery"],
  },
  {
    id: "swc-2",
    label: "SWC II",
    name: "Clean-Contaminated",
    consensus:
      "An uninfected surgical wound in which the respiratory, alimentary, genital, or urinary tract is entered under controlled conditions and without unusual contamination.",
    note: "Controlled entry without spillage is the defining feature.",
    interpretation:
      "A tract is opened, but deliberately and cleanly. The lumen is a bacterial reservoir, so risk rises above clean — but controlled technique keeps it bounded.",
    risk: "Moderate baseline SSI risk — higher than clean, lower than contaminated.",
    antimicrobial: "Perioperative prophylaxis is commonly indicated because a colonized tract is entered.",
    benchmarking: "Must be benchmarked separately from clean — combining classes makes any comparison invalid.",
    examples: [
      "Routine enterotomy or cystotomy without spillage",
      "Elective airway surgery",
      "Controlled genital/urinary tract procedures",
    ],
    errors: [
      "Down-classifying to clean because 'nothing went wrong'",
      "Up-classifying to contaminated when entry was controlled and clean",
    ],
    procedures: ["Gastrointestinal surgery without spillage", "Urogenital tract surgery"],
  },
  {
    id: "swc-3",
    label: "SWC III",
    name: "Contaminated",
    consensus:
      "Open, fresh traumatic wounds; surgery with major breaks in sterile technique or gross spillage from the gastrointestinal tract; incisions with acute nonpurulent inflammation or necrotic tissue without purulent drainage; and surgical wounds previously left open returning for revision.",
    note: "Also includes sites where, due to location, full asepsis cannot be guaranteed because of ongoing contamination — the consensus specifically places perianal and intraoral surgery here.",
    interpretation:
      "Either contamination has actually occurred — spillage, a major sterile-technique break, fresh trauma — or the anatomy makes contamination unavoidable. The consensus deliberately classes oral and anal procedures as contaminated, not clean-contaminated.",
    risk: "High baseline SSI risk.",
    antimicrobial: "Prophylactic — and sometimes therapeutic — antimicrobial use is generally indicated; the clinical context drives the choice.",
    benchmarking: "High expected rate; only meaningful when compared against the same wound class.",
    examples: [
      "Fresh open fracture",
      "GI surgery with gross spillage",
      "A case with a major break in sterile technique",
      "Perianal surgery",
      "Intraoral / dental surgery",
      "A wound previously left open, returning for revision",
    ],
    errors: [
      "Recording oral/anal surgery as clean-contaminated instead of contaminated",
      "Down-classifying after a major sterile break to protect the statistics",
    ],
    procedures: ["Trauma surgery", "Perianal and oral surgery", "Revision of an open wound"],
  },
  {
    id: "swc-4",
    label: "SWC IV",
    name: "Dirty / Infected",
    consensus:
      "Traumatic or surgical wounds presenting with retained devitalized tissue that involve existing clinical signs of infection, or perforated viscera.",
    note: "Established infection or perforation is already present before or at the time of surgery.",
    interpretation:
      "Infection or gross contamination is a pre-existing condition of the case, not a risk. This is also where the relationship to IPATOS — infection present at the time of surgery — is closest.",
    risk: "Highest baseline SSI risk. A subsequent SSI is still recorded — a high-risk wound class never exempts a case from surveillance.",
    antimicrobial: "Therapeutic antimicrobial treatment, not merely prophylaxis, is generally required.",
    benchmarking: "Highest expected rate; comparison is only valid within this class.",
    examples: [
      "Septic peritonitis from a perforated viscus",
      "An established abscess at the surgical site",
      "Devitalized, grossly infected traumatic wounds",
      "Excision of a purulent omphalophlebitis",
    ],
    errors: [
      "Excluding the case from surveillance because 'an SSI was inevitable'",
      "Confusing a high wound class with an automatic IPATOS classification",
    ],
    procedures: ["Surgery for established infection", "Perforated-viscus surgery"],
  },
];

// "Classify This Wound" decision logic.
// Ordered, first-match-wins, mirroring SWC I–IV definitions.

export interface ClassifierQuestion {
  id: keyof ClassifierAnswers;
  q: string;
  help: string;
}

export interface ClassifierAnswers {
  infection: boolean;
  grossContam: boolean;
  locationContam: boolean;
  tractEntered: boolean;
}

export const woundClassifierQuestions: ClassifierQuestion[] = [
  {
    id: "infection",
    q: "Was established infection present, or a perforated viscus, with retained devitalized tissue?",
    help: "Existing clinical signs of infection at the site, or a perforated organ — present before or at surgery.",
  },
  {
    id: "grossContam",
    q: "Was there gross GI spillage, a major break in sterile technique, fresh open trauma, or acute nonpurulent inflammation / necrosis?",
    help: "Actual contamination during the case, or a fresh open traumatic wound — without established purulent infection.",
  },
  {
    id: "locationContam",
    q: "Is this a site where full asepsis cannot be guaranteed — e.g. perianal or intraoral surgery?",
    help: "The consensus places oral and anal procedures in the contaminated class because of unavoidable ongoing contamination.",
  },
  {
    id: "tractEntered",
    q: "Was a respiratory, alimentary, genital, or urinary tract entered under controlled conditions, without unusual contamination?",
    help: "Deliberate, controlled entry into a hollow tract, with no spillage.",
  },
];

export function classifyWound(answers: ClassifierAnswers): WoundClass {
  if (answers.infection) return woundClasses[3];        // SWC IV
  if (answers.grossContam) return woundClasses[2];      // SWC III
  if (answers.locationContam) return woundClasses[2];   // SWC III
  if (answers.tractEntered) return woundClasses[1];     // SWC II
  return woundClasses[0];                               // SWC I
}

// Wound status / infection biology spectrum (Table 13).

export type WoundStatusId =
  | "contamination"
  | "colonization"
  | "critical-colonization"
  | "infection";

export interface WoundStatusStage {
  id: WoundStatusId;
  name: string;
  consensus: string;
  plain: string;
}

export const woundStatusSpectrum: WoundStatusStage[] = [
  {
    id: "contamination",
    name: "Contamination",
    consensus: "The presence of bacteria within a wound in the absence of any tissue reaction compatible with clinical signs of infection.",
    plain: "Bacteria are present. The tissue is not reacting. This is expected — most surgical and superficial wounds carry bacteria.",
  },
  {
    id: "colonization",
    name: "Colonization",
    consensus: "The multiplication of bacteria within a wound in the absence of tissue reaction compatible with clinical signs of infection.",
    plain: "Bacteria are now multiplying, but the tissue still is not reacting. A positive culture most often reflects this state — not infection.",
  },
  {
    id: "critical-colonization",
    name: "Critical Colonization",
    consensus: "The multiplication of bacteria causing a delay in wound healing, usually associated with an exacerbation of pain but without overt inflammatory signs.",
    plain: "The bacterial burden is now interfering with healing — stalled progress, more pain — but the overt inflammatory signs of frank infection are not yet there. A genuine gray zone.",
  },
  {
    id: "infection",
    name: "Wound Infection",
    consensus: "The deposition and multiplication of bacteria in tissue with typically associated signs of inflammation.",
    plain: "Bacteria have invaded tissue and the tissue is reacting. This is infection — and, after surgery, the basis of an SSI diagnosis.",
  },
];

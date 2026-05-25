// VETSSI — SSI Definitions Framework
// Clinical content is derived from the 2026 AJVR expert consensus paper
// (Verwilghen et al., doi.org/10.2460/ajvr.25.03.0099).
// "Consensus" fields paraphrase the paper's defined terms;
// "interpretation", "whyItMatters", "grayZones", "misclassification",
// and "examples" are VETSSI editorial content.

export const SOURCE = {
  short: "2026 AJVR expert consensus on veterinary SSI definitions",
  full: "Verwilghen DR, Pelosi A, Abbas M, et al. Surgical site infection definitions consensus: a first step toward improving prevention in veterinary medicine. American Journal of Veterinary Research. 2026.",
  shortCitation: "Verwilghen et al., AJVR 2026",
  authors: "Verwilghen DR, Pelosi A, Abbas M, et al.",
  title: "Surgical site infection definitions consensus: a first step toward improving prevention in veterinary medicine.",
  journal: "American Journal of Veterinary Research",
  year: "2026",
  doi: "10.2460/ajvr.25.03.0099",
  doiUrl: "https://doi.org/10.2460/ajvr.25.03.0099",
  journalUrl: "https://avmajournals.avma.org/view/journals/ajvr/87/3/ajvr.25.03.0099.xml",
  pdfUrl: "https://avmajournals.avma.org/downloadpdf/view/journals/ajvr/87/3/ajvr.25.03.0099.pdf",
  license: "Open Access — CC BY-NC",
} as const;

// Shared clinical-sign set used across all three tissue-layer
// SSI definitions in the consensus (Tables 2–4).
const CLINICAL_SIGNS: readonly string[] = [
  "Pyrexia",
  "Pain or tenderness",
  "Localized swelling — edematous (acute) or fibrous (chronic)",
  "Erythema",
  "Heat",
  "Lack of function",
];

export type DefinitionSlug =
  | "surgical-site-infection"
  | "superficial-incisional-ssi"
  | "deep-incisional-ssi"
  | "organ-bone-space-ssi"
  | "implant-associated-infection";

export type DepthBand = 0 | 1 | 2 | 3 | 4;

export interface ClinicalExample {
  proc: string;
  text: string;
}

export interface GrayZone {
  title: string;
  why: string;
  features: string;
  followUp: string;
  surveillance: string;
}

export interface MisclassificationScenario {
  title: string;
  why: string;
  clinical: string;
  surveillance: string;
  fix: string;
}

// REQUIRED reasoning fields are non-optional. TypeScript strict mode
// will fail the build if a definition is added without them.
export interface Definition {
  slug: DefinitionSlug;
  short: string;
  title: string;
  tagline: string;
  depth: DepthBand;

  consensus: string;
  consensusNote: string;
  interpretation: string;
  whyItMatters: string;
  criteria: string[];
  signs: readonly string[];
  examples: ClinicalExample[];
  grayZones: GrayZone[];
  misclassification: MisclassificationScenario[];

  pathways: PathwayKey[];
  protocols: ProtocolKey[];
  roles: RoleKey[];
  surveillance: string;
}

// ─── Cross-reference key tables ───
// Routes verified against the live codebase during Step 0 exploration.
// Prototype defaults that fell back to /protocols index have been
// upgraded to the actual protocol slugs that exist in data/protocols.ts.

export type PathwayKey =
  | "surgical-team"
  | "patient"
  | "or-environment"
  | "sterile-field"
  | "implants-instruments"
  | "surgical-technique"
  | "intraoperative-adjuncts"
  | "postoperative-care";

export const pathwayRef: Record<PathwayKey, { name: string; href: string }> = {
  "surgical-team": { name: "Surgical Team", href: "/contamination-pathways#surgical-team" },
  patient: { name: "Patient", href: "/contamination-pathways#patient" },
  "or-environment": { name: "Operating Room Environment", href: "/contamination-pathways#or-environment" },
  "sterile-field": { name: "Surgical Field Isolation", href: "/contamination-pathways#surgical-field-isolation" },
  "implants-instruments": { name: "Instruments & Implants", href: "/contamination-pathways#instruments-implants" },
  "surgical-technique": { name: "Surgical Technique", href: "/contamination-pathways#surgical-technique" },
  "intraoperative-adjuncts": { name: "Intraoperative Adjuncts", href: "/contamination-pathways#intraoperative-adjuncts" },
  "postoperative-care": { name: "Postoperative Care", href: "/contamination-pathways#postoperative-care" },
};

export type ProtocolKey =
  | "closure"
  | "implant-handling"
  | "sterile-field"
  | "contamination-response"
  | "postoperative-monitoring"
  | "or-behavior"
  | "risk-stratification";

// All seven targets resolve to real /protocols/[slug] pages that exist
// in data/protocols.ts as of Step 0.
export const protocolRef: Record<ProtocolKey, { name: string; href: string }> = {
  closure: { name: "Wound Management", href: "/protocols/wound-management" },
  "implant-handling": { name: "Implant Handling", href: "/protocols/implant-handling" },
  "sterile-field": { name: "Sterile Field Maintenance", href: "/protocols/sterile-field-maintenance" },
  "contamination-response": { name: "Contamination Event Response", href: "/protocols/contamination-event-response" },
  "postoperative-monitoring": { name: "Incision Monitoring", href: "/protocols/incision-monitoring" },
  "or-behavior": { name: "OR Behavior Rules", href: "/protocols/or-behavior-rules" },
  "risk-stratification": { name: "Patient Risk Stratification", href: "/protocols/patient-risk-stratification" },
};

export type RoleKey =
  | "surgeon"
  | "scrub-tech"
  | "circulating-nurse"
  | "anesthesia-tech"
  | "recovery-team"
  | "owner";

// /roles is a single anchor-based page. circulating-nurse has no direct
// anchor equivalent in the existing roles taxonomy; it falls back to /roles.
export const roleRef: Record<RoleKey, { name: string; href: string }> = {
  surgeon: { name: "Surgeon", href: "/roles#surgeon" },
  "scrub-tech": { name: "Scrub Technician", href: "/roles#scrub-technician" },
  "circulating-nurse": { name: "Circulating Nurse", href: "/roles" },
  "anesthesia-tech": { name: "Anesthesia Technician", href: "/roles#anesthetist" },
  "recovery-team": { name: "Recovery Team", href: "/roles#recovery-team" },
  owner: { name: "Owner / Caregiver", href: "/roles#owner" },
};

export const coreDefinitions: Definition[] = [
  {
    slug: "surgical-site-infection",
    short: "SSI",
    title: "Surgical Site Infection",
    tagline: "The parent definition — what counts as an SSI, and why time does not exclude it.",
    depth: 0,
    consensus:
      "An infection that occurs following a surgical intervention, involving the skin / mucous membranes and subcutaneous tissue of the incision, and/or the deep soft tissue of the incision, and/or any part of the anatomy other than the incision that was opened or manipulated during the procedure — and which may involve implants placed during that intervention.",
    consensusNote:
      "The development of an SSI is considered independent of its occurrence in time. Any infection that can be linked to a previous surgical intervention qualifies as an SSI, even if diagnosed beyond a predefined surveillance period.",
    interpretation:
      "SSI is an umbrella term, not a single diagnosis. The consensus deliberately ties the definition to anatomy that was 'opened or manipulated' — which means the surgical exposure itself, not the calendar, determines eligibility. A draining incision diagnosed on day 45 is still an SSI if it can be linked to the procedure. This is a clinical diagnosis built from varied criteria; a degree of subjective surgical judgment is expected to remain.",
    whyItMatters:
      "If your team treats the surveillance window as the definition of SSI, late-onset infections silently disappear from your data — and your rate looks better than your practice actually is. Anchoring the definition to manipulated anatomy rather than to time is what makes rates comparable between surgeons, between years, and between hospitals. It is also what makes an SSI rate honest.",
    criteria: [
      "An infection is present following a surgical intervention.",
      "The infection involves tissue that was incised, opened, or manipulated during that intervention — or an implant placed during it.",
      "The link to the prior procedure can be reasonably established, regardless of how much time has passed.",
    ],
    signs: CLINICAL_SIGNS,
    examples: [
      { proc: "TPLO", text: "A dog returns 5 weeks after tibial plateau leveling osteotomy with a draining stifle. Beyond a 30-day window, but clearly linked to the procedure — still an SSI." },
      { proc: "Exploratory laparotomy", text: "Incisional cellulitis 9 days after celiotomy involving skin and subcutis only — an SSI of the superficial layer." },
      { proc: "Implant revision", text: "Periprosthetic infection identified months after total hip replacement — an implant-associated SSI, time notwithstanding." },
    ],
    grayZones: [
      {
        title: "Surgical-site infection vs infection at a non-surgical site",
        why: "Pyrexia and malaise are non-specific. A patient can be febrile from pneumonia or a urinary infection while the incision is healing normally.",
        features: "An SSI is anchored to the operated anatomy: localizing signs at the incision or manipulated structure. Pyrexia alone, without local findings, points away from SSI.",
        followUp: "Examine the wound directly before attributing systemic signs to it. Look elsewhere for a source.",
        surveillance: "Misattributing a non-surgical infection to the wound inflates the SSI rate and obscures the real problem.",
      },
    ],
    misclassification: [
      {
        title: "Counting only infections inside the surveillance window",
        why: "Teams conflate the 30-day active monitoring period with the definition itself.",
        clinical: "Late implant and organ/space infections are under-recognized and under-treated.",
        surveillance: "Artificially low rates; benchmarking becomes meaningless.",
        fix: "Record any infection linked to the procedure with its appearance interval, regardless of timing.",
      },
    ],
    pathways: ["surgical-team", "implants-instruments", "or-environment", "surgical-technique", "postoperative-care"],
    protocols: ["closure", "implant-handling", "sterile-field", "postoperative-monitoring"],
    roles: ["surgeon", "scrub-tech", "circulating-nurse", "recovery-team", "owner"],
    surveillance:
      "Every SSI should be recorded with its date of event and appearance interval (days from surgery). Direct wound inspection by the operating surgeon is the preferred method; a trained professional or structured telemedicine review are acceptable alternatives.",
  },
  {
    slug: "superficial-incisional-ssi",
    short: "Superficial SSI",
    title: "Superficial Incisional SSI",
    tagline: "Infection confined to skin / mucous membrane and subcutaneous tissue of the incision.",
    depth: 1,
    consensus:
      "Present when there is involvement of the superficial parts of the wound (skin / mucous membranes and subcutaneous tissue of the incision); AND at least one objective finding is documented; AND at least one clinical sign of infection is reported.",
    consensusNote:
      "Documented findings: purulent discharge or serous discharge persisting beyond 24 h; microorganisms obtained aseptically from the superficial incision by microbiological testing performed for diagnosis or treatment; spontaneous dehiscence or deliberate opening of the incision; or a diagnosis of superficial incisional SSI made by the attending veterinarian.",
    interpretation:
      "Superficial SSI sits in the layers most exposed to the postoperative environment, so it is the category most likely to arise after the patient has left the operating room. The three-part structure matters: depth, plus an objective finding, plus a clinical sign. A swab growing skin commensals on its own does not make a superficial SSI — the wound has to be reacting.",
    whyItMatters:
      "Superficial SSI is the most over-called category. Normal postoperative inflammation, a stitch reaction, or a small seroma get logged as infection, inflating rates and triggering antimicrobials that were never indicated. The discipline of requiring all three components — depth, an objective finding, and a clinical sign — is what protects both the patient and the data.",
    criteria: [
      "Involvement limited to skin / mucous membrane and subcutaneous tissue of the incision.",
      "PLUS at least one: purulent discharge, or serous discharge >24 h; aseptically obtained microorganisms; spontaneous dehiscence or deliberate opening; attending veterinarian's diagnosis.",
      "PLUS at least one clinical sign of infection.",
    ],
    signs: CLINICAL_SIGNS,
    examples: [
      { proc: "TPLO", text: "Day 11: focal incisional erythema, heat, and purulent discharge from the proximal incision; deep palpation and imaging are unremarkable. Superficial incisional SSI." },
      { proc: "Mass removal", text: "Serous discharge persisting past 24 h with localized swelling and tenderness — meets superficial criteria once a clinical sign is present." },
      { proc: "Spay (OHE)", text: "Incision intentionally opened for superficial purulent material with surrounding erythema. Superficial SSI." },
    ],
    grayZones: [
      {
        title: "Seroma vs superficial SSI",
        why: "Both produce swelling and serous fluid near a fresh incision. Early on they can look identical.",
        features: "Seroma: non-painful or mildly uncomfortable, cool, fluctuant, serous fluid, no erythema or heat. Superficial SSI: purulent or >24 h serous discharge plus a clinical sign — pain, heat, erythema.",
        followUp: "Reassess at 24–48 h. Persistent serous discharge beyond 24 h with a clinical sign shifts the wound toward SSI. Cytology distinguishes a transudate from septic inflammation.",
        surveillance: "Calling every seroma an SSI inflates superficial rates; dismissing a genuine early SSI as 'just a seroma' delays treatment.",
      },
      {
        title: "Stitch reaction vs superficial SSI",
        why: "Suture-associated inflammation produces focal swelling and erythema at suture points.",
        features: "Stitch reaction: discrete to individual sutures, no purulence, resolves as sutures are removed. Superficial SSI: confluent involvement, purulent or prolonged serous discharge, a clinical sign.",
        followUp: "Re-examine after suture removal. Resolution confirms reaction; persistence suggests infection.",
        surveillance: "A common source of false-positive superficial SSIs.",
      },
    ],
    misclassification: [
      {
        title: "Postoperative inflammation over-called as SSI",
        why: "Expected early inflammation — mild erythema, warmth, slight swelling — is read as infection.",
        clinical: "Unnecessary antimicrobial courses; unwarranted alarm to owners.",
        surveillance: "Inflated superficial SSI rate; the real signal is buried in noise.",
        fix: "Require an objective finding (purulence, >24 h serous discharge, dehiscence, or attending diagnosis) before classifying — inflammation alone is not enough.",
      },
      {
        title: "Culture-positive colonization mislabeled as infection",
        why: "Superficial wounds are routinely colonized; a positive swab is read as proof of SSI.",
        clinical: "Antimicrobials directed at colonizing flora.",
        surveillance: "False-positive SSIs; distorted antibiogram data.",
        fix: "A positive culture is one documented finding — it still requires tissue reaction (a clinical sign) to meet the definition.",
      },
    ],
    pathways: ["surgical-team", "or-environment", "surgical-technique", "postoperative-care"],
    protocols: ["closure", "sterile-field", "postoperative-monitoring", "contamination-response"],
    roles: ["surgeon", "scrub-tech", "circulating-nurse", "recovery-team", "owner"],
    surveillance:
      "Superficial SSI can appear after discharge. Plan the day 10–14 recheck and the week-4 recheck to catch it. The wound's status must be recorded as infected OR not infected — absence of a note is not evidence of absence.",
  },
  {
    slug: "deep-incisional-ssi",
    short: "Deep SSI",
    title: "Deep Incisional SSI",
    tagline: "Infection involving the deep soft tissue of the incision — fascia and muscle.",
    depth: 2,
    consensus:
      "Present when there is involvement of the deep tissues of the incision (e.g. fascia and/or muscle); AND at least one objective finding is documented; AND at least one clinical sign of infection is reported.",
    consensusNote:
      "Documented findings: purulent discharge or serous discharge persisting beyond 24 h; microorganisms identified from an aseptically obtained specimen by microbiological testing; spontaneous dehiscence or deliberate opening; or an abscess / other evidence of deep infection detected on gross, histopathologic, or imaging examination.",
    interpretation:
      "Deep SSI involves the fascial and muscular planes — structurally important tissue. Compared with superficial SSI, the consensus adds imaging and gross/histopathologic detection of an abscess as qualifying objective findings, because deep infection is often not visible at the skin surface. When an infection spans more than one layer, it is classified by the deepest layer involved — so a wound with both superficial and deep involvement is a deep SSI.",
    whyItMatters:
      "Deep SSI carries real consequences: fascial dehiscence, prolonged healing, sometimes reoperation. Under-calling it as 'a slow superficial wound' delays the imaging or exploration the patient needs. Over-calling superficial inflammation as deep SSI distorts the most clinically serious tier of your surveillance data and can trigger aggressive, unnecessary intervention.",
    criteria: [
      "Involvement of deep incisional tissue — fascia and/or muscle.",
      "PLUS at least one: purulent discharge or serous discharge >24 h; aseptically obtained microorganisms; spontaneous dehiscence or deliberate opening; abscess or other evidence of deep infection on gross, histopathologic, or imaging exam.",
      "PLUS at least one clinical sign of infection.",
    ],
    signs: CLINICAL_SIGNS,
    examples: [
      { proc: "Exploratory laparotomy", text: "Day 8: partial dehiscence of the linea alba with purulent fluid in the deep layers and localized pain. Deep incisional SSI." },
      { proc: "Fracture repair", text: "Ultrasound shows a fluid pocket along the fascial plane; aspirate is purulent; the limb is painful and warm. Deep SSI." },
      { proc: "TPLO", text: "Infection involving both the subcutis and the underlying fascia — classified by the deepest layer: deep SSI, not superficial." },
    ],
    grayZones: [
      {
        title: "Deep SSI vs delayed / low-grade healing complication",
        why: "Deep tissue heals slowly; a quiet, indolent course can blur the line between sluggish healing and low-grade infection.",
        features: "Low-grade deep SSI: persistent deep discharge, an organized fluid pocket on imaging, pain disproportionate to timeline. Uncomplicated slow healing: progressive improvement, no purulence, no organized collection.",
        followUp: "Imaging to look for a deep collection; aspiration with cytology. Trend the wound over days rather than judging on one exam.",
        surveillance: "Genuine low-grade deep SSIs missed this way are a known cause of under-reporting.",
      },
      {
        title: "Superficial extending deep — which layer?",
        why: "An infection that started superficially may track into the fascia, and the boundary is not always obvious at the bedside.",
        features: "Evidence of fascial or muscular involvement — on palpation, imaging, or at exploration — defines it as deep.",
        followUp: "If deep involvement is suspected, image or explore rather than assume superficial.",
        surveillance: "Multi-layer infections are classified by the deepest layer; defaulting to superficial under-counts deep SSI.",
      },
    ],
    misclassification: [
      {
        title: "Deep SSI under-called as a persistent superficial wound",
        why: "Surface findings look modest while the real process is in the fascial plane.",
        clinical: "Delayed imaging, delayed exploration, risk of dehiscence.",
        surveillance: "Deep SSIs shifted into the superficial tier; the serious end of the data is understated.",
        fix: "When healing stalls or pain is disproportionate, image the deep layers before settling on a superficial label.",
      },
      {
        title: "Superficial inflammation over-called as deep SSI",
        why: "Anxiety about a poorly healing incision escalates classification past the evidence.",
        clinical: "Aggressive intervention or reoperation that was not warranted.",
        surveillance: "Inflates the deep SSI rate — the tier that most influences benchmarking.",
        fix: "Require objective evidence of fascial/muscular involvement before classifying as deep.",
      },
    ],
    pathways: ["surgical-team", "implants-instruments", "surgical-technique", "or-environment"],
    protocols: ["closure", "sterile-field", "contamination-response", "postoperative-monitoring"],
    roles: ["surgeon", "scrub-tech", "circulating-nurse", "anesthesia-tech", "recovery-team"],
    surveillance:
      "Deep SSI may declare itself later than superficial infection. The week-4 recheck is important. Record imaging and exploration findings as part of the SSI event.",
  },
  {
    slug: "organ-bone-space-ssi",
    short: "Organ/Space SSI",
    title: "Organ / Bone / Space SSI",
    tagline: "Infection of anatomy deeper than fascia/muscle that was opened or manipulated.",
    depth: 3,
    consensus:
      "Present when there is involvement of any part of the body deeper than the fascial / muscle layers that was opened or manipulated during the procedure — including bone and organs; AND at least one objective finding is documented; AND at least one clinical sign of infection is reported.",
    consensusNote:
      "Documented findings: purulent drainage from the organ/space (closed-suction drain, open drain, or needle aspiration) with or without identified microorganisms; microorganisms identified from organ/space fluid or tissue by microbiological testing; or an abscess / other evidence of infection on gross, cytologic, histopathologic, or imaging examination.",
    interpretation:
      "This category covers the deepest compartments — the abdominal or thoracic cavity, a joint, bone. Because these spaces are sealed once surgical access is closed, organ/space SSI is far less likely to originate in the postoperative environment than superficial SSI; its origin usually lies in the operative period. The consensus notably allows purulent drainage from the space to qualify with or without a positive culture.",
    whyItMatters:
      "Organ/space SSI — septic peritonitis, septic arthritis, osteomyelitis — is the highest-consequence tier, with the greatest threat to life and function. Because these compartments are closed after surgery, a cluster of organ/space SSIs is a strong signal that something failed intraoperatively: technique, sterility, or instrument/implant handling. This is the tier where surveillance data points most directly back to the operating room.",
    criteria: [
      "Involvement of anatomy deeper than fascia/muscle that was opened or manipulated — organ, bone, or body space.",
      "PLUS at least one: purulent drainage from the space (drain or aspiration), with or without microorganisms; microorganisms identified from organ/space fluid or tissue; abscess or other evidence of infection on gross, cytologic, histopathologic, or imaging exam.",
      "PLUS at least one clinical sign of infection.",
    ],
    signs: CLINICAL_SIGNS,
    examples: [
      { proc: "Exploratory laparotomy", text: "Day 4: septic peritonitis with purulent abdominal fluid on aspiration and a painful, febrile patient. Organ/space SSI." },
      { proc: "Arthroscopy / arthrotomy", text: "Septic arthritis after joint surgery — purulent synovial fluid, a painful non-weight-bearing limb. Organ/space SSI." },
      { proc: "Fracture repair", text: "Osteomyelitis at the fracture site with imaging changes and a draining tract. Organ/bone SSI." },
    ],
    grayZones: [
      {
        title: "Septic vs reactive effusion in a body space",
        why: "Surgery within a cavity or joint produces a sterile inflammatory effusion that can mimic early infection.",
        features: "Septic: purulent fluid, degenerate neutrophils with intracellular bacteria on cytology, systemic signs. Reactive: serosanguineous fluid, non-degenerate cells, a settling clinical course.",
        followUp: "Aspirate and submit cytology; purulent drainage from the space is itself a qualifying finding even before culture returns.",
        surveillance: "Mislabeling a reactive effusion as organ/space SSI inflates the most serious tier of data.",
      },
    ],
    misclassification: [
      {
        title: "Organ/space SSI attributed to postoperative contamination",
        why: "Teams assume any later infection arose after surgery.",
        clinical: "The true intraoperative source — technique, sterility, instruments — goes uninvestigated and unaddressed.",
        surveillance: "Misdirected root-cause analysis; the same failure recurs.",
        fix: "Treat clustered organ/space SSIs as an operative-period signal and audit intraoperative practice.",
      },
    ],
    pathways: ["surgical-technique", "implants-instruments", "sterile-field", "or-environment"],
    protocols: ["sterile-field", "implant-handling", "contamination-response", "closure"],
    roles: ["surgeon", "scrub-tech", "circulating-nurse", "anesthesia-tech"],
    surveillance:
      "Organ/space SSI can present after discharge and after the active window. Record the date of event and appearance interval. A cluster warrants review of intraoperative practice.",
  },
  {
    slug: "implant-associated-infection",
    short: "Implant-Associated",
    title: "Implant-Associated Infection",
    tagline: "Infection of an implant placed at surgery — biofilm-driven and reported separately.",
    depth: 4,
    consensus:
      "Defined as either: (A) any other SSI classification shown to include or spread toward the implant; OR (B) involvement of an orthopedic or other implant placed during a procedure, without external superficial / deep / bone signs of infection, with clinical or imaging signs suggestive of implant loosening or infection, AND at least one supporting finding documented.",
    consensusNote:
      "An implant is an object permanently placed during surgery that is not suture material, a vascular clip, or a staple. Supporting findings under route (B): pathogenic microorganisms cultured from deep tissue or implant specimens; histologic presence of microorganisms in deep tissue with specific staining; periprosthetic histology/cytology meeting an International Consensus Meeting minor criterion; or elevated inflammatory markers. Implant-associated infections should be reported separately from tissue infections, and combinations may be reported.",
    interpretation:
      "Implant-associated infection is biofilm disease. Microorganisms grow adherent to the implant surface in a hydrated extracellular matrix, which makes them hard to culture and able to persist with minimal outward signs. The consensus gives it two routes in — spread from another SSI, or implant involvement without external signs — and asks for it to be reported as its own category, because lumping it with tissue infection hides the distinct biology and origin.",
    whyItMatters:
      "Implant infection is the textbook 'aseptic loosening vs septic loosening' problem. Presuming loosening is mechanical when it is in fact infective leads to revision strategies that fail. Because biofilm organisms culture poorly, a negative culture is not reassurance. Reporting implant infection separately is what lets a practice see whether its orthopedic and implant program has a problem at all.",
    criteria: [
      "Route A: an established superficial, deep, or organ/space SSI demonstrated to involve or spread toward the implant.",
      "Route B: implant involvement WITHOUT external layer signs, WITH clinical or imaging signs of loosening or infection, PLUS one supporting finding — implant/deep-tissue culture, histologic organisms, a periprosthetic ICM minor criterion, or elevated inflammatory markers.",
      "Report separately from tissue-layer SSI; combinations may be co-reported.",
    ],
    signs: [
      "Clinical or imaging signs of implant loosening",
      "Pain at the implant site",
      "Lameness or lack of function",
      "Periprosthetic lucency or osteolysis on imaging",
      "Elevated inflammatory markers (e.g. neutrophil count, CRP, SAA)",
      "Note: overt local signs of infection may be absent",
    ],
    examples: [
      { proc: "Total hip replacement", text: "Progressive lameness with periprosthetic lucency, no draining wound; periprosthetic aspirate cytology meets an ICM minor criterion. Implant-associated infection via route B." },
      { proc: "TPLO plate", text: "A deep SSI shown on exploration to extend to and involve the plate and screws — implant-associated infection via route A, co-reported with the deep SSI." },
      { proc: "Fracture fixation", text: "Indolent lameness, implant loosening on radiographs, elevated inflammatory markers, and organisms cultured from implant specimens at revision." },
    ],
    grayZones: [
      {
        title: "Septic loosening vs aseptic mechanical loosening",
        why: "Implant infection and purely mechanical loosening can produce an almost identical clinical and radiographic picture.",
        features: "Favoring infection: elevated inflammatory markers, periprosthetic cytology meeting a minor criterion, organisms on culture or histology. Favoring aseptic: a clean inflammatory profile, a mechanical history, no microbiological support — though infection can never be fully excluded on clinical grounds alone.",
        followUp: "Periprosthetic aspiration with cytology and culture; consider non-culture methods (PCR / nucleic acid amplification), which can detect biofilm organisms that culture misses.",
        surveillance: "Defaulting to 'aseptic' is a recognized route to under-reporting implant infection.",
      },
      {
        title: "Negative culture in suspected implant infection",
        why: "Biofilm organisms detach poorly and are fastidious, so culture is an imperfect reference standard.",
        features: "A negative culture does not exclude implant infection. Histology, periprosthetic cytology criteria, imaging, and inflammatory markers carry weight; non-culture methods may identify the organism.",
        followUp: "Build the diagnosis from multiple complementary findings rather than a single culture result.",
        surveillance: "Treat culture as supportive, not definitive, for implant infection.",
      },
    ],
    misclassification: [
      {
        title: "Implant loosening presumed aseptic",
        why: "Infection is dismissed because there is no draining wound and culture is negative.",
        clinical: "Revision performed without addressing infection — predictable failure of the revision.",
        surveillance: "Implant infections vanish into an 'aseptic loosening' category; the implant program looks cleaner than it is.",
        fix: "Actively work up loosening for infection — cytology, histology, imaging, markers, non-culture methods — before concluding it is mechanical.",
      },
      {
        title: "Implant infection folded into tissue-SSI counts",
        why: "It is recorded only as a deep or organ/space SSI without the separate implant flag.",
        clinical: "The biofilm-specific management implications are lost.",
        surveillance: "The consensus asks for separate reporting; folding it in hides a distinct, high-consequence problem.",
        fix: "Report implant-associated infection as its own category; co-report the tissue SSI where both are present.",
      },
    ],
    pathways: ["implants-instruments", "surgical-team", "surgical-technique", "sterile-field"],
    protocols: ["implant-handling", "sterile-field", "contamination-response", "postoperative-monitoring"],
    roles: ["surgeon", "scrub-tech", "circulating-nurse"],
    surveillance:
      "Implant infection can present long after surgery. Record it separately with its appearance interval. Persistent or late lameness after implant surgery warrants an infection work-up, not a default mechanical explanation.",
  },
];

export function getDefinitionBySlug(slug: string): Definition | undefined {
  return coreDefinitions.find((d) => d.slug === slug);
}

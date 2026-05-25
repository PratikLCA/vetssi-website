// SSI surveillance framework. All clinical content derived from the
// 2026 AJVR expert consensus paper (Verwilghen et al.,
// doi.org/10.2460/ajvr.25.03.0099), Section 4 and Table 16.
// "Consensus" fields paraphrase the paper; interpretation is editorial.

export type SurveillanceTypeId = "passive" | "active";

export interface SurveillanceType {
  id: SurveillanceTypeId;
  name: string;
  consensus: string;
  interpretation: string;
}

export const surveillanceTypes: SurveillanceType[] = [
  {
    id: "passive",
    name: "Passive Surveillance",
    consensus:
      "Routine reporting of SSI cases using data the veterinary team recorded for other reasons — clinical treatment, prescriptions, billing — with no special additional effort to identify cases.",
    interpretation:
      "Low effort, low sensitivity. It under-detects, because a wound that was never noted as infected is silently assumed to be fine.",
  },
  {
    id: "active",
    name: "Active Surveillance",
    consensus:
      "Active contact with or observation of the patient, with deliberate follow-up by the veterinary provider, specifically to identify SSI cases and other surgical outcomes.",
    interpretation:
      "The consensus recommends active surveillance wherever possible. It is the only way to record both infected AND non-infected outcomes — and therefore the only way to produce a rate worth comparing.",
  },
];

export interface SurveillanceTerm {
  id: string;
  name: string;
  consensus: string;
}

export const surveillanceTerms: SurveillanceTerm[] = [
  {
    id: "date-of-event",
    name: "SSI Date of Event",
    consensus: "The date when the first element used to meet an SSI criterion occurs for the first time during the surveillance period.",
  },
  {
    id: "appearance-interval",
    name: "SSI Appearance Interval",
    consensus: "The number of days between the date of the procedure (day 0) and the SSI date of event.",
  },
  {
    id: "surveillance-period",
    name: "Surveillance Period",
    consensus: "A standard active surveillance period defined as 30 days following the surgical procedure of interest.",
  },
];

export interface TimelineEvent {
  day: string;
  title: string;
  text: string;
}

export const surveillanceTimeline: TimelineEvent[] = [
  {
    day: "Day 0",
    title: "Surgery",
    text: "The procedure of interest. Day 0 — the anchor for every appearance interval.",
  },
  {
    day: "Day 10–14",
    title: "First recheck",
    text: "Recheck at the time of suture removal. Direct wound inspection by the operating surgeon is preferred; a trained professional or structured telemedicine review are acceptable alternatives.",
  },
  {
    day: "Week 4",
    title: "Second recheck",
    text: "A second recheck near the end of the 30-day window catches deep and later-appearing infections that a single early visit would miss.",
  },
  {
    day: "Day 30",
    title: "Active endpoint",
    text: "End of the standard active surveillance period. Any SSI linked to the procedure after this point is still recorded, with its appearance interval.",
  },
];

export const surveillanceWhyStandardize = {
  title: "Why standardized definitions matter",
  intro:
    "Without a shared definition, every term below quietly drifts between surgeons and between hospitals — and the consequences compound:",
  points: [
    "SSI rates become incomparable — between surgeons, between years, between practices.",
    "Benchmarking and certification lose their foundation.",
    "Research quality deteriorates; studies cannot be pooled or meta-analyzed.",
    "Antimicrobial stewardship suffers — over-calling drives unnecessary use.",
    "Protocol evaluation becomes weak — you cannot tell whether a change helped.",
  ],
  surveillanceEffect:
    "Adopting uniform definitions may initially make your SSI rate appear to rise — more intensive, consistent surveillance simply detects more. This is expected. The act of participating in surveillance is itself associated with improved prevention compliance and, over time, genuinely lower SSI rates.",
} as const;

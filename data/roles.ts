export type Role = {
  slug: string;
  title: string;
  overview: string;
  responsibilities: string[];
  criticalMoments: string[];
  failurePoints: string[];
  insight?: string;
  linkedProtocols: string[];
  controlledPathways: string[];
};

export const roles: Role[] = [
  {
    slug: "surgeon",
    title: "Surgeon",
    overview:
      "The surgeon holds ultimate accountability for the SSI prevention plan, from case selection and planning through closure and discharge instructions.",
    responsibilities: [
      "Procedure planning and SSI risk assessment",
      "Antimicrobial prophylaxis plan",
      "Implant plan and handling standards",
      "Surgical field isolation standards",
      "Intraoperative contamination event decisions",
      "Closure technique and postoperative instructions",
    ],
    criticalMoments: [
      "Pre-case planning",
      "Antibiotic selection and timing confirmation",
      "Implant opening and handling",
      "Contamination event response",
      "Closure decision-making",
      "Discharge instructions",
    ],
    failurePoints: [
      "Antibiotic timing not confirmed before incision",
      "Implant touched before placement without glove change",
      "Contamination event not recognized or acted on",
      "Discharge instructions too brief or verbal-only",
    ],
    linkedProtocols: [
      "patient-risk-stratification",
      "antimicrobial-prophylaxis",
      "implant-handling",
      "closure-technique",
      "contamination-event-response",
      "owner-discharge-instructions",
    ],
    controlledPathways: [
      "patient",
      "instruments-implants",
      "surgical-technique",
      "intraoperative-adjuncts",
      "postoperative-care",
    ],
  },
  {
    slug: "anesthetist",
    title: "Anesthetist / Anesthesia Technician",
    overview:
      "The anesthesia team manages intravenous access and medication delivery, creating a direct pathway for contamination into the bloodstream.",
    responsibilities: [
      "IV catheter asepsis",
      "Infusion line handling",
      "Medication hygiene",
      "Antibiotic timing",
      "Workspace cleanliness",
    ],
    criticalMoments: [
      "Catheter placement",
      "Drug preparation",
      "Line access",
      "Antibiotic timing",
      "Intraoperative handling",
    ],
    failurePoints: [
      "Late antibiotics",
      "Poor catheter prep",
      "Contaminated line access",
      "Dirty workspace",
      "Shared fluids",
    ],
    insight: "Every line and syringe is a potential contamination pathway.",
    linkedProtocols: [
      "antimicrobial-prophylaxis",
      "iv-catheter-placement",
      "medication-handling",
      "hand-hygiene",
      "anesthesia-vascular-access-control",
    ],
    controlledPathways: ["intraoperative-adjuncts", "surgical-team"],
  },
  {
    slug: "prep-technician",
    title: "Prep Technician / Circulating Nurse",
    overview:
      "The prep technician executes the patient preparation sequence and helps maintain OR environmental discipline before and during the case.",
    responsibilities: [
      "Clipping protocol",
      "Initial and final skin preparation",
      "Transfer cleanliness",
      "OR traffic control",
      "Instrument availability",
      "Documentation of sterility indicators",
    ],
    criticalMoments: [
      "Hair clipping",
      "Antiseptic contact time",
      "Patient transfer into OR",
      "Final skin antisepsis",
      "Door control after sterile setup",
    ],
    failurePoints: [
      "Clipping too narrow or in the wrong location",
      "Contaminated gloves after clipping",
      "Inadequate drying before draping",
      "Recontamination during transfer",
      "OR traffic not controlled",
    ],
    linkedProtocols: [
      "clipping-timing-technique",
      "preoperative-skin-preparation",
      "surgical-site-antisepsis",
      "or-environment-setup",
      "or-traffic-control",
    ],
    controlledPathways: [
      "patient",
      "or-environment",
      "surgical-field-isolation",
      "surgical-team",
    ],
  },
  {
    slug: "scrub-technician",
    title: "Scrub Nurse / Scrub Technician",
    overview:
      "The scrub technician is the steward of the sterile field, responsible for setup integrity, instrument handling, implant handling, and monitoring for breaks in sterility.",
    responsibilities: [
      "Sterile setup",
      "Instrument counts",
      "Implant handling",
      "Field break monitoring",
      "Glove-change prompts",
      "Instrument passing",
    ],
    criticalMoments: [
      "Sterile table setup",
      "Implant opening",
      "Implant transfer",
      "Glove change before implant handling",
      "Recognition of field breaks",
    ],
    failurePoints: [
      "Field break not recognized",
      "Implant opened too early",
      "Implant handled without glove change",
      "Instrument passed incorrectly",
      "Sterile setup exposed too early",
    ],
    linkedProtocols: [
      "sterile-field-maintenance",
      "instrument-sterility",
      "implant-handling",
      "glove-change-protocol",
      "draping-technique",
      "contamination-event-response",
    ],
    controlledPathways: [
      "surgical-team",
      "surgical-field-isolation",
      "instruments-implants",
      "surgical-technique",
    ],
  },
  {
    slug: "recovery-team",
    title: "Recovery / Ward Team",
    overview:
      "The recovery and ward team owns the early postoperative window when the wound is still vulnerable and the patient may contaminate or disrupt the incision.",
    responsibilities: [
      "Wound protection",
      "Patient monitoring",
      "E-collar compliance",
      "Dressing care",
      "Early SSI recognition",
      "Discharge education support",
    ],
    criticalMoments: [
      "Immediate anesthetic recovery",
      "First hours after surgery",
      "Dressing checks",
      "Patient transfer to ward",
      "Discharge preparation",
    ],
    failurePoints: [
      "E-collar missing or removed too early",
      "Incision contacts dirty bedding",
      "Dressing contamination not recognized",
      "Early swelling or discharge not escalated",
      "Owner instructions not reinforced",
    ],
    linkedProtocols: [
      "wound-management",
      "incision-monitoring",
      "patient-self-trauma-prevention",
      "owner-discharge-instructions",
    ],
    controlledPathways: ["postoperative-care", "patient", "surgical-team"],
  },
  {
    slug: "owner",
    title: "Owner / Caregiver",
    overview:
      "After discharge, the owner becomes the primary observer and the final control point for incision protection, activity restriction, medication compliance, and early reporting.",
    responsibilities: [
      "Incision protection",
      "Activity restriction",
      "Medication compliance",
      "Monitoring for signs of infection",
      "Sending photos or contacting the clinic when concerned",
    ],
    criticalMoments: [
      "First 24–48 hours at home",
      "E-collar compliance",
      "Dressing care",
      "Any licking, chewing, or rubbing",
      "Missed medications",
      "Early swelling, redness, discharge, or pain",
    ],
    failurePoints: [
      "Removing the e-collar too early",
      "Allowing excessive activity",
      "Bathing or wetting the incision",
      "Delaying contact with the clinic",
      "Missing subtle early SSI signs",
    ],
    linkedProtocols: [
      "owner-discharge-instructions",
      "incision-monitoring",
      "patient-self-trauma-prevention",
    ],
    controlledPathways: ["postoperative-care"],
  },
];

export function getRoleBySlug(slug: string): Role | undefined {
  return roles.find((r) => r.slug === slug);
}

export function getAllRoles(): Role[] {
  return roles;
}

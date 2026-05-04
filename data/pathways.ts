export type Pathway = {
  slug: string;
  name: string;
  icon: string;
  subtitle: string;
  riskExplanation: string;
  whyItMatters: string[];
  mechanisms: string[];
  criticalInsight: string;
  linkedProtocols: string[];
  ownedBy: string[];
};

export const pathways: Pathway[] = [
  {
    slug: "surgical-team",
    name: "Surgical Team",
    icon: "Users",
    subtitle:
      "Personnel are a primary source of contamination through hands, behavior, and airborne shedding.",
    riskExplanation:
      "The surgical team represents a continuous and dynamic source of microbial contamination throughout the perioperative period. Even with appropriate attire and preparation, personnel shed bacteria from the skin and respiratory tract, and routine actions such as movement, conversation, and equipment handling contribute to contamination risk. Because the surgical team is in direct proximity to the sterile field, failures at this level can introduce microorganisms directly into the operative site.",
    whyItMatters: [
      "Personnel can release thousands of bacteria per minute",
      "Hands, gloves, and attire act as direct transmission vectors",
      "Small contamination events matter in implant surgery",
    ],
    mechanisms: [
      "Incomplete hand hygiene",
      "Contamination during non-sterile tasks",
      "Failure to change gloves",
      "Airborne shedding",
      "OR movement and door openings",
      "Field breaks",
    ],
    criticalInsight:
      "SSI prevention is not about eliminating bacteria — it is about controlling behavior.",
    linkedProtocols: [
      "surgical-team-preparation",
      "hand-hygiene",
      "or-attire-standards",
      "or-behavior-rules",
      "glove-change-protocol",
      "sterile-field-maintenance",
    ],
    ownedBy: ["surgeon", "scrub-technician", "anesthetist", "prep-technician"],
  },
  {
    slug: "patient",
    name: "Patient",
    icon: "User",
    subtitle:
      "The patient's own microbiome, skin condition, and health status influence SSI risk before the first incision.",
    riskExplanation:
      "The patient is an endogenous source of microorganisms. Skin flora, hair, dermatologic disease, wounds, immune status, endocrine disease, obesity, and prior resistant infections can all increase contamination risk.",
    whyItMatters: [
      "The patient's skin cannot be sterilized completely",
      "Residual bacteria may persist in follicles and sebaceous glands",
      "Patient factors can reduce local and systemic defenses",
    ],
    mechanisms: [
      "Skin surface contamination",
      "Hair and debris at the surgical site",
      "Existing dermatitis or wounds",
      "Endocrinopathy or immunosuppression",
      "Prior resistant organism carriage",
    ],
    criticalInsight:
      "Patient preparation begins before clipping. The goal is not sterile skin — it is reducing bacterial burden and avoiding recontamination.",
    linkedProtocols: [
      "patient-risk-stratification",
      "preoperative-skin-preparation",
      "clipping-timing-technique",
      "surgical-site-antisepsis",
    ],
    ownedBy: ["surgeon", "prep-technician", "anesthetist"],
  },
  {
    slug: "or-environment",
    name: "Operating Room Environment",
    icon: "Building2",
    subtitle:
      "Air, surfaces, traffic, and room behavior determine the microbial burden surrounding the sterile field.",
    riskExplanation:
      "The operating room environment contributes to SSI risk through airborne particles, contaminated surfaces, excessive movement, door openings, and poor room discipline.",
    whyItMatters: [
      "Environmental contamination is often invisible",
      "Airborne particles can settle on instruments, implants, or exposed tissues",
      "OR traffic and movement increase bacterial fallout",
    ],
    mechanisms: [
      "Door openings",
      "Excess personnel",
      "Airborne particles",
      "Surface contamination",
      "Poor room turnover",
      "Excessive movement during key phases",
    ],
    criticalInsight:
      "A clean OR is not just a cleaned room. It is a controlled environment with controlled behavior.",
    linkedProtocols: ["or-environment-setup", "or-traffic-control", "or-attire-standards"],
    ownedBy: ["prep-technician", "surgeon", "scrub-technician"],
  },
  {
    slug: "surgical-field-isolation",
    name: "Surgical Field Isolation",
    icon: "Shield",
    subtitle:
      "Draping and sterile barrier discipline prevent residual patient and environmental contamination from reaching the wound.",
    riskExplanation:
      "Even after antiseptic preparation, residual microorganisms remain on the patient. Surgical field isolation creates a physical barrier between contaminated surfaces and the operative site.",
    whyItMatters: [
      "Draping defines the sterile perimeter",
      "Barrier failures create direct wound exposure",
      "Moisture, drape lift, and field breaks can compromise sterility",
    ],
    mechanisms: [
      "Inadequate draping",
      "Drape lift",
      "Strike-through contamination",
      "Contact with non-sterile skin",
      "Unrecognized field breaks",
    ],
    criticalInsight:
      "The sterile field is only as reliable as the team's willingness to recognize and respond to breaches.",
    linkedProtocols: [
      "draping-technique",
      "sterile-field-maintenance",
      "surgical-site-antisepsis",
      "contamination-event-response",
    ],
    ownedBy: ["surgeon", "scrub-technician", "prep-technician"],
  },
  {
    slug: "instruments-implants",
    name: "Instruments & Implants",
    icon: "Wrench",
    subtitle:
      "Sterility failures and implant contamination introduce bacteria directly into the surgical site.",
    riskExplanation:
      "Surgical instruments and orthopedic implants are critical control points. Implants are especially high-risk because they provide surfaces for bacterial adhesion and biofilm formation.",
    whyItMatters: [
      "Implant-associated infections are difficult to eradicate",
      "Even low bacterial loads may matter when implants are present",
      "Contamination may occur during opening, transfer, or handling",
    ],
    mechanisms: [
      "Failed or unverified sterilization",
      "Compromised packaging",
      "Implant opened too early",
      "Implant handled without glove change",
      "Contact with non-sterile surfaces",
    ],
    criticalInsight:
      "The safest implant is opened last, touched least, and placed immediately.",
    linkedProtocols: [
      "instrument-sterility",
      "implant-handling",
      "glove-change-protocol",
      "sterile-field-maintenance",
      "contamination-event-response",
    ],
    ownedBy: ["scrub-technician", "surgeon"],
  },
  {
    slug: "surgical-technique",
    name: "Surgical Technique",
    icon: "Scissors",
    subtitle:
      "Tissue handling, perfusion, hemostasis, dead space, and operative time determine whether contamination becomes infection.",
    riskExplanation:
      "Surgical technique affects the host environment. Tissue trauma, devascularization, hematoma, dead space, prolonged surgery, and unstable fixation all increase susceptibility to infection.",
    whyItMatters: [
      "Bacteria require a permissive wound environment",
      "Damaged or poorly perfused tissue has reduced defenses",
      "Hematoma and dead space support bacterial growth",
    ],
    mechanisms: [
      "Excessive tissue trauma",
      "Periosteal stripping",
      "Hematoma or seroma formation",
      "Dead space",
      "Prolonged operative time",
      "Poor mechanical stability",
    ],
    criticalInsight:
      "Asepsis prevents contamination. Technique determines whether contamination can become established infection.",
    linkedProtocols: ["closure-technique"],
    ownedBy: ["surgeon", "scrub-technician"],
  },
  {
    slug: "intraoperative-adjuncts",
    name: "Intraoperative Adjuncts",
    icon: "Syringe",
    subtitle:
      "Antimicrobials, lavage, vascular access, fluids, and medication handling can reduce or introduce risk.",
    riskExplanation:
      "Adjunctive interventions support infection prevention but must be used correctly. Systemic prophylaxis, lavage, IV catheters, infusion systems, and medication preparation all require precise timing and aseptic handling.",
    whyItMatters: [
      "Antibiotic prophylaxis depends on correct timing",
      "Infusion systems can become contamination routes",
      "Lavage and local adjuncts must not introduce contamination",
    ],
    mechanisms: [
      "Antibiotics given late",
      "Missed redosing",
      "Contaminated catheter or line handling",
      "Multi-use bottle contamination",
      "Medication preparation lapses",
    ],
    criticalInsight:
      "Adjuncts are not substitutes for asepsis. They only work when timing, sterility, and handling are controlled.",
    linkedProtocols: [
      "antimicrobial-prophylaxis",
      "anesthesia-vascular-access-control",
      "iv-catheter-placement",
      "medication-handling",
      "postoperative-antibiotic-decisions",
    ],
    ownedBy: ["surgeon", "anesthetist", "scrub-technician"],
  },
  {
    slug: "postoperative-care",
    name: "Postoperative Care",
    icon: "Bandage",
    subtitle:
      "The wound remains vulnerable after surgery and must be protected, monitored, and managed without unnecessary antibiotics.",
    riskExplanation:
      "The postoperative period introduces contamination risks from licking, chewing, dressing problems, dirty environments, inadequate monitoring, and poor owner compliance.",
    whyItMatters: [
      "The incision remains vulnerable during early healing",
      "Self-trauma can contaminate or disrupt the wound",
      "Delayed recognition worsens SSI outcomes",
    ],
    mechanisms: [
      "Licking or chewing",
      "Dressing contamination",
      "Poor cage or bedding hygiene",
      "Missed early signs of infection",
      "Inappropriate prolonged antibiotics",
    ],
    criticalInsight:
      "SSI prevention does not end at closure. The owner and ward team become part of the sterile system.",
    linkedProtocols: [
      "wound-management",
      "incision-monitoring",
      "patient-self-trauma-prevention",
      "owner-discharge-instructions",
      "postoperative-antibiotic-decisions",
    ],
    ownedBy: ["recovery-team", "owner", "surgeon"],
  },
];

export function getPathwayBySlug(slug: string): Pathway | undefined {
  return pathways.find((p) => p.slug === slug);
}

export function getAllPathways(): Pathway[] {
  return pathways;
}

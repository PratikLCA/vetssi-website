export type ProtocolStep = string | { title: string; details: string[] };

// ─── Middle Block Types ───────────────────────────────────────────────────────

export type ChecklistItemData = {
  label: string;
  note?: string;
};

export type RiskTier = {
  level: "standard" | "elevated" | "high";
  criteria: string;
  action: string;
};

export type ScreeningRow = {
  finding: string;
  action: "proceed" | "modify" | "defer";
  actionLabel?: string;
};

export type ScreeningDomain = {
  domain: string;
  rows: ScreeningRow[];
};

export type GoNoGoItem = {
  label: string;
  note: string;
};

export type MiddleBlock =
  | {
      type: "risk-tier";
      sectionTitle: string;
      intro?: string;
      patientFactors: ChecklistItemData[];
      proceduralFactors: ChecklistItemData[];
      tiers: RiskTier[];
    }
  | {
      type: "screening-table";
      sectionTitle: string;
      intro?: string;
      domains: ScreeningDomain[];
      dayOfTitle: string;
      dayOfItems: ChecklistItemData[];
    }
  | {
      type: "planning-checklist";
      sectionTitle: string;
      intro?: string;
      groups: { header: string; items: ChecklistItemData[] }[];
      parametersTitle: string;
      parametersIntro?: string;
      parameters: { label: string; placeholder: string }[];
    }
  | {
      type: "prophylaxis-plan";
      sectionTitle: string;
      intro?: string;
      planTitle: string;
      parameters: { label: string; placeholder: string }[];
      confirmationTitle: string;
      confirmationItems: ChecklistItemData[];
    }
  | {
      type: "gonogo";
      sectionTitle: string;
      intro?: string;
      groups: { header: string; items: GoNoGoItem[] }[];
      warning?: { label: string; text: string };
    };

export type Protocol = {
  slug: string;
  title: string;
  phase: "pre-case-planning" | "preoperative" | "intraoperative" | "postoperative";
  pathways: string[];
  roles: string[];
  clinicalObjective: string;
  whyThisMatters?: string;
  criticalControlPoints: string[];
  steps: ProtocolStep[];
  pitfalls: string[];
  expertInsight: string;
  evidence: { citation: string; doi?: string }[];
  relatedProtocols: string[];
  relatedVideos: string[];
  middleBlock?: MiddleBlock;
  audienceVersions?: {
    staff: { steps: ProtocolStep[]; pitfalls?: string[] };
    surgeon: { steps: ProtocolStep[]; pitfalls?: string[] };
  };
};

export const protocols: Protocol[] = [
  // ─── PREOPERATIVE ────────────────────────────────────────────────────────────
  {
    slug: "patient-risk-stratification",
    title: "Patient Risk Stratification",
    phase: "preoperative",
    pathways: ["patient"],
    roles: ["surgeon"],
    clinicalObjective:
      "Identify patients at elevated risk for surgical site infection prior to scheduling or proceeding with elective procedures. Risk stratification enables targeted prophylactic measures and informed client communication. A structured pre-surgical assessment reduces preventable SSIs by allowing protocol modifications before the patient reaches the operating room.",
    whyThisMatters:
      "The most preventable SSIs are those that occur in patients who should not have been operated on electively in their presenting condition. A structured risk review changes the care pathway before a single incision is made.",
    criticalControlPoints: [
      "Active skin disease at or near the surgical site is identified and addressed before scheduling",
      "Immunosuppressive therapy is documented and accounted for in the prophylaxis plan",
      "ASA classification is recorded and shared with the entire surgical team",
      "Elevated-risk patients trigger enhanced perioperative protocols",
    ],
    steps: [
      "Review complete medical history, including prior infections, immunosuppressive therapy, and concurrent disease.",
      "Assess body condition score (BCS); obesity (BCS ≥ 8/9) is an independent SSI risk factor.",
      "Screen for active skin infections, pyoderma, or wounds near the planned surgical site.",
      "Evaluate immune status: confirm vaccination status and assess for conditions causing immunosuppression (hyperadrenocorticism, diabetes mellitus, FIV/FeLV).",
      "Document ASA physical status classification (I–V) and record in the surgical checklist.",
      "For high-risk patients (ASA III+), discuss risk with client and consider whether elective surgery should be deferred.",
      "Flag elevated-risk patients in the surgical schedule to trigger enhanced perioperative protocols.",
    ],
    pitfalls: [
      "Proceeding with elective surgery in patients with active skin infections at or near the surgical site.",
      "Overlooking recent or current corticosteroid administration, which substantially elevates infection risk.",
      "Failing to communicate identified risk factors to the entire surgical team prior to the procedure.",
      "Using a binary 'high/low' risk framework rather than a graded, evidence-based classification system.",
    ],
    expertInsight:
      "The most preventable SSIs are those that occur in patients who should not have been operated on electively in their presenting condition. A 5-minute pre-surgical risk review is the highest-yield intervention in this entire protocol — it changes the care pathway before a single incision is made. When in doubt, defer and optimize. A controlled patient scheduled two weeks later is always safer than an uncontrolled patient operated on today.",
    evidence: [
      {
        citation:
          "Nicholson M, et al. Risk factors for surgical site infection in veterinary patients. Veterinary Surgery. 2002;31(3):228–233.",
        doi: "10.1053/jvet.2002.31617",
      },
      {
        citation:
          "Eugster S, et al. A prospective study of postoperative infections in dogs and cats. Veterinary Surgery. 2004;33(5):542–550.",
        doi: "10.1111/j.1532-950X.2004.04076.x",
      },
      {
        citation:
          "Turk R, et al. Identification of risk factors for surgical site infection in small animal surgery. Veterinary Surgery. 2015;44(8):915–921.",
        doi: "10.1111/vsu.12375",
      },
    ],
    relatedProtocols: ["preoperative-skin-preparation", "antimicrobial-prophylaxis"],
    relatedVideos: [],
  },
  {
    slug: "preoperative-skin-preparation",
    title: "Preoperative Skin Preparation",
    phase: "preoperative",
    pathways: ["patient"],
    roles: ["prep-technician"],
    clinicalObjective:
      "Reduce the microbial burden on the patient's skin at and around the intended surgical site to the lowest achievable level before incision. Effective skin preparation addresses both resident and transient flora and is among the most impactful single interventions in SSI prevention.",
    whyThisMatters:
      "Skin antisepsis is the most validated single intervention in SSI prevention. Discipline around contact time and technique determines whether the agent works as evidence predicts.",
    criticalControlPoints: [
      "Clipping is performed in a dedicated prep area, never in the OR",
      "Antiseptic contact time is timed, not estimated",
      "Final paint coat is fully dry before drapes are applied",
    ],
    steps: [
      "Clip the surgical site in a designated preparation area — never in the operating room.",
      "Perform an initial gross cleaning of the site with a mild surgical scrub solution.",
      "Apply antiseptic preparation solution using a standardized pattern: begin at the incision site and work outward in concentric circles.",
      "Use chlorhexidine gluconate (2–4%) or povidone-iodine (7.5–10%) as the antiseptic agent.",
      "Allow adequate contact time: chlorhexidine requires a minimum of 30 seconds of scrubbing; povidone-iodine requires 2 minutes.",
      "Perform a minimum of 3 alternating scrub-and-rinse cycles.",
      "Apply a final antiseptic paint coat and allow to fully dry before draping.",
    ],
    pitfalls: [
      "Rushing the preparation to save time — inadequate contact time renders the antiseptic ineffective.",
      "Clipping in the OR, which disperses hair and debris into the surgical field.",
      "Using wet prep solutions on mucous membranes or near eyes without appropriate dilution.",
      "Skipping the final dry coat, which is responsible for sustained antimicrobial activity during surgery.",
    ],
    expertInsight:
      "There is meaningful evidence that chlorhexidine outperforms povidone-iodine for SSI prevention in veterinary patients. My preference is 2% chlorhexidine gluconate with 70% isopropyl alcohol as the final prep agent where skin integrity allows. The key discipline is the full prep time — it is almost always cut short in busy clinical settings. If you must time only one thing in your prep room, time the antiseptic contact.",
    evidence: [
      {
        citation:
          "Osuna DJ, et al. Comparison of three skin preparation techniques in the dog. Veterinary Surgery. 1990;19(1):14–19.",
        doi: "10.1111/j.1532-950X.1990.tb01136.x",
      },
      {
        citation:
          "Doherty C, et al. Chlorhexidine versus povidone-iodine for surgical site antisepsis: a meta-analysis. Journal of Hospital Infection. 2020;105(1):13–22.",
        doi: "10.1016/j.jhin.2019.12.021",
      },
    ],
    relatedProtocols: ["clipping-timing-technique", "surgical-site-antisepsis"],
    relatedVideos: ["skin-prep-technique", "antiseptic-application"],
  },
  {
    slug: "clipping-timing-technique",
    title: "Clipping Timing & Technique",
    phase: "preoperative",
    pathways: ["patient"],
    roles: ["prep-technician"],
    clinicalObjective:
      "Establish evidence-based standards for the timing, extent, and method of hair removal from the surgical site. Clipping-related microabrasions are a primary contributor to SSI risk; technique and timing both significantly affect outcomes.",
    whyThisMatters:
      "Skin microabrasions colonize with bacteria within hours. Clipping timing is one of the most consistently underestimated SSI variables in day-to-day practice.",
    criticalControlPoints: [
      "Clipping occurs as close to incision time as feasible (ideally within 1 hour)",
      "Sharp blades and a generous margin",
      "Clipped hair is fully removed from the patient and prep area",
    ],
    steps: [
      "Schedule clipping as close to surgery time as possible — ideally within 1 hour of incision.",
      "Use a dedicated clipper blade (size 40 for fine work; 10 for gross removal) maintained in good repair.",
      "Clip in a clean prep area outside the OR; never clip in the surgical suite.",
      "Use a generous margin: minimum 10 cm beyond the planned incision in all directions.",
      "Clip with the hair growth direction first, then against for a closer finish without aggressive passes.",
      "Remove all clipped hair using a vacuum or lint roller — do not blow or brush into the surgical field.",
      "Inspect the clipped skin for microabrasions, lesions, or wounds before proceeding.",
    ],
    pitfalls: [
      "Clipping the night before surgery — skin microabrasions colonize with bacteria within hours.",
      "Using dull blades that drag and cause abrasive injury to skin.",
      "Clipping too close to the incision site without adequate margin.",
      "Allowing clipped hair to contaminate the prep area or travel to the OR via the patient.",
    ],
    expertInsight:
      "The single most underestimated SSI variable in day-to-day practice is clip timing. Studies consistently show that clipping more than 2 hours before surgery significantly increases SSI risk, yet overnight clipping remains common in high-volume practices. If your protocol cannot guarantee same-day clipping, the literature supports wet depilatory creams as an alternative that avoids microabrasion entirely.",
    evidence: [
      {
        citation:
          "Mangram AJ, et al. Guideline for prevention of surgical site infection. Infection Control and Hospital Epidemiology. 1999;20(4):250–278.",
        doi: "10.1086/501620",
      },
      {
        citation:
          "Tanner J, et al. Preoperative hair removal to reduce surgical site infection. Cochrane Database of Systematic Reviews. 2011;11:CD004122.",
        doi: "10.1002/14651858.CD004122.pub4",
      },
    ],
    relatedProtocols: ["preoperative-skin-preparation", "surgical-site-antisepsis"],
    relatedVideos: ["clipping-technique-demo"],
  },
  {
    slug: "surgical-site-antisepsis",
    title: "Surgical Site Antisepsis",
    phase: "preoperative",
    pathways: ["patient", "surgical-field-isolation"],
    roles: ["prep-technician", "surgeon"],
    clinicalObjective:
      "Select and correctly apply antiseptic agents to achieve maximal reduction in viable organisms at the surgical site immediately prior to draping and incision. Agent selection and application method must be matched to the site anatomy and patient characteristics.",
    whyThisMatters:
      "Antiseptic technique matters more than antiseptic selection. The 'paint and drape' reflex is one of the most common preventable technique errors in veterinary surgery.",
    criticalControlPoints: [
      "Agent matched to anatomic site (mucous membranes require diluted preparations)",
      "Application strokes move from incision center outward",
      "Full dry time before drape application",
    ],
    steps: [
      "Select the appropriate antiseptic agent based on site location, patient skin integrity, and institutional protocol.",
      "For most body surface sites: use 2% chlorhexidine gluconate in 70% isopropyl alcohol.",
      "For mucous membranes, perineum, or ears: use diluted (0.05–0.5%) chlorhexidine aqueous solution.",
      "Apply using a sterile sponge or applicator; do not contaminate the agent container.",
      "Work from the cleanest (incision center) to the least clean (periphery) in continuous outward strokes.",
      "Allow full drying time before applying drapes — alcohol-based agents require complete evaporation.",
      "Document the agent used and application time in the surgical record.",
    ],
    pitfalls: [
      "Applying antiseptic with a back-and-forth wiping motion rather than a consistent outward pattern.",
      "Using alcohol-containing prep solutions near ignition sources without ensuring complete drying.",
      "Applying concentrated chlorhexidine to mucous membranes or the eye — causes irreversible damage.",
      "Pooling of solution under the patient during prep — contact time is important, but pooling causes chemical burns.",
    ],
    expertInsight:
      "Antiseptic selection matters less than antiseptic technique. I have seen beautifully prepared patients with perfectly selected agents fail because the prep was rushed. The 'paint and drape' reflex — applying solution and immediately draping — is one of the most common preventable technique errors in veterinary surgery. Allow the agent to work. Every antiseptic has a required contact time, and that time exists for a reason.",
    evidence: [
      {
        citation:
          "Darouiche RO, et al. Chlorhexidine-alcohol versus povidone-iodine for surgical-site antisepsis. New England Journal of Medicine. 2010;362(1):18–26.",
        doi: "10.1056/NEJMoa0810988",
      },
      {
        citation:
          "Dumville JC, et al. Preoperative skin antiseptics for preventing surgical wound infections after clean surgery. Cochrane Database of Systematic Reviews. 2015;4:CD003949.",
        doi: "10.1002/14651858.CD003949.pub4",
      },
    ],
    relatedProtocols: ["preoperative-skin-preparation", "clipping-timing-technique"],
    relatedVideos: ["antiseptic-application"],
  },
  {
    slug: "antimicrobial-prophylaxis",
    title: "Antimicrobial Prophylaxis",
    phase: "preoperative",
    pathways: ["intraoperative-adjuncts"],
    roles: ["surgeon", "anesthetist"],
    clinicalObjective:
      "Administer systemic antibiotic prophylaxis at the correct time, dose, and duration to reduce SSI risk in appropriate surgical cases, while avoiding unnecessary antibiotic use that contributes to antimicrobial resistance. Prophylaxis is not a substitute for good surgical technique.",
    whyThisMatters:
      "The antibiotic is one layer of a bundle. It only works if the rest of the bundle is intact, and only when timing places peak tissue concentration at the moment of incision.",
    criticalControlPoints: [
      "Dose administered 30–60 minutes before incision — verified verbally before the case begins",
      "Redosing scheduled for procedures over 90 minutes",
      "Prophylaxis discontinued within 24 hours of surgery",
    ],
    steps: [
      "Assess the wound classification (clean, clean-contaminated, contaminated, dirty) to determine whether prophylaxis is indicated.",
      "For clean procedures under 60 minutes in low-risk patients, prophylaxis may not be indicated — review evidence-based guidelines.",
      "Select agent based on the expected flora: cefazolin is the standard first-line agent for most veterinary surgical procedures.",
      "Administer IV cefazolin at 22 mg/kg 30–60 minutes before incision.",
      "Confirm administration time is recorded before the patient enters the OR.",
      "For procedures lasting >90 minutes, administer a redosing interval of cefazolin (every 90–120 minutes intraoperatively).",
      "Discontinue prophylaxis within 24 hours of surgery — prolonged courses do not reduce SSI and increase resistance risk.",
    ],
    pitfalls: [
      "Administering antibiotics more than 60 minutes before incision — peak tissue levels do not coincide with the wound.",
      "Continuing prophylactic antibiotics for multiple days 'just in case' — this is therapeutic dosing without a diagnosis.",
      "Using broad-spectrum agents (amoxicillin-clavulanate, fluoroquinolones) as first-line prophylaxis without indication.",
      "Omitting intraoperative redosing in long procedures, particularly orthopedic cases.",
    ],
    expertInsight:
      "The antibiotic is not a safety net. It is one layer of a bundle, and it only works if the rest of the bundle is intact. The greatest antibiotic stewardship error I observe in practice is not under-prescribing — it is reflexive multi-day prophylactic courses given to patients with clean surgical sites and no infection. Cefazolin, on time, once. That is the protocol for the majority of clean veterinary procedures.",
    evidence: [
      {
        citation:
          "Beal MW, et al. The association between perioperative hypothermia and adverse outcomes in dogs undergoing soft tissue surgery. Journal of the American Animal Hospital Association. 2000;36(6):533–542.",
        doi: "10.5326/15473317-36-6-533",
      },
      {
        citation:
          "Weese JS, et al. Antimicrobial use guidelines for treatment of urinary tract disease in dogs and cats. Veterinary Medicine International. 2011;2011:263768.",
        doi: "10.4061/2011/263768",
      },
      {
        citation:
          "Nelson LL. Surgical site infections in small animal surgery. Veterinary Clinics of North America: Small Animal Practice. 2011;41(5):1041–1056.",
        doi: "10.1016/j.cvsm.2011.05.010",
      },
    ],
    relatedProtocols: ["patient-risk-stratification", "postoperative-antibiotic-decisions"],
    relatedVideos: [],
  },
  {
    slug: "surgical-team-preparation",
    title: "Surgical Team Preparation",
    phase: "preoperative",
    pathways: ["surgical-team"],
    roles: ["surgeon", "scrub-technician"],
    clinicalObjective:
      "Establish a coordinated pre-incision sequence in which the surgical team confirms preparation status, sterile setup, prophylaxis timing, and contamination-event protocol before any patient enters the operating room.",
    whyThisMatters:
      "A briefed team operates with shared expectations. When pre-incision standards are confirmed verbally, common failure points — late antibiotics, missing implants, undefined contamination response — surface before they become intraoperative problems.",
    criticalControlPoints: [
      "Surgical safety pause completed before incision",
      "Prophylactic antibiotic timing confirmed verbally",
      "Implant inventory verified",
      "Contamination-response plan acknowledged by all team members",
    ],
    steps: [
      "Conduct a structured pre-case briefing with surgeon, scrub technician, anesthetist, and circulating nurse present.",
      "Confirm patient identity, procedure, and surgical site against the chart.",
      "Verify prophylactic antibiotic administration time aloud — no incision until confirmation.",
      "Confirm sterile setup is complete and instrument counts are correct.",
      "State expected duration and any anticipated contamination-sensitive phases.",
      "Acknowledge contamination-event protocol: the team member who sees a breach announces it immediately.",
    ],
    pitfalls: [
      "Skipping the briefing 'because everyone knows the case' — undocumented assumptions cause errors.",
      "Beginning before antibiotic timing is verbally confirmed.",
      "Briefing without the full team present — anyone added late operates without context.",
    ],
    expertInsight:
      "The team that briefs together catches the error that any one person would have missed.",
    evidence: [
      {
        citation:
          "Haynes AB, et al. A surgical safety checklist to reduce morbidity and mortality in a global population. New England Journal of Medicine. 2009;360(5):491–499.",
        doi: "10.1056/NEJMsa0810119",
      },
    ],
    relatedProtocols: [
      "hand-hygiene",
      "or-attire-standards",
      "antimicrobial-prophylaxis",
      "sterile-field-maintenance",
    ],
    relatedVideos: ["sterile-gowning-gloving"],
  },
  {
    slug: "hand-hygiene",
    title: "Hand Hygiene",
    phase: "preoperative",
    pathways: ["surgical-team"],
    roles: ["surgeon", "anesthetist", "prep-technician", "scrub-technician", "recovery-team"],
    clinicalObjective:
      "Reduce transient and resident microbial flora on the hands and forearms of all surgical personnel before donning sterile attire and at every transition that exposes hands to potential contamination.",
    whyThisMatters:
      "Hands are the most frequent vector of contamination in any surgical environment. Surgical hand antisepsis is the single most validated infection-control intervention performed by every team member.",
    criticalControlPoints: [
      "Surgical hand antisepsis performed before initial gowning",
      "Hand hygiene re-performed at any contamination event",
      "Alcohol-based surgical hand rub applied to fully dry hands",
    ],
    steps: [
      "Remove all jewelry from hands and wrists; ensure nails are short and free of polish or artificial extensions.",
      "Perform a pre-scrub wash with soap and water to remove gross contamination.",
      "Apply surgical hand rub or perform a timed surgical scrub per the institutional protocol.",
      "Use a brushless technique with chlorhexidine 4% or an alcohol-based formulation containing chlorhexidine for 2–5 minutes.",
      "Keep hands above elbows during and after antisepsis until donning the sterile gown.",
      "Re-perform hand hygiene if hands contact any non-sterile surface before gloving.",
    ],
    pitfalls: [
      "Performing alcohol-based hand antisepsis on wet hands — alcohol products require dry skin to work properly.",
      "Skipping pre-wash when hands are visibly soiled — alcohol products do not penetrate organic matter.",
      "Reusing the same gown sleeve to dry; always use a sterile towel.",
      "Not re-scrubbing after touching anything outside the sterile field.",
    ],
    expertInsight:
      "If you cannot remember when you last performed hand hygiene during the case, do it now.",
    evidence: [
      {
        citation:
          "World Health Organization. WHO Guidelines on Hand Hygiene in Health Care. Geneva: WHO; 2009.",
      },
    ],
    relatedProtocols: ["surgical-team-preparation", "glove-change-protocol", "or-attire-standards"],
    relatedVideos: ["sterile-gowning-gloving"],
    audienceVersions: {
      surgeon: {
        steps: [
          "Remove all jewelry from hands and wrists; ensure nails are short and free of polish or artificial extensions.",
          "Perform a pre-scrub wash with soap and water to remove gross contamination.",
          "Apply surgical hand rub or perform a timed surgical scrub per the institutional protocol.",
          "Use a brushless technique with chlorhexidine 4% or an alcohol-based formulation containing chlorhexidine for 2–5 minutes.",
          "Keep hands above elbows during and after antisepsis until donning the sterile gown.",
          "Re-perform hand hygiene if hands contact any non-sterile surface before gloving.",
        ],
        pitfalls: [
          "Performing alcohol-based hand antisepsis on wet hands — alcohol products require dry skin to work properly.",
          "Skipping pre-wash when hands are visibly soiled — alcohol products do not penetrate organic matter.",
          "Reusing the same gown sleeve to dry; always use a sterile towel.",
          "Not re-scrubbing after touching anything outside the sterile field.",
        ],
      },
      staff: {
        steps: [
          "Before any patient contact: apply alcohol-based hand rub using the WHO 6-step technique for 20–30 seconds.",
          "Before handling IV catheters, infusion lines, or injectable medications: perform hand rub or soap-and-water wash.",
          "Before administering sedation or any induction agent: perform hand rub.",
          "After removing gloves: perform hand rub immediately — gloves do not replace hand hygiene.",
          "After patient contact, environmental surface contact, or handling contaminated material: hand rub.",
          "Before leaving and on re-entry to the OR: perform hand rub at the door.",
        ],
        pitfalls: [
          "Skipping hand hygiene because gloves are being worn — gloves are a barrier, not a substitute for clean hands.",
          "Using alcohol rub on visibly soiled hands — wash with soap and water first.",
          "Not performing hand hygiene after removing contaminated gloves from clipping or patient prep.",
          "Skipping re-hygiene when moving between tasks (e.g., from anesthesia setup to catheter handling).",
        ],
      },
    },
  },
  {
    slug: "or-attire-standards",
    title: "OR Attire Standards",
    phase: "preoperative",
    pathways: ["surgical-team", "or-environment"],
    roles: ["surgeon", "anesthetist", "prep-technician", "scrub-technician"],
    clinicalObjective:
      "Standardize operating room attire to minimize particulate and microbial shedding from skin, hair, and personal clothing into the surgical field and air.",
    whyThisMatters:
      "Personnel are a continuous source of skin squamous cells and bacteria. OR-specific attire creates a barrier that limits how much of that load reaches the field.",
    criticalControlPoints: [
      "Hair fully covered before entering the OR",
      "Mask covers nose and mouth completely",
      "OR scrubs are clean and dedicated to the OR area",
      "No personal clothing visible at neck, sleeves, or waistband",
    ],
    steps: [
      "Don clean OR scrubs upon entering the surgical suite — change between cases when soiled.",
      "Cover all hair, including beards, with a fitted cap or hood.",
      "Apply a fluid-resistant surgical mask over nose and mouth before entering the sterile zone.",
      "Remove jewelry, including watches and rings, before scrub.",
      "Avoid bringing personal items, lanyards, or pens into the OR sterile zone.",
      "Replace mask and head cover between cases.",
    ],
    pitfalls: [
      "Wearing OR scrubs outside the surgical suite, then returning — outside contamination is reintroduced.",
      "Loose-fitting masks that gap at the bridge of the nose.",
      "Neck chains, dangling hair, or visible undershirts not covered by scrubs.",
    ],
    expertInsight:
      "What you wear is what you bring into the field — visibly and invisibly.",
    evidence: [
      {
        citation:
          "AORN Guidelines for Perioperative Practice. Surgical Attire. Denver: AORN, Inc.; 2023.",
      },
    ],
    relatedProtocols: ["surgical-team-preparation", "hand-hygiene", "or-behavior-rules"],
    relatedVideos: [],
  },
  {
    slug: "anesthesia-vascular-access-control",
    title: "Anesthesia & Vascular Access Control",
    phase: "preoperative",
    pathways: ["intraoperative-adjuncts"],
    roles: ["anesthetist"],
    clinicalObjective:
      "Maintain aseptic discipline at every point of vascular access, infusion line manipulation, and medication delivery during anesthesia, recognizing that each access is a direct route to the bloodstream.",
    whyThisMatters:
      "Bloodstream contamination bypasses every other infection-control barrier. Anesthesia-side asepsis is one of the most frequent and underestimated SSI risk factors.",
    criticalControlPoints: [
      "Hand hygiene before every line manipulation",
      "Injection ports cleaned with alcohol before access",
      "No reuse of single-patient fluids or syringes between patients",
    ],
    steps: [
      "Perform hand hygiene before every interaction with vascular access devices.",
      "Disinfect injection ports with 70% isopropyl alcohol for 15 seconds before access.",
      "Use single-use syringes; do not reuse syringes between drugs or between patients.",
      "Maintain a clean anesthesia workspace — do not place medications on dirty surfaces.",
      "Inspect the IV catheter site at induction and post-induction; document any concerns.",
      "Keep infusion lines off the floor and away from non-sterile contact.",
    ],
    pitfalls: [
      "Touching access ports without prior disinfection.",
      "Reusing a 'clean-looking' syringe between drug administrations.",
      "Allowing fluid bags or lines to drape onto non-sterile surfaces.",
      "Unrecognized contamination of the workspace from prior cases.",
    ],
    expertInsight: "The anesthesia line is part of the patient. Treat it as such.",
    evidence: [
      {
        citation:
          "O'Grady NP, et al. Guidelines for the prevention of intravascular catheter-related infections. Clinical Infectious Diseases. 2011;52(9):e162–e193.",
      },
    ],
    relatedProtocols: ["iv-catheter-placement", "medication-handling", "antimicrobial-prophylaxis"],
    relatedVideos: [],
  },
  {
    slug: "iv-catheter-placement",
    title: "IV Catheter Placement",
    phase: "preoperative",
    pathways: ["intraoperative-adjuncts"],
    roles: ["anesthetist"],
    clinicalObjective:
      "Place and maintain peripheral or central intravenous catheters using aseptic technique that minimizes the risk of bloodstream infection over the duration of the catheter.",
    whyThisMatters:
      "Catheter-related bloodstream infection is a recognized cause of postoperative morbidity. Aseptic placement is the single most modifiable risk factor.",
    criticalControlPoints: [
      "Skin preparation with chlorhexidine-alcohol before insertion",
      "Aseptic technique during placement",
      "Sterile transparent dressing applied at insertion",
    ],
    steps: [
      "Select an appropriate vein and clip the site if hair is dense.",
      "Perform aseptic skin preparation with 2% chlorhexidine in 70% alcohol; allow to dry.",
      "Don clean or sterile gloves per the institutional protocol; handle the catheter aseptically.",
      "Place the catheter with a single, controlled stick where possible — multiple punctures elevate risk.",
      "Apply a sterile transparent dressing immediately, with the catheter hub visible for monitoring.",
      "Document placement date and time; replace per protocol or sooner if any concern arises.",
    ],
    pitfalls: [
      "Skipping skin antisepsis 'because the patient is already prepped'.",
      "Using the same hand to handle both the unprepped skin and the catheter tip.",
      "Securing the catheter with tape over the insertion site, obscuring inspection.",
      "Leaving catheters in beyond standard duration without indication.",
    ],
    expertInsight:
      "Every minute saved by skipping aseptic catheter placement is repaid in days of treatment if infection occurs.",
    evidence: [
      {
        citation: "Mathews KA. Veterinary Emergency and Critical Care Manual, 2nd ed. Lifelearn; 2017.",
      },
    ],
    relatedProtocols: ["anesthesia-vascular-access-control", "medication-handling"],
    relatedVideos: [],
  },
  {
    slug: "medication-handling",
    title: "Medication Handling",
    phase: "preoperative",
    pathways: ["intraoperative-adjuncts"],
    roles: ["anesthetist"],
    clinicalObjective:
      "Prepare, label, store, and administer medications using practices that prevent contamination of single-patient and multi-use containers, syringes, and infusion systems.",
    whyThisMatters:
      "A contaminated medication vial is a single-source contamination event that can affect every patient who receives a dose. Medication discipline protects every case downstream.",
    criticalControlPoints: [
      "Single-patient vials never accessed for a second patient",
      "Multi-dose vials accessed only with a new sterile needle and syringe",
      "All prepared syringes labeled with drug, dose, and time",
    ],
    steps: [
      "Disinfect the rubber stopper with alcohol before accessing any vial.",
      "Use a new sterile needle and syringe for every withdrawal from a multi-dose vial.",
      "Label every prepared syringe with drug, concentration, and time of preparation.",
      "Discard single-patient vials immediately after the case — never carry over.",
      "Store opened multi-dose vials per manufacturer guidance and expiry; date upon first access.",
      "Inspect for particulates, discoloration, or cloudiness before drawing any drug.",
    ],
    pitfalls: [
      "Re-entering a vial with a previously used needle.",
      "Drawing 'a quick dose' from a single-patient vial for the next animal.",
      "Unlabeled syringes — ambiguity at the workspace causes drug errors and contamination.",
      "Storing vials on or near contaminated surfaces.",
    ],
    expertInsight: "An unlabeled syringe is a contaminated syringe.",
    evidence: [
      {
        citation:
          "Centers for Disease Control and Prevention. Injection Safety: Healthcare-associated Infection Prevention. CDC; 2021.",
      },
    ],
    relatedProtocols: ["anesthesia-vascular-access-control", "iv-catheter-placement"],
    relatedVideos: [],
  },
  {
    slug: "or-environment-setup",
    title: "OR Environment & Room Setup",
    phase: "preoperative",
    pathways: ["or-environment"],
    roles: ["prep-technician"],
    clinicalObjective:
      "Prepare the operating room environment so that air handling, surface cleanliness, equipment placement, and personnel limits all support a controlled sterile field before the patient enters.",
    whyThisMatters:
      "Environmental contamination is invisible, and its effects compound over the case. The room must be ready before sterile setup begins, not adjusted around it.",
    criticalControlPoints: [
      "Positive-pressure ventilation confirmed functional before sterile setup",
      "Surfaces cleaned and disinfected between cases with approved agents",
      "Temperature 18–24°C and relative humidity 40–60%",
      "Equipment placed before sterile setup so movement during the case is minimized",
    ],
    steps: [
      "Confirm positive-pressure ventilation is operating before any sterile setup begins.",
      "Wipe down all surfaces with an approved disinfectant; allow contact time per the product label.",
      "Verify temperature and humidity targets are within range.",
      "Position large equipment (anesthesia machine, monitors, lights, suction) before sterile setup.",
      "Stage instrument tables and supplies so the scrub technician can set up without leaning across non-sterile surfaces.",
      "Confirm doors close fully and seal — repair any failure before the case proceeds.",
    ],
    pitfalls: [
      "Cleaning surfaces with insufficient contact time — the disinfectant did not work.",
      "Adjusting equipment position after sterile setup, requiring movement near the field.",
      "Beginning the case with a malfunctioning HVAC or door seal.",
      "Cursory cleaning between back-to-back cases.",
    ],
    expertInsight:
      "A clean OR is not just a cleaned room. It is a controlled environment with controlled behavior.",
    evidence: [
      {
        citation:
          "AORN Guidelines for Perioperative Practice. Environmental Cleaning. Denver: AORN, Inc.; 2023.",
      },
    ],
    relatedProtocols: ["or-traffic-control", "or-attire-standards", "sterile-field-maintenance"],
    relatedVideos: ["or-setup-walkthrough"],
  },

  // ─── INTRAOPERATIVE ──────────────────────────────────────────────────────────
  {
    slug: "or-behavior-rules",
    title: "OR Behavior Rules",
    phase: "intraoperative",
    pathways: ["surgical-team", "or-environment"],
    roles: ["surgeon", "scrub-technician", "prep-technician"],
    clinicalObjective:
      "Define the movement, speech, and interaction rules for personnel in the operating room during a case to minimize air turbulence, particulate generation, and field contamination.",
    whyThisMatters:
      "Movement and speech increase particulate counts in the air. The most carefully prepared sterile field can be compromised by undisciplined room behavior during the case.",
    criticalControlPoints: [
      "No unnecessary movement during contamination-sensitive phases",
      "Speech limited to clinically necessary communication",
      "Sterile boundaries respected by every team member",
    ],
    steps: [
      "Brief all personnel on movement and speech expectations before the case begins.",
      "During implant placement and other sensitive phases, all non-essential movement pauses.",
      "Personnel approach the sterile field only with explicit purpose and verbal acknowledgment.",
      "Avoid leaning over sterile surfaces; pass items around or below the field, never across.",
      "Keep voices low and conversation clinical — minimize aerosol generation.",
      "If movement is required, do so deliberately — no abrupt actions near the field.",
    ],
    pitfalls: [
      "Casual conversation during the case — every word produces aerosol.",
      "Leaning across the field to read a monitor — establishes a contamination corridor.",
      "Personnel pacing in and out of the OR for unrelated tasks.",
    ],
    expertInsight: "Stillness is a sterile technique.",
    evidence: [
      {
        citation:
          "Stocks GW, et al. Predicting bacterial populations based on airborne particulates: a study performed in nonlaminar flow operating rooms during joint arthroplasty surgery. American Journal of Infection Control. 2010;38(3):199–204.",
      },
    ],
    relatedProtocols: ["or-traffic-control", "or-attire-standards", "sterile-field-maintenance"],
    relatedVideos: ["or-setup-walkthrough"],
  },
  {
    slug: "or-traffic-control",
    title: "OR Traffic Control",
    phase: "intraoperative",
    pathways: ["or-environment"],
    roles: ["prep-technician"],
    clinicalObjective:
      "Minimize airborne and contact contamination within the operating room by controlling personnel movement and door activity during surgery. OR traffic is a modifiable SSI risk factor that is frequently underestimated.",
    whyThisMatters:
      "Each door opening during a procedure displaces clean air and introduces particulates. Studies in human surgery have documented measurable increases in particulate count near the sterile field with each entry.",
    criticalControlPoints: [
      "OR doors closed throughout the procedure",
      "Single circulating nurse responsible for managing access",
      "Re-entry restrictions enforced for the duration of the case",
    ],
    steps: [
      "Limit OR occupancy to the minimum required for the procedure — count personnel before starting.",
      "Designate a circulating nurse responsible for managing access during the case.",
      "Keep OR doors closed throughout the procedure; each door opening displaces clean air and introduces particulates.",
      "Brief all team members before the procedure: no unnecessary movement, no exit-reentry without necessity.",
      "Track door openings during the case as a quality metric — review at debrief.",
      "Restrict observers and non-essential personnel.",
    ],
    pitfalls: [
      "Propping OR doors open between cases or during procedures — this fundamentally compromises positive pressure.",
      "Allowing non-essential students, observers, or staff to be present, particularly in small ORs.",
      "Failing to enforce re-entry restrictions: personnel who leave mid-case and return carry contamination back in.",
      "Performing OR cleaning cursorily between back-to-back cases.",
    ],
    expertInsight:
      "Fewer people, fewer doors, fewer infections.",
    evidence: [
      {
        citation:
          "Pryor F, et al. The effect of traffic patterns in the OR on surgical site infections. AORN Journal. 2010;91(6):762–794.",
        doi: "10.1016/j.aorn.2010.02.014",
      },
    ],
    relatedProtocols: ["or-environment-setup", "or-behavior-rules", "sterile-field-maintenance"],
    relatedVideos: ["or-setup-walkthrough"],
  },
  {
    slug: "draping-technique",
    title: "Draping Technique",
    phase: "intraoperative",
    pathways: ["surgical-field-isolation"],
    roles: ["surgeon", "scrub-technician"],
    clinicalObjective:
      "Correctly apply sterile surgical drapes to isolate the prepared surgical site from the patient's surrounding (non-sterile) body surfaces, equipment, and the environment. Proper draping is the final physical barrier between the prepared field and contamination.",
    whyThisMatters:
      "A single draping error can be traced directly to an SSI. Once placed, drapes are not moved — the rule is absolute.",
    criticalControlPoints: [
      "Prepared skin fully dry before any drape is applied",
      "Drapes are not repositioned once placed",
      "All non-sterile surfaces are covered, including anesthetic lines",
    ],
    steps: [
      "Confirm that the prepared skin surface is completely dry before applying drapes.",
      "Open drape packs using aseptic technique; hand sterile drapes to the scrubbed surgeon without contaminating the package interior.",
      "Apply fenestrated or towel drapes beginning at the prepared site and working outward.",
      "Secure drapes to patient with towel clamps at four cardinal points before applying the field drape.",
      "Ensure the drape fenestration (opening) is correctly aligned with the incision site and of adequate size.",
      "Do not reposition drapes once placed — repositioning disrupts the sterile barrier.",
      "Cover all non-sterile surfaces, including the anesthetic circuit lines and monitoring equipment attachments.",
    ],
    pitfalls: [
      "Repositioning drapes after placement to 'correct' the alignment — this drags contaminated surface under the sterile field.",
      "Using drapes with holes, tears, or moisture strike-through, which provide a pathway for microorganism migration.",
      "Insufficient drape extension — leaving non-sterile patient surfaces exposed near the field.",
      "Allowing drapes to contact the floor, which immediately compromises their sterile status.",
    ],
    expertInsight:
      "I have seen SSIs traced directly to a single draping error — a repositioned clamp that dragged non-prepped skin edge under the field. The rule that drapes, once placed, are not moved is absolute. If the alignment is wrong, the correct action is to add a supplementary drape, not to shift the original. Plan the placement before you commit; once the drape is on the patient, it stays.",
    evidence: [
      {
        citation:
          "Tanner J, et al. Surgical drapes for preventing surgical site infections. Cochrane Database of Systematic Reviews. 2015;7:CD006353.",
        doi: "10.1002/14651858.CD006353.pub4",
      },
    ],
    relatedProtocols: ["sterile-field-maintenance", "surgical-site-antisepsis", "contamination-event-response"],
    relatedVideos: ["draping-technique-demo"],
  },
  {
    slug: "sterile-field-maintenance",
    title: "Sterile Field Maintenance",
    phase: "intraoperative",
    pathways: ["surgical-field-isolation", "surgical-team"],
    roles: ["scrub-technician", "surgeon"],
    clinicalObjective:
      "Maintain an uncompromised sterile field throughout the procedure by establishing clear boundaries, enforcing behavioral discipline, and responding immediately to any breach. Sterile field failures are a primary cause of preventable intraoperative contamination.",
    whyThisMatters:
      "Sterile technique is fundamentally a culture issue, not a knowledge issue. Failures happen when small shortcuts become normalized.",
    criticalControlPoints: [
      "Sterile boundaries clearly defined before the case begins",
      "Visual control of all sterile instruments at all times",
      "Immediate verbal announcement of any contamination event",
    ],
    steps: [
      "Establish the sterile field only when the surgical team is present and prepared to proceed.",
      "Clearly define sterile boundaries: front of gown (chest to waist), gloved hands above waist.",
      "Open and transfer sterile items using aseptic non-touch technique — never reach across a sterile field.",
      "Maintain a 30 cm minimum distance between sterile and non-sterile personnel.",
      "Keep sterile instruments and materials within the visual field at all times.",
      "Verbally announce and immediately address any contamination event — no exceptions.",
      "Restrict movement in and out of the OR to essential personnel only during the procedure.",
    ],
    pitfalls: [
      "Turning away from or lowering hands below the sterile field — a lapse in visual control introduces contamination risk.",
      "Passing items across a sterile field rather than handing them around or below.",
      "Allowing non-scrubbed personnel to approach within the sterile zone.",
      "Delaying acknowledgment of a contamination event to 'not interrupt' the case.",
    ],
    expertInsight:
      "Sterile technique is fundamentally a culture issue, not a knowledge issue. Every surgeon knows the rules. The failures happen when the culture normalizes small shortcuts: hands momentarily dropping, a brief reach across the field, a contamination event that goes unmentioned. The standard must be that any contamination is named, out loud, immediately — with no blame and no delay. If your team cannot say 'contamination' without tension, that is the real problem to solve.",
    evidence: [
      {
        citation:
          "Fry DE. Surgical site infections and the microbiome: an updated perspective. Infection and Drug Resistance. 2019;12:3041–3054.",
        doi: "10.2147/IDR.S179887",
      },
      {
        citation:
          "Berríos-Torres SI, et al. Centers for Disease Control and Prevention Guideline for the Prevention of Surgical Site Infection 2017. JAMA Surgery. 2017;152(8):784–791.",
        doi: "10.1001/jamasurg.2017.0904",
      },
    ],
    relatedProtocols: ["draping-technique", "glove-change-protocol", "contamination-event-response"],
    relatedVideos: ["sterile-gowning-gloving"],
  },
  {
    slug: "glove-change-protocol",
    title: "Glove Change Protocol",
    phase: "intraoperative",
    pathways: ["surgical-team", "instruments-implants"],
    roles: ["surgeon", "scrub-technician"],
    clinicalObjective:
      "Define the moments at which surgical gloves must be changed during a procedure to maintain sterility, particularly before high-stakes events such as implant handling or following any contamination.",
    whyThisMatters:
      "Gloves accumulate microscopic contamination during a procedure even without visible breach. Strategic glove changes preserve sterility at the highest-risk moments.",
    criticalControlPoints: [
      "Outer glove change immediately before implant handling",
      "Glove change after any suspected contamination",
      "Glove change after extended manipulation or visible perforation",
    ],
    steps: [
      "Don two pairs of gloves at initial gowning for procedures involving implants.",
      "Change the outer glove immediately before handling any orthopedic implant.",
      "Change gloves after touching any non-sterile surface — no exceptions.",
      "Inspect gloves for visible perforations during the case; change if any defect is suspected.",
      "Use the closed or assisted glove-change technique to maintain sterile gown integrity.",
      "Announce glove changes to the team for awareness.",
    ],
    pitfalls: [
      "Skipping the pre-implant glove change to save time.",
      "Changing only one glove when both have been compromised.",
      "Using a contaminated technique (open gloving) mid-case without supervision.",
      "Failing to inspect for tears after a long instrument-handling phase.",
    ],
    expertInsight:
      "The glove change before the implant is non-negotiable. It is a 30-second intervention against a months-long infection.",
    evidence: [
      {
        citation:
          "Tanner J, Parkinson H. Double gloving to reduce surgical cross-infection. Cochrane Database of Systematic Reviews. 2006;3:CD003087.",
      },
    ],
    relatedProtocols: ["implant-handling", "sterile-field-maintenance", "hand-hygiene", "contamination-event-response"],
    relatedVideos: ["sterile-gowning-gloving"],
  },
  {
    slug: "instrument-sterility",
    title: "Instrument Sterility",
    phase: "intraoperative",
    pathways: ["instruments-implants"],
    roles: ["scrub-technician"],
    clinicalObjective:
      "Ensure all instruments used in surgery are properly decontaminated, packaged, sterilized, and maintained in sterile condition until the moment of use. Instrument-related contamination is one of the few SSI causes that is entirely preventable.",
    whyThisMatters:
      "Sterilization failure is underreported because it is rarely identified. The instrument looks sterile; the pack looks intact. Establishing rigorous, documented validation is foundational.",
    criticalControlPoints: [
      "Validated sterilization cycles with documented chemical and biological indicator results",
      "Pack integrity and expiry verified immediately before opening",
      "Instruments cleaned of all biological material before sterilization",
    ],
    steps: [
      "Decontaminate all soiled instruments immediately after use: manual scrubbing or ultrasonic cleaning.",
      "Inspect instruments for defects (bent tips, broken ratchets, compromised insulation) before packaging.",
      "Package in validated sterilization wrap or pouches appropriate to the sterilization method.",
      "Sterilize using validated autoclave cycles: 134°C for 3 minutes (pre-vacuum) or 121°C for 15 minutes (gravity).",
      "Confirm and document chemical indicator and biological indicator results.",
      "Store sterilized packs in clean, dry, closed storage away from contamination risk.",
      "Check pack integrity and expiry date immediately before opening for use.",
    ],
    pitfalls: [
      "Failing to clean instruments before sterilization — biological material protects organisms from steam penetration.",
      "Using chemical indicator results alone without periodic biological indicator validation.",
      "Stacking sterilization packs tightly in the autoclave chamber, preventing adequate steam circulation.",
      "Opening sterilized packs ahead of need and leaving them exposed in the prep room.",
    ],
    expertInsight:
      "Sterilization failure is underreported because it is rarely identified. The instrument looks sterile; the pack looks intact. The biological indicator test that would catch a failed cycle sits in a drawer, run monthly rather than weekly. Most sterilization audit programs in veterinary practice are insufficient by the standards of human surgical facilities. Establishing a culture of rigorous, documented sterilization validation is foundational — everything downstream depends on it.",
    evidence: [
      {
        citation:
          "AORN Guidelines for Perioperative Practice. Instrument Cleaning and Sterilization. Denver: AORN, Inc.; 2023.",
      },
      {
        citation:
          "McDonnell G, et al. Antiseptics and disinfectants: activity, action, and resistance. Clinical Microbiology Reviews. 1999;12(1):147–179.",
        doi: "10.1128/CMR.12.1.147",
      },
    ],
    relatedProtocols: ["implant-handling", "sterile-field-maintenance", "or-environment-setup"],
    relatedVideos: [],
  },
  {
    slug: "implant-handling",
    title: "Implant Handling Protocol",
    phase: "intraoperative",
    pathways: ["instruments-implants", "surgical-team"],
    roles: ["scrub-technician", "surgeon"],
    clinicalObjective:
      "To maintain sterility of orthopedic implants from packaging to implantation, minimizing the risk of introducing microorganisms that may lead to biofilm formation and surgical site infection.",
    whyThisMatters:
      "Implants provide an ideal surface for bacterial adhesion and biofilm formation. Even minimal contamination at the time of implantation may lead to persistent infection that is difficult to eradicate.",
    criticalControlPoints: [
      "Implants must remain sterile until the moment of use",
      "Outer gloves must be changed immediately before implant handling",
      "Implant contact with non-sterile surfaces must be avoided",
      "Exposure time to air must be minimized",
    ],
    steps: [
      {
        title: "Verify implant sterility",
        details: ["Confirm packaging integrity", "Check sterilization indicators"],
      },
      {
        title: "Maintain packaging until required",
        details: ["Do not open implants in advance", "Open only when ready for immediate use"],
      },
      {
        title: "Prepare for handling",
        details: [
          "Change outer gloves immediately before touching implant",
          "Ensure sterile field is intact",
        ],
      },
      {
        title: "Open implant using sterile technique",
        details: ["Minimize air disturbance", "Avoid contact with non-sterile surfaces"],
      },
      {
        title: "Handle implant",
        details: [
          "Use sterile instruments or forceps when possible",
          "Avoid unnecessary manipulation",
          "Do not allow contact with skin or drapes",
        ],
      },
      {
        title: "Implant immediately",
        details: ["Minimize time between opening and placement"],
      },
      {
        title: "Respond to contamination",
        details: [
          "If implant contacts non-sterile surface, discard",
          "Notify surgeon immediately",
          "Replace with new sterile implant",
        ],
      },
    ],
    pitfalls: [
      "Opening implants too early",
      "Failing to change gloves before handling",
      "Allowing implant to contact drapes or skin",
      "Prolonged exposure of implant to air",
      "Proceeding after suspected contamination",
    ],
    expertInsight:
      "Implant contamination is often silent and unrecognized. The safest implant is the one opened last, touched least, and placed immediately.",
    evidence: [
      { citation: "Implant contamination during surgery is well documented" },
      { citation: "Biofilm formation occurs rapidly on implant surfaces" },
      {
        citation:
          "Even low bacterial loads may lead to infection in orthopedic procedures",
      },
    ],
    relatedProtocols: [
      "instrument-sterility",
      "sterile-field-maintenance",
      "glove-change-protocol",
      "or-environment-setup",
    ],
    relatedVideos: [],
  },
  {
    slug: "contamination-event-response",
    title: "Contamination Event Response",
    phase: "intraoperative",
    pathways: ["surgical-team", "surgical-field-isolation", "instruments-implants"],
    roles: ["surgeon", "scrub-technician"],
    clinicalObjective:
      "Establish a clear, no-blame protocol for recognizing, announcing, and responding to any contamination event during surgery, ensuring that the response is immediate and complete.",
    whyThisMatters:
      "An unannounced contamination event is the most common preventable cause of intraoperative SSI exposure. The cultural norm of immediate, blameless announcement is the only mechanism that catches these events in time.",
    criticalControlPoints: [
      "Any team member can call 'contamination' without hierarchy",
      "Response is immediate and proportional to the breach",
      "All events documented in the surgical record",
    ],
    steps: [
      "Establish at the pre-case briefing that any team member may call a contamination event.",
      "If contamination is observed or suspected, announce it immediately and clearly.",
      "Pause the case at a safe point; assess the extent of the breach.",
      "Determine the appropriate response: glove change, instrument exchange, drape addition, or re-prep depending on scope.",
      "Resume the case only after the contamination has been fully addressed.",
      "Document the event, response, and any follow-up monitoring plan.",
    ],
    pitfalls: [
      "Delaying announcement to 'not interrupt' the case — the consequence is far greater than the interruption.",
      "Partial response (changing one glove when both contacted contamination).",
      "Allowing hierarchy to suppress junior team members from speaking.",
      "Failing to document the event and response.",
    ],
    expertInsight:
      "If your team cannot say 'contamination' aloud without tension, that is the real problem to solve.",
    evidence: [
      {
        citation:
          "Haynes AB, et al. A surgical safety checklist to reduce morbidity and mortality in a global population. New England Journal of Medicine. 2009;360(5):491–499.",
      },
    ],
    relatedProtocols: [
      "sterile-field-maintenance",
      "glove-change-protocol",
      "implant-handling",
      "draping-technique",
    ],
    relatedVideos: [],
  },
  {
    slug: "closure-technique",
    title: "Closure Technique",
    phase: "intraoperative",
    pathways: ["surgical-technique"],
    roles: ["surgeon"],
    clinicalObjective:
      "Close surgical wounds in a manner that eliminates dead space, restores tissue planes, supports mechanical stability, and minimizes the conditions in which contamination can establish infection.",
    whyThisMatters:
      "Surgical technique determines whether contamination becomes infection. Hematoma, seroma, dead space, and ischemic tissue are permissive environments for bacterial growth — even with perfect asepsis upstream.",
    criticalControlPoints: [
      "Tissue planes restored without tension",
      "Dead space eliminated or appropriately drained",
      "Hemostasis verified before each layer is closed",
      "Suture material and pattern matched to tissue type",
    ],
    steps: [
      "Verify hemostasis at every layer before advancing to the next.",
      "Eliminate dead space with appropriate suturing or drain placement.",
      "Choose suture material and gauge based on tissue type, holding strength, and absorption profile.",
      "Close in anatomic layers; avoid mass closure that compromises tissue perfusion.",
      "Use atraumatic technique — minimize tissue handling and avoid crushing forceps on tissues meant to heal.",
      "Inspect the closure for inversion, gaping, or tension before applying the final layer.",
    ],
    pitfalls: [
      "Closing under tension to 'make it fit' — ischemia and dehiscence follow.",
      "Leaving dead space in deep tissues without a drain.",
      "Excessive electrocautery, devitalizing tissue at the wound margin.",
      "Burying suture knots in poorly perfused tissue.",
    ],
    expertInsight:
      "Asepsis prevents contamination. Technique determines whether contamination can establish infection.",
    evidence: [
      {
        citation:
          "Boothe HW. Suture materials, tissue adhesives, staplers, and ligating clips. In: Tobias KM, Johnston SA, eds. Veterinary Surgery: Small Animal. Elsevier; 2018.",
      },
    ],
    relatedProtocols: ["wound-management", "incision-monitoring"],
    relatedVideos: [],
  },

  // ─── POSTOPERATIVE ───────────────────────────────────────────────────────────
  {
    slug: "wound-management",
    title: "Wound Management & Dressing",
    phase: "postoperative",
    pathways: ["postoperative-care"],
    roles: ["recovery-team"],
    clinicalObjective:
      "Apply appropriate wound closure, dressing, and bandage management to protect the surgical site during the early healing phase, minimize environmental contamination, support patient comfort, and enable regular reassessment.",
    whyThisMatters:
      "The first 24–48 hours are when the wound is most vulnerable. The dressing and bandage are the physical bridge between surgical closure and epithelial healing — they cannot be skipped or treated as optional.",
    criticalControlPoints: [
      "Sterile primary dressing applied before patient leaves the table",
      "Dressing changes scheduled and documented",
      "Bandage tension verified by the 2-finger rule",
      "Bony prominences padded before circumferential wraps",
    ],
    steps: [
      "Close the wound in layers, eliminating dead space that provides a nidus for infection.",
      "Irrigate the wound with sterile saline before closure in contaminated or clean-contaminated cases.",
      "Apply a sterile non-adherent primary dressing before the patient leaves the table.",
      "For wounds requiring bandaging: apply a secondary padded layer (cast padding, cotton roll) for cushioning and exudate absorption.",
      "Apply a tertiary conforming and cohesive layer with uniform pressure — verify with the 2-finger rule.",
      "Pad bony prominences (lateral malleolus, olecranon, calcaneus) before any circumferential wrap.",
      "Label the dressing with application date and time.",
      "Schedule bandage changes: 24–48h initially, then every 2–3 days for clean wounds; immediately if wet.",
      "Provide written wound care instructions to the owner before discharge.",
    ],
    pitfalls: [
      "Failing to close dead space — seromas are a common precursor to SSI.",
      "Applying adhesive dressings directly to fresh sutures without a non-adherent interface.",
      "Bandaging too tightly — pressure necrosis is a common iatrogenic injury, particularly over bony prominences.",
      "Failing to pad bony prominences before conforming wrap.",
      "Allowing the bandage to become wet and not changing it immediately.",
    ],
    expertInsight:
      "The bandage is part of the surgery. The most common bandage failure mode is tightness applied with good intention — a tight bandage feels more secure to the applicator but is the primary cause of bandage-related iatrogenic injury. Teach every technician the 2-finger rule until it is automatic.",
    evidence: [
      {
        citation:
          "Atiyeh BS, et al. Effect of moist and dry conditions on dermal repair. Journal of Trauma. 2002;52(6):1173–1180.",
        doi: "10.1097/00005373-200206000-00023",
      },
      {
        citation:
          "Campbell BG. Bandages and drains. In: Tobias KM, Johnston SA, eds. Veterinary Surgery: Small Animal. Elsevier Saunders; 2012:221–230.",
      },
    ],
    relatedProtocols: [
      "incision-monitoring",
      "patient-self-trauma-prevention",
      "owner-discharge-instructions",
    ],
    relatedVideos: [],
  },
  {
    slug: "incision-monitoring",
    title: "Incision Monitoring",
    phase: "postoperative",
    pathways: ["postoperative-care"],
    roles: ["recovery-team", "owner"],
    clinicalObjective:
      "Establish a structured postoperative monitoring protocol that enables early identification of signs consistent with surgical site infection, allowing timely intervention before superficial infection progresses to deep or organ-space disease.",
    whyThisMatters:
      "Early detection is the single most important determinant of outcomes in SSI management. A superficial SSI identified at day 3 is a minor setback; the same infection at day 10 may be deep-space or implant-associated.",
    criticalControlPoints: [
      "Wound assessed at every dressing change and recheck",
      "Five cardinal signs documented, not just observed",
      "Owner educated to recognize abnormal signs and contact the clinic",
    ],
    steps: [
      "Perform wound assessment at each bandage change and at every recheck appointment.",
      "Assess the five cardinal signs of local infection: erythema, edema, warmth, pain/tenderness, discharge.",
      "Record wound assessment findings in the patient record — subjective impressions without documentation are not clinically useful.",
      "Educate owners on normal vs. abnormal wound appearance before discharge, providing written reference materials.",
      "Establish a recheck schedule: day 2–3, day 10–14 (suture removal), with instructions to contact the clinic if concerns arise.",
      "Any purulent discharge, progressive swelling, or fever warrants prompt culture and sensitivity, not empiric antibiotic therapy alone.",
      "For deep infections: do not rely on surface appearance alone — imaging (ultrasound) may be required to identify fluid accumulations.",
    ],
    pitfalls: [
      "Failing to establish a structured recheck protocol and relying on clients to self-identify problems.",
      "Starting empiric broad-spectrum antibiotics at the first sign of inflammation without culture and sensitivity.",
      "Misinterpreting normal post-surgical inflammation (expected in first 3–5 days) as infection.",
      "Discharging patients without explicit written guidance on warning signs that require immediate contact.",
    ],
    expertInsight:
      "Early detection is the single most important determinant of outcomes in SSI management. A superficial SSI identified at day 3 that is opened, lavaged, and managed appropriately is a minor setback. The same infection at day 10, treated with repeated oral antibiotics, is a wound dehiscence with implant contamination or a deep space infection. The monitoring protocol is the bridge between surgery and resolution — it must be treated as part of the procedure, not an afterthought.",
    evidence: [
      {
        citation:
          "Eugster S, et al. A prospective study of postoperative infections in dogs and cats. Veterinary Surgery. 2004;33(5):542–550.",
        doi: "10.1111/j.1532-950X.2004.04076.x",
      },
      {
        citation:
          "Horan TC, et al. CDC definitions of nosocomial surgical site infections, 1992. Infection Control and Hospital Epidemiology. 1992;13(10):606–608.",
        doi: "10.1086/646354",
      },
    ],
    relatedProtocols: [
      "wound-management",
      "patient-self-trauma-prevention",
      "owner-discharge-instructions",
      "postoperative-antibiotic-decisions",
    ],
    relatedVideos: [],
  },
  {
    slug: "patient-self-trauma-prevention",
    title: "Patient Self-Trauma Prevention",
    phase: "postoperative",
    pathways: ["postoperative-care"],
    roles: ["recovery-team", "owner"],
    clinicalObjective:
      "Prevent the patient from licking, chewing, scratching, or otherwise contacting the surgical incision during the early postoperative period when the wound is most vulnerable.",
    whyThisMatters:
      "Patient-induced trauma to the incision is one of the most common postoperative SSI causes. The intervention is mechanical and entirely preventable.",
    criticalControlPoints: [
      "E-collar fitted before recovery and verified before discharge",
      "Owner instructed on continuous use until suture removal or epithelialization",
      "Alternative restraint considered if the E-collar is poorly tolerated",
    ],
    steps: [
      "Fit an Elizabethan collar (or equivalent recovery suit / inflatable collar) before the patient awakens fully from anesthesia.",
      "Verify that the E-collar extends well beyond the patient's nose so the incision cannot be reached.",
      "Demonstrate fit and use to the owner before discharge; have the owner replicate the demonstration.",
      "Provide written instructions: continuous wear day and night, including during meals and rest.",
      "Schedule a phone or photo check at 48–72 hours to confirm compliance.",
      "Address poor tolerance with alternative options (recovery suit, inflatable collar) rather than removing protection.",
    ],
    pitfalls: [
      "Removing the E-collar 'just for meals' — most contamination occurs in unwitnessed moments.",
      "Choosing an undersized collar that the patient can reach around or under.",
      "Discharging without verifying owner understanding of continuous use.",
      "Stopping E-collar use before sutures are removed and the wound is epithelialized.",
    ],
    expertInsight:
      "The collar is not optional. The incision does not heal on a schedule — it heals when it is undisturbed.",
    evidence: [
      {
        citation:
          "Nicholson M, et al. Risk factors for surgical site infection in veterinary patients. Veterinary Surgery. 2002;31(3):228–233.",
        doi: "10.1053/jvet.2002.31617",
      },
    ],
    relatedProtocols: ["wound-management", "incision-monitoring", "owner-discharge-instructions"],
    relatedVideos: [],
  },
  {
    slug: "owner-discharge-instructions",
    title: "Owner Discharge Instructions",
    phase: "postoperative",
    pathways: ["postoperative-care"],
    roles: ["surgeon", "recovery-team", "owner"],
    clinicalObjective:
      "Provide owners with clear, written, and verbal instructions that enable them to protect the surgical site, comply with medications, recognize early signs of infection, and contact the clinic appropriately.",
    whyThisMatters:
      "After discharge, the owner is the primary observer and the final control point. Discharge instruction quality directly correlates with postoperative outcome.",
    criticalControlPoints: [
      "Written instructions provided in addition to verbal",
      "Activity restriction explicitly defined with concrete examples",
      "Specific signs that require contact listed",
      "Direct after-hours contact information included",
    ],
    steps: [
      "Prepare a written discharge sheet specific to the procedure performed.",
      "Cover incision protection (E-collar use, no licking, no bathing).",
      "Define activity restriction with concrete examples (no jumping, no off-leash, no rough play) and the duration.",
      "List specific medications, doses, schedule, and expected duration.",
      "Identify signs that require contact: redness, swelling, discharge, lethargy, refusal to eat, fever, or any concern.",
      "Provide a callback or photo-share option at 48–72 hours and at suture removal.",
    ],
    pitfalls: [
      "Verbal-only instructions — owners do not retain detailed discharge information under stress.",
      "Vague language ('limit activity', 'watch the incision') without concrete examples.",
      "Not providing a path to contact the clinic when concerned.",
      "Failing to establish a follow-up checkpoint.",
    ],
    expertInsight:
      "If the owner does not know what 'too much activity' means, you have not given the instruction yet.",
    evidence: [
      {
        citation:
          "Berríos-Torres SI, et al. CDC Guideline for the Prevention of Surgical Site Infection 2017. JAMA Surgery. 2017;152(8):784–791.",
        doi: "10.1001/jamasurg.2017.0904",
      },
    ],
    relatedProtocols: [
      "incision-monitoring",
      "patient-self-trauma-prevention",
      "wound-management",
      "postoperative-antibiotic-decisions",
    ],
    relatedVideos: [],
  },
  {
    slug: "postoperative-antibiotic-decisions",
    title: "Postoperative Antibiotic Decisions",
    phase: "postoperative",
    pathways: ["postoperative-care", "intraoperative-adjuncts"],
    roles: ["surgeon"],
    clinicalObjective:
      "Apply evidence-based criteria to antibiotic prescribing decisions in the postoperative period, ensuring that antimicrobials are used when genuinely indicated, at the correct dose and duration, and that antimicrobial resistance implications are considered for every prescription.",
    whyThisMatters:
      "Antimicrobial stewardship in veterinary surgical aftercare is one of the most important and least practiced disciplines in the field. Reflexive antibiotics for normal post-surgical inflammation are training resistant bacteria and failing patients simultaneously.",
    criticalControlPoints: [
      "Indication for antibiotics confirmed before prescribing",
      "Culture and sensitivity obtained before initiating therapy where feasible",
      "Treatment duration defined at the time of prescription",
      "Reassessment at 48–72 hours to de-escalate or discontinue",
    ],
    steps: [
      "Confirm the clinical indication for antibiotics: documented infection (culture and sensitivity), high-risk contaminated wound, or evidence-based prophylaxis criteria.",
      "Obtain wound culture and sensitivity before initiating antimicrobial therapy whenever possible.",
      "Select the narrowest-spectrum agent that covers the likely or confirmed organisms.",
      "Define the expected treatment duration at the time of prescribing — open-ended prescriptions are stewardship failures.",
      "Reassess the patient at the 48–72 hour mark: de-escalate to a narrower agent if culture results permit.",
      "Discontinue antibiotics when the infection has resolved — do not complete a fixed course if clinical resolution is evident earlier.",
      "Document antimicrobial use, indication, duration, and outcome in the medical record for audit purposes.",
    ],
    pitfalls: [
      "Prescribing antibiotics for normal post-surgical inflammation that has not met the criteria for infection.",
      "Using combination broad-spectrum regimens for simple skin/soft-tissue infections without culture justification.",
      "Reflexively renewing antibiotic courses without reassessment when clients report 'it doesn't seem better yet.'",
      "Failing to obtain culture and sensitivity before beginning antibiotics, then having no microbiological data to guide adjustments.",
    ],
    expertInsight:
      "Antimicrobial stewardship in veterinary surgical aftercare is one of the most important and least practiced disciplines in the field. The cultural default is to 'give antibiotics' when a wound looks even mildly concerned, without culture, without diagnosis. We are training resistant bacteria and failing our patients simultaneously. The ask is simple: before you prescribe, confirm the indication. Before you renew, reassess the patient. Culture first, treat second.",
    evidence: [
      {
        citation:
          "Weese JS. A review of post-operative infections in veterinary orthopaedic surgery. Veterinary and Comparative Orthopaedics and Traumatology. 2008;21(2):99–105.",
        doi: "10.3415/VCOT-06-11-0093",
      },
      {
        citation:
          "Guardabassi L, et al. Optimization of antimicrobial treatment to minimize resistance selection. Veterinary Microbiology. 2010;141(1–2):9–16.",
        doi: "10.1016/j.vetmic.2009.12.018",
      },
      {
        citation:
          "Hillier A, et al. Guidelines for the diagnosis and antimicrobial therapy of canine superficial bacterial folliculitis. Veterinary Dermatology. 2014;25(3):163-e43.",
        doi: "10.1111/vde.12118",
      },
    ],
    relatedProtocols: ["incision-monitoring", "antimicrobial-prophylaxis"],
    relatedVideos: [],
  },

  // ─── SECTION 3 — PRE-CASE PLANNING ──────────────────────────────────────────
  {
    slug: "case-risk-stratification",
    title: "Case Risk Stratification",
    phase: "pre-case-planning",
    pathways: ["patient", "surgical-team"],
    roles: ["surgeon"],
    clinicalObjective:
      "Classify each case into a standardised infection risk tier before the patient enters the OR. The tier determines the level of intraoperative and perioperative infection prevention applied — from standard precautions through to full enhanced protocol with mandatory lavage and post-operative monitoring.",
    whyThisMatters:
      "Patient and procedural risk factors for surgical site infection are identifiable before incision. Early stratification enables proportional planning — including antimicrobial prophylaxis, intraoperative lavage, postoperative monitoring, and client communication. Cases that go unclassified default to standard precautions, which may be insufficient for the actual risk present.",
    criticalControlPoints: [
      "Tier assigned at case planning stage — not the morning of surgery",
      "Assigned tier documented in the surgical record",
      "Tier confirmed aloud at the pre-case briefing",
      "Tier reviewed and updated if new clinical information emerges at prep or clip",
    ],
    steps: [
      "Review patient history and planned procedure during case scheduling or day-prior review.",
      "Complete the risk factor checklist — every case, every time. Stratification must be routine, not reserved for suspected high-risk cases.",
      "Count the factors present and apply the tier assignment criteria.",
      "Record the assigned tier in the surgical plan.",
      "Communicate the tier to the full surgical team at pre-case briefing so that each team member understands the level of infection prevention required.",
      "If new clinical findings emerge at clip or prep, reassess and reassign the tier before proceeding.",
    ],
    pitfalls: [
      "Applying a risk tier only when infection risk is already suspected — stratification must be routine for every case, not a reactive step.",
      "Not reassigning the tier when new findings emerge at patient prep.",
      "Failing to communicate the assigned tier to the entire team before the case begins.",
    ],
    expertInsight:
      "The checklist is not the goal. The goal is a surgical team that walks into the OR knowing this case requires more — and has already prepared for it.",
    evidence: [
      {
        citation:
          "Nicholson M, et al. Risk factors for surgical site infection in veterinary patients. Veterinary Surgery. 2002;31(3):228–233.",
        doi: "10.1053/jvet.2002.31617",
      },
      {
        citation:
          "Turk R, et al. Identification of risk factors for surgical site infection in small animal surgery. Veterinary Surgery. 2015;44(8):915–921.",
        doi: "10.1111/vsu.12375",
      },
    ],
    relatedProtocols: [
      "preoperative-patient-screening",
      "procedure-specific-planning",
      "antimicrobial-prophylaxis-plan",
      "sterility-readiness-check",
      "patient-risk-stratification",
      "antimicrobial-prophylaxis",
    ],
    relatedVideos: [],
    middleBlock: {
      type: "risk-tier",
      sectionTitle: "Risk Factor Checklist",
      intro: "Complete during case planning. Each factor present increases infection risk and contributes to the tier assignment.",
      patientFactors: [
        { label: "Obese patient (BCS ≥ 8/9)" },
        { label: "Endocrinopathy (HAC, DM, hypothyroidism)" },
        { label: "Active immunosuppression" },
        { label: "Active skin disease or dermatitis" },
        { label: "Wound or lick dermatitis near surgical region" },
        { label: "Prior MRSP or resistant organism infection" },
        { label: "Prior infection at this surgical site" },
        { label: "Prolonged hospitalisation (>48h pre-op)" },
      ],
      proceduralFactors: [
        { label: "Revision surgery" },
        { label: "Implant-heavy procedure" },
        { label: "Expected operative duration > 90 minutes" },
        { label: "Emergency or semi-urgent case" },
      ],
      tiers: [
        {
          level: "standard",
          criteria: "0 factors present",
          action: "Standard infection prevention protocol",
        },
        {
          level: "elevated",
          criteria: "1–2 factors present",
          action:
            "Heightened prophylaxis timing, sterile field discipline, wound lavage. Enhanced post-op monitoring.",
        },
        {
          level: "high",
          criteria:
            "3+ factors, OR any single high-weight factor (revision surgery, prior infection, active immunosuppression, resistant organism history)",
          action:
            "Full infection prevention protocol. Antiseptic lavage indicated. Post-op monitoring plan required. Consider pre-op client communication.",
        },
      ],
    },
  },
  {
    slug: "preoperative-patient-screening",
    title: "Preoperative Patient Screening",
    phase: "pre-case-planning",
    pathways: ["patient", "surgical-team"],
    roles: ["surgeon"],
    clinicalObjective:
      "Confirm that each patient is an appropriate candidate for elective surgery on the day of the procedure, and identify any patient-level factors that require a modified infection prevention approach before the case proceeds.",
    whyThisMatters:
      "Proceeding with elective surgery in a patient with active infection elsewhere, compromised skin integrity near the surgical site, or an unrecognised history of resistant organisms significantly elevates SSI risk. These are identifiable factors — but only if they are systematically looked for. A patient who passed screening at scheduling may present differently on the day of surgery. This protocol is the last checkpoint before incision becomes the point of no return.",
    criticalControlPoints: [
      "Screening completed on the day of surgery — not only at scheduling",
      "Any finding that prompts deferral is documented and communicated to the client",
      "Risk tier from Case Risk Stratification is updated if new findings emerge",
      "Suitability decision made by the surgeon — not delegated",
    ],
    steps: [
      "Review the patient's history and any new clinical notes on the day of surgery.",
      "Complete physical inspection: skin, coat, and the planned surgical region. Note any lesions, wounds, or dermatitis.",
      "Confirm there is no active infection at any site — ears, mouth, urinary tract, chronic wound sites.",
      "Review prior microbiology records for MRSP or resistant organism history. Adjust prophylaxis plan if applicable.",
      "Apply action thresholds from the screening table: proceed, modify plan, or defer.",
      "Surgeon confirms suitability. If proceeding, update risk tier if any new findings have emerged.",
      "Document all screening findings and the final suitability decision in the surgical record.",
    ],
    pitfalls: [
      "Relying solely on the scheduling assessment — patients can develop new findings between booking and surgery day.",
      "Delegating the suitability decision to nursing or technician staff.",
      "Proceeding with elective surgery when active infection is present elsewhere in the body.",
      "Failing to update the risk tier when new screening findings emerge on the day of surgery.",
    ],
    expertInsight:
      "A patient who should not have surgery today is not a scheduling problem — it is a patient safety decision. The surgeon who proceeds despite a screening finding owns what follows. The surgeon who defers protects the patient and the outcome.",
    evidence: [
      {
        citation:
          "Nicholson M, et al. Risk factors for surgical site infection in veterinary patients. Veterinary Surgery. 2002;31(3):228–233.",
        doi: "10.1053/jvet.2002.31617",
      },
      {
        citation:
          "Eugster S, et al. A prospective study of postoperative infections in dogs and cats. Veterinary Surgery. 2004;33(5):542–550.",
        doi: "10.1111/j.1532-950X.2004.04076.x",
      },
    ],
    relatedProtocols: [
      "case-risk-stratification",
      "procedure-specific-planning",
      "antimicrobial-prophylaxis-plan",
      "sterility-readiness-check",
      "patient-risk-stratification",
    ],
    relatedVideos: [],
    middleBlock: {
      type: "screening-table",
      sectionTitle: "Screening Assessment",
      intro:
        "Each domain below carries a specific action threshold. Assess all five before proceeding.",
      domains: [
        {
          domain: "Dermatologic",
          rows: [
            { finding: "Skin intact, no active lesions near surgical region", action: "proceed" },
            {
              finding: "Mild dermatitis distant from surgical site",
              action: "modify",
              actionLabel: "Modify plan — elevate risk tier",
            },
            {
              finding: "Active skin infection or lesion near surgical region",
              action: "defer",
            },
          ],
        },
        {
          domain: "Active infection elsewhere",
          rows: [
            { finding: "No signs of active infection at any site", action: "proceed" },
            {
              finding: "Active infection confirmed at any site",
              action: "defer",
              actionLabel: "Defer — treat and reassess",
            },
          ],
        },
        {
          domain: "Wounds / lick dermatitis",
          rows: [
            { finding: "No wounds or lick lesions near surgical region", action: "proceed" },
            {
              finding: "Lick dermatitis or wound near surgical region",
              action: "modify",
              actionLabel: "Modify plan — elevate risk tier",
            },
          ],
        },
        {
          domain: "Resistant organism history",
          rows: [
            { finding: "No prior MRSP or resistant infection", action: "proceed" },
            {
              finding: "Prior MRSP or resistant infection confirmed",
              action: "modify",
              actionLabel: "Modify plan — assign High risk tier, adjust prophylaxis",
            },
          ],
        },
        {
          domain: "Suitability for elective surgery today",
          rows: [
            { finding: "All domains clear, patient stable", action: "proceed" },
            {
              finding: "One or more findings requiring action",
              action: "defer",
              actionLabel: "Defer or modify — surgeon decision required",
            },
          ],
        },
      ],
      dayOfTitle: "Day-of-Surgery Screening Checklist",
      dayOfItems: [
        {
          label: "Dermatologic assessment completed",
          note: "Skin inspected at and around the planned surgical region. No active lesions or infection present.",
        },
        {
          label: "No active infection identified elsewhere",
          note: "Ears, mouth, urinary tract, and any known chronic sites reviewed. No active infection confirmed.",
        },
        {
          label: "No wounds or lick dermatitis near surgical region",
          note: "Physical inspection completed. If present, risk tier updated and plan modified.",
        },
        {
          label: "Resistant organism history reviewed",
          note: "Prior MRSP or resistant infection history confirmed or ruled out. Prophylaxis plan adjusted if applicable.",
        },
        {
          label: "Surgeon confirms patient suitable for elective surgery today",
          note: "Final go/no-go decision made by surgeon based on all screening findings.",
        },
      ],
    },
  },
  {
    slug: "procedure-specific-planning",
    title: "Procedure-Specific Planning",
    phase: "pre-case-planning",
    pathways: ["instruments-implants", "surgical-team", "intraoperative-adjuncts"],
    roles: ["surgeon", "scrub-technician"],
    clinicalObjective:
      "Confirm that all case-specific materials, resources, and logistical decisions are in place before the patient enters the OR — so that nothing required intraoperatively is sourced under pressure or improvised in conditions that compromise sterile technique.",
    whyThisMatters:
      "Improvisation during surgery is a contamination risk. Rushing to locate a missing implant size, sourcing a last-minute wound dressing, or discovering lavage materials are not stocked forces decisions under time pressure and increases the likelihood of breaks in sterile technique. Procedure-specific planning eliminates these scenarios before they occur. Each element of this checklist exists because its absence has, in practice, forced a compromise during a case.",
    criticalControlPoints: [
      "Planning completed the day prior — not on the morning of surgery",
      "Surgeon and scrub technician both confirm readiness before the case begins",
      "Any missing item identified here triggers a supply resolution — not an intraoperative workaround",
      "Lavage materials confirmed as part of routine planning — not reserved for high-risk cases only",
    ],
    steps: [
      "Review the procedure plan the day prior. Confirm implant set selection based on patient size, anatomy, and surgical approach.",
      "Identify a backup implant plan. Document the alternative construct or size range.",
      "Estimate expected operative duration. Flag cases projected beyond 90 minutes for elevated risk tier review and redosing planning.",
      "Confirm imaging availability. Preload preoperative radiographs; confirm fluoroscopy if indicated.",
      "Confirm lavage materials are stocked for this case. Do not assume availability — verify.",
      "Select wound dressing appropriate to procedure type, location, and patient risk tier.",
      "Confirm postoperative protection strategy. Ensure client communication is planned before discharge.",
      "Surgeon and scrub technician jointly confirm readiness at the pre-case briefing.",
    ],
    pitfalls: [
      "No backup implant plan — a single missing size becomes an intraoperative crisis that forces a sterility compromise.",
      "Lavage materials treated as optional or sourced on the day of surgery rather than planned in advance.",
      "Wound dressing selected intraoperatively rather than planned based on the procedure type and risk tier.",
      "Postoperative protection not communicated to the client until discharge — too late for effective preparation.",
    ],
    expertInsight:
      "Every intraoperative problem that forces a workaround was, at some earlier point, a planning omission. The checklist does not add time to surgical preparation — it eliminates the scramble that costs far more time, and far more risk, when it happens inside the OR.",
    evidence: [
      {
        citation:
          "Nelson LL. Surgical site infections in small animal surgery. Veterinary Clinics of North America: Small Animal Practice. 2011;41(5):1041–1056.",
        doi: "10.1016/j.cvsm.2011.05.010",
      },
      {
        citation:
          "Mangram AJ, et al. Guideline for prevention of surgical site infection. Infection Control and Hospital Epidemiology. 1999;20(4):250–278.",
        doi: "10.1086/501620",
      },
    ],
    relatedProtocols: [
      "case-risk-stratification",
      "preoperative-patient-screening",
      "antimicrobial-prophylaxis-plan",
      "sterility-readiness-check",
      "implant-handling",
      "antimicrobial-prophylaxis",
    ],
    relatedVideos: [],
    middleBlock: {
      type: "planning-checklist",
      sectionTitle: "Planning Checklist",
      intro: "Complete for every case the day prior. Flag any unresolved items before proceeding.",
      groups: [
        {
          header: "Implants & Equipment",
          items: [
            {
              label: "Implant set selected and confirmed",
              note: "Correct system, size range, and configuration verified for this patient and procedure.",
            },
            {
              label: "Backup implant plan established",
              note: "Alternative size or construct identified in the event of intraoperative adjustment.",
            },
            {
              label: "Imaging available in OR",
              note: "Preoperative images loaded and accessible. Fluoroscopy availability confirmed if required.",
            },
          ],
        },
        {
          header: "Infection Prevention Materials",
          items: [
            {
              label: "Lavage materials stocked and ready",
              note: "Antiseptic lavage confirmed available for this case — not to be sourced intraoperatively.",
            },
            {
              label: "Wound dressing plan confirmed",
              note: "Dressing type and materials selected based on wound type, location, and patient risk tier.",
            },
            {
              label: "Postoperative protection plan in place",
              note: "Bandaging, buster collar, or physical restriction strategy confirmed. Client communication planned.",
            },
          ],
        },
      ],
      parametersTitle: "Case Parameters",
      parametersIntro:
        "Record the following before the case begins. These inform intraoperative decisions including prophylaxis redosing.",
      parameters: [
        { label: "Expected operative duration", placeholder: "e.g. 90–120 minutes" },
        { label: "Implant system", placeholder: "e.g. TPLO plate, LCP system" },
        { label: "Backup implant / construct", placeholder: "e.g. Alternative plate size or system" },
        { label: "Wound dressing selected", placeholder: "e.g. Non-adherent primary + padded secondary" },
        {
          label: "Postoperative protection plan",
          placeholder: "e.g. Buster collar + exercise restriction 8 weeks",
        },
      ],
    },
  },
  {
    slug: "antimicrobial-prophylaxis-plan",
    title: "Antimicrobial Prophylaxis Plan",
    phase: "pre-case-planning",
    pathways: ["intraoperative-adjuncts", "surgical-team"],
    roles: ["surgeon", "anesthetist"],
    clinicalObjective:
      "Establish and document the complete antimicrobial prophylaxis plan for each case before surgery begins — including drug selection, dose, timing, redosing interval, and the individual responsible for confirming administration.",
    whyThisMatters:
      "The protective effect of perioperative antimicrobial prophylaxis is highly dependent on timing. Tissue drug concentrations must be adequate at the moment of incision. Administration that is delayed, underdosed, or not redosed in long procedures provides substantially reduced protection. A plan that is undocumented is a plan that can be forgotten, assumed, or duplicated. This protocol ensures that prophylaxis decisions are made once, clearly, and confirmed by a named individual — not improvised at induction.",
    criticalControlPoints: [
      "Drug, dose, and timing decided during preoperative planning — not at induction",
      "Administration timed to achieve adequate tissue concentration at incision",
      "Redosing interval planned prospectively for all cases expected to exceed drug half-life",
      "A named individual is responsible for confirming administration before incision",
    ],
    steps: [
      "Select drug based on expected flora for the procedure type, site, and patient history. Adjust for known resistant organism history.",
      "Calculate dose based on current patient weight. Document in the surgical plan.",
      "Set timing target: administration 30–60 minutes before incision. Communicate to the anaesthesiologist.",
      "Determine redosing interval based on the drug's half-life and estimated operative duration. Plan prospectively — do not wait until the case runs long.",
      "Name the individual responsible for confirming administration. This must be explicit — shared responsibility defaults to no responsibility.",
      "At the pre-incision briefing, confirm administration time aloud. Confirm redose trigger time is known.",
      "Document all parameters and the confirmed administration time in the anaesthetic and surgical record.",
    ],
    pitfalls: [
      "Administration timed to induction rather than incision — these may be separated by 30+ minutes in complex case setups.",
      "No one explicitly named to confirm administration — assumed to have been done without verification.",
      "Redosing interval not planned for long procedures — first dose protection lapses intraoperatively.",
      "Drug or dose adjusted without surgeon notification.",
    ],
    expertInsight:
      "Antimicrobial prophylaxis is not effective when it is given — it is effective when it is given at the right time, in the right amount, by someone who knows their role. A plan written down and confirmed aloud is the only version of this protocol that works.",
    evidence: [
      {
        citation:
          "Nelson LL. Surgical site infections in small animal surgery. Veterinary Clinics of North America: Small Animal Practice. 2011;41(5):1041–1056.",
        doi: "10.1016/j.cvsm.2011.05.010",
      },
      {
        citation:
          "Weese JS, et al. Antimicrobial use guidelines for treatment of urinary tract disease in dogs and cats. Veterinary Medicine International. 2011;2011:263768.",
        doi: "10.4061/2011/263768",
      },
    ],
    relatedProtocols: [
      "case-risk-stratification",
      "preoperative-patient-screening",
      "procedure-specific-planning",
      "sterility-readiness-check",
      "antimicrobial-prophylaxis",
      "anesthesia-vascular-access-control",
    ],
    relatedVideos: [],
    middleBlock: {
      type: "prophylaxis-plan",
      sectionTitle: "Prophylaxis Parameters",
      intro:
        "Complete for every case. All five parameters must be documented before the case proceeds.",
      planTitle: "Case Prophylaxis Plan",
      parameters: [
        { label: "Drug selected", placeholder: "e.g. Cefazolin" },
        { label: "Dose", placeholder: "e.g. 22 mg/kg IV" },
        { label: "Timing target", placeholder: "e.g. 30–60 min before incision" },
        {
          label: "Redosing interval",
          placeholder: "e.g. Every 90 min if procedure exceeds 2 hrs",
        },
        {
          label: "Confirms administration",
          placeholder: "e.g. Anaesthesiologist — confirms before incision call",
        },
      ],
      confirmationTitle: "Pre-Incision Confirmation Checklist",
      confirmationItems: [
        {
          label: "Drug and dose confirmed as planned",
          note: "No substitution or dose adjustment made without surgeon awareness.",
        },
        {
          label: "Administration time recorded",
          note: "Time noted to allow accurate calculation of redosing interval.",
        },
        {
          label: "Timing window confirmed — within 30–60 min of incision",
          note: "If administration is outside the window, surgeon is notified before proceeding.",
        },
        {
          label: "Redosing plan confirmed if operative duration exceeds drug half-life",
          note: "Anaesthesiologist or circulating nurse aware of trigger time for redose.",
        },
        {
          label: "Responsible individual named and confirmed",
          note: "One person explicitly accountable for tracking administration and redosing.",
        },
      ],
    },
  },
  {
    slug: "sterility-readiness-check",
    title: "Sterility Readiness Check",
    phase: "pre-case-planning",
    pathways: ["instruments-implants", "surgical-team"],
    roles: ["scrub-technician", "surgeon"],
    clinicalObjective:
      "Verify that all instruments, implants, and sterilisation indicators are confirmed ready before the patient enters the OR — eliminating the conditions that lead to convenience-based immediate-use steam sterilisation (IUSS) and unverified sterility.",
    whyThisMatters:
      "Sterilisation failure is a silent contamination pathway. Unlike a dropped instrument or a glove breach, compromised sterility is not visible at the time it occurs. If instruments are assumed sterile without verified indicators, or if implant pack integrity is not confirmed before opening, the contamination event happens before the case begins. IUSS used as a routine workaround for inadequate inventory is a documented risk factor for surgical site infection — it bypasses the verification steps that exist to catch sterilisation failures.",
    criticalControlPoints: [
      "All sterilisation indicators verified before the case is cleared to proceed",
      "IUSS used only for genuine emergencies — never as a workaround for inventory gaps",
      "Implant pack integrity confirmed visually before opening",
      "Any failed indicator or damaged pack treated as non-sterile — no exceptions",
    ],
    steps: [
      "Scrub technician confirms all instrument trays are present and assigned to this case.",
      "Inspect all sterilisation indicators — chemical and biological. Any failed indicator means the tray is non-sterile. Do not proceed with that tray.",
      "Confirm no IUSS is planned for routine inventory gaps. If IUSS is required, verify it is a genuine emergency and document the reason.",
      "Confirm all implant packs for this case are present and unopened.",
      "Inspect each implant pack visually: seals intact, no tears, no moisture exposure, expiry date valid.",
      "Verify sterilisation indicators on implant packaging.",
      "Surgeon and scrub technician confirm readiness aloud at the pre-case briefing. Any unresolved Fail is addressed before the patient enters the OR.",
    ],
    pitfalls: [
      "Assuming indicators have been checked because the tray was prepared — check them yourself, at the time of use.",
      "Opening a pack with a compromised seal and proceeding under time pressure.",
      "Using IUSS habitually to compensate for understocked instrument sets — this normalises a known infection risk.",
      "Not confirming implant pack integrity until the scrub technician opens them at the field — too late for safe substitution.",
    ],
    expertInsight:
      "Sterilisation verification is not bureaucracy. It is the last line of defence against introducing a contaminated instrument or implant into a sterile field. A failed indicator that is caught before the case is a near miss. A failed indicator that is ignored — or never checked — is an exposure event.",
    evidence: [
      {
        citation:
          "AORN Guidelines for Perioperative Practice. Instrument Cleaning and Sterilization. Denver: AORN, Inc.; 2023.",
      },
      {
        citation:
          "McDonnell G, et al. Antiseptics and disinfectants: activity, action, and resistance. Clinical Microbiology Reviews. 1999;12(1):147–179.",
        doi: "10.1128/CMR.12.1.147",
      },
    ],
    relatedProtocols: [
      "case-risk-stratification",
      "preoperative-patient-screening",
      "procedure-specific-planning",
      "antimicrobial-prophylaxis-plan",
      "instrument-sterility",
      "implant-handling",
    ],
    relatedVideos: [],
    middleBlock: {
      type: "gonogo",
      sectionTitle: "Readiness Status",
      intro: "Mark each item Pass or Fail. Any Fail blocks the case until resolved.",
      groups: [
        {
          header: "Instruments",
          items: [
            {
              label: "All required instruments are available",
              note: "Full set confirmed. No instruments borrowed from another tray or sourced ad hoc.",
            },
            {
              label: "Sterilisation indicators confirmed — all passed",
              note: "Chemical and biological indicators reviewed. Any failed indicator = tray is non-sterile.",
            },
            {
              label: "No convenience IUSS required or planned",
              note: "If IUSS is needed, confirm genuine emergency — not an inventory gap. Document reason.",
            },
          ],
        },
        {
          header: "Implants",
          items: [
            {
              label: "All implant packs present and accounted for",
              note: "Correct system, sizes, and configuration confirmed against the procedure plan.",
            },
            {
              label: "Pack integrity visually confirmed — seals intact, no damage",
              note: "Any torn, wet, or compromised pack is treated as non-sterile and replaced before opening.",
            },
            {
              label: "Implant sterilisation indicators verified",
              note: "Indicators on implant packaging checked and confirmed passed.",
            },
          ],
        },
      ],
      warning: {
        label: "IUSS Policy",
        text: "Immediate-use steam sterilisation must not substitute for adequate instrument inventory. When IUSS is used, the reason must be documented as a genuine emergency. Repeated IUSS events indicate an inventory or scheduling problem that must be resolved — not normalised.",
      },
    },
  },
];

export function getProtocolBySlug(slug: string): Protocol | undefined {
  return protocols.find((p) => p.slug === slug);
}

export function getProtocolsByPhase(phase: Protocol["phase"]): Protocol[] {
  return protocols.filter((p) => p.phase === phase);
}

export function getProtocolsByPathway(pathwaySlug: string): Protocol[] {
  return protocols.filter((p) => p.pathways.includes(pathwaySlug));
}

export function getProtocolsByRole(roleSlug: string): Protocol[] {
  return protocols.filter((p) => p.roles.includes(roleSlug));
}

export function getAllProtocols(): Protocol[] {
  return protocols;
}

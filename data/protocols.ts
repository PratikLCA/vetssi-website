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

  // ─── SECTIONS 4–9 & 13–16 — PREOPERATIVE & POSTOPERATIVE ─────────────────
  {
    slug: "patient-admission-hygiene",
    title: "Patient Admission & Holding Area Hygiene",
    phase: "preoperative",
    pathways: ["patient", "or-environment"],
    roles: ["prep-technician", "anesthetist"],
    clinicalObjective:
      "Maintain the cleanliness of the patient and the holding environment from admission through transfer to the operating room, preventing acquisition of nosocomial organisms before surgery begins. Designated clean surfaces and limited handling after skin preparation reduce the risk of recontamination. Consistent holding-area hygiene is a foundational element of a comprehensive SSI prevention program.",
    whyThisMatters:
      "Patients can acquire resistant organisms from contaminated cage surfaces, shared equipment, or excessive staff handling within the hospital environment. A contaminated holding area transfers that burden directly to the surgical site. Protecting this window between admission and incision preserves the benefit of every subsequent prep step.",
    criticalControlPoints: [
      "Clean and disinfect cage or holding surface before patient placement",
      "Limit physical contact with surgical site after clipping and antisepsis have begun",
      "Use designated clean surfaces and transport equipment for pre-op patients",
      "Ensure patient does not contact floors or unclean horizontal surfaces",
      "Document holding-area cleaning completion before patient arrival",
    ],
    steps: [
      {
        title: "Prepare the holding area",
        details: [
          "Clean and disinfect the cage, run, or gurney surface with an approved hospital disinfectant",
          "Allow adequate contact time per product label before placing the patient",
          "Line with fresh, clean bedding or impermeable surface cover",
        ],
      },
      {
        title: "Admit the patient with minimal contamination risk",
        details: [
          "Record admission body condition and any visible skin lesions or wounds",
          "Place IV catheter using aseptic technique immediately upon admission",
          "Avoid unnecessary handling of the planned surgical site",
        ],
      },
      {
        title: "Perform pre-clipping hygiene if indicated",
        details: [
          "Bathe the patient the evening before or morning of surgery if heavily soiled",
          "Do not clip in the holding area — use a designated prep or clipping room",
          "Vacuum or remove loose hair from the holding area after any grooming",
        ],
      },
      {
        title: "Restrict access and handling after prep begins",
        details: [
          "Once clipping and antisepsis have started, limit who touches the patient",
          "Do not allow the prepped patient to contact unclean cages, floors, or hands",
          "Assign one team member responsibility for clean transport to OR",
        ],
      },
      {
        title: "Verify holding-area readiness before each surgical patient",
        details: [
          "Confirm prior patient materials (hair, fluid, bedding) have been removed",
          "Re-disinfect if the surface has been used since last cleaning",
          "Document on the surgical preparation checklist",
        ],
      },
    ],
    pitfalls: [
      "Placing a prepared patient back into a soiled cage or onto an uncleaned surface negates prep efforts",
      "Allowing excessive staff interaction with the surgical site during IV placement or monitoring",
      "Skipping holding-area disinfection when the schedule is rushed",
      "Using the same blanket or bedding for multiple patients without laundering",
      "Failing to remove loose hair after clipping, which can settle on the prepped site",
    ],
    expertInsight:
      "The holding area is often treated as a passive waiting space, but it is an active contamination risk — a clean prep can be undone in minutes by contact with an unwashed surface or unnecessary handling before the patient ever reaches the OR.",
    evidence: [
      {
        citation:
          "Mangram AJ, et al. Guideline for Prevention of Surgical Site Infection, 1999. Infect Control Hosp Epidemiol. 1999;20(4):250-278.",
        doi: "10.1086/501620",
      },
      {
        citation:
          "AORN Guidelines for Perioperative Practice: Patient Skin Antisepsis. Denver: AORN; 2023.",
      },
      {
        citation:
          "Weese JS. A review of post-operative infections in veterinary orthopaedic surgery. Vet Comp Orthop Traumatol. 2008;21(2):99-105.",
        doi: "10.3415/VCOT-07-02-0017",
      },
    ],
    relatedProtocols: [
      "preoperative-skin-preparation",
      "clipping-timing-technique",
      "transfer-after-clipping",
      "patient-risk-stratification",
      "preoperative-patient-screening",
    ],
    relatedVideos: [],
    middleBlock: {
      type: "planning-checklist",
      sectionTitle: "Holding Area Hygiene Checklist",
      intro:
        "Complete all items before the surgical patient is placed in the holding area and again after clipping/prep begins.",
      groups: [
        {
          header: "Cage & Surface Preparation",
          items: [
            { label: "Cage/gurney disinfected with approved product", note: "Verify correct contact time" },
            { label: "Fresh bedding or impermeable cover placed" },
            { label: "Prior patient materials removed (hair, fluid, soiled bedding)" },
            { label: "Area visually clean and dry before patient placement" },
          ],
        },
        {
          header: "Patient Admission Steps",
          items: [
            { label: "IV catheter placed using aseptic technique on admission" },
            { label: "Surgical site not unnecessarily touched during admission procedures" },
            { label: "Patient does not contact floor between transport and cage" },
          ],
        },
        {
          header: "Post-Prep Protection",
          items: [
            { label: "Handling of clipped/antiseptic-applied site minimized", note: "One designated handler preferred" },
            { label: "Patient not returned to soiled surface after prep" },
            { label: "Transport team notified and route to OR confirmed clean" },
          ],
        },
      ],
      parametersTitle: "Holding Area Log",
      parametersIntro: "Record cleaning and patient details for each surgical case.",
      parameters: [
        { label: "Patient ID / Case", placeholder: "e.g., Canine #2024-0412" },
        { label: "Date & Time of Area Cleaning", placeholder: "e.g., 2024-04-12 07:15" },
        { label: "Disinfectant Used", placeholder: "e.g., Accelerated hydrogen peroxide" },
        { label: "Staff Member Who Cleaned", placeholder: "Initials" },
        { label: "Time Patient Placed in Area", placeholder: "e.g., 07:45" },
      ],
    },
  },

  {
    slug: "transfer-after-clipping",
    title: "Transfer After Clipping",
    phase: "preoperative",
    pathways: ["patient", "or-environment"],
    roles: ["prep-technician", "anesthetist"],
    clinicalObjective:
      "Ensure that the clipped and prepared patient is transported to the operating room without recontamination of the surgical site. Clean transport surfaces, a designated clean pathway, and avoidance of floor contact preserve the antiseptic integrity achieved during skin preparation. This brief transit phase represents a high-risk moment when contamination can silently occur before surgery begins.",
    whyThisMatters:
      "Recontamination during transfer is common and underappreciated. Organisms acquired from a gurney surface, floor contact, or ungloved handling during transport can subsequently be dragged across the surgical field during final prep. Treating transfer as a formal aseptic step — not just patient movement — is essential.",
    criticalControlPoints: [
      "Use only a clean, disinfected transport surface after clipping is complete",
      "Prevent the patient or surgical limb from contacting the floor at any point",
      "Use a direct, clean route from prep area to OR",
      "Minimize number of staff handling the patient during transfer",
      "Confirm OR is ready before initiating transfer to avoid holding the patient in a corridor",
    ],
    steps: [
      "Confirm OR readiness before beginning transfer — do not hold a prepped patient in a hallway",
      "Place the patient on a clean, freshly disinfected gurney or transfer surface",
      "Wrap or cover the prepped surgical site loosely with a sterile towel if transit is more than 60 seconds",
      "Carry or lift distal limbs — do not allow them to dangle and contact surfaces or floors",
      "Use a designated clean corridor or route; avoid shared high-traffic areas when possible",
      "Minimize personnel involved in transfer; one handler guides limb protection throughout",
      "On arrival to OR, confirm patient positioning before removing any protective covering",
    ],
    pitfalls: [
      "Allowing the surgical limb to contact the gurney side, wheel, or floor during transfer",
      "Transferring the patient before the OR is fully set up, requiring waiting in the corridor",
      "Using the same gurney for both dirty and clean patients without disinfection",
      "Excessive personnel clustered around the patient during transfer creating turbulence near the prepared site",
      "Removing the protective covering prematurely before the patient is positioned on the table",
    ],
    expertInsight:
      "Transfer is one of the most neglected steps in surgical prep — teams focus on what happens in the OR and forget that a 30-second gurney ride on an unwashed surface can undo meticulous antisepsis.",
    evidence: [
      {
        citation:
          "Aiello SE, ed. The Merck Veterinary Manual. 12th ed. Kenilworth, NJ: Merck; 2022. Chapter: Surgical Site Infections.",
      },
      {
        citation:
          "AORN Guidelines for Perioperative Practice: Patient Skin Antisepsis. Denver: AORN; 2023.",
      },
      {
        citation:
          "Eugster S, et al. A prospective study of postoperative surgical site infections in dogs and cats. Vet Surg. 2004;33(5):542-550.",
        doi: "10.1111/j.1532-950X.2004.04076.x",
      },
    ],
    relatedProtocols: [
      "clipping-timing-technique",
      "preoperative-skin-preparation",
      "patient-admission-hygiene",
      "patient-positioning-isolation",
      "sterility-readiness-check",
    ],
    relatedVideos: [],
    middleBlock: {
      type: "gonogo",
      sectionTitle: "Transfer Readiness: Go / No-Go",
      intro:
        "Verify all conditions before moving the prepped patient. Any 'No-Go' condition must be resolved before transfer begins.",
      groups: [
        {
          header: "Go Conditions",
          items: [
            { label: "OR table is clean and set up", note: "Confirm with circulating staff before leaving prep area" },
            { label: "Transport gurney has been disinfected", note: "Verify since last patient use" },
            { label: "Clean route to OR is clear", note: "Avoid active procedure corridors" },
            { label: "Designated handler assigned for limb protection", note: "One person responsible throughout transfer" },
            { label: "Protective covering available if transit > 60 seconds", note: "Sterile towel or wrap" },
          ],
        },
        {
          header: "No-Go Conditions — Resolve Before Transfer",
          items: [
            { label: "OR not ready or still being cleaned", note: "Wait — do not hold patient in corridor" },
            { label: "Transport surface not cleaned since last patient", note: "Disinfect and allow contact time" },
            { label: "No handler available to protect surgical limb", note: "Assign before moving" },
            { label: "Patient is agitated and at risk of self-contamination", note: "Ensure adequate sedation or restraint" },
          ],
        },
      ],
      warning: {
        label: "Corridor Hold Prohibited",
        text: "Never hold a prepped patient in a shared corridor while waiting for the OR. Return to the prep area if OR is not ready.",
      },
    },
  },

  {
    slug: "gloves-outside-sterile-field",
    title: "Gloves Outside the Sterile Field",
    phase: "preoperative",
    pathways: ["surgical-team", "patient"],
    roles: ["prep-technician", "anesthetist", "surgeon"],
    clinicalObjective:
      "Ensure that non-sterile gloves are worn consistently during all patient contact outside the sterile field — including clipping, catheter handling, antiseptic application, and patient positioning — reducing the risk of cross-contamination between staff hands and the surgical site. Glove changes between patients and when contamination is suspected prevent organism transfer. This standard complements but does not replace hand hygiene.",
    whyThisMatters:
      "Hands are a primary vector for SSI pathogens in the perioperative setting. Non-sterile gloves reduce direct transfer from staff skin flora and environmental organisms to the surgical site during the many contact-intensive steps that precede sterile gowning. Compliance with glove use outside the sterile field is often lower than within it, creating a hidden contamination risk.",
    criticalControlPoints: [
      "Wear non-sterile gloves during all clipping and hair removal steps",
      "Wear gloves during IV catheter placement, adjustment, and injection port handling",
      "Change gloves between patients without exception",
      "Change gloves when contamination is suspected or confirmed, even within the same patient encounter",
      "Perform hand hygiene before donning and after removing gloves",
    ],
    steps: [
      "Perform hand hygiene before applying gloves for any patient contact task",
      "Don non-sterile exam gloves before beginning clipping or hair removal",
      "Maintain gloves throughout catheter placement, fluid line connection, and injection port access",
      "Change gloves after handling any soiled material before touching the prepped site",
      "Change gloves between every patient — never reuse or 'flip' gloves",
      "Remove gloves using the inside-out technique to avoid hand contamination",
      "Perform hand hygiene after glove removal before proceeding to the next task",
    ],
    pitfalls: [
      "Skipping gloves during 'quick' catheter adjustments or injection port access",
      "Reusing gloves between patients when the schedule is rushed",
      "Failing to change gloves after handling soiled material before touching the clipped/prepped site",
      "Wearing gloves as a substitute for hand hygiene rather than in addition to it",
      "Donning sterile gloves directly over hands that have not been antiseptically prepared",
    ],
    expertInsight:
      "Gloves create a false sense of security if hand hygiene is neglected — worn gloves accumulate organisms rapidly, and any break in technique transfers that burden directly to the patient.",
    evidence: [
      {
        citation:
          "WHO Guidelines on Hand Hygiene in Health Care. Geneva: World Health Organization; 2009.",
      },
      {
        citation:
          "AORN Guidelines for Perioperative Practice: Sterile Technique. Denver: AORN; 2023.",
      },
      {
        citation:
          "Pittet D, et al. Effectiveness of a hospital-wide programme to improve compliance with hand hygiene. Lancet. 2000;356(9238):1307-1312.",
        doi: "10.1016/S0140-6736(00)02814-2",
      },
    ],
    relatedProtocols: [
      "hand-hygiene",
      "glove-change-protocol",
      "surgical-team-preparation",
      "iv-catheter-placement",
      "preoperative-skin-preparation",
    ],
    relatedVideos: [],
    audienceVersions: {
      staff: {
        steps: [
          "Put on non-sterile exam gloves before touching the patient for clipping or hair removal",
          "Keep gloves on during IV catheter placement and any adjustment of IV lines or ports",
          "Change gloves if you touch a soiled surface, body fluid, or any unclean object during prep",
          "Change gloves between every patient — do not reuse",
          "Remove gloves by turning them inside out to keep your hands clean",
          "Wash or sanitize hands after removing gloves before touching anything else",
        ],
        pitfalls: [
          "Touching the clipped site without gloves during catheter work or monitoring",
          "Forgetting to change gloves between patients during a busy schedule",
          "Using gloves as a reason to skip hand hygiene",
        ],
      },
      surgeon: {
        steps: [
          "Don non-sterile gloves before assisting with patient positioning or any contact with the unprepped site",
          "Maintain gloves when handling un-sterile components of monitoring equipment near the surgical site",
          "Change gloves when moving from a contaminated area to the planned surgical field during pre-scrub evaluation",
          "Remove all non-sterile gloves completely before beginning surgical hand antisepsis",
          "Do not contact the sterile field, instrument tables, or implants while wearing non-sterile gloves",
          "Verify your team has changed gloves between positioning and final antiseptic application",
        ],
        pitfalls: [
          "Adjusting patient positioning after hand antisepsis without recognizing this requires re-scrubbing",
          "Assuming non-sterile gloves provide sterile-field-equivalent protection — they do not",
          "Contacting the final antiseptic-prepared site with non-sterile gloves just before draping",
        ],
      },
    },
  },

  {
    slug: "infusion-line-preparation",
    title: "Infusion Line Preparation",
    phase: "preoperative",
    pathways: ["patient", "surgical-team"],
    roles: ["anesthetist", "prep-technician"],
    clinicalObjective:
      "Establish intravenous infusion systems using strict aseptic technique, with fluid preparation timed appropriately relative to surgical use, to prevent intravascular introduction of organisms during the perioperative period. Shared, pre-spiked, or reused fluid systems carry significant contamination risk. Each patient must have a dedicated, freshly prepared infusion system with all access points protected.",
    whyThisMatters:
      "IV-related infections — though less common than incisional SSIs — can be catastrophic, particularly in immunocompromised or critically ill surgical patients. The same pathogens responsible for SSIs can enter via improperly prepared fluid lines, syringes, or multi-use ports. Standardizing line preparation is a high-yield, low-cost intervention.",
    criticalControlPoints: [
      "Prepare infusion lines immediately before use — not hours in advance",
      "Never share a spiked or open fluid bag between patients",
      "Never reuse a syringe, even between draws from the same bag",
      "Disinfect all injection ports before access using friction and an alcohol-based swab",
      "Label all prepared syringes with drug, concentration, date, and time",
    ],
    steps: [
      {
        title: "Prepare fluids at the time of use",
        details: [
          "Spike fluid bags immediately before priming the line — do not pre-spike",
          "Inspect bag for clarity, expiration, and absence of particulate matter",
          "Prime the line and remove all air before connecting to the patient",
        ],
      },
      {
        title: "Use patient-dedicated fluid systems",
        details: [
          "Each patient receives a dedicated fluid bag and line — never carry over between patients",
          "Do not leave spiked bags open for use in a subsequent case even if unused",
        ],
      },
      {
        title: "Maintain injection port asepsis",
        details: [
          "Swab each injection port with 70% isopropyl alcohol and allow to dry before access",
          "Use a new sterile syringe for every drug draw or injection",
          "Do not recap and reuse syringes",
        ],
      },
      {
        title: "Label all prepared medications and infusions",
        details: [
          "Label syringes with drug name, concentration, patient ID, preparer initials, date, and time",
          "Discard any unlabeled or expired preparation",
          "Never administer a preparation drawn from a syringe that has been set down out of view",
        ],
      },
      {
        title: "Protect line integrity during case",
        details: [
          "Keep stopcocks capped when not in use",
          "Replace injection caps if contamination is suspected",
          "Minimize the number of T-ports, stopcocks, and extension sets — each connection is a risk point",
        ],
      },
    ],
    pitfalls: [
      "Pre-spiking multiple bags in advance to save time — a common but dangerous shortcut",
      "Reusing syringes between drug draws, even from the same vial",
      "Leaving stopcocks open and uncapped between uses",
      "Failing to label prepared syringes, leading to drug administration errors and traceability gaps",
      "Carrying a partially used fluid bag to the next surgical patient",
    ],
    expertInsight:
      "Infusion line contamination is invisible — there is no way to know a line is compromised without culturing it, which is why strict prospective technique is non-negotiable rather than reactive.",
    evidence: [
      {
        citation:
          "O'Grady NP, et al. Guidelines for the Prevention of Intravascular Catheter-Related Infections. Clin Infect Dis. 2011;52(9):e162-e193.",
        doi: "10.1093/cid/cir257",
      },
      {
        citation:
          "AORN Guidelines for Perioperative Practice: Medication Safety. Denver: AORN; 2023.",
      },
      {
        citation:
          "Strom BL, et al. Medication errors related to syringe reuse. Ann Intern Med. 2011;155(3):184-192.",
      },
    ],
    relatedProtocols: [
      "iv-catheter-placement",
      "medication-handling",
      "anesthesia-vascular-access-control",
      "antimicrobial-prophylaxis",
      "patient-admission-hygiene",
    ],
    relatedVideos: [],
    middleBlock: {
      type: "planning-checklist",
      sectionTitle: "Infusion Line Preparation Checklist",
      intro:
        "Complete all items for each patient before connecting any IV infusion. Document deviations and notify the anesthetist.",
      groups: [
        {
          header: "Fluid Bag Preparation",
          items: [
            { label: "Fluid bag inspected for clarity, expiration, and integrity" },
            { label: "Bag spiked immediately before use — not pre-spiked", note: "Never pre-spike for later use" },
            { label: "Line primed and air-free before patient connection" },
            { label: "Bag labeled with patient ID and start time" },
          ],
        },
        {
          header: "Syringe & Medication Handling",
          items: [
            { label: "New sterile syringe used for each drug draw" },
            { label: "All prepared syringes labeled with drug, concentration, patient ID, date, time, and preparer initials" },
            { label: "No unlabeled or pre-drawn syringes present on the anesthesia workspace" },
            { label: "Multi-dose vials dated on first opening and discarded per protocol" },
          ],
        },
        {
          header: "Access Port & Line Integrity",
          items: [
            { label: "All injection ports swabbed with 70% isopropyl alcohol and dried before access" },
            { label: "Stopcocks capped when not in active use" },
            { label: "Minimum number of connectors and T-ports used" },
            { label: "Line and connectors replaced if contamination suspected" },
          ],
        },
      ],
      parametersTitle: "Case Fluid Record",
      parameters: [
        { label: "Patient ID / Case Number", placeholder: "e.g., Feline #2024-0315" },
        { label: "Fluid Type & Volume", placeholder: "e.g., LRS 500 mL" },
        { label: "Line Preparation Time", placeholder: "e.g., 08:20" },
        { label: "Prepared By (Initials)", placeholder: "e.g., JK" },
        { label: "Drugs Added to Bag (if any)", placeholder: "e.g., KCl 20 mEq" },
      ],
    },
  },

  {
    slug: "or-ventilation-environment",
    title: "OR Ventilation & Environmental Control",
    phase: "preoperative",
    pathways: ["or-environment"],
    roles: ["scrub-technician", "anesthetist", "surgeon"],
    clinicalObjective:
      "Maintain an operating room environment that minimizes airborne and surface-level contamination through ventilation standards, door discipline, and traffic control during the surgical period. Positive-pressure ventilation with high air exchange rates and HEPA filtration reduces the burden of airborne organisms settling onto the sterile field. Environmental control is particularly critical during implant procedures and prolonged cases.",
    whyThisMatters:
      "Airborne particles are a documented source of SSI organisms, particularly in orthopaedic and implant surgery. Each door opening disrupts positive pressure and introduces a burst of unfiltered corridor air. Traffic generates turbulence that suspends settled particles. These environmental factors are modifiable and require deliberate management during every case.",
    criticalControlPoints: [
      "Confirm OR is under positive pressure relative to adjacent corridors before case start",
      "Limit OR door openings to essential entries and exits only",
      "Achieve and maintain minimum air exchange standards (15+ air changes per hour recommended for veterinary ORs)",
      "Restrict unnecessary personnel from entering during implant opening and wound closure",
      "Allow a settling period after room cleaning before beginning sterile setup",
    ],
    steps: [
      "Verify OR ventilation system is operational and positive pressure is confirmed before sterile setup begins",
      "Close OR doors during all sterile setup, implant opening, and wound closure phases",
      "Brief all team members on door discipline before the case — each opening is a contamination event",
      "Plan all anticipated equipment and supply needs before surgery begins to minimize door openings",
      "Limit occupancy to essential personnel; additional observers should remain outside or in a viewing area",
      "After OR cleaning, allow a minimum air settling time (typically 20-30 minutes) before laying out sterile packs",
      "Monitor and document any significant ventilation anomalies (system alarms, prolonged door holds) in the case record",
    ],
    pitfalls: [
      "Propping OR doors open for convenience, negating positive pressure ventilation",
      "Failing to complete a pre-case supply check, forcing repeated door openings during surgery",
      "Allowing students or observers to enter and exit repeatedly during implant or closure phases",
      "Neglecting to verify ventilation function after facility maintenance or HVAC work",
      "Underestimating the contamination burden from a single held-open door during a critical phase",
    ],
    expertInsight:
      "Every unnecessary door opening is a ventilation breach — in a 2-hour implant procedure, ten avoidable door openings represent ten preventable contamination events that no amount of antibiotic prophylaxis can fully compensate for.",
    evidence: [
      {
        citation:
          "Memarzadeh F, Manning AP. Thermal comfort, uniformity, and ventilation effectiveness in patient rooms: performance assessment using ventilation indices. HVAC&R Research. 2000;6(1):49-68.",
      },
      {
        citation:
          "AORN Guidelines for Perioperative Practice: Design and Maintenance of the Surgical Suite. Denver: AORN; 2023.",
      },
      {
        citation:
          "Mangram AJ, et al. Guideline for Prevention of Surgical Site Infection, 1999. Infect Control Hosp Epidemiol. 1999;20(4):250-278.",
        doi: "10.1086/501620",
      },
    ],
    relatedProtocols: [
      "or-environment-setup",
      "or-traffic-control",
      "or-behavior-rules",
      "contamination-sensitive-phases",
      "sterile-field-maintenance",
    ],
    relatedVideos: [],
  },

  {
    slug: "contamination-sensitive-phases",
    title: "Contamination-Sensitive Phases",
    phase: "preoperative",
    pathways: ["or-environment", "surgical-team"],
    roles: ["surgeon", "scrub-technician", "anesthetist", "prep-technician"],
    clinicalObjective:
      "Identify and enforce heightened discipline controls during the four highest-risk contamination phases of the perioperative period: after final skin antisepsis, during draping, during implant opening, and during wound closure. These phases share common features — open sterile fields, maximal contamination impact of any breach, and frequent lapse in discipline due to workflow momentum. Explicit team-level awareness of these phases reduces breach frequency.",
    whyThisMatters:
      "Most surgical contamination events occur during predictable, high-activity transitions rather than uniformly throughout the procedure. Targeting team behavior at these specific phases — rather than attempting uniform maximum vigilance throughout — is both more effective and more sustainable as a practice standard.",
    criticalControlPoints: [
      "Final antisepsis and drying period: no contact, minimal movement near patient",
      "Draping phase: OR doors closed, circulator not touching sterile components, no traffic",
      "Implant opening phase: announce start to team, minimize personnel in OR, no door openings",
      "Wound closure phase: same quiet discipline as implant opening — this is the last opportunity to introduce contamination",
    ],
    steps: [
      "Brief the team before the case on which phases require heightened discipline — name them explicitly",
      "Designate a phase announcement system: surgeon or scrub tech calls out 'Draping now' or 'Opening implant' to signal discipline mode",
      "Enforce OR door closure for the duration of each sensitive phase",
      "Pause non-essential communication (teaching, personal conversation) during sensitive phases",
      "Circulating staff complete all anticipated tasks before each sensitive phase begins to avoid entry/exit during it",
      "Document any breach (door opening, personnel entry) during a sensitive phase in the case record",
      "Debrief after the case if a breach occurred — identify root cause and corrective action",
    ],
    pitfalls: [
      "Failing to announce phase transitions, so team members remain unaware heightened discipline is required",
      "Allowing a door to be opened for a 'quick question' during implant handling",
      "Scrub tech reaching for unlisted supplies during draping, forcing the circulator to leave and re-enter",
      "Relaxing discipline during closure because 'the hard part is over' — closure is a high-risk phase",
      "Not debriefing after a breach, missing the opportunity to prevent recurrence",
    ],
    expertInsight:
      "Calling out phase transitions out loud — 'We are draping now, doors closed' — is a simple, zero-cost intervention that consistently reduces team breaches more than any policy document.",
    evidence: [
      {
        citation:
          "Gillespie BM, et al. Reducing the risk of surgical site infection using a multidisciplinary approach. Int J Nurs Stud. 2014;51(3):375-383.",
        doi: "10.1016/j.ijnurstu.2013.06.002",
      },
      {
        citation:
          "AORN Guidelines for Perioperative Practice: Sterile Technique. Denver: AORN; 2023.",
      },
      {
        citation:
          "Mangram AJ, et al. Guideline for Prevention of Surgical Site Infection, 1999. Infect Control Hosp Epidemiol. 1999;20(4):250-278.",
        doi: "10.1086/501620",
      },
    ],
    relatedProtocols: [
      "or-traffic-control",
      "or-behavior-rules",
      "or-ventilation-environment",
      "sterile-field-maintenance",
      "draping-technique",
    ],
    relatedVideos: [],
    middleBlock: {
      type: "screening-table",
      sectionTitle: "Contamination-Sensitive Phase Controls",
      intro:
        "Each phase below requires specific team discipline. Confirm controls are in place before and during each phase.",
      domains: [
        {
          domain: "After Final Skin Antisepsis",
          rows: [
            { finding: "OR doors open", action: "modify", actionLabel: "Close immediately" },
            { finding: "Staff touching patient near surgical site", action: "defer", actionLabel: "Hold — no contact" },
            { finding: "Antiseptic fully dry and ready", action: "proceed", actionLabel: "Proceed to draping" },
            { finding: "Antiseptic not fully dry", action: "defer", actionLabel: "Wait — allow full dry time" },
          ],
        },
        {
          domain: "During Draping",
          rows: [
            { finding: "Circulator positioned and ready with supplies", action: "proceed" },
            { finding: "Unanticipated supply needed — requires door opening", action: "modify", actionLabel: "Pause draping until resolved" },
            { finding: "Personnel entering OR during draping", action: "defer", actionLabel: "Hold entry until draping complete" },
            { finding: "Drape integrity confirmed after application", action: "proceed" },
          ],
        },
        {
          domain: "During Implant Opening",
          rows: [
            { finding: "Implant announced to team — phase called out", action: "proceed" },
            { finding: "Door opened during implant opening", action: "modify", actionLabel: "Document breach; assess sterile field" },
            { finding: "Implant dropped or touched non-sterile surface", action: "defer", actionLabel: "Do not use — retrieve replacement" },
            { finding: "Implant packaging intact and expiration confirmed", action: "proceed" },
          ],
        },
        {
          domain: "During Wound Closure",
          rows: [
            { finding: "OR discipline maintained equivalent to opening phase", action: "proceed" },
            { finding: "Non-essential personnel present in OR", action: "modify", actionLabel: "Request exit before closure begins" },
            { finding: "Glove change performed if indicated before closure", action: "proceed" },
            { finding: "Door held open during final suture layers", action: "modify", actionLabel: "Close door; document event" },
          ],
        },
      ],
      dayOfTitle: "Phase Readiness Confirmation",
      dayOfItems: [
        { label: "Team briefed on all four sensitive phases before case start" },
        { label: "Phase announcement system agreed upon (who calls it, what words)" },
        { label: "Circulating staff supply check completed before first sensitive phase" },
        { label: "Case record ready to document any breach event" },
      ],
    },
  },

  {
    slug: "patient-positioning-isolation",
    title: "Patient Positioning & Limb Isolation",
    phase: "preoperative",
    pathways: ["patient", "surgical-team"],
    roles: ["prep-technician", "anesthetist", "surgeon"],
    clinicalObjective:
      "Position the surgical patient on the OR table to optimize access, support physiologic stability, and isolate the distal limb or extremity from the main sterile field using stockinette or equivalent techniques. Proper positioning prevents contact between the prepared site and unprepared regions and allows the scrub technician to maintain sterile field integrity throughout the procedure. Errors in positioning require repositioning that may compromise the sterile field or cause patient injury.",
    whyThisMatters:
      "Limb isolation is often treated as a cosmetic step, but its primary function is contamination prevention — separating the contamination-loaded distal extremity (paw, hoof) from the proximal surgical site. Inadequate isolation is a leading cause of intraoperative field contamination in orthopaedic cases.",
    criticalControlPoints: [
      "Confirm final surgical position before draping begins — repositioning after draping contaminates the field",
      "Apply stockinette aseptically to isolate the distal limb before gowning and draping",
      "Pad all pressure points and secure the extremity to prevent intraoperative movement",
      "Ensure the distal limb suspension system (IV stand, tie-out) does not contact the sterile field",
      "Verify field of view and surgeon ergonomics before the case is locked in",
    ],
    steps: [
      {
        title: "Finalize positioning on the OR table",
        details: [
          "Place patient in the required position (dorsal, lateral, sternal) using approved positioning aids",
          "Confirm surgical site is accessible and surgeon ergonomics are acceptable",
          "Pad bony prominences and vulnerable nerve paths before securing",
        ],
      },
      {
        title: "Hang and secure the distal limb",
        details: [
          "Suspend the affected limb using an IV stand, orthopedic limb holder, or ceiling-mounted support",
          "Tie-out at the level of the paw or hoof using a clean bandage or stockinette clip — not directly at the surgical site",
          "Confirm the limb is at appropriate height and tension for the planned procedure",
        ],
      },
      {
        title: "Apply stockinette aseptically",
        details: [
          "Open sterile stockinette and have scrub tech apply while maintaining sterility",
          "Extend stockinette from the most distal point (paw) proximally past the planned incision site",
          "Secure the proximal end so it does not slip during manipulation",
        ],
      },
      {
        title: "Confirm isolation before draping",
        details: [
          "The distal limb suspension system must be non-sterile, handled by the circulator only",
          "The stockinette-covered limb is then handed off to the scrub tech and incorporated into the sterile drape",
          "Verify no gap exists between stockinette and the field drape at handoff",
        ],
      },
      "Complete final antiseptic application to any exposed skin within the draping plan before gowning",
      "Lock all positioning aids and confirm patient will not shift during procedure before draping begins",
    ],
    pitfalls: [
      "Repositioning after draping is complete, breaking sterile field integrity",
      "Stockinette applied by an ungloved or non-sterile team member, contaminating its surface",
      "Insufficient proximal extension of stockinette, leaving a gap at the surgical site boundary",
      "IV stand or tie-out contacting the sterile drape during limb manipulation",
      "Padding omitted on bony prominences in long cases, causing positioning-related injury",
    ],
    expertInsight:
      "A well-isolated and hung limb makes the scrub tech's job significantly easier throughout the case — it is not a luxury step, it is the foundation of field control for all orthopaedic procedures.",
    evidence: [
      {
        citation:
          "AORN Guidelines for Perioperative Practice: Positioning the Patient. Denver: AORN; 2023.",
      },
      {
        citation:
          "Denny HR, Butterworth SJ. A Guide to Canine and Feline Orthopaedic Surgery. 4th ed. Oxford: Blackwell Science; 2000.",
      },
      {
        citation:
          "Tobias KM, Johnston SA. Veterinary Surgery: Small Animal. 2nd ed. St. Louis: Elsevier; 2018.",
      },
    ],
    relatedProtocols: [
      "draping-technique",
      "incisional-drape-policy",
      "sterile-field-maintenance",
      "transfer-after-clipping",
      "sterility-readiness-check",
    ],
    relatedVideos: [],
    middleBlock: {
      type: "planning-checklist",
      sectionTitle: "Positioning & Limb Isolation Checklist",
      intro:
        "Complete all steps before gowning and draping. Confirm with the surgeon that positioning is finalized before proceeding.",
      groups: [
        {
          header: "Table & Patient Positioning",
          items: [
            { label: "Patient placed in correct position (dorsal/lateral/sternal) per surgical plan" },
            { label: "All bony prominences padded", note: "Especially elbows, hocks, and spine in lateral/dorsal recumbency" },
            { label: "Surgeon confirms ergonomic access before positioning locked in" },
            { label: "Monitoring leads and anesthesia circuit positioned without interfering with field" },
          ],
        },
        {
          header: "Limb Suspension",
          items: [
            { label: "Limb suspended using IV stand, holder, or ceiling support" },
            { label: "Tie-out placed at paw level — not at surgical site" },
            { label: "Limb height and tension confirmed for planned procedure" },
            { label: "Suspension system does not contact sterile drape area" },
          ],
        },
        {
          header: "Stockinette Application",
          items: [
            { label: "Sterile stockinette applied by scrub tech or surgeon using aseptic technique" },
            { label: "Extends from distal paw/hoof to proximal past planned incision" },
            { label: "Proximal end secured to prevent slipping during manipulation" },
            { label: "No gap between stockinette edge and drape at handoff" },
          ],
        },
      ],
      parametersTitle: "Positioning Record",
      parameters: [
        { label: "Patient Position Used", placeholder: "e.g., Dorsal recumbency" },
        { label: "Limb Affected", placeholder: "e.g., Right pelvic limb" },
        { label: "Stockinette Size Used", placeholder: "e.g., 3-inch roll" },
        { label: "Positioning Aids Applied", placeholder: "e.g., Foam wedge, sandbag" },
        { label: "Time Positioning Confirmed by Surgeon", placeholder: "e.g., 09:05" },
      ],
    },
  },

  {
    slug: "incisional-drape-policy",
    title: "Incisional Drape Policy",
    phase: "preoperative",
    pathways: ["surgical-team", "patient"],
    roles: ["surgeon", "scrub-technician"],
    clinicalObjective:
      "Define institutional policy for the use of incisional adhesive drapes — whether applied routinely, selectively, or not at all — and establish rules for correct application, inspection, and management if drape lift occurs. Incisional drapes are not a substitute for thorough antiseptic skin preparation and must be applied to dry skin to prevent premature lift. Drape lift exposes the incision to edge contamination and must be managed according to a defined protocol.",
    whyThisMatters:
      "The evidence base for incisional drapes in preventing SSI is mixed: antimicrobial-impregnated drapes may reduce surface organism counts, but plain plastic drapes that lift can concentrate organisms at the wound edge. Understanding when and how to use these drapes — and what to do when they fail — is more important than a blanket policy of routine use.",
    criticalControlPoints: [
      "Apply only to thoroughly dry antiseptic-prepared skin — wet skin causes immediate lift",
      "Smooth from center outward to eliminate air pockets and edge gaps",
      "Inspect drape edges at regular intervals during the case",
      "Define in advance what action to take if drape lift is detected",
      "Do not use incisional drapes as a substitute for thorough skin antisepsis",
    ],
    steps: [
      "Confirm institutional policy on incisional drape use (routine, selective, or not used) before each case",
      "If used: verify skin is completely dry after final antiseptic application before drape placement",
      "Apply drape smoothly from the intended incision line outward, eliminating all air pockets",
      "Press drape edges firmly to skin for 30 seconds — all edges, not just corners",
      "Make the incision through the drape using a scalpel in a single, deliberate pass",
      "Inspect drape edges every 20-30 minutes during prolonged procedures",
      "If drape lift occurs: notify surgeon immediately, do not pull drape back down over the wound, and manage per the no-go protocol",
    ],
    pitfalls: [
      "Applying the drape before the antiseptic is fully dry, causing immediate or early lift",
      "Using an incisional drape as justification for less rigorous skin antisepsis",
      "Failing to inspect drape edges during long procedures until significant lift has already occurred",
      "Attempting to re-adhere a lifted drape edge over an open wound",
      "Selecting plain plastic drapes in a setting where antimicrobial-impregnated versions are indicated and available",
    ],
    expertInsight:
      "A lifted incisional drape is worse than no drape at all — it concentrates organisms at the wound edge under anaerobic conditions while giving a false visual impression of sterile coverage.",
    evidence: [
      {
        citation:
          "Webster J, Alghamdi A. Use of plastic adhesive drapes during surgery for preventing surgical site infection. Cochrane Database Syst Rev. 2015;(4):CD006353.",
        doi: "10.1002/14651858.CD006353.pub4",
      },
      {
        citation:
          "AORN Guidelines for Perioperative Practice: Surgical Drapes. Denver: AORN; 2023.",
      },
      {
        citation:
          "Mangram AJ, et al. Guideline for Prevention of Surgical Site Infection, 1999. Infect Control Hosp Epidemiol. 1999;20(4):250-278.",
        doi: "10.1086/501620",
      },
    ],
    relatedProtocols: [
      "draping-technique",
      "sterile-field-maintenance",
      "surgical-site-antisepsis",
      "patient-positioning-isolation",
      "contamination-event-response",
    ],
    relatedVideos: [],
    middleBlock: {
      type: "gonogo",
      sectionTitle: "Incisional Drape Use Decision",
      intro:
        "Evaluate all conditions before deciding to use or proceed with an incisional drape. 'No-Go' conditions must be resolved or the drape must be omitted.",
      groups: [
        {
          header: "Go — Conditions Favorable for Drape Use",
          items: [
            { label: "Skin is completely dry after antiseptic application", note: "Touch-dry to gloved finger — no residual moisture" },
            { label: "Antimicrobial-impregnated drape selected for implant or prolonged case", note: "Per institutional formulary" },
            { label: "Incision line marked or planned and located centrally on drape", note: "Do not incise through drape edge" },
            { label: "Surgeon experienced with drape-through incision technique", note: "Single-pass scalpel required" },
          ],
        },
        {
          header: "No-Go — Omit or Delay Drape Use",
          items: [
            { label: "Skin not fully dry after antiseptic preparation", note: "Wait — applying to wet skin guarantees lift" },
            { label: "Drape edges lifting immediately on application", note: "Remove drape and reassess skin preparation" },
            { label: "Drape is plain (non-antimicrobial) plastic on a high-risk implant case", note: "Consider upgrading or omitting" },
            { label: "Drape lift detected during an open-wound phase", note: "Do not re-adhere — follow contamination event protocol" },
          ],
        },
        {
          header: "Drape Lift Management",
          items: [
            { label: "Drape lift detected at wound edge — incision not yet made", note: "Remove drape, re-prep if needed, apply new drape" },
            { label: "Drape lift detected during open procedure", note: "Notify surgeon immediately — do not re-adhere; document event" },
            { label: "Significant lift over implant handling zone", note: "Treat as contamination event — see contamination-event-response protocol" },
          ],
        },
      ],
      warning: {
        label: "Never Re-Adhere a Lifted Drape Over an Open Wound",
        text: "Pressing a lifted drape back down over an open surgical site drives surface organisms directly into the wound. Remove and replace with a new drape or proceed without.",
      },
    },
  },

  {
    slug: "sterile-instrument-setup",
    title: "Sterile Instrument Setup",
    phase: "preoperative",
    pathways: ["instruments-implants", "surgical-team"],
    roles: ["scrub-technician", "surgeon"],
    clinicalObjective:
      "Establish the sterile instrument back table and mayo stand in a manner that minimizes contamination risk during setup, organizes instruments by planned procedural sequence, and segregates implant-handling surfaces from general instrument tables when indicated. A disciplined, systematic setup reduces the probability of reaching across the sterile field, reduces hand-off errors, and maintains the sterile envelope from pack opening through case completion.",
    whyThisMatters:
      "Instrument setup is a high-disturbance phase — packs are opened, air currents are generated, and multiple people are near the field. A disorganized setup leads to unnecessary reaching, contamination of glove tips on table edges, and delayed instrument hand-off that forces the surgeon to pause at critical moments. Systematic setup is a patient safety intervention.",
    criticalControlPoints: [
      "Open packs at table height with minimal vigorous shaking or aerosol-generating motion",
      "Arrange instruments before the surgeon enters — setup should not occur simultaneously with draping",
      "Sequence instruments on the mayo stand in planned order of use",
      "Maintain a separate implant table if implants are to be used — no commingling with general instruments",
      "Do not reach over or across the sterile field — reposition yourself or the table instead",
    ],
    steps: [
      {
        title: "Open packs with minimal air disturbance",
        details: [
          "Open peel-pouches by peeling (not tearing) to avoid particulate generation",
          "Present wrapped packs to scrub tech — do not toss or drop instruments onto the table",
          "Open one pack at a time; do not stack open packs waiting to be arranged",
        ],
      },
      {
        title: "Establish the back table",
        details: [
          "Open back table drape first — cover the entire table surface before placing any instruments",
          "Arrange instruments in logical zones: soft tissue, retraction, implant-specific, closure",
          "Place larger instruments at the rear, smaller instruments and hand-off items at the front",
        ],
      },
      {
        title: "Set up the mayo stand",
        details: [
          "Load mayo stand in planned sequence of use: tissue handling first, followed by implant tools, then closure",
          "Keep the mayo stand uncluttered — only instruments for the immediate operative step",
          "Rotate instruments forward as the case progresses",
        ],
      },
      {
        title: "Establish the implant table if indicated",
        details: [
          "Use a separate, dedicated draped surface for implant handling in orthopaedic and implant cases",
          "Do not place general instruments on the implant table",
          "Open implants to the implant table only — announce 'Opening implant' to the team",
        ],
      },
      "Perform a pre-case instrument count with the circulator before the patient is positioned and draped",
      "Conduct a final visual survey of the setup before surgeon entry — confirm nothing is reaching beyond the table edge or at risk of falling",
    ],
    pitfalls: [
      "Vigorous shaking of packs to release instruments, generating particulate contamination",
      "Setting up while draping is occurring, creating crowding and cross-contamination risk near the field",
      "Placing implants on the general instrument table and losing track of implant-sterility status",
      "Mayo stand so crowded that instruments are at risk of falling or being inadvertently touched by non-sterile personnel",
      "Skipping the instrument count, making later discrepancy resolution impossible",
    ],
    expertInsight:
      "A well-set-up back table is a quiet table — instruments are where the scrub tech expects them, and the surgeon never has to wait or ask twice. That predictability is itself a contamination-prevention tool.",
    evidence: [
      {
        citation:
          "AORN Guidelines for Perioperative Practice: Sterile Technique. Denver: AORN; 2023.",
      },
      {
        citation:
          "AORN Guidelines for Perioperative Practice: Counts of Surgical Items. Denver: AORN; 2023.",
      },
      {
        citation:
          "Chobin N. Surgical instrument management. Surg Technol Int. 2014;24:57-65.",
      },
    ],
    relatedProtocols: [
      "instrument-sterility",
      "implant-handling",
      "sterile-field-maintenance",
      "draping-technique",
      "sterility-readiness-check",
    ],
    relatedVideos: [],
    middleBlock: {
      type: "planning-checklist",
      sectionTitle: "Sterile Instrument Setup Checklist",
      intro:
        "Complete all steps before the surgeon enters and before draping is finalized. Setup must be complete before patient positioning is locked in.",
      groups: [
        {
          header: "Pack Opening",
          items: [
            { label: "All packs checked for integrity, sterility indicator, and expiration before opening" },
            { label: "Packs opened by peeling, not tearing", note: "Minimizes particulate generation" },
            { label: "Instruments presented — not tossed — onto the sterile field" },
            { label: "Each pack opened one at a time and arranged before opening the next" },
          ],
        },
        {
          header: "Back Table Organization",
          items: [
            { label: "Back table drape applied to entire surface before any instruments placed" },
            { label: "Instruments arranged in functional zones (soft tissue / retraction / closure)" },
            { label: "No instrument extending beyond the table edge" },
          ],
        },
        {
          header: "Mayo Stand & Implant Table",
          items: [
            { label: "Mayo stand loaded in planned order of use for first operative steps" },
            { label: "Separate implant table established and draped for implant cases" },
            { label: "General instruments not placed on the implant table" },
            { label: "Instrument count completed with circulator and documented" },
          ],
        },
      ],
      parametersTitle: "Setup Notes",
      parameters: [
        { label: "Procedure Name", placeholder: "e.g., TPLO Right Stifle" },
        { label: "Scrub Tech Name", placeholder: "Initials or name" },
        { label: "Setup Start Time", placeholder: "e.g., 08:45" },
        { label: "Setup Complete Time (pre-surgeon entry)", placeholder: "e.g., 09:10" },
        { label: "Implant Table Used? (Y/N)", placeholder: "Y / N" },
        { label: "Instrument Count Confirmed", placeholder: "Initials of scrub tech and circulator" },
      ],
    },
  },

  {
    slug: "recovery-room-hygiene",
    title: "Recovery Room Contamination Prevention",
    phase: "postoperative",
    pathways: ["patient", "or-environment"],
    roles: ["recovery-team", "anesthetist"],
    clinicalObjective:
      "Protect the surgical incision from contamination during the immediate postoperative recovery period by ensuring the patient does not contact dirty surfaces, the incision is not unnecessarily manipulated, and appropriate wound coverage is maintained until the patient is transferred to a clean ward space. Recovery is a high-risk period for incision contamination due to reduced patient awareness, involuntary movement, and proximity to monitoring equipment and personnel.",
    whyThisMatters:
      "Organisms introduced to an incision within the first hours after surgery can colonize the wound before host defenses have recovered from anesthetic and surgical stress. Recovery room hygiene is often deprioritized relative to anesthetic monitoring, but the wound is at its most vulnerable during this period.",
    criticalControlPoints: [
      "Recovery surface must be clean and disinfected before patient placement",
      "Incision must not contact the recovery surface directly — use positioning to protect the wound",
      "Avoid unnecessary touching or checking of the incision in the first 30 minutes unless clinically indicated",
      "Apply e-collar or wound protection device before the patient regains the ability to self-traumatize",
      "Hands must be clean or gloved before any incision assessment",
    ],
    steps: [
      "Confirm recovery surface (table, run, kennel floor) has been cleaned and disinfected before patient arrival",
      "Position patient so the incision does not rest on the table surface — lateral positioning with wound uppermost when feasible",
      "Apply e-collar and/or wound dressing before patient regains full consciousness and motor control",
      "Limit incision checks to scheduled intervals; do not palpate the wound unnecessarily in the immediate period",
      "Wear clean gloves before any incision assessment or wound care",
      "Monitor for self-trauma and reapply protective devices immediately if removed",
      "Document recovery surface cleaning, wound status on arrival to recovery, and protective device application in the patient record",
    ],
    pitfalls: [
      "Placing the patient on an unclean or damp recovery surface in the rush of emergence",
      "Incision contacting recovery surface directly due to inadequate positioning",
      "Delaying e-collar application until the patient is already attempting to lick or chew the wound",
      "Multiple staff members touching the incision without gloves during the first assessment",
      "Failing to document wound status in recovery, missing the opportunity to detect early complications",
    ],
    expertInsight:
      "The incision is at its most vulnerable in the first six hours — tissue planes have not sealed, inflammatory infiltrate is just beginning, and the patient cannot participate in its own protection. Recovery room discipline is the last line of defense before ward management takes over.",
    evidence: [
      {
        citation:
          "Mangram AJ, et al. Guideline for Prevention of Surgical Site Infection, 1999. Infect Control Hosp Epidemiol. 1999;20(4):250-278.",
        doi: "10.1086/501620",
      },
      {
        citation:
          "Gallagher AD, Mertens WD. Implant removal rate from infection after stifle joint surgery for cranial cruciate ligament rupture in dogs. Vet Surg. 2012;41(8):1024-1028.",
        doi: "10.1111/j.1532-950X.2012.01049.x",
      },
      {
        citation:
          "Tobias KM, Johnston SA. Veterinary Surgery: Small Animal. 2nd ed. St. Louis: Elsevier; 2018.",
      },
    ],
    relatedProtocols: [
      "wound-management",
      "incision-monitoring",
      "patient-self-trauma-prevention",
      "cage-ward-hygiene",
      "owner-discharge-instructions",
    ],
    relatedVideos: [],
    middleBlock: {
      type: "planning-checklist",
      sectionTitle: "Recovery Room Hygiene Checklist",
      intro:
        "Complete before patient arrives in recovery and again at 30-minute intervals during the acute recovery period.",
      groups: [
        {
          header: "Pre-Arrival Surface Preparation",
          items: [
            { label: "Recovery surface cleaned and disinfected since last patient" },
            { label: "Clean, dry bedding placed on recovery surface" },
            { label: "Recovery space free of soiled materials from prior patient" },
          ],
        },
        {
          header: "Patient Arrival & Positioning",
          items: [
            { label: "Patient positioned with incision uppermost when lateral recumbency used", note: "Prevent direct wound-surface contact" },
            { label: "E-collar applied before patient has the ability to self-traumatize" },
            { label: "Wound dressing or light bandage applied if incision is in a contact-vulnerable location" },
          ],
        },
        {
          header: "Incision Monitoring in Recovery",
          items: [
            { label: "Initial wound assessment documented on recovery sheet" },
            { label: "Clean gloves worn for all incision assessments", note: "No bare-hand contact with wound" },
            { label: "Wound checks scheduled at 30-minute intervals during acute recovery" },
            { label: "Self-trauma attempt documented if it occurs; protective measures reinforced" },
          ],
        },
      ],
      parametersTitle: "Recovery Documentation",
      parameters: [
        { label: "Patient ID / Case", placeholder: "e.g., Canine #2024-0510" },
        { label: "Recovery Surface Cleaned By (Initials)", placeholder: "e.g., MT" },
        { label: "Time Patient Arrived in Recovery", placeholder: "e.g., 13:45" },
        { label: "E-Collar Applied At (Time)", placeholder: "e.g., 13:47" },
        { label: "Wound Status on Arrival", placeholder: "e.g., Dry, intact, no discharge" },
      ],
    },
  },

  {
    slug: "cage-ward-hygiene",
    title: "Cage & Ward Hygiene",
    phase: "postoperative",
    pathways: ["patient", "or-environment"],
    roles: ["recovery-team"],
    clinicalObjective:
      "Maintain a clean cage and ward environment for the postoperative patient throughout hospitalization, ensuring the incision does not rest in contaminated material, bedding is changed on a defined schedule, and staff perform hand hygiene before incision assessment. Ward-level contamination — fecal matter, urine, exudate on bedding — is a direct contamination pathway to the surgical site and is entirely preventable with consistent hygiene practice.",
    whyThisMatters:
      "Surgical incisions that rest in soiled bedding or contact a contaminated cage floor are exposed to a massive organism burden that overwhelms local wound defenses. In veterinary practice, where patients are often recumbent and cannot be relied upon to stay clean, ward hygiene is not a comfort measure — it is an infection prevention intervention.",
    criticalControlPoints: [
      "Change bedding immediately if soiled with urine, feces, blood, or wound exudate",
      "Incision must not rest directly on cage floor or on soiled material",
      "Staff perform hand hygiene before every incision check",
      "Cage disinfected between patients and after discharge of each surgical patient",
      "Drainage or exudate managed with absorbent materials that are changed frequently",
    ],
    steps: [
      "Assign the postoperative patient to a cleaned and disinfected cage before arrival from recovery",
      "Place adequate absorbent bedding (minimum double-layer) to prevent incision from contacting the cage floor",
      "Establish a bedding change schedule: every 4-6 hours, or immediately when soiled",
      "Perform hand hygiene (soap and water or alcohol-based rub) before every incision assessment",
      "Assess incision at every bedding change — do not delay assessment to a separate scheduled time",
      "Document bedding changes, wound status, and any drainage in the patient's hospitalization record",
      "Disinfect the cage after patient discharge using an appropriate broad-spectrum disinfectant before the next patient",
    ],
    pitfalls: [
      "Leaving soiled bedding in place because 'it will be changed at the next scheduled time'",
      "Incision contacting the bare cage floor after bedding shifts during patient movement",
      "Staff checking the incision immediately after handling other patients without hand hygiene",
      "Inadequate drainage management, leading to wound maceration from persistent moisture",
      "Cage not disinfected between surgical patients due to scheduling pressure",
    ],
    expertInsight:
      "A clean cage is not a housekeeping issue — it is a clinical decision. Soiled bedding against a fresh incision creates the same contamination risk as a breach in sterile technique in the OR.",
    evidence: [
      {
        citation:
          "Weese JS. A review of post-operative infections in veterinary orthopaedic surgery. Vet Comp Orthop Traumatol. 2008;21(2):99-105.",
        doi: "10.3415/VCOT-07-02-0017",
      },
      {
        citation:
          "WHO Guidelines on Hand Hygiene in Health Care. Geneva: World Health Organization; 2009.",
      },
      {
        citation:
          "Mangram AJ, et al. Guideline for Prevention of Surgical Site Infection, 1999. Infect Control Hosp Epidemiol. 1999;20(4):250-278.",
        doi: "10.1086/501620",
      },
    ],
    relatedProtocols: [
      "recovery-room-hygiene",
      "wound-management",
      "incision-monitoring",
      "patient-self-trauma-prevention",
      "hand-hygiene",
    ],
    relatedVideos: [],
    middleBlock: {
      type: "planning-checklist",
      sectionTitle: "Cage & Ward Hygiene Checklist",
      intro:
        "Complete at cage assignment, at each bedding change, and at patient discharge. Document all entries.",
      groups: [
        {
          header: "Cage Assignment & Setup",
          items: [
            { label: "Cage cleaned and disinfected since last patient occupancy" },
            { label: "Double-layer absorbent bedding placed before patient arrival" },
            { label: "Cage floor not visible beneath bedding — full coverage confirmed" },
          ],
        },
        {
          header: "Ongoing Ward Hygiene",
          items: [
            { label: "Bedding change schedule established (every 4-6 hours minimum)" },
            { label: "Immediate bedding change performed whenever soiled", note: "Urine, feces, blood, exudate" },
            { label: "Hand hygiene performed before every incision check", note: "Soap/water or alcohol-based rub" },
            { label: "Wound assessed at every bedding change and result documented" },
          ],
        },
        {
          header: "Discharge & Turnover",
          items: [
            { label: "All bedding removed and disposed of after patient discharge" },
            { label: "Cage cleaned and disinfected with broad-spectrum disinfectant after discharge" },
            { label: "Contact time followed per product label before next patient placement" },
          ],
        },
      ],
      parametersTitle: "Ward Hygiene Log",
      parameters: [
        { label: "Patient ID", placeholder: "e.g., Feline #2024-0521" },
        { label: "Cage Number / Location", placeholder: "e.g., Ward B, Cage 4" },
        { label: "Bedding Change Times Today", placeholder: "e.g., 08:00, 13:00, 18:00" },
        { label: "Wound Status at Last Check", placeholder: "e.g., Dry, intact, no swelling" },
        { label: "Cage Disinfected on Discharge (Y/N, Time)", placeholder: "e.g., Y, 15:30" },
      ],
    },
  },

  {
    slug: "follow-up-schedule",
    title: "Postoperative Follow-Up Schedule",
    phase: "postoperative",
    pathways: ["patient"],
    roles: ["surgeon", "recovery-team"],
    clinicalObjective:
      "Establish a defined postoperative follow-up schedule for each surgical patient that includes the first wound check, suture or staple removal, and procedure-specific rechecks for implant cases. Consistent follow-up scheduling ensures early SSI detection, timely suture removal to prevent track infection, and appropriate long-term surveillance for implant complications. The schedule must be communicated to the owner at discharge and documented in the medical record.",
    whyThisMatters:
      "SSIs are most commonly detected at postoperative rechecks — not by owners at home. A well-structured recheck schedule creates defined opportunities to detect early infection before it becomes deep-tissue or implant-associated disease. Missed rechecks are a leading cause of delayed SSI diagnosis.",
    criticalControlPoints: [
      "First wound check within 3-5 days of discharge for all surgical patients",
      "Suture or staple removal scheduled at 10-14 days post-surgery (procedure-specific)",
      "Implant cases require a minimum 30-day wound check and longer surveillance per implant type",
      "Owner receives written follow-up schedule at discharge — verbal instructions alone are insufficient",
      "Missed rechecks must be tracked and owners contacted proactively",
    ],
    steps: [
      "Before discharge, establish the full follow-up schedule in consultation with the surgeon",
      "Minimum: First check at 3-5 days, suture removal at 10-14 days, and procedure-specific long-term rechecks",
      "For implant procedures: schedule 30-day wound check, imaging recheck per procedure protocol, and define signs that should trigger an unscheduled visit",
      "Enter all follow-up appointments in the practice management system before the patient leaves",
      "Provide the owner with a written discharge sheet listing all scheduled dates, what will be assessed at each visit, and an emergency contact number",
      "Document scheduled appointments in the medical record",
      "If a recheck is missed: contact owner within 24 hours and document contact attempt and outcome",
    ],
    pitfalls: [
      "Discharging without booking the first appointment, relying on the owner to call",
      "Scheduling suture removal at 7 days for procedures requiring 14-day tissue healing time",
      "Failing to schedule long-term implant rechecks — these are often not requested by owners without prompting",
      "Not documenting missed rechecks or failure to reach the owner in the medical record",
      "Verbal-only discharge instructions — owners frequently misremember timing",
    ],
    expertInsight:
      "The follow-up schedule is a clinical order, not an administrative suggestion — failing to book and track rechecks is the equivalent of discharging a patient without prescribing their medication.",
    evidence: [
      {
        citation:
          "Horan TC, et al. CDC definitions of nosocomial surgical site infections, 1992. Infect Control Hosp Epidemiol. 1992;13(10):606-608.",
        doi: "10.1086/646955",
      },
      {
        citation:
          "Eugster S, et al. A prospective study of postoperative surgical site infections in dogs and cats. Vet Surg. 2004;33(5):542-550.",
        doi: "10.1111/j.1532-950X.2004.04076.x",
      },
      {
        citation:
          "Tobias KM, Johnston SA. Veterinary Surgery: Small Animal. 2nd ed. St. Louis: Elsevier; 2018.",
      },
    ],
    relatedProtocols: [
      "incision-monitoring",
      "owner-discharge-instructions",
      "wound-management",
      "ssi-surveillance",
      "postoperative-antibiotic-decisions",
    ],
    relatedVideos: [],
    middleBlock: {
      type: "planning-checklist",
      sectionTitle: "Follow-Up Schedule Planning Checklist",
      intro:
        "Complete before patient discharge. All appointments must be booked in the system and written on the discharge sheet.",
      groups: [
        {
          header: "Standard Follow-Up (All Surgical Patients)",
          items: [
            { label: "First wound check scheduled within 3-5 days of discharge", note: "Book before patient leaves" },
            { label: "Suture/staple removal scheduled at appropriate interval", note: "Typically 10-14 days; surgeon to specify" },
            { label: "Owner informed of what will be assessed at each visit" },
          ],
        },
        {
          header: "Implant-Specific Follow-Up",
          items: [
            { label: "30-day wound and implant check scheduled", note: "All implant cases" },
            { label: "Imaging recheck scheduled per procedure protocol", note: "e.g., 6-week, 12-week radiographs for TPLO" },
            { label: "Owner given list of signs warranting an unscheduled visit", note: "Swelling, discharge, lameness, fever" },
            { label: "Long-term surveillance plan documented in medical record" },
          ],
        },
        {
          header: "Discharge Communication",
          items: [
            { label: "Written discharge sheet provided with all appointment dates" },
            { label: "Emergency contact number included on discharge sheet" },
            { label: "Missed recheck tracking process explained to client (we will contact you)" },
          ],
        },
      ],
      parametersTitle: "Scheduled Follow-Up Dates",
      parametersIntro: "Record all follow-up dates at the time of discharge.",
      parameters: [
        { label: "First Wound Check Date", placeholder: "e.g., 2024-05-17 (Day 4 post-op)" },
        { label: "Suture/Staple Removal Date", placeholder: "e.g., 2024-05-27 (Day 14)" },
        { label: "30-Day Implant Check Date (if applicable)", placeholder: "e.g., 2024-06-10" },
        { label: "Imaging Recheck Date (if applicable)", placeholder: "e.g., 2024-06-24 (6-week radiographs)" },
        { label: "Surgeon / Clinician Responsible for Rechecks", placeholder: "Name or initials" },
      ],
    },
  },

  {
    slug: "protocol-deviations-escalation",
    title: "Protocol Deviations & Escalation Pathway",
    phase: "postoperative",
    pathways: ["surgical-team", "patient"],
    roles: ["surgeon", "scrub-technician", "anesthetist", "prep-technician", "recovery-team"],
    clinicalObjective:
      "Provide explicit, pre-defined response pathways for the most common and highest-risk intraoperative and perioperative protocol deviations, so that every team member knows the correct immediate action, notification requirement, and case-proceed decision without needing to improvise under pressure. A deviation response pathway transforms an error into a managed event with traceable outcome.",
    whyThisMatters:
      "Errors and breaches occur in every surgical setting. The difference between an acceptable outcome and an SSI is often not whether the breach occurred, but how quickly and correctly it was identified and managed. Teams that have rehearsed deviation responses act faster, communicate more clearly, and make better case-proceed decisions than those responding ad hoc.",
    criticalControlPoints: [
      "Any deviation must be named aloud to the team — silent management of a breach is not acceptable",
      "Surgeon must be notified of all sterility breaches regardless of perceived severity",
      "Deviation events must be documented in the operative record with time, nature of event, and response taken",
      "Case-proceed decisions must be made by the surgeon with full information — never withheld from them",
      "All deviation events feed into case review regardless of outcome",
    ],
    steps: [
      "Brief the team before each case: 'If you see a breach or problem, say it out loud immediately — we manage it together'",
      "Use the deviation table below to guide immediate response for each event type",
      "Notify the surgeon of all deviations — do not filter or minimize before reporting",
      "Document the deviation in the operative record: time, event description, immediate response, and surgeon decision",
      "After the case, ensure the deviation is entered into the case review log regardless of outcome",
      "Debrief the team at the end of the case when a deviation occurred — identify root cause and corrective action",
      "Escalate to a formal case review if the deviation was significant, repeated, or resulted in clinical concern",
    ],
    pitfalls: [
      "Team member identifies a breach but does not verbalize it, hoping it 'will be fine'",
      "Surgeon not informed of a glove contamination during implant handling because 'it seemed minor'",
      "Deviation documented incompletely — time and response not recorded, only the event",
      "No debrief after a significant breach, missing the learning and prevention opportunity",
      "Deviation response improvised differently each time because no standard pathway exists",
    ],
    expertInsight:
      "The team member who says 'I think I just contaminated my glove' is not making an error — they are preventing an SSI. A culture where deviations are named is safer than a culture where they are concealed.",
    evidence: [
      {
        citation:
          "Reason J. Human error: models and management. BMJ. 2000;320(7237):768-770.",
        doi: "10.1136/bmj.320.7237.768",
      },
      {
        citation:
          "AORN Guidelines for Perioperative Practice: Event Reporting and Near-Miss Documentation. Denver: AORN; 2023.",
      },
      {
        citation:
          "Gawande AA, et al. Analysis of errors reported by surgeons at three teaching hospitals. Surgery. 2003;133(6):614-621.",
        doi: "10.1067/msy.2003.169",
      },
    ],
    relatedProtocols: [
      "contamination-event-response",
      "glove-change-protocol",
      "implant-handling",
      "sterile-field-maintenance",
      "case-review-triggers",
    ],
    relatedVideos: [],
    middleBlock: {
      type: "screening-table",
      sectionTitle: "Deviation Response Table",
      intro:
        "For each deviation event, identify the immediate action, notification requirement, and case-proceed decision. All events must be documented.",
      domains: [
        {
          domain: "Antibiotic Administration",
          rows: [
            { finding: "Antibiotic given within 0-60 min before incision — on time", action: "proceed" },
            { finding: "Antibiotic given 60-120 min before incision — marginally late", action: "modify", actionLabel: "Notify surgeon; document timing; consider redosing per protocol" },
            { finding: "Antibiotic not given before incision — missed entirely", action: "defer", actionLabel: "Give immediately; notify surgeon; document; reassess case-proceed" },
            { finding: "Wrong antibiotic given", action: "defer", actionLabel: "Stop case if not started; notify surgeon and prescribing clinician; document" },
          ],
        },
        {
          domain: "Drape & Field Integrity",
          rows: [
            { finding: "Drape lift detected before incision — wound not open", action: "modify", actionLabel: "Remove drape; re-prep if needed; replace drape" },
            { finding: "Drape lift over open wound during case", action: "modify", actionLabel: "Notify surgeon immediately; do not re-adhere; manage per contamination-event-response" },
            { finding: "Non-sterile item contacts sterile field", action: "defer", actionLabel: "Call it out immediately; remove contaminated item; replace if possible; notify surgeon" },
          ],
        },
        {
          domain: "Glove & Gown Contamination",
          rows: [
            { finding: "Glove suspected contaminated — no visible break", action: "modify", actionLabel: "Change gloves immediately; notify surgeon" },
            { finding: "Glove visibly torn or punctured", action: "defer", actionLabel: "Stop current task; change gloves; inspect hands; notify surgeon; document" },
            { finding: "Glove contaminated during implant handling", action: "defer", actionLabel: "Stop implant placement; change gloves; evaluate implant sterility; notify surgeon" },
            { finding: "Gown sleeve contaminated by non-sterile surface", action: "defer", actionLabel: "Re-gown if possible; if not, isolate contaminated area; notify surgeon" },
          ],
        },
        {
          domain: "Implant Events",
          rows: [
            { finding: "Implant dropped on floor or non-sterile surface", action: "defer", actionLabel: "Do not use; retrieve replacement; document; notify surgeon" },
            { finding: "Implant packaging integrity questionable", action: "defer", actionLabel: "Do not open; retrieve replacement pack; quarantine and report to supplier" },
            { finding: "Implant touched by non-sterile team member", action: "defer", actionLabel: "Discard implant; retrieve replacement; notify surgeon; document" },
          ],
        },
        {
          domain: "Environment & Traffic",
          rows: [
            { finding: "OR door opened during sensitive phase (draping, implant, closure)", action: "modify", actionLabel: "Close door immediately; document event; notify surgeon" },
            { finding: "Unauthorized personnel enter OR during case", action: "modify", actionLabel: "Request exit; document; notify surgeon if during critical phase" },
            { finding: "Ventilation alarm or positive-pressure loss noted", action: "modify", actionLabel: "Notify surgeon and facility management; document; assess case continuation risk" },
          ],
        },
        {
          domain: "Postoperative Concern",
          rows: [
            { finding: "Wound showing early signs of infection (days 3-7): swelling, warmth, discharge", action: "modify", actionLabel: "Notify surgeon immediately; do not start antibiotics without assessment; document" },
            { finding: "Owner reports wound looks 'different' — no exam yet", action: "modify", actionLabel: "Schedule urgent recheck within 24 hours; document call" },
            { finding: "Confirmed SSI — meets CDC criteria", action: "defer", actionLabel: "Initiate treatment; file SSI report; trigger case review; notify clinical lead" },
          ],
        },
      ],
      dayOfTitle: "Pre-Case Deviation Briefing",
      dayOfItems: [
        { label: "Team briefed: 'Name any breach out loud immediately'" },
        { label: "Case record ready for real-time deviation documentation" },
        { label: "Surgeon confirmed as decision-maker for all case-proceed questions" },
        { label: "Replacement supplies (gloves, drapes, implants) confirmed available before case start" },
      ],
    },
  },

  {
    slug: "compliance-metrics",
    title: "Compliance Metrics",
    phase: "postoperative",
    pathways: ["surgical-team"],
    roles: ["surgeon", "scrub-technician", "anesthetist", "prep-technician", "recovery-team"],
    clinicalObjective:
      "Define measurable compliance indicators for the key SSI prevention protocol steps, establish a collection and reporting process, and use compliance data to identify gaps in practice before they manifest as SSIs. Compliance metrics transform protocol adherence from an assumed behavior into a measurable quality indicator with actionable feedback loops.",
    whyThisMatters:
      "A protocol that exists on paper but is not reliably followed does not protect patients. Compliance tracking reveals the difference between what teams believe they do and what they actually do — and that gap is where SSIs originate. Regular metric review enables targeted re-education before infection events occur.",
    criticalControlPoints: [
      "Antimicrobial timing compliance: percentage of cases with antibiotic given within 60 minutes of incision",
      "Glove change compliance: percentage of implant cases with documented glove change before implant handling",
      "Draping checklist compliance: percentage of cases with completed draping verification",
      "E-collar application compliance: percentage of discharged patients with e-collar applied and documented",
      "Wound check documentation compliance: percentage of cases with first recheck note completed within 5 days",
    ],
    steps: [
      "Define the compliance indicators relevant to your practice and case mix — use the five examples above as a starting point",
      "Assign responsibility for data collection to a designated team member (e.g., practice manager, senior technician)",
      "Collect data prospectively at the case level — retrospective chart review is less reliable",
      "Aggregate and review compliance data monthly at a minimum; present at team meetings",
      "Set a minimum compliance target for each indicator (e.g., ≥95% for antibiotic timing)",
      "When compliance falls below target: identify the specific cases, interview involved staff, and implement corrective action",
      "Report compliance trends alongside SSI surveillance data so correlations can be identified",
    ],
    pitfalls: [
      "Collecting compliance data but not reporting it to the team — data with no feedback changes nothing",
      "Using retrospective chart review as the only data source — documentation gaps create false-positive compliance",
      "Setting no compliance targets, making it impossible to determine when performance is unacceptable",
      "Treating compliance metrics as punitive rather than as a quality improvement tool",
      "Tracking too many metrics and losing focus — start with three to five high-yield indicators",
    ],
    expertInsight:
      "Compliance data is only useful when it is acted upon — a monthly report that shows 70% antibiotic timing compliance and results in no conversation is not quality improvement, it is data collection theater.",
    evidence: [
      {
        citation:
          "Pronovost P, et al. An intervention to decrease catheter-related bloodstream infections in the ICU. N Engl J Med. 2006;355(26):2725-2732.",
        doi: "10.1056/NEJMoa061115",
      },
      {
        citation:
          "WHO Guidelines on Safe Surgery: Safe Surgery Saves Lives. Geneva: World Health Organization; 2009.",
      },
      {
        citation:
          "AORN Guidelines for Perioperative Practice: Quality and Performance Improvement. Denver: AORN; 2023.",
      },
    ],
    relatedProtocols: [
      "ssi-surveillance",
      "case-review-triggers",
      "antimicrobial-prophylaxis",
      "glove-change-protocol",
      "protocol-deviations-escalation",
    ],
    relatedVideos: [],
    middleBlock: {
      type: "planning-checklist",
      sectionTitle: "Compliance Metrics Setup Checklist",
      intro:
        "Use this checklist to establish your compliance monitoring program. Review collected data monthly and at case review meetings.",
      groups: [
        {
          header: "Indicator Selection & Ownership",
          items: [
            { label: "Antimicrobial timing compliance indicator defined and activated" },
            { label: "Glove-change-before-implant compliance indicator defined" },
            { label: "Draping checklist completion indicator defined" },
            { label: "E-collar application on discharge indicator defined" },
            { label: "Wound check documentation within 5 days indicator defined" },
            { label: "Data collection owner assigned by name", note: "e.g., Practice manager or senior technician" },
          ],
        },
        {
          header: "Data Collection Process",
          items: [
            { label: "Prospective case-level data collection method established", note: "Checklist, EMR field, or paper log" },
            { label: "Compliance target set for each indicator", note: "e.g., ≥95% for antibiotic timing" },
            { label: "Monthly reporting schedule confirmed" },
            { label: "Reporting format agreed upon (table, dashboard, or meeting summary)" },
          ],
        },
        {
          header: "Feedback & Action",
          items: [
            { label: "Compliance results presented at monthly team meeting" },
            { label: "Cases below target reviewed for root cause within 2 weeks" },
            { label: "Corrective actions documented and tracked" },
            { label: "Compliance trends correlated with SSI surveillance data quarterly" },
          ],
        },
      ],
      parametersTitle: "Compliance Monitoring Record",
      parametersIntro: "Record the most recent compliance rate for each indicator at each monthly review.",
      parameters: [
        { label: "Reporting Period", placeholder: "e.g., May 2024" },
        { label: "Antimicrobial Timing Compliance (%)", placeholder: "e.g., 94%" },
        { label: "Glove-Change-Before-Implant Compliance (%)", placeholder: "e.g., 100%" },
        { label: "Draping Checklist Compliance (%)", placeholder: "e.g., 87%" },
        { label: "E-Collar Discharge Compliance (%)", placeholder: "e.g., 98%" },
        { label: "Wound Check Documentation Compliance (%)", placeholder: "e.g., 91%" },
      ],
    },
  },

  {
    slug: "ssi-surveillance",
    title: "SSI Surveillance",
    phase: "postoperative",
    pathways: ["patient", "surgical-team"],
    roles: ["surgeon", "recovery-team"],
    clinicalObjective:
      "Conduct systematic postoperative surveillance for surgical site infection using standardized definitions, defined monitoring windows, and a case review mechanism that captures infections occurring at or after the first recheck. Non-implant cases require a minimum 30-day surveillance window; implant cases require surveillance of one year or longer per CDC criteria. Surveillance data drives protocol evaluation and SSI rate benchmarking.",
    whyThisMatters:
      "SSI rates are meaningless without systematic surveillance. Infections detected opportunistically (owner calls because wound is open) represent only a fraction of true SSI burden. Surveillance that includes active follow-up at defined intervals captures the full incidence and enables accurate trend analysis, protocol evaluation, and regulatory reporting where required.",
    criticalControlPoints: [
      "Standardized SSI definition applied consistently — use CDC NHSN criteria adapted for veterinary practice",
      "All surgical cases entered into the surveillance denominator at the time of surgery",
      "Surveillance window: 30 days for non-implant; up to 1 year for implant cases",
      "Active follow-up: do not rely solely on owner-reported events — schedule rechecks",
      "SSI confirmed cases trigger a case review within 30 days of identification",
    ],
    steps: [
      "Enter all surgical cases into the surveillance denominator log at the time of surgery, recording procedure type, implant use, risk classification, and antibiotic prophylaxis received",
      "Apply the standard SSI surveillance window: 30 days for non-implant procedures, 90 days for implant procedures without residency, 1 year for implant procedures with residency (e.g., joint replacements)",
      "Schedule active surveillance contacts at defined intervals: first recheck at day 3-5, suture removal at day 10-14, and implant rechecks per schedule",
      "At each surveillance contact, apply the standardized SSI assessment: wound appearance, discharge, swelling, fever, pain — document findings against case record",
      "Classify any suspected infection using the adapted CDC criteria: superficial incisional, deep incisional, or organ/space SSI",
      "Enter confirmed SSIs into the surveillance database with date of detection, classification, organism if cultured, and treatment initiated",
      "Review monthly SSI rate data and report to clinical team quarterly; trigger case review for all confirmed SSIs",
    ],
    pitfalls: [
      "Failing to define the denominator — without knowing how many cases were performed, an SSI count is uninterpretable",
      "Using inconsistent SSI definitions, making trend data unreliable and comparisons impossible",
      "Surveillance window cut off at suture removal — implant infections commonly present after 30 days",
      "Relying on owner-reported infections only — passive surveillance dramatically underestimates true SSI rate",
      "Confirmed SSIs not triggering a formal case review, missing the learning opportunity",
    ],
    expertInsight:
      "An SSI rate of zero is almost always a surveillance failure, not a performance achievement — if you are not systematically looking for infections with follow-up, you are not finding them.",
    evidence: [
      {
        citation:
          "Horan TC, et al. CDC definitions of nosocomial surgical site infections, 1992. Infect Control Hosp Epidemiol. 1992;13(10):606-608.",
        doi: "10.1086/646955",
      },
      {
        citation:
          "Eugster S, et al. A prospective study of postoperative surgical site infections in dogs and cats. Vet Surg. 2004;33(5):542-550.",
        doi: "10.1111/j.1532-950X.2004.04076.x",
      },
      {
        citation:
          "Weese JS. A review of post-operative infections in veterinary orthopaedic surgery. Vet Comp Orthop Traumatol. 2008;21(2):99-105.",
        doi: "10.3415/VCOT-07-02-0017",
      },
    ],
    relatedProtocols: [
      "incision-monitoring",
      "follow-up-schedule",
      "case-review-triggers",
      "compliance-metrics",
      "postoperative-antibiotic-decisions",
    ],
    relatedVideos: [],
    middleBlock: {
      type: "planning-checklist",
      sectionTitle: "SSI Surveillance Program Checklist",
      intro:
        "Use this checklist to establish and maintain your SSI surveillance program. All surgical cases must be entered into the denominator at the time of surgery.",
      groups: [
        {
          header: "Denominator & Case Entry",
          items: [
            { label: "All surgical cases logged in surveillance denominator at time of surgery" },
            { label: "Each case record includes: procedure type, implant use (Y/N), ASA/risk class, antimicrobial given (Y/N/timing)" },
            { label: "Surveillance window assigned at case entry: 30-day (non-implant) or 90-day/1-year (implant)" },
          ],
        },
        {
          header: "Active Surveillance Contacts",
          items: [
            { label: "Recheck schedule entered in practice management system at discharge" },
            { label: "Day 3-5 wound assessment completed and documented" },
            { label: "Suture removal visit (day 10-14) includes formal wound assessment" },
            { label: "Implant cases: 30-day and 90-day active assessments scheduled and completed" },
          ],
        },
        {
          header: "SSI Classification & Reporting",
          items: [
            { label: "Standardized SSI definition applied to all suspected cases", note: "CDC NHSN criteria adapted for veterinary use" },
            { label: "Confirmed SSIs classified: superficial / deep / organ-space" },
            { label: "Confirmed SSIs entered in surveillance database with date, classification, culture result, treatment" },
            { label: "Monthly SSI rate calculated and reported to clinical team" },
            { label: "All confirmed SSIs trigger case review per case-review-triggers protocol" },
          ],
        },
      ],
      parametersTitle: "Surveillance Database Entry (Per Case)",
      parameters: [
        { label: "Patient ID & Case Number", placeholder: "e.g., Canine #2024-0612" },
        { label: "Procedure Type", placeholder: "e.g., TPLO, routine spay, fracture repair" },
        { label: "Implant Used (Y/N — specify type)", placeholder: "e.g., Y — locking plate" },
        { label: "Risk Classification", placeholder: "e.g., Clean, Clean-contaminated" },
        { label: "Antimicrobial Timing", placeholder: "e.g., Given 35 min pre-incision" },
        { label: "Surveillance Window End Date", placeholder: "e.g., 30-day: 2024-07-12" },
        { label: "SSI Detected (Y/N — date and classification)", placeholder: "e.g., Y — Day 18, superficial incisional" },
      ],
    },
  },

  {
    slug: "case-review-triggers",
    title: "Case Review Triggers",
    phase: "postoperative",
    pathways: ["surgical-team"],
    roles: ["surgeon", "anesthetist", "scrub-technician", "prep-technician", "recovery-team"],
    clinicalObjective:
      "Define the specific events and thresholds that automatically trigger a formal case review, ensuring that all SSIs, all significant contamination events, all unplanned instrument sterilization cycles, and repeated noncompliance trends are systematically reviewed by the clinical team. A well-defined trigger list prevents selective review of only the worst outcomes and ensures learning happens from near-misses as well as adverse events.",
    whyThisMatters:
      "Without explicit triggers, case review defaults to the discretion of whoever is managing the schedule — which means reviews happen when someone has time and motivation, not when the system needs learning. Mandatory triggers remove that discretion and ensure consistent organizational learning.",
    criticalControlPoints: [
      "All confirmed SSIs trigger a case review without exception",
      "All significant intraoperative contamination events trigger a review regardless of outcome",
      "All unplanned IUSS (immediate-use steam sterilization) cycles trigger a review",
      "Repeated noncompliance with any tracked metric triggers a systemic review, not just individual counseling",
      "Reviews must be completed within 30 days of the triggering event",
    ],
    steps: [
      "Maintain a case review trigger log — any triggering event is entered on the day it is identified",
      "Notify the clinical lead or designated reviewer within 24 hours of a triggering event",
      "Complete a structured case review within 30 days: review the operative record, compliance data, and involved staff accounts",
      "Identify the contributing factors using a structured root-cause approach: patient factors, team factors, equipment/process factors, environmental factors",
      "Document the review findings and corrective actions in the case review record",
      "Present case review findings to the full team — anonymized where appropriate — at the next team meeting",
      "Track whether corrective actions have been implemented and whether the triggering issue recurs",
    ],
    pitfalls: [
      "Triggering a case review only for SSIs with bad clinical outcomes — near-misses provide equally important learning",
      "Review completed by only one person without team input, missing perspective from other roles involved",
      "Corrective actions identified but not documented or tracked, leading to recurrence",
      "Review delayed beyond 30 days, reducing the ability to reconstruct the contributing factors",
      "IUSS events not tracked or reviewed because 'the instrument was sterile in the end'",
    ],
    expertInsight:
      "The value of a case review is not to assign blame — it is to find the system failure that made the error possible, so that the next team in that situation does not have to be heroic to prevent the same outcome.",
    evidence: [
      {
        citation:
          "Reason J. Human error: models and management. BMJ. 2000;320(7237):768-770.",
        doi: "10.1136/bmj.320.7237.768",
      },
      {
        citation:
          "AORN Guidelines for Perioperative Practice: Quality and Performance Improvement. Denver: AORN; 2023.",
      },
      {
        citation:
          "Gawande AA, et al. Analysis of errors reported by surgeons at three teaching hospitals. Surgery. 2003;133(6):614-621.",
        doi: "10.1067/msy.2003.169",
      },
    ],
    relatedProtocols: [
      "ssi-surveillance",
      "compliance-metrics",
      "protocol-deviations-escalation",
      "contamination-event-response",
      "instrument-sterility",
    ],
    relatedVideos: [],
    middleBlock: {
      type: "gonogo",
      sectionTitle: "Case Review Trigger Assessment",
      intro:
        "Evaluate the current event against the trigger criteria below. Any 'Trigger' condition requires a formal case review to be initiated within 24 hours.",
      groups: [
        {
          header: "Mandatory Triggers — Initiate Case Review",
          items: [
            { label: "Confirmed SSI — any classification", note: "Superficial, deep incisional, or organ/space — all require review" },
            { label: "Significant intraoperative contamination event", note: "Implant dropped, glove torn during implant handling, drape lift over open wound" },
            { label: "Unplanned IUSS (immediate-use steam sterilization) performed", note: "Even if instrument was subsequently used without incident" },
            { label: "Wrong antibiotic given or antibiotic entirely missed", note: "Regardless of whether SSI occurred" },
            { label: "Patient self-trauma resulting in incision opening or suspected contamination", note: "E-collar failure, inadequate wound protection" },
          ],
        },
        {
          header: "Trend-Based Triggers — Initiate Systemic Review",
          items: [
            { label: "Any tracked compliance metric falls below target for two consecutive months", note: "e.g., Antibiotic timing <95% for two months" },
            { label: "Two or more SSIs of similar type or procedure within a 90-day period", note: "Possible systemic or environmental cause" },
            { label: "Repeated noncompliance by the same team member documented across multiple cases", note: "Escalate to individual and systemic review" },
            { label: "Multiple IUSS events in a single month", note: "Indicates systemic sterility readiness failure" },
          ],
        },
        {
          header: "No Trigger — Document and Monitor",
          items: [
            { label: "Single minor deviation managed per protocol with no patient harm", note: "Document in case record; review at next monthly meeting" },
            { label: "Owner-reported concern that resolves on recheck without SSI confirmed", note: "Document; add to surveillance denominator follow-up" },
            { label: "Near-miss identified and corrected without breach reaching the patient", note: "Document; consider voluntary case discussion at team meeting" },
          ],
        },
      ],
      warning: {
        label: "When in Doubt, Trigger a Review",
        text: "If there is uncertainty about whether an event meets trigger criteria, default to initiating the review. The cost of an unnecessary review is low; the cost of missing a systemic issue is an SSI that was preventable.",
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

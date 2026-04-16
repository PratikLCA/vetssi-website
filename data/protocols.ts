export type Protocol = {
  slug: string;
  title: string;
  phase: "preoperative" | "intraoperative" | "postoperative";
  clinicalObjective: string;
  steps: string[];
  pitfalls: string[];
  expertInsight: string;
  evidence: { citation: string; doi?: string }[];
  relatedProtocols: string[];
  relatedVideos: string[];
};

export const protocols: Protocol[] = [
  // ─── PREOPERATIVE ────────────────────────────────────────────────────────────
  {
    slug: "patient-selection-risk-stratification",
    title: "Patient Selection & Risk Stratification",
    phase: "preoperative",
    clinicalObjective:
      "Identify patients at elevated risk for surgical site infection prior to scheduling or proceeding with elective procedures. Risk stratification enables targeted prophylactic measures and informed client communication. A structured pre-surgical assessment reduces preventable SSIs by allowing protocol modifications before the patient reaches the operating room.",
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
    relatedProtocols: ["preoperative-skin-preparation", "perioperative-antibiotic-prophylaxis"],
    relatedVideos: ["preoperative-patient-assessment"],
  },
  {
    slug: "preoperative-skin-preparation",
    title: "Preoperative Skin Preparation",
    phase: "preoperative",
    clinicalObjective:
      "Reduce the microbial burden on the patient's skin at and around the intended surgical site to the lowest achievable level before incision. Effective skin preparation addresses both resident and transient flora and is among the most impactful single interventions in SSI prevention.",
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
    clinicalObjective:
      "Establish evidence-based standards for the timing, extent, and method of hair removal from the surgical site. Clipping-related microabrasions are a primary contributor to SSI risk; technique and timing both significantly affect outcomes.",
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
    clinicalObjective:
      "Select and correctly apply antiseptic agents to achieve maximal reduction in viable organisms at the surgical site immediately prior to draping and incision. Agent selection and application method must be matched to the site anatomy and patient characteristics.",
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
    slug: "perioperative-antibiotic-prophylaxis",
    title: "Perioperative Antibiotic Prophylaxis",
    phase: "preoperative",
    clinicalObjective:
      "Administer systemic antibiotic prophylaxis at the correct time, dose, and duration to reduce SSI risk in appropriate surgical cases, while avoiding unnecessary antibiotic use that contributes to antimicrobial resistance. Prophylaxis is not a substitute for good surgical technique.",
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
          "Weese JS, et al. Antimicrobial use guidelines for treatment of urinary tract disease in dogs and cats: Antimicrobial Guidelines Working Group of the International Society for Companion Animal Infectious Diseases. Veterinary Medicine International. 2011;2011:263768.",
        doi: "10.4061/2011/263768",
      },
      {
        citation:
          "Nelson LL. Surgical site infections in small animal surgery. Veterinary Clinics of North America: Small Animal Practice. 2011;41(5):1041–1056.",
        doi: "10.1016/j.cvsm.2011.05.010",
      },
    ],
    relatedProtocols: ["patient-selection-risk-stratification", "antibiotic-stewardship-decisions"],
    relatedVideos: ["antibiotic-timing-overview"],
  },

  // ─── INTRAOPERATIVE ──────────────────────────────────────────────────────────
  {
    slug: "aseptic-technique-sterile-field",
    title: "Aseptic Technique & Sterile Field Maintenance",
    phase: "intraoperative",
    clinicalObjective:
      "Maintain an uncompromised sterile field throughout the procedure by establishing clear boundaries, enforcing behavioral discipline, and responding immediately to any breach. Sterile field failures are a primary cause of preventable intraoperative contamination.",
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
    relatedProtocols: ["surgical-draping-methods", "or-traffic-environmental"],
    relatedVideos: ["sterile-gowning-gloving", "sterile-field-setup"],
  },
  {
    slug: "surgical-draping-methods",
    title: "Surgical Draping Methods",
    phase: "intraoperative",
    clinicalObjective:
      "Correctly apply sterile surgical drapes to isolate the prepared surgical site from the patient's surrounding (non-sterile) body surfaces, equipment, and the environment. Proper draping is the final physical barrier between the prepared field and contamination.",
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
    relatedProtocols: ["aseptic-technique-sterile-field", "or-traffic-environmental"],
    relatedVideos: ["draping-technique-demo"],
  },
  {
    slug: "or-traffic-environmental",
    title: "OR Traffic Control & Environmental Management",
    phase: "intraoperative",
    clinicalObjective:
      "Minimize airborne and contact contamination within the operating room by controlling personnel movement, door activity, and environmental conditions during surgery. OR environment is a modifiable SSI risk factor that is frequently underestimated.",
    steps: [
      "Limit OR occupancy to the minimum required for the procedure — count personnel before starting.",
      "Designate a circulating nurse responsible for managing access during the case.",
      "Keep OR doors closed throughout the procedure; each door opening displaces clean air and introduces particulates.",
      "Brief all team members before the procedure: no unnecessary movement, no exit-reentry without necessity.",
      "Maintain OR temperature between 18–24°C and relative humidity 40–60% per HVAC standards.",
      "Ensure proper positive-pressure ventilation is functioning before beginning the procedure.",
      "Conduct post-case cleaning with approved disinfectants before the next patient enters.",
    ],
    pitfalls: [
      "Propping OR doors open between cases or during procedures — this fundamentally compromises positive pressure.",
      "Allowing non-essential students, observers, or staff to be present, particularly in small ORs.",
      "Failing to enforce re-entry restrictions: personnel who leave mid-case and return carry contamination back in.",
      "Performing OR cleaning cursorily between back-to-back cases.",
    ],
    expertInsight:
      "In high-volume teaching hospitals, OR door openings are one of the most consistent and modifiable SSI risk variables. Studies in human surgery have documented that each door opening during a procedure delivers a measurable increase in particulate count within the sterile field vicinity. The data in veterinary surgery is limited but the physics are identical. Fewer people, fewer doors, fewer infections.",
    evidence: [
      {
        citation:
          "Pryor F, et al. The effect of traffic patterns in the OR on surgical site infections. AORN Journal. 2010;91(6):762–794.",
        doi: "10.1016/j.aorn.2010.02.014",
      },
      {
        citation:
          "Stockert EW, et al. Quantifying and reducing central venous catheter complications. Annals of Surgery. 2014;259(6):1166–1173.",
        doi: "10.1097/SLA.0000000000000274",
      },
    ],
    relatedProtocols: ["aseptic-technique-sterile-field", "surgical-draping-methods"],
    relatedVideos: ["or-setup-walkthrough"],
  },
  {
    slug: "instrument-sterilization",
    title: "Instrument Handling & Sterilization",
    phase: "intraoperative",
    clinicalObjective:
      "Ensure all instruments and implants used in surgery are properly decontaminated, packaged, sterilized, and maintained in sterile condition until the moment of use. Instrument-related contamination is one of the few SSI causes that is entirely preventable.",
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
    relatedProtocols: ["aseptic-technique-sterile-field", "or-traffic-environmental"],
    relatedVideos: ["instrument-prep-packing"],
  },

  // ─── POSTOPERATIVE ───────────────────────────────────────────────────────────
  {
    slug: "wound-management-dressing",
    title: "Wound Management & Dressing",
    phase: "postoperative",
    clinicalObjective:
      "Apply appropriate wound closure and primary dressing to protect the surgical site during the initial healing phase, minimize contamination from the environment, and facilitate early detection of complications. Wound care decisions in the immediate postoperative period significantly influence SSI rates.",
    steps: [
      "Close the surgical wound in layers, eliminating dead space that provides a nidus for infection.",
      "Irrigate the wound with sterile saline before closure in contaminated or clean-contaminated cases.",
      "Apply a sterile primary dressing to all wounds at the conclusion of surgery, prior to the patient leaving the table.",
      "Select dressing type based on wound classification: non-adherent primary layer for most clean wounds.",
      "Secure the dressing with appropriate secondary layer to prevent patient interference.",
      "Label the dressing with the application date and time.",
      "Provide owner with written wound care instructions before discharge.",
    ],
    pitfalls: [
      "Failing to close dead space, particularly in large dissections — seromas are a common precursor to SSI.",
      "Applying adhesive dressings directly to freshly sutured wounds without a non-adherent interface.",
      "Leaving wounds undressed in the immediate postoperative period on the assumption they are 'sealed' by sutures.",
      "Using occlusive moisture-retaining dressings on wounds at risk for anaerobic infection.",
    ],
    expertInsight:
      "The first 24–48 hours are when the wound is most vulnerable. An intact epithelial seal typically forms by 48 hours, but this requires an undisturbed wound environment. Any patient activity, licking, abrasion, or moisture ingress in this window meaningfully elevates infection risk. The dressing is not optional — it is the physical barrier that bridges the gap between surgical closure and epithelial healing.",
    evidence: [
      {
        citation:
          "Atiyeh BS, et al. Effect of moist and dry conditions on dermal repair. Journal of Trauma. 2002;52(6):1173–1180.",
        doi: "10.1097/00005373-200206000-00023",
      },
      {
        citation:
          "Stashak TS, Theoret C. Equine Wound Management, 2nd ed. Wiley-Blackwell; 2008. [Referenced for small animal extrapolation]",
      },
    ],
    relatedProtocols: ["bandaging-protocols", "post-op-monitoring-early-detection"],
    relatedVideos: ["wound-dressing-technique"],
  },
  {
    slug: "bandaging-protocols",
    title: "Bandaging Protocols",
    phase: "postoperative",
    clinicalObjective:
      "Apply and manage bandages for postoperative wounds in a manner that protects the site, supports healing, prevents self-trauma, and allows regular assessment. Incorrectly applied bandages are themselves a cause of wound complications.",
    steps: [
      "Assess the wound and surgical site to determine whether bandaging is indicated and what type is appropriate.",
      "Prepare the skin: ensure the perilesional skin is clean and dry before application.",
      "Apply primary contact layer (non-adherent, moisture-wicking) directly against the wound.",
      "Apply secondary padded layer (cast padding, cotton roll) to provide cushioning and absorb exudate.",
      "Apply tertiary conforming and cohesive layer with uniform pressure — avoid circumferential tightness.",
      "Check bandage pressure: the '2-finger rule' — two fingers should slide under the proximal bandage edge.",
      "Schedule bandage changes at appropriate intervals (typically 24–48h initially, then every 2–3 days for clean wounds).",
    ],
    pitfalls: [
      "Applying bandages too tightly, causing pressure necrosis, particularly over bony prominences.",
      "Failing to pad bony prominences (lateral malleolus, olecranon, calcaneus) before conforming wrap.",
      "Infrequent bandage changes, which allow maceration of the wound and undetected infection.",
      "Wetting of the bandage — once wet, a bandage must be changed immediately regardless of schedule.",
    ],
    expertInsight:
      "The most common bandage failure mode I see is tightness applied with good intention — a tight bandage feels more secure to the applicator but is the primary cause of bandage-related iatrogenic injury. Teach every technician the 2-finger rule until it is automatic. Equally important: if a patient is distressed, chewing at, or otherwise interfering with a bandage, that is a clinical sign — not a behavior problem.",
    evidence: [
      {
        citation:
          "Swaim SF, Henderson RA. Small Animal Wound Management, 2nd ed. Williams & Wilkins; 1997.",
      },
      {
        citation:
          "Campbell BG. Bandages and drains. In: Tobias KM, Johnston SA, eds. Veterinary Surgery: Small Animal. Elsevier Saunders; 2012:221–230.",
      },
    ],
    relatedProtocols: ["wound-management-dressing", "post-op-monitoring-early-detection"],
    relatedVideos: ["bandaging-technique-demo"],
  },
  {
    slug: "post-op-monitoring-early-detection",
    title: "Post-op Monitoring & Early Detection",
    phase: "postoperative",
    clinicalObjective:
      "Establish a structured postoperative monitoring protocol that enables early identification of signs consistent with surgical site infection, allowing timely intervention before superficial infection progresses to deep or organ-space disease.",
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
    relatedProtocols: ["wound-management-dressing", "antibiotic-stewardship-decisions"],
    relatedVideos: ["wound-assessment-technique"],
  },
  {
    slug: "antibiotic-stewardship-decisions",
    title: "Antibiotic Stewardship Decisions",
    phase: "postoperative",
    clinicalObjective:
      "Apply evidence-based criteria to antibiotic prescribing decisions in the postoperative period, ensuring that antimicrobials are used when genuinely indicated, at the correct dose and duration, and that antimicrobial resistance implications are considered for every prescription.",
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
    relatedProtocols: ["post-op-monitoring-early-detection", "perioperative-antibiotic-prophylaxis"],
    relatedVideos: ["antibiotic-timing-overview"],
  },
];

export function getProtocolBySlug(slug: string): Protocol | undefined {
  return protocols.find((p) => p.slug === slug);
}

export function getProtocolsByPhase(phase: Protocol["phase"]): Protocol[] {
  return protocols.filter((p) => p.phase === phase);
}

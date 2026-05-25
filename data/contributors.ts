export type Contributor = {
  id: string;
  name: string;
  credentials: string;
  institution: string;
  initials: string;
  bio: string;
  areas: string[];
  founding: boolean;
};

export const contributors: Contributor[] = [
  {
    id: "aldredo-vezzoni",
    name: "Dr. Aldo Vezzoni",
    credentials: "DVM, Diplomate ECVS",
    institution: "Clinica Veterinaria Vezzoni, Cremona, Italy",
    initials: "AV",
    bio: "Dr. Aldo Vezzoni is a diplomate of the European College of Veterinary Surgeons with over three decades of clinical experience in small animal orthopedic and soft tissue surgery. He is internationally recognized for his contributions to the surgical management of hip dysplasia, including extensive work on triple pelvic osteotomy and total hip replacement techniques. Dr. Vezzoni has authored numerous peer-reviewed publications, contributed to major veterinary surgical textbooks, and has been a faculty member at advanced surgical training programs across Europe and North America. His commitment to evidence-based practice and meticulous surgical technique has established him as a leading authority on surgical site infection prevention in the veterinary surgical community.",
    areas: [
      "Preoperative Protocols",
      "Aseptic Technique",
      "Orthopedic Surgery SSI",
      "Antibiotic Stewardship",
      "Wound Management",
    ],
    founding: true,
  },
  {
    id: "denis-verwilghen",
    name: "Dr. Denis Verwilghen",
    credentials: "PhD, Diplomate ECVS, Diplomate EVDC (Equine)",
    institution: "Sydney School of Veterinary Science, University of Sydney; Goulburn Valley Equine Hospital, University of Melbourne",
    initials: "DV",
    bio: "Dr. Denis Verwilghen is a diplomate of both the European College of Veterinary Surgeons and the European Veterinary Dental College (equine), with a clinical and research focus on equine surgery, surgical infection control, and antimicrobial stewardship. He holds an academic appointment at the Sydney School of Veterinary Science at the University of Sydney and practices at the Goulburn Valley Equine Hospital with the University of Melbourne. Dr. Verwilghen led the international Delphi consensus that produced the first standardized terminology for surgical site infections in veterinary medicine — the 2026 AJVR consensus on which the VETSSI Definitions Framework is built. He convened and chaired the multidisciplinary expert panel of thirty-two specialists spanning surgery, internal medicine, anesthesia, critical care, dentistry, microbiology, preventive medicine, animal welfare, and human infection control. His work establishes the shared clinical and research language now used to compare SSI rates, identify risk factors, and develop evidence-based prevention guidelines across the veterinary field.",
    areas: [
      "SSI Definitions & Consensus",
      "Equine Surgery",
      "Surgical Infection Control",
      "Antimicrobial Stewardship",
      "Veterinary Dentistry (Equine)",
    ],
    founding: true,
  },
  {
    id: "barbara-matthiesen",
    name: "Dr. Barbara Matthiesen",
    credentials: "DVM, MS, Diplomate ACVS",
    institution: "Placeholder Veterinary Teaching Hospital, United States",
    initials: "BM",
    bio: "Dr. Matthiesen is a board-certified veterinary surgeon with specialist expertise in minimally invasive surgery and soft tissue oncology. She contributes to VETSSI's protocols on intraoperative technique and postoperative wound management.",
    areas: ["Intraoperative Technique", "Soft Tissue Surgery", "Wound Closure"],
    founding: false,
  },
  {
    id: "sophie-collet",
    name: "Dr. Sophie Collet",
    credentials: "DVM, Diplomate ECVS",
    institution: "Placeholder Veterinary Referral Centre, France",
    initials: "SC",
    bio: "Dr. Collet practices at a multi-specialty veterinary referral centre in France, with a clinical focus on orthopedic reconstruction and implant surgery. Her work on perioperative antibiotic protocols informs VETSSI's stewardship guidelines.",
    areas: ["Orthopedic SSI Prevention", "Perioperative Antibiotics", "Implant Infection"],
    founding: false,
  },
  {
    id: "rodrigo-torres",
    name: "Dr. Rodrigo Torres",
    credentials: "MV, MS, PhD",
    institution: "Placeholder Veterinary University, Brazil",
    initials: "RT",
    bio: "Dr. Torres is a veterinary surgeon and researcher whose laboratory studies focus on biofilm formation on orthopedic implants and novel antiseptic strategies. He contributes research synthesis to VETSSI's evidence base.",
    areas: ["Biofilm Research", "Antiseptic Science", "Implant Infections"],
    founding: false,
  },
];

export function getFoundingContributors(): Contributor[] {
  return contributors.filter((c) => c.founding);
}

export function getContributingExperts(): Contributor[] {
  return contributors.filter((c) => !c.founding);
}

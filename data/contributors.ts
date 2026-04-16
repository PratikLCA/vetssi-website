export type Contributor = {
  id: string;
  name: string;
  credentials: string;
  institution: string;
  initials: string;
  bio: string;
  areas: string[];
  featured: boolean;
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
    featured: true,
  },
  {
    id: "barbara-matthiesen",
    name: "Dr. Barbara Matthiesen",
    credentials: "DVM, MS, Diplomate ACVS",
    institution: "Placeholder Veterinary Teaching Hospital, United States",
    initials: "BM",
    bio: "Dr. Matthiesen is a board-certified veterinary surgeon with specialist expertise in minimally invasive surgery and soft tissue oncology. She contributes to VETSSI's protocols on intraoperative technique and postoperative wound management.",
    areas: ["Intraoperative Technique", "Soft Tissue Surgery", "Wound Closure"],
    featured: false,
  },
  {
    id: "sophie-collet",
    name: "Dr. Sophie Collet",
    credentials: "DVM, Diplomate ECVS",
    institution: "Placeholder Veterinary Referral Centre, France",
    initials: "SC",
    bio: "Dr. Collet practices at a multi-specialty veterinary referral centre in France, with a clinical focus on orthopedic reconstruction and implant surgery. Her work on perioperative antibiotic protocols informs VETSSI's stewardship guidelines.",
    areas: ["Orthopedic SSI Prevention", "Perioperative Antibiotics", "Implant Infection"],
    featured: false,
  },
  {
    id: "rodrigo-torres",
    name: "Dr. Rodrigo Torres",
    credentials: "MV, MS, PhD",
    institution: "Placeholder Veterinary University, Brazil",
    initials: "RT",
    bio: "Dr. Torres is a veterinary surgeon and researcher whose laboratory studies focus on biofilm formation on orthopedic implants and novel antiseptic strategies. He contributes research synthesis to VETSSI's evidence base.",
    areas: ["Biofilm Research", "Antiseptic Science", "Implant Infections"],
    featured: false,
  },
];

export function getFeaturedContributor(): Contributor | undefined {
  return contributors.find((c) => c.featured);
}

export function getSupportingContributors(): Contributor[] {
  return contributors.filter((c) => !c.featured);
}

export type Publication = {
  id: string;
  authors: string;
  title: string;
  journal: string;
  year: number;
  doi: string;
  featured?: boolean;
  abstract?: string;
};

export type Guideline = {
  id: string;
  title: string;
  organization: string;
  year: number;
  url: string;
};

export type DownloadableTool = {
  id: string;
  title: string;
  description: string;
  fileSize: string;
  fileType: string;
};

export const publications: Publication[] = [
  {
    id: "vezzoni-review-2023",
    authors: "Vezzoni A, et al.",
    title:
      "Surgical Site Infection Prevention in Companion Animal Surgery: A Systematic Review and Clinical Framework",
    journal: "Veterinary Surgery",
    year: 2023,
    doi: "10.1111/vsu.XXXXXX",
    featured: true,
    abstract:
      "A comprehensive systematic review of evidence-based interventions for SSI prevention in small animal surgery, proposing a multi-domain clinical framework for implementation in practice. The review synthesizes data from 87 clinical studies and provides a graded evidence hierarchy for each intervention category.",
  },
  {
    id: "eugster-2004",
    authors: "Eugster S, Schawalder P, Gaschen F, Boerlin P",
    title: "A prospective study of postoperative infections in dogs and cats",
    journal: "Veterinary Surgery",
    year: 2004,
    doi: "10.1111/j.1532-950X.2004.04076.x",
    featured: false,
  },
  {
    id: "turk-2015",
    authors: "Turk R, Singh A, Weese JS",
    title:
      "Prospective surgical site infection surveillance in dogs",
    journal: "Veterinary Surgery",
    year: 2015,
    doi: "10.1111/vsu.12375",
    featured: false,
  },
  {
    id: "nelson-2011",
    authors: "Nelson LL",
    title: "Surgical site infections in small animal surgery",
    journal: "Veterinary Clinics of North America: Small Animal Practice",
    year: 2011,
    doi: "10.1016/j.cvsm.2011.05.010",
    featured: false,
  },
];

export const guidelines: Guideline[] = [
  {
    id: "acvs-2022",
    title: "ACVS Guidelines for Perioperative Antibiotic Use in Small Animal Surgery",
    organization: "American College of Veterinary Surgeons (ACVS)",
    year: 2022,
    url: "#",
  },
  {
    id: "ecvs-2021",
    title: "ECVS Position Statement on Surgical Site Infection Prevention",
    organization: "European College of Veterinary Surgeons (ECVS)",
    year: 2021,
    url: "#",
  },
  {
    id: "iscaid-2019",
    title: "International Society for Companion Animal Infectious Diseases: Antimicrobial Use Guidelines",
    organization: "ISCAID Antimicrobial Guidelines Working Group",
    year: 2019,
    url: "#",
  },
];

export const downloadableTools: DownloadableTool[] = [
  {
    id: "preop-checklist",
    title: "Preoperative SSI Prevention Checklist",
    description:
      "A structured checklist covering all preoperative SSI prevention measures from patient assessment through skin preparation. Suitable for lamination and OR use.",
    fileSize: "148 KB",
    fileType: "PDF",
  },
  {
    id: "antibiotic-guide",
    title: "Perioperative Antibiotic Stewardship Quick Reference",
    description:
      "Agent selection guide, dosing table, and timing reference for perioperative antibiotic prophylaxis in common veterinary surgical procedures.",
    fileSize: "210 KB",
    fileType: "PDF",
  },
  {
    id: "ssi-audit-template",
    title: "SSI Surveillance Audit Template",
    description:
      "A practice-level audit tool for tracking surgical site infections by procedure type, identifying patterns, and benchmarking against published SSI rates.",
    fileSize: "95 KB",
    fileType: "PDF",
  },
];

export function getFeaturedPublication(): Publication | undefined {
  return publications.find((p) => p.featured);
}

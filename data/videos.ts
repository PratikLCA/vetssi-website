export type VideoCategory = "preparation" | "draping" | "scrubbing" | "or-setup";

export type Video = {
  slug: string;
  title: string;
  category: VideoCategory;
  duration: string;
  description: string;
  keyTakeaways: string[];
  linkedProtocols: string[];
};

export const videos: Video[] = [
  {
    slug: "skin-prep-technique",
    title: "Preoperative Skin Preparation: Step-by-Step",
    category: "preparation",
    duration: "6:14",
    description:
      "Demonstrates the complete preoperative skin preparation sequence using chlorhexidine gluconate, from initial gross clean through final antiseptic paint coat.",
    keyTakeaways: [
      "Work from the incision center outward in continuous concentric circles — never back-and-forth.",
      "Allow minimum 30 seconds of scrubbing contact time per antiseptic cycle.",
      "Three alternating scrub-and-rinse cycles are required before the final paint coat.",
      "The final alcohol-based coat must be fully dry before drapes are applied.",
    ],
    linkedProtocols: ["preoperative-skin-preparation", "surgical-site-antisepsis"],
  },
  {
    slug: "clipping-technique-demo",
    title: "Clipping Timing, Technique & Margin",
    category: "preparation",
    duration: "4:45",
    description:
      "Covers hair removal technique including appropriate margin selection, blade maintenance, and the critical importance of same-day clipping to minimize SSI risk from skin microabrasions.",
    keyTakeaways: [
      "Clip within 1–2 hours of incision — overnight clipping significantly elevates SSI risk.",
      "Use a size 40 blade for fine areas; size 10 for gross removal in well-coated dogs.",
      "Maintain a minimum 10 cm margin beyond the anticipated incision.",
      "Remove all clipped hair with a vacuum before prep — never brush near the surgical site.",
    ],
    linkedProtocols: ["clipping-timing-technique", "preoperative-skin-preparation"],
  },
  {
    slug: "draping-technique-demo",
    title: "Surgical Draping: Placement, Fenestration & Common Errors",
    category: "draping",
    duration: "5:52",
    description:
      "Demonstrates correct application of quaternary draping technique, including towel clamp placement, fenestrated field drape application, and the absolute rule against drape repositioning.",
    keyTakeaways: [
      "Apply towel drapes beginning at the prepared site working outward — never inward.",
      "Secure with four towel clamps before applying the field drape.",
      "Once placed, drapes are never repositioned — add a supplementary drape if coverage is inadequate.",
      "Check that all non-sterile surfaces (anesthetic lines, monitoring leads) are covered.",
    ],
    linkedProtocols: ["surgical-draping-methods", "aseptic-technique-sterile-field"],
  },
  {
    slug: "sterile-gowning-gloving",
    title: "Sterile Gowning & Closed Gloving Technique",
    category: "scrubbing",
    duration: "7:08",
    description:
      "Full demonstration of sterile gown donning and closed gloving technique, including common error points where sterility is most frequently compromised.",
    keyTakeaways: [
      "Keep hands inside gown cuffs throughout the gloving sequence — the closed technique is not optional.",
      "Once gowned, hands must remain above the waist and in front of the body.",
      "If a glove is contaminated, verbally announce immediately and change before proceeding.",
      "The gown is only sterile front-center from chest to waist — the back and axilla are not sterile.",
    ],
    linkedProtocols: ["aseptic-technique-sterile-field"],
  },
  {
    slug: "or-setup-walkthrough",
    title: "Operating Room Setup & Traffic Control",
    category: "or-setup",
    duration: "8:20",
    description:
      "Walkthrough of proper OR setup sequence including equipment placement, door discipline, team positioning, and the environmental controls that reduce airborne contamination.",
    keyTakeaways: [
      "OR doors remain closed for the entire procedure — designate one team member to manage access.",
      "Limit room occupancy to essential personnel; each additional person elevates particulate count.",
      "Positive pressure ventilation must be confirmed functional before the first patient enters.",
      "Brief the full team before the case begins: movement restrictions, sterile boundaries, contamination protocol.",
    ],
    linkedProtocols: ["or-traffic-environmental", "aseptic-technique-sterile-field"],
  },
  {
    slug: "antiseptic-application",
    title: "Antiseptic Application: Agent Selection & Contact Time",
    category: "preparation",
    duration: "3:58",
    description:
      "Explains the evidence behind antiseptic agent selection, correct application pattern, required contact times, and the critical drying step before draping.",
    keyTakeaways: [
      "Chlorhexidine-alcohol combinations outperform povidone-iodine in most comparative studies.",
      "Do not use alcohol-containing preps on mucous membranes, ear canals, or near the eyes.",
      "Apply paint coat after scrub cycles are complete; allow full evaporation before draping.",
      "Do not pool solution under the patient — 30-second contact does not require saturation.",
    ],
    linkedProtocols: ["surgical-site-antisepsis", "preoperative-skin-preparation"],
  },
];

export function getVideoBySlug(slug: string): Video | undefined {
  return videos.find((v) => v.slug === slug);
}

export function getVideosByCategory(category: VideoCategory): Video[] {
  return videos.filter((v) => v.category === category);
}

export const videoCategoryLabels: Record<VideoCategory, string> = {
  preparation: "Preparation",
  draping: "Draping",
  scrubbing: "Scrubbing",
  "or-setup": "OR Setup",
};

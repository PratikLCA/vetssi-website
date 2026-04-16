import Link from "next/link";
import { User, Stethoscope, Wind, Scissors, Heart, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "The SSI Prevention System" };

const domains = [
  {
    icon: User,
    name: "Patient Factors",
    description:
      "The patient's own biology and health status significantly influence SSI risk and must be assessed before surgery.",
    factors: [
      "Comorbidities: diabetes, hyperadrenocorticism, renal disease",
      "Immune status and concurrent immunosuppressive therapy",
      "Body condition score — obesity elevates risk independently",
      "Coat and skin condition near the surgical site",
      "Prior infections, colonization, or resistant organisms",
    ],
    protocol: { label: "Patient Risk Stratification", slug: "patient-selection-risk-stratification" },
  },
  {
    icon: Stethoscope,
    name: "Surgeon Behavior",
    description:
      "The discipline and consistency of surgical behavior — from hand hygiene to sterile field maintenance — is among the highest-impact modifiable variables.",
    factors: [
      "Surgical hand scrub technique and compliance",
      "Sterile gowning and closed gloving discipline",
      "Sterile field maintenance throughout the procedure",
      "Tissue handling: hemostasis, dead space elimination, gentle dissection",
      "Operative time — longer procedures correlate with higher SSI rates",
    ],
    protocol: { label: "Aseptic Technique", slug: "aseptic-technique-sterile-field" },
  },
  {
    icon: Wind,
    name: "Environment",
    description:
      "The operating room environment is a modifiable source of microbial contamination that is frequently underestimated and under-managed.",
    factors: [
      "OR air quality and positive-pressure ventilation",
      "Door openings and personnel traffic during procedures",
      "Surface contamination and inter-case cleaning protocols",
      "Temperature and humidity within HVAC guidelines",
      "OR occupancy — excess personnel increase particulate counts",
    ],
    protocol: { label: "OR Traffic Control", slug: "or-traffic-environmental" },
  },
  {
    icon: Scissors,
    name: "Operative Technique",
    description:
      "The technical quality of the surgical procedure directly determines tissue viability, contamination risk, and the conditions under which healing will occur.",
    factors: [
      "Tissue handling: minimize trauma, devitalization, and crushing",
      "Hemostasis: control of bleeding prevents hematoma formation",
      "Dead space elimination through layered closure",
      "Foreign body and implant management",
      "Surgical draping integrity and maintenance",
    ],
    protocol: { label: "Surgical Draping Methods", slug: "surgical-draping-methods" },
  },
  {
    icon: Heart,
    name: "Post-op Care",
    description:
      "The postoperative period represents the final critical window for SSI prevention — from wound protection through monitoring and stewardship decisions.",
    factors: [
      "Wound dressing: application, integrity, and change intervals",
      "Bandaging technique and complication monitoring",
      "Owner education on wound signs and activity restriction",
      "Structured recheck protocols and early detection",
      "Evidence-based antibiotic stewardship decisions",
    ],
    protocol: { label: "Post-op Monitoring", slug: "post-op-monitoring-early-detection" },
  },
];

export default function TheSystemPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white hero-pattern">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <p className="nav-link text-steel-light mb-5">Systems Approach to SSI Prevention</p>
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-5 leading-tight">
              SSI Prevention Is Not One Thing
            </h1>
            <p className="text-white/70 font-light text-lg leading-relaxed">
              Surgical site infections arise from the interaction of multiple variables across the entire surgical pathway.
              Understanding this as a system — not a single intervention problem — is the foundation of effective prevention.
            </p>
          </div>
        </div>
      </section>

      {/* Five Domains */}
      <section className="bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="mb-12 max-w-2xl">
            <h2 className="font-serif text-3xl font-medium text-navy mb-4">
              Five Domains of SSI Risk
            </h2>
            <p className="text-text-muted text-base font-light leading-relaxed">
              Each domain represents a category of modifiable risk factors. Effective SSI prevention requires
              addressing all five — no single domain is sufficient in isolation.
            </p>
          </div>

          <div className="space-y-6">
            {domains.map((domain, i) => {
              const Icon = domain.icon;
              return (
                <div key={domain.name} className="card bg-white border border-warm-gray">
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Domain number + icon */}
                      <div className="flex items-center gap-4 md:flex-col md:items-center md:w-20 flex-shrink-0">
                        <div className="w-12 h-12 bg-navy flex items-center justify-center flex-shrink-0">
                          <Icon size={22} className="text-white" />
                        </div>
                        <span className="font-serif text-5xl font-medium text-warm-gray md:text-center">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-serif text-2xl font-medium text-navy mb-2">{domain.name}</h3>
                        <p className="text-sm text-text-muted leading-relaxed mb-5">{domain.description}</p>

                        {/* Factors */}
                        <ul className="space-y-2 mb-6">
                          {domain.factors.map((factor) => (
                            <li key={factor} className="flex gap-3 text-sm text-text-primary">
                              <span className="flex-shrink-0 w-1.5 h-1.5 bg-steel rounded-full mt-2" />
                              {factor}
                            </li>
                          ))}
                        </ul>

                        <Link
                          href={`/protocols/${domain.protocol.slug}`}
                          className="inline-flex items-center gap-1.5 text-steel text-sm font-medium hover:text-navy transition-colors"
                        >
                          {domain.protocol.label} Protocol
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing callout */}
      <section className="bg-navy-mid text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <p className="font-serif text-2xl md:text-3xl font-medium leading-relaxed mb-8 text-white/90">
              &ldquo;No single intervention prevents SSI. The evidence consistently shows that bundles — combinations of
              interventions applied reliably — produce the best outcomes.&rdquo;
            </p>
            <Link
              href="/protocols"
              className="inline-flex items-center gap-2 bg-steel hover:bg-steel-light text-white px-7 py-3.5 text-sm font-medium nav-link transition-colors"
            >
              Explore the Protocols
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

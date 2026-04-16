import PageHeader from "@/components/PageHeader";
import ContributorCard from "@/components/ContributorCard";
import { getFeaturedContributor, getSupportingContributors } from "@/data/contributors";
import { Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Expert Contributors" };

export default function ContributorsPage() {
  const featured = getFeaturedContributor();
  const supporting = getSupportingContributors();

  return (
    <>
      <PageHeader
        title="Expert Contributors"
        subtitle="VETSSI is built on the expertise of leading veterinary surgeons worldwide"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Featured contributor */}
        {featured && (
          <div className="mb-12">
            <p className="nav-link text-steel mb-4">Lead Expert</p>
            <ContributorCard contributor={featured} featured />
          </div>
        )}

        {/* Supporting contributors */}
        <div className="mb-16">
          <p className="nav-link text-steel mb-4">Contributing Experts</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supporting.map((contributor) => (
              <ContributorCard key={contributor.id} contributor={contributor} />
            ))}
          </div>
        </div>

        {/* Join section */}
        <div className="card bg-white border border-warm-gray p-10 max-w-2xl">
          <h2 className="font-serif text-2xl font-medium text-navy mb-3">
            Are you a veterinary surgeon with expertise in SSI prevention?
          </h2>
          <p className="text-sm text-text-muted leading-relaxed mb-6">
            VETSSI is built through collaboration with leading veterinary surgical specialists. We are actively seeking
            contributors who can review existing protocols, propose evidence-based additions, and lend their clinical
            experience to advancing the platform. Contributors retain editorial independence and are acknowledged prominently
            for their contributions.
          </p>
          <a
            href="mailto:contributors@vetssi.com?subject=Contributor Interest"
            className="inline-flex items-center gap-2 bg-navy text-white px-7 py-3.5 text-sm font-medium hover:bg-navy-mid transition-colors"
          >
            <Mail size={14} />
            Express Interest
          </a>
        </div>
      </div>
    </>
  );
}

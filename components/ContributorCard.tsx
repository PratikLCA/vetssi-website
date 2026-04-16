import { Contributor } from "@/data/contributors";

interface ContributorCardProps {
  contributor: Contributor;
  featured?: boolean;
}

export default function ContributorCard({ contributor, featured = false }: ContributorCardProps) {
  if (featured) {
    return (
      <div className="card bg-white border border-warm-gray p-8 md:p-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div
              className="w-24 h-24 rounded-full bg-navy flex items-center justify-center"
              aria-label={contributor.name}
            >
              <span className="font-serif text-3xl font-medium text-white">{contributor.initials}</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="mb-1">
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-navy">{contributor.name}</h2>
            </div>
            <p className="text-steel text-sm mb-1">{contributor.credentials}</p>
            <p className="text-text-muted text-sm mb-5">{contributor.institution}</p>

            <p className="text-sm leading-relaxed text-text-primary mb-6">{contributor.bio}</p>

            {/* Specialty tags */}
            <div className="flex flex-wrap gap-2">
              {contributor.areas.map((area) => (
                <span
                  key={area}
                  className="text-xs px-3 py-1 bg-cream border border-warm-gray text-text-muted"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-white border border-warm-gray p-6">
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-full bg-navy-mid flex items-center justify-center flex-shrink-0"
          aria-label={contributor.name}
        >
          <span className="font-serif text-lg font-medium text-white">{contributor.initials}</span>
        </div>
        <div>
          <h3 className="font-serif text-lg font-medium text-navy leading-tight">{contributor.name}</h3>
          <p className="text-xs text-steel">{contributor.credentials}</p>
          <p className="text-xs text-text-muted">{contributor.institution}</p>
        </div>
      </div>
      <p className="text-sm text-text-muted leading-relaxed mb-4">{contributor.bio}</p>
      <div className="flex flex-wrap gap-2">
        {contributor.areas.slice(0, 3).map((area) => (
          <span
            key={area}
            className="text-xs px-2.5 py-1 bg-cream border border-warm-gray text-text-muted"
          >
            {area}
          </span>
        ))}
      </div>
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="bg-cream border-b border-warm-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <h1 className="font-serif text-4xl md:text-5xl font-medium text-navy mb-4 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-text-muted text-lg font-light max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

interface JumpNavItem {
  id: string;
  label: string;
}

interface JumpNavProps {
  items: JumpNavItem[];
  ariaLabel?: string;
}

export default function JumpNav({ items, ariaLabel = "Jump to section" }: JumpNavProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className="bg-white border border-warm-gray sticky top-16 z-30 no-print"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap gap-x-6 gap-y-2 py-4 overflow-x-auto">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-link text-text-muted hover:text-steel transition-colors whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

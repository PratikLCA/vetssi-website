import Link from "next/link";

type TagVariant = "pathway" | "role" | "phase";
type TagSize = "sm" | "md";

interface TagProps {
  label: string;
  variant?: TagVariant;
  size?: TagSize;
  href?: string;
}

const variantClasses: Record<TagVariant, string> = {
  pathway: "border border-steel text-steel bg-white hover:bg-steel hover:text-white",
  role: "bg-warm-gray text-navy hover:bg-navy hover:text-white",
  phase: "border border-warm-gray text-text-muted bg-white",
};

const sizeClasses: Record<TagSize, string> = {
  sm: "text-[0.65rem] px-2 py-0.5",
  md: "text-xs px-2.5 py-1",
};

export default function Tag({ label, variant = "pathway", size = "sm", href }: TagProps) {
  const classes = `inline-block font-medium uppercase tracking-wider transition-colors ${variantClasses[variant]} ${sizeClasses[size]}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return <span className={classes}>{label}</span>;
}

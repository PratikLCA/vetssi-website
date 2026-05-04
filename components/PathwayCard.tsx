import Link from "next/link";
import {
  Users,
  User,
  Building2,
  Shield,
  Wrench,
  Scissors,
  Syringe,
  Bandage,
  type LucideIcon,
} from "lucide-react";
import { Pathway } from "@/data/pathways";

const iconMap: Record<string, LucideIcon> = {
  Users,
  User,
  Building2,
  Shield,
  Wrench,
  Scissors,
  Syringe,
  Bandage,
};

interface PathwayCardProps {
  pathway: Pathway;
  href?: string;
}

export default function PathwayCard({ pathway, href }: PathwayCardProps) {
  const Icon = iconMap[pathway.icon] ?? Shield;
  const target = href ?? `/contamination-pathways#${pathway.slug}`;

  return (
    <Link
      href={target}
      className="card bg-white border border-warm-gray flex flex-col p-6 hover:border-steel transition-colors group"
    >
      <Icon size={28} className="text-steel mb-4" strokeWidth={1.5} />
      <h3 className="font-serif text-lg font-medium text-navy leading-snug mb-2 group-hover:text-steel transition-colors">
        {pathway.name}
      </h3>
      <p className="text-sm text-text-muted leading-relaxed">{pathway.subtitle}</p>
    </Link>
  );
}

import { Lightbulb } from "lucide-react";

interface CalloutBoxProps {
  title?: string;
  children: React.ReactNode;
}

export default function CalloutBox({ title = "What Actually Matters", children }: CalloutBoxProps) {
  return (
    <div className="callout-box my-6">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={16} className="text-steel flex-shrink-0" />
        <span className="text-xs font-medium text-steel nav-link">{title}</span>
      </div>
      <div className="text-sm text-text-primary leading-relaxed">{children}</div>
    </div>
  );
}

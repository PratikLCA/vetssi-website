import { Activity } from "lucide-react";
import { surveillanceTimeline } from "@/data/surveillance";

// 30-day SSI surveillance timeline.
// Day 0 → Day 10–14 → Week 4 → Day 30. CSS-only, server-rendered.

export default function SurveillanceTimeline() {
  return (
    <div className="relative">
      {/* Horizontal connecting line — desktop */}
      <div
        aria-hidden
        className="hidden md:block absolute left-0 right-0 top-5 h-px bg-warm-gray"
      />

      <ol className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
        {surveillanceTimeline.map((ev, i) => (
          <li key={i} className="relative">
            {/* Dot */}
            <div className="flex md:block items-start gap-4 md:gap-0">
              <div className="relative md:mb-4 flex-shrink-0">
                <span className="hidden md:block absolute inset-0 bg-cream" />
                <span
                  className={`relative inline-flex items-center justify-center w-10 h-10 border-2 ${
                    i === 0 || i === surveillanceTimeline.length - 1
                      ? "bg-navy border-navy text-white"
                      : "bg-white border-steel text-steel"
                  }`}
                >
                  <Activity size={16} />
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="nav-link text-steel mb-1">{ev.day}</p>
                <p className="font-serif text-lg font-medium text-navy mb-2 leading-snug">
                  {ev.title}
                </p>
                <p className="text-sm text-text-primary leading-relaxed">{ev.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

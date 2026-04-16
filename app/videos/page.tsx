"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import VideoCard from "@/components/VideoCard";
import { videos, VideoCategory, videoCategoryLabels } from "@/data/videos";

type Filter = "all" | VideoCategory;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "preparation", label: "Preparation" },
  { value: "draping", label: "Draping" },
  { value: "scrubbing", label: "Scrubbing" },
  { value: "or-setup", label: "OR Setup" },
];

export default function VideosPage() {
  const [active, setActive] = useState<Filter>("all");

  const filtered =
    active === "all" ? videos : videos.filter((v) => v.category === active);

  return (
    <>
      <PageHeader
        title="Surgical Technique Videos"
        subtitle="Visual demonstrations for clinical implementation"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`nav-link px-4 py-2 border transition-colors ${
                active === f.value
                  ? "bg-steel text-white border-steel"
                  : "bg-white text-text-muted border-warm-gray hover:border-steel hover:text-steel"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Results */}
        <p className="text-sm text-text-muted mb-6">
          {filtered.length} video{filtered.length !== 1 ? "s" : ""}
          {active !== "all" ? ` — ${videoCategoryLabels[active as VideoCategory]}` : ""}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((video) => (
            <VideoCard key={video.slug} video={video} />
          ))}
        </div>
      </div>
    </>
  );
}

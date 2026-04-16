import { Video, videoCategoryLabels } from "@/data/videos";
import { Play, Clock, ArrowRight } from "lucide-react";

const categoryColors: Record<string, string> = {
  preparation:  "bg-teal-50 text-teal-700 border border-teal-200",
  draping:      "bg-blue-50 text-blue-700 border border-blue-200",
  scrubbing:    "bg-indigo-50 text-indigo-700 border border-indigo-200",
  "or-setup":   "bg-amber-50 text-amber-700 border border-amber-200",
};

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="card bg-white border border-warm-gray overflow-hidden flex flex-col">
      {/* Thumbnail placeholder — 16:9 */}
      <div className="relative w-full bg-navy-mid" style={{ paddingTop: "56.25%" }}>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy to-navy-mid">
          {/* Grid lines for visual texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 19px,rgba(255,255,255,0.3) 19px,rgba(255,255,255,0.3) 20px),repeating-linear-gradient(90deg,transparent,transparent 19px,rgba(255,255,255,0.3) 19px,rgba(255,255,255,0.3) 20px)",
            }}
          />
          <div className="relative z-10 w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <Play size={20} className="text-white ml-1" fill="white" />
          </div>
        </div>
        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-0.5 flex items-center gap-1">
          <Clock size={10} />
          {video.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <span className={`text-xs font-medium px-2.5 py-1 ${categoryColors[video.category]}`}>
            {videoCategoryLabels[video.category]}
          </span>
        </div>

        <h3 className="font-serif text-lg font-medium text-navy leading-snug mb-2">
          {video.title}
        </h3>

        <p className="text-sm text-text-muted leading-relaxed flex-1 mb-4">
          {video.description}
        </p>

        <button className="inline-flex items-center gap-1.5 text-steel text-sm font-medium hover:text-navy transition-colors group">
          Watch
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}

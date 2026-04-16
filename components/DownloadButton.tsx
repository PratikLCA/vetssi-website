"use client";

import { Download } from "lucide-react";

export default function DownloadButton() {
  return (
    <div className="card bg-white border border-warm-gray p-5">
      <button
        onClick={() => window.print()}
        className="w-full flex items-center justify-center gap-2 bg-navy text-white py-3 text-sm font-medium hover:bg-navy-mid transition-colors"
      >
        <Download size={14} />
        Download Protocol (PDF)
      </button>
      <p className="text-xs text-text-muted text-center mt-2">
        Opens print dialog — save as PDF
      </p>
    </div>
  );
}

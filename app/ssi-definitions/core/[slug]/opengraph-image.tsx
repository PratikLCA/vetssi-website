import { ImageResponse } from "next/og";
import { getDefinitionBySlug } from "@/data/ssi-definitions";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const def = getDefinitionBySlug(params.slug);
  return [
    {
      id: params.slug,
      alt: def ? `${def.title} — VETSSI SSI Definition` : "VETSSI SSI Definition",
    },
  ];
}

export default function DefinitionOgImage({ params }: { params: { slug: string } }) {
  const def = getDefinitionBySlug(params.slug);

  const title = def?.title ?? "SSI Definition";
  const tagline = def?.tagline ?? "";
  const shortLabel = def?.short ?? "Definition";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "#0C2340",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.03) 39px,rgba(255,255,255,0.03) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,0.03) 39px,rgba(255,255,255,0.03) 40px)",
          }}
        />
        {/* Left bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "6px",
            background: "#2E6E9E",
          }}
        />
        {/* Top: site + section label */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", zIndex: 1 }}>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#5A9DC0",
            }}
          >
            VETSSI
          </div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#5A9DC0",
              background: "rgba(90,157,192,0.13)",
              border: "1px solid rgba(90,157,192,0.33)",
              padding: "4px 14px",
            }}
          >
            {shortLabel}
          </div>
        </div>
        {/* Middle: title + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", zIndex: 1 }}>
          <div
            style={{
              fontSize: title.length > 36 ? "52px" : "64px",
              fontWeight: 600,
              color: "#FFFFFF",
              lineHeight: 1.1,
              maxWidth: "960px",
            }}
          >
            {title}
          </div>
          {tagline && (
            <div
              style={{
                fontSize: "20px",
                color: "#94A3B8",
                maxWidth: "860px",
                lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {tagline}
            </div>
          )}
        </div>
        {/* Bottom: domain */}
        <div
          style={{
            fontSize: "16px",
            color: "#5A9DC0",
            letterSpacing: "0.08em",
            zIndex: 1,
          }}
        >
          vetssi.com/ssi-definitions
        </div>
      </div>
    ),
    { ...size }
  );
}

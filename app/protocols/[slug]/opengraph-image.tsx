import { ImageResponse } from "next/og";
import { getProtocolBySlug } from "@/data/protocols";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const phaseLabel: Record<string, string> = {
  "pre-case-planning": "Pre-Case Planning",
  preoperative: "Preoperative",
  intraoperative: "Intraoperative",
  postoperative: "Postoperative",
};

const phaseColor: Record<string, string> = {
  "pre-case-planning": "#7C3AED",
  preoperative: "#0D6E5B",
  intraoperative: "#1A5276",
  postoperative: "#7D5A1E",
};

export async function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const protocol = getProtocolBySlug(params.slug);
  return [
    {
      id: params.slug,
      alt: protocol ? `${protocol.title} — VETSSI Protocol` : "VETSSI Protocol",
    },
  ];
}

export default function ProtocolOgImage({ params }: { params: { slug: string } }) {
  const protocol = getProtocolBySlug(params.slug);

  const title = protocol?.title ?? "Protocol";
  const phase = protocol?.phase ?? "preoperative";
  const label = phaseLabel[phase] ?? phase;
  const color = phaseColor[phase] ?? "#2E6E9E";
  const objective = protocol?.clinicalObjective?.split(".")[0] ?? "";

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
        {/* Top: site + phase badge */}
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
              color: color,
              background: `${color}22`,
              border: `1px solid ${color}55`,
              padding: "4px 14px",
            }}
          >
            {label}
          </div>
        </div>
        {/* Middle: title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", zIndex: 1 }}>
          <div
            style={{
              fontSize: title.length > 40 ? "52px" : "64px",
              fontWeight: 600,
              color: "#FFFFFF",
              lineHeight: 1.1,
              maxWidth: "960px",
            }}
          >
            {title}
          </div>
          {objective && (
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
              {objective}.
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
          vetssi.com/protocols
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "VETSSI — Veterinary Surgical Site Infection Prevention";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "#0C2340",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.03) 39px,rgba(255,255,255,0.03) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,0.03) 39px,rgba(255,255,255,0.03) 40px)",
          }}
        />
        {/* Left accent bar */}
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
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", zIndex: 1 }}>
          <div
            style={{
              fontSize: "18px",
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
              fontSize: "64px",
              fontWeight: 600,
              color: "#FFFFFF",
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            Veterinary Surgical Site Infection Prevention
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#94A3B8",
              marginTop: "8px",
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            Evidence-based protocols for the entire perioperative team
          </div>
        </div>
        {/* Bottom label */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            left: "80px",
            fontSize: "16px",
            color: "#5A9DC0",
            letterSpacing: "0.08em",
          }}
        >
          vetssi.com
        </div>
      </div>
    ),
    { ...size }
  );
}

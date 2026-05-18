import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Instructional videos on veterinary surgical technique, aseptic practice, and SSI prevention — covering gowning, draping, implant handling, and more.",
  alternates: { canonical: "https://vetssi.com/videos" },
  openGraph: {
    title: "Videos | VETSSI",
    description:
      "Instructional videos on aseptic technique and SSI prevention for veterinary surgical teams.",
    url: "https://vetssi.com/videos",
  },
};

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

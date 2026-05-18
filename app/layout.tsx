import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const BASE_URL = "https://vetssi.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "VETSSI — Veterinary Surgical Site Infection Prevention",
    template: "%s | VETSSI",
  },
  description:
    "Evidence-based protocols, expert techniques, and real-world implementation guidance for veterinary surgical site infection prevention. Built for the entire perioperative team.",
  keywords: [
    "veterinary surgical site infection",
    "SSI prevention",
    "veterinary surgery protocols",
    "perioperative infection control",
    "veterinary aseptic technique",
    "orthopaedic infection prevention",
  ],
  authors: [{ name: "VETSSI" }],
  creator: "VETSSI",
  verification: {
    google: "k0FA6zqwmkpSKdmfQ1e-gFIFgdFptCcSVJ5NTaVmWvI",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "VETSSI",
    title: "VETSSI — Veterinary Surgical Site Infection Prevention",
    description:
      "Evidence-based protocols, expert techniques, and real-world implementation guidance for veterinary surgical site infection prevention.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VETSSI — Veterinary Surgical Site Infection Prevention",
    description:
      "Evidence-based protocols for the entire veterinary perioperative team.",
    creator: "@vetssi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VETSSI",
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.ico`,
  description:
    "Evidence-based veterinary surgical site infection prevention protocols and resources.",
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VETSSI",
  url: BASE_URL,
  description:
    "Evidence-based protocols, expert techniques, and implementation guidance for veterinary SSI prevention.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/protocols`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

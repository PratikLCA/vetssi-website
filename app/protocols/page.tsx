import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import ProtocolsClient from "./ProtocolsClient";

export const metadata = {
  title: "Protocols",
  description:
    "Evidence-based SSI prevention protocols for veterinary surgery, filterable by phase of care, contamination pathway, or clinical role.",
  alternates: { canonical: "https://vetssi.com/protocols" },
  openGraph: { title: "Protocol Library | VETSSI", url: "https://vetssi.com/protocols" },
};

export default function ProtocolsPage() {
  return (
    <>
      <PageHeader
        title="Protocol Library"
        subtitle="Filter by phase of care, contamination pathway, or role to find the protocols that apply to your case."
      />

      <Suspense fallback={<div className="max-w-7xl mx-auto px-6 lg:px-8 py-10" />}>
        <ProtocolsClient />
      </Suspense>
    </>
  );
}

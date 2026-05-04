import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import ProtocolsClient from "./ProtocolsClient";

export const metadata = {
  title: "Protocols | VETSSI",
  description:
    "Evidence-based prevention protocols, filterable by phase of care, contamination pathway, or role.",
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

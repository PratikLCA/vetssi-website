import PageHeader from "@/components/PageHeader";
import JumpNav from "@/components/JumpNav";
import RoleSection from "@/components/RoleSection";
import { roles } from "@/data/roles";

export const metadata = {
  title: "Roles & Responsibilities",
  description:
    "SSI prevention fails when nobody owns the step. Defines who is responsible for each critical control point — surgeon, scrub technician, anaesthesiologist, and prep staff.",
  alternates: { canonical: "https://vetssi.com/roles" },
  openGraph: { title: "Roles & Responsibilities | VETSSI", url: "https://vetssi.com/roles" },
};

export default function RolesPage() {
  const navItems = roles.map((r) => ({ id: r.slug, label: r.title.split(" / ")[0] }));

  return (
    <>
      <PageHeader
        title="Roles & Responsibilities"
        subtitle="SSI prevention fails when nobody owns the step. This section defines who is responsible for each critical control point."
      />

      <JumpNav items={navItems} ariaLabel="Jump to role" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {roles.map((role) => (
          <RoleSection key={role.slug} role={role} />
        ))}
      </div>
    </>
  );
}

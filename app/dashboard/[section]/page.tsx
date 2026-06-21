import { notFound } from "next/navigation";
import { GeneralDashboard, type GeneralDashboardSection } from "@/features/dashboard/general-dashboard";

const sections: GeneralDashboardSection[] = [
  "resources",
  "academy",
  "deployment",
  "skills",
  "certification",
  "communication",
  "cluster-center",
  "partner",
  "social",
  "attendance"
];

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export default async function DashboardSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;

  if (!sections.includes(section as GeneralDashboardSection)) {
    notFound();
  }

  return <GeneralDashboard section={section as GeneralDashboardSection} />;
}

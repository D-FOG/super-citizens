import { notFound } from "next/navigation";
import { LeaderDashboard, type LeaderDashboardSection } from "@/features/leader/leader-dashboard";

const sections: LeaderDashboardSection[] = ["members", "progress", "assignments", "reports", "resources", "forums"];

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export default async function LeaderDashboardSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;

  if (!sections.includes(section as LeaderDashboardSection)) {
    notFound();
  }

  return <LeaderDashboard section={section as LeaderDashboardSection} />;
}

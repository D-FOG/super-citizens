import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Leader Dashboard | Supersite Citizens",
  description: "Private cluster leadership dashboard for members, assignments, reports, resources, and leader forums.",
  path: "/leader-dashboard",
  index: false
});

export default function LeaderDashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell mode="leader">{children}</DashboardShell>;
}

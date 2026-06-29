import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "General Dashboard | Supersite Citizens",
  description: "Member dashboard for Supersite Citizens training, resources, attendance, communication, and deployment.",
  path: "/dashboard",
  index: false
});

export default function GeneralDashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}

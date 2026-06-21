import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function LeaderDashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell mode="leader">{children}</DashboardShell>;
}

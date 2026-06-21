import {
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  MessageSquareText,
  Network,
  ShieldCheck,
  Users,
  Waypoints
} from "lucide-react";
import type { DashboardNavItem, UserRole } from "@/types/dashboard";

export const roles: UserRole[] = [
  "Cluster Supervisor",
  "Cluster Leader",
  "Cluster Member",
  "Registered Partner",
  "Field Evangelist"
];

export const generalNavItems: DashboardNavItem[] = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Resources", href: "/dashboard/resources", icon: BookOpen },
  { label: "Academy", href: "/dashboard/academy", icon: GraduationCap },
  { label: "Deployment", href: "/dashboard/deployment", icon: Waypoints },
  { label: "Skills", href: "/dashboard/skills", icon: BriefcaseBusiness },
  { label: "Certification", href: "/dashboard/certification", icon: ShieldCheck },
  { label: "Communication", href: "/dashboard/communication", icon: Megaphone },
  { label: "Cluster Center", href: "/dashboard/cluster-center", icon: Building2 },
  { label: "Become Partner", href: "/dashboard/partner", icon: Users },
  { label: "Social Links", href: "/dashboard/social", icon: Megaphone },
  { label: "Attendance", href: "/dashboard/attendance", icon: CalendarCheck }
];

export const leaderNavItems: DashboardNavItem[] = [
  { label: "Cluster", href: "/leader-dashboard", icon: Network, leaderOnly: true },
  { label: "Members", href: "/leader-dashboard/members", icon: Users, leaderOnly: true },
  { label: "Progress", href: "/leader-dashboard/progress", icon: GraduationCap, leaderOnly: true },
  { label: "Assignments", href: "/leader-dashboard/assignments", icon: CalendarCheck, leaderOnly: true },
  { label: "Reports", href: "/leader-dashboard/reports", icon: BookOpen, leaderOnly: true },
  { label: "Resources", href: "/leader-dashboard/resources", icon: ShieldCheck, leaderOnly: true },
  { label: "Leader Forums", href: "/leader-dashboard/forums", icon: MessageSquareText, leaderOnly: true }
];

export const certificationLevels = [
  "Kingdom Citizen",
  "Cluster Worker",
  "Cluster Leader",
  "Regional Leader",
  "Global Leader"
];

export const skillCategories = ["All", "Scientists", "Lawyers", "Technologists", "Administrators", "Leaders"] as const;

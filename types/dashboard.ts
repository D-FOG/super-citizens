import type { LucideIcon } from "lucide-react";

export type UserRole =
  | "Cluster Supervisor"
  | "Cluster Leader"
  | "Cluster Member"
  | "Registered Partner"
  | "Field Evangelist";

export type ResourceType = "Video" | "PDF" | "MP3";
export type Status = "Pending" | "Approved" | "Rejected" | "In Progress" | "Complete" | "Scheduled";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  leaderOnly?: boolean;
};

export type Metric = {
  label: string;
  value: string;
  helper: string;
};

export type ResourceItem = {
  id?: string;
  title: string;
  category: string;
  description: string;
  type: ResourceType;
  uploadedAt: string;
  visibleTo: UserRole[];
  fileUrl?: string;
};

export type Lesson = {
  title: string;
  description: string;
  progress: number;
  thumbnail: string;
};

export type MemberProfile = {
  id: string;
  name: string;
  role: UserRole;
  profession: string;
  trainingLevel: string;
  availability: string;
  skills: string[];
  category: "Scientists" | "Lawyers" | "Technologists" | "Administrators" | "Leaders";
};

export type Announcement = {
  title: string;
  audience: string;
  date: string;
};

export type Meeting = {
  id?: string;
  title: string;
  date: string;
  startTime: string;
  checkInOpen: boolean;
};

export type Assignment = {
  id: string;
  title: string;
  description: string;
  due: string;
  status: "Open" | "In Progress" | "Complete";
  completion: number;
};

export type ReportItem = {
  title: string;
  status: string;
  date: string;
};

export type ForumThread = {
  title: string;
  replies: number;
};

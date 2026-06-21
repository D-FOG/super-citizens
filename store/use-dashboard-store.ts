"use client";

import { create } from "zustand";
import type { UserRole } from "@/types/dashboard";

type DashboardState = {
  role: UserRole;
  search: string;
  skillCategory: string;
  setRole: (role: UserRole) => void;
  setSearch: (search: string) => void;
  setSkillCategory: (category: string) => void;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  role: "Cluster Member",
  search: "",
  skillCategory: "All",
  setRole: (role) => set({ role }),
  setSearch: (search) => set({ search }),
  setSkillCategory: (skillCategory) => set({ skillCategory })
}));

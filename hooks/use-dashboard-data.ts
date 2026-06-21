"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getAcademy,
  getCommunication,
  getDashboardHome,
  getDeployment,
  getLeaderWorkspace,
  getMeetings,
  getMembers,
  getResources
} from "@/services/dashboard-service";
import type { UserRole } from "@/types/dashboard";

export function useDashboardHome(role: UserRole) {
  return useQuery({ queryKey: ["dashboard-home", role], queryFn: () => getDashboardHome(role) });
}

export function useResources(role: UserRole) {
  return useQuery({ queryKey: ["resources", role], queryFn: () => getResources(role) });
}

export function useAcademy() {
  return useQuery({ queryKey: ["academy"], queryFn: getAcademy });
}

export function useMembers() {
  return useQuery({ queryKey: ["members"], queryFn: getMembers });
}

export function useDeployment() {
  return useQuery({ queryKey: ["deployment"], queryFn: getDeployment });
}

export function useCommunication() {
  return useQuery({ queryKey: ["communication"], queryFn: getCommunication });
}

export function useMeetings() {
  return useQuery({ queryKey: ["meetings"], queryFn: getMeetings });
}

export function useLeaderWorkspace() {
  return useQuery({ queryKey: ["leader-workspace"], queryFn: getLeaderWorkspace });
}

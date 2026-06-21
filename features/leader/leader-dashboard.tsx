"use client";

import { Button } from "@/components/button";
import { DashboardHeader, DataTable, EmptyState, GlassPanel, PanelTitle, ProgressBar, SkeletonBlock } from "@/components/dashboard/dashboard-shell";
import { useLeaderWorkspace, useMembers, useResources } from "@/hooks/use-dashboard-data";
import { useDashboardStore } from "@/store/use-dashboard-store";

export type LeaderDashboardSection = "cluster" | "members" | "progress" | "assignments" | "reports" | "resources" | "forums";

export const leaderDashboardSections: LeaderDashboardSection[] = ["members", "progress", "assignments", "reports", "resources", "forums"];

const leaderRoles = ["Cluster Leader", "Cluster Supervisor"];

const pageCopy: Record<LeaderDashboardSection, { eyebrow: string; title: string; text: string }> = {
  cluster: {
    eyebrow: "Cluster profile",
    title: "Manage your cluster information, center details, and statistics.",
    text: "This is the leader operating surface for Cluster Leaders and Cluster Supervisors."
  },
  members: {
    eyebrow: "Members list",
    title: "Search, filter, and review cluster members.",
    text: "Member records are prepared for backend pagination, filters, and leader-scoped access."
  },
  progress: {
    eyebrow: "Training progress",
    title: "Track the training health of your members.",
    text: "Progress summaries make it easier to spot who needs follow-up and encouragement."
  },
  assignments: {
    eyebrow: "Assignments",
    title: "Create and monitor member assignments.",
    text: "Assignments connect leadership direction to member action and completion reporting."
  },
  reports: {
    eyebrow: "Reports",
    title: "Submit weekly and monthly cluster reports.",
    text: "Report history is visible to leaders and supervisors for review and accountability."
  },
  resources: {
    eyebrow: "Leader resources",
    title: "Private resources for cluster leadership.",
    text: "These files are available only to Cluster Leaders and Cluster Supervisors."
  },
  forums: {
    eyebrow: "Leader forums",
    title: "Private conversations for leaders only.",
    text: "General users must never access this section."
  }
};

export function LeaderDashboard({ section = "cluster" }: { section?: LeaderDashboardSection }) {
  const role = useDashboardStore((state) => state.role);
  const setRole = useDashboardStore((state) => state.setRole);
  const workspace = useLeaderWorkspace();
  const members = useMembers();
  const resources = useResources(role);
  const canAccess = leaderRoles.includes(role);
  const copy = pageCopy[section];

  if (!canAccess) {
    return (
      <>
        <DashboardHeader
          eyebrow="Leader dashboard"
          title="Private cluster leadership workspace"
          text="This area is only available to Cluster Leaders and Cluster Supervisors. Until authentication exists, use the role selector below or the sidebar role preview to inspect access."
        />
        <GlassPanel>
          <EmptyState title="Leader access required" text="General users cannot view leader forums, leader resources, reports, assignments, or cluster member management." />
          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <select value={role} onChange={(event) => setRole(event.target.value as typeof role)} className="min-h-11 rounded-sm border border-line/60 bg-paper/60 px-3 text-sm font-bold outline-none focus:border-accent">
              {(["Cluster Leader", "Cluster Supervisor", "Cluster Member"] as const).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <Button href="/dashboard" variant="secondary">Return to General Dashboard</Button>
          </div>
        </GlassPanel>
      </>
    );
  }

  return (
    <>
      <DashboardHeader eyebrow={copy.eyebrow} title={copy.title} text={copy.text} />
      <div className="grid gap-5">
        {section === "cluster" ? (
          <ClusterProfileSection workspace={workspace} />
        ) : section === "members" ? (
          <MembersSection members={members} />
        ) : section === "progress" ? (
          <ProgressSection members={members} />
        ) : section === "assignments" ? (
          <AssignmentsSection workspace={workspace} />
        ) : section === "reports" ? (
          <ReportsSection workspace={workspace} />
        ) : section === "resources" ? (
          <LeaderResourcesSection resources={resources} />
        ) : (
          <ForumsSection workspace={workspace} />
        )}
      </div>
    </>
  );
}

function ClusterProfileSection({ workspace }: { workspace: ReturnType<typeof useLeaderWorkspace> }) {
  return (
    <GlassPanel>
      {workspace.isLoading ? <SkeletonBlock className="h-44" /> : (
        <div className="grid gap-5 xl:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow">Cluster profile</p>
            <h2 className="mt-3 text-3xl font-black">{workspace.data?.cluster.name}</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">{workspace.data?.cluster.address}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Members", workspace.data?.cluster.members],
              ["Active Training", workspace.data?.cluster.activeTraining],
              ["Attendance", workspace.data?.cluster.weeklyAttendance]
            ].map(([label, value]) => (
              <div key={label} className="rounded-sm border border-line/60 bg-paper/30 p-4">
                <p className="text-xs font-black uppercase text-muted">{label}</p>
                <strong className="mt-3 block text-3xl font-black text-accent">{value}</strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </GlassPanel>
  );
}

function MembersSection({ members }: { members: ReturnType<typeof useMembers> }) {
  return (
    <GlassPanel>
      <PanelTitle eyebrow="Members list" title="Searchable and ready for pagination" />
      <DataTable
        columns={["ID", "Name", "Role", "Profession", "Training level"]}
        rows={(members.data || []).map((member) => [member.id, member.name, member.role, member.profession, member.trainingLevel])}
      />
      <div className="mt-4 flex flex-col gap-2 rounded-sm border border-line/60 bg-paper/25 px-4 py-3 text-sm font-bold text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>Page 1 of 1</span>
        <span>Pagination controls will bind to backend cursors.</span>
      </div>
    </GlassPanel>
  );
}

function ProgressSection({ members }: { members: ReturnType<typeof useMembers> }) {
  return (
    <GlassPanel>
      <PanelTitle eyebrow="Training progress" title="Member completion overview" />
      <div className="grid gap-4">
        {(members.data || []).map((member, index) => (
          <div key={member.id} className="rounded-sm border border-line/60 bg-paper/25 p-4">
            <div className="mb-3 flex justify-between gap-3 text-sm font-bold">
              <span>{member.name}</span>
              <span className="text-muted">{52 + index * 11}%</span>
            </div>
            <ProgressBar value={52 + index * 11} />
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

function AssignmentsSection({ workspace }: { workspace: ReturnType<typeof useLeaderWorkspace> }) {
  return (
    <GlassPanel>
      <PanelTitle eyebrow="Assignments" title="Create and monitor member work" />
      <div className="grid gap-4">
        {workspace.data?.assignments.map((assignment) => (
          <div key={assignment.title} className="rounded-sm border border-line/60 bg-paper/25 p-4">
            <div className="mb-3 flex justify-between gap-3">
              <div>
                <h3 className="font-black">{assignment.title}</h3>
                <p className="mt-1 text-sm text-muted">Due {assignment.due}</p>
              </div>
              <span className="text-sm font-black text-accent">{assignment.completion}%</span>
            </div>
            <ProgressBar value={assignment.completion} />
          </div>
        ))}
        <Button variant="secondary">Create Assignment</Button>
      </div>
    </GlassPanel>
  );
}

function ReportsSection({ workspace }: { workspace: ReturnType<typeof useLeaderWorkspace> }) {
  return (
    <GlassPanel>
      <PanelTitle eyebrow="Reports" title="Weekly and monthly submission history" />
      <DataTable
        columns={["Report", "Status", "Date"]}
        rows={(workspace.data?.reports || []).map((report) => [report.title, report.status, report.date])}
      />
      <Button variant="secondary" className="mt-4">Submit Report</Button>
    </GlassPanel>
  );
}

function LeaderResourcesSection({ resources }: { resources: ReturnType<typeof useResources> }) {
  return (
    <GlassPanel>
      <PanelTitle eyebrow="Leader resources" title="Private files and guidance" />
      <DataTable
        columns={["Resource", "Category", "Type"]}
        rows={(resources.data || []).map((resource) => [resource.title, resource.category, resource.type])}
      />
    </GlassPanel>
  );
}

function ForumsSection({ workspace }: { workspace: ReturnType<typeof useLeaderWorkspace> }) {
  return (
    <GlassPanel>
      <PanelTitle eyebrow="Leader forums" title="Private forum visible only to leaders" />
      <div className="grid gap-3 md:grid-cols-2">
        {workspace.data?.forums.map((forum) => (
          <article key={forum.title} className="rounded-sm border border-line/60 bg-paper/25 p-5 transition hover:border-accent/50">
            <h3 className="font-black">{forum.title}</h3>
            <p className="mt-3 text-sm font-semibold text-muted">{forum.replies} replies</p>
          </article>
        ))}
      </div>
    </GlassPanel>
  );
}

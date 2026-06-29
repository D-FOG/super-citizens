"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/button";
import { DashboardHeader, DataTable, EmptyState, GlassPanel, PanelTitle, ProgressBar, SkeletonBlock } from "@/components/dashboard/dashboard-shell";
import { useAssignments, useClusterCenters, useLeaderWorkspace, useMembers, useResources } from "@/hooks/use-dashboard-data";
import { createAssignment, createForumThread, submitReport, updateAssignment } from "@/services/dashboard-service";
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
  const workspace = useLeaderWorkspace();
  const assignments = useAssignments();
  const members = useMembers();
  const resources = useResources(role);
  const clusterCenters = useClusterCenters();
  const canAccess = leaderRoles.includes(role);
  const copy = pageCopy[section];

  if (!canAccess) {
    return (
      <>
        <DashboardHeader
          eyebrow="Leader dashboard"
          title="Private cluster leadership workspace"
          text="This area is only available to Cluster Leaders and Cluster Supervisors. Sign in with an approved leader account to continue."
        />
        <GlassPanel>
          <EmptyState title="Leader access required" text="General users cannot view leader forums, leader resources, reports, assignments, or cluster member management." />
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href="/leader-login">Leader Sign In</Button>
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
          <AssignmentsSection assignments={assignments} members={members} clusterCenters={clusterCenters} />
        ) : section === "reports" ? (
          <ReportsSection workspace={workspace} clusterCenters={clusterCenters} />
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
        {(members.data || []).map((member) => {
          const level = member.trainingLevel.toLowerCase();
          const value = level.includes("complete") || level.includes("certified") ? 100 : level.includes("progress") ? 65 : level.includes("started") ? 35 : 0;
          return (
          <div key={member.id} className="rounded-sm border border-line/60 bg-paper/25 p-4">
            <div className="mb-3 flex justify-between gap-3 text-sm font-bold">
              <span>{member.name}</span>
              <span className="text-muted">{value}%</span>
            </div>
            <ProgressBar value={value} />
          </div>
        );})}
      </div>
    </GlassPanel>
  );
}

function AssignmentsSection({
  assignments,
  members,
  clusterCenters
}: {
  assignments: ReturnType<typeof useAssignments>;
  members: ReturnType<typeof useMembers>;
  clusterCenters: ReturnType<typeof useClusterCenters>;
}) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ title: "", description: "", dueDate: "", assignedTo: "", clusterCenterId: "" });
  const createMutation = useMutation({
    mutationFn: createAssignment,
    onSuccess: () => {
      setForm({ title: "", description: "", dueDate: "", assignedTo: "", clusterCenterId: "" });
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      queryClient.invalidateQueries({ queryKey: ["leader-workspace"] });
    }
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, completion }: { id: string; completion: number }) => updateAssignment(id, { completion, status: completion >= 100 ? "Complete" : "In Progress" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      queryClient.invalidateQueries({ queryKey: ["leader-workspace"] });
    }
  });

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <GlassPanel>
      <PanelTitle eyebrow="Assignments" title="Create and monitor member work" />
      <div className="grid gap-4">
        <form
          className="grid gap-3 rounded-sm border border-line/60 bg-paper/25 p-4 lg:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            createMutation.mutate({
              title: form.title,
              description: form.description,
              dueDate: form.dueDate,
              ...(form.assignedTo ? { assignedTo: form.assignedTo } : {}),
              ...(form.clusterCenterId ? { clusterCenterId: form.clusterCenterId } : {})
            });
          }}
        >
          <input required value={form.title} onChange={(event) => updateField("title", event.target.value)} placeholder="Assignment title" className="min-h-11 rounded-sm border border-line/60 bg-paper/30 px-4 text-sm font-semibold outline-none focus:border-accent" />
          <input required type="date" value={form.dueDate} onChange={(event) => updateField("dueDate", event.target.value)} className="min-h-11 rounded-sm border border-line/60 bg-paper/30 px-4 text-sm font-semibold outline-none focus:border-accent" />
          <select value={form.assignedTo} onChange={(event) => updateField("assignedTo", event.target.value)} className="min-h-11 rounded-sm border border-line/60 bg-paper/30 px-4 text-sm font-bold outline-none focus:border-accent">
            <option value="">Assign to all members</option>
            {(members.data || []).map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}
          </select>
          <select value={form.clusterCenterId} onChange={(event) => updateField("clusterCenterId", event.target.value)} className="min-h-11 rounded-sm border border-line/60 bg-paper/30 px-4 text-sm font-bold outline-none focus:border-accent">
            <option value="">No cluster center</option>
            {(clusterCenters.data || []).map((center) => <option key={center.id} value={center.id}>{center.name}</option>)}
          </select>
          <textarea value={form.description} onChange={(event) => updateField("description", event.target.value)} placeholder="Description" className="min-h-24 rounded-sm border border-line/60 bg-paper/30 px-4 py-3 text-sm font-semibold outline-none focus:border-accent lg:col-span-2" />
          <button type="submit" disabled={createMutation.isPending} className="inline-flex min-h-10 items-center justify-center rounded-sm border border-line/70 bg-paper/30 px-5 py-2.5 text-sm font-black text-ink transition hover:border-accent/50 hover:bg-accent/10 disabled:opacity-60 lg:col-span-2">
            {createMutation.isPending ? "Creating..." : "Create Assignment"}
          </button>
        </form>
        {(assignments.data || []).map((assignment) => (
          <div key={assignment.title} className="rounded-sm border border-line/60 bg-paper/25 p-4">
            <div className="mb-3 flex justify-between gap-3">
              <div>
                <h3 className="font-black">{assignment.title}</h3>
                <p className="mt-1 text-sm text-muted">Due {assignment.due} - {assignment.status}</p>
              </div>
              <span className="text-sm font-black text-accent">{assignment.completion}%</span>
            </div>
            <ProgressBar value={assignment.completion} />
            <div className="mt-3 flex flex-wrap gap-2">
              {[25, 50, 75, 100].map((value) => (
                <button key={value} type="button" onClick={() => updateMutation.mutate({ id: assignment.id, completion: value })} className="rounded-sm border border-line/60 px-3 py-2 text-xs font-black text-muted transition hover:border-accent/50 hover:text-ink">
                  {value}%
                </button>
              ))}
            </div>
          </div>
        ))}
        {!assignments.isLoading && !(assignments.data || []).length ? <EmptyState title="No assignments" text="Create the first assignment for your members." /> : null}
      </div>
    </GlassPanel>
  );
}

function ReportsSection({ workspace, clusterCenters }: { workspace: ReturnType<typeof useLeaderWorkspace>; clusterCenters: ReturnType<typeof useClusterCenters> }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ type: "Weekly" as "Weekly" | "Monthly", clusterCenterId: "", summary: "", challenges: "", needs: "" });
  const mutation = useMutation({
    mutationFn: submitReport,
    onSuccess: () => {
      setForm({ type: "Weekly", clusterCenterId: "", summary: "", challenges: "", needs: "" });
      queryClient.invalidateQueries({ queryKey: ["leader-workspace"] });
    }
  });

  return (
    <GlassPanel>
      <PanelTitle eyebrow="Reports" title="Weekly and monthly submission history" />
      <form
        className="mb-4 grid gap-3 rounded-sm border border-line/60 bg-paper/25 p-4 lg:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate(form);
        }}
      >
        <select value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as "Weekly" | "Monthly" }))} className="min-h-11 rounded-sm border border-line/60 bg-paper/30 px-4 text-sm font-bold outline-none focus:border-accent">
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
        <select required value={form.clusterCenterId} onChange={(event) => setForm((current) => ({ ...current, clusterCenterId: event.target.value }))} className="min-h-11 rounded-sm border border-line/60 bg-paper/30 px-4 text-sm font-bold outline-none focus:border-accent">
          <option value="">Select cluster center</option>
          {(clusterCenters.data || []).map((center) => <option key={center.id} value={center.id}>{center.name}</option>)}
        </select>
        <textarea required value={form.summary} onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))} placeholder="Summary" className="min-h-24 rounded-sm border border-line/60 bg-paper/30 px-4 py-3 text-sm font-semibold outline-none focus:border-accent lg:col-span-2" />
        <input value={form.challenges} onChange={(event) => setForm((current) => ({ ...current, challenges: event.target.value }))} placeholder="Challenges" className="min-h-11 rounded-sm border border-line/60 bg-paper/30 px-4 text-sm font-semibold outline-none focus:border-accent" />
        <input value={form.needs} onChange={(event) => setForm((current) => ({ ...current, needs: event.target.value }))} placeholder="Needs" className="min-h-11 rounded-sm border border-line/60 bg-paper/30 px-4 text-sm font-semibold outline-none focus:border-accent" />
        <button type="submit" disabled={mutation.isPending} className="inline-flex min-h-10 items-center justify-center rounded-sm border border-line/70 bg-paper/30 px-5 py-2.5 text-sm font-black text-ink transition hover:border-accent/50 hover:bg-accent/10 disabled:opacity-60 lg:col-span-2">
          {mutation.isPending ? "Submitting..." : "Submit Report"}
        </button>
      </form>
      <DataTable
        columns={["Report", "Status", "Date"]}
        rows={(workspace.data?.reports || []).map((report) => [report.title, report.status, report.date])}
      />
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
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ title: "", body: "" });
  const mutation = useMutation({
    mutationFn: createForumThread,
    onSuccess: () => {
      setForm({ title: "", body: "" });
      queryClient.invalidateQueries({ queryKey: ["leader-workspace"] });
    }
  });

  return (
    <GlassPanel>
      <PanelTitle eyebrow="Leader forums" title="Private forum visible only to leaders" />
      <form
        className="mb-4 grid gap-3 rounded-sm border border-line/60 bg-paper/25 p-4"
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate(form);
        }}
      >
        <input required value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Thread title" className="min-h-11 rounded-sm border border-line/60 bg-paper/30 px-4 text-sm font-semibold outline-none focus:border-accent" />
        <textarea required value={form.body} onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))} placeholder="Thread body" className="min-h-24 rounded-sm border border-line/60 bg-paper/30 px-4 py-3 text-sm font-semibold outline-none focus:border-accent" />
        <button type="submit" disabled={mutation.isPending} className="inline-flex min-h-10 items-center justify-center rounded-sm border border-line/70 bg-paper/30 px-5 py-2.5 text-sm font-black text-ink transition hover:border-accent/50 hover:bg-accent/10 disabled:opacity-60">
          {mutation.isPending ? "Publishing..." : "Create Thread"}
        </button>
      </form>
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

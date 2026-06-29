"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Download, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/button";
import { DashboardHeader, DataTable, EmptyState, GlassPanel, PanelTitle, ProgressBar, SkeletonBlock } from "@/components/dashboard/dashboard-shell";
import { skillCategories } from "@/constants/dashboard";
import { useAcademy, useCertificationLevels, useClusterCenters, useCommunication, useDashboardHome, useDeployment, useMeetings, useMembers, useResources, useSocialLinks } from "@/hooks/use-dashboard-data";
import { checkInToMeeting, submitPartnerApplication } from "@/services/dashboard-service";
import { useDashboardStore } from "@/store/use-dashboard-store";

export type GeneralDashboardSection =
  | "home"
  | "resources"
  | "academy"
  | "deployment"
  | "skills"
  | "certification"
  | "communication"
  | "cluster-center"
  | "partner"
  | "social"
  | "attendance";

export const generalDashboardSections: GeneralDashboardSection[] = [
  "resources",
  "academy",
  "deployment",
  "skills",
  "certification",
  "communication",
  "cluster-center",
  "partner",
  "social",
  "attendance"
];

const pageCopy: Record<GeneralDashboardSection, { eyebrow: string; title: string; text: string }> = {
  home: {
    eyebrow: "General dashboard",
    title: "Formation, resources, deployment, and attendance in one command surface.",
    text: "Your overview page keeps the essentials visible while each operational module now lives on its own dashboard page."
  },
  resources: {
    eyebrow: "Resources",
    title: "Downloadable videos, PDFs, and audio.",
    text: "Role-aware resources managed by admins and filtered for the current user."
  },
  academy: {
    eyebrow: "Kingdom Academy",
    title: "Lessons, manuals, quizzes, exams, and certificates.",
    text: "A focused LMS surface for training progress, assessments, and earned certificates."
  },
  deployment: {
    eyebrow: "Cluster deployment",
    title: "Track outreach, projects, volunteers, and impact.",
    text: "Deployment activity is separated into workstreams leaders can later report against."
  },
  skills: {
    eyebrow: "Skills database",
    title: "Search deployment-ready member profiles.",
    text: "Filter skills, professions, training levels, availability, and deployment categories."
  },
  certification: {
    eyebrow: "Certification system",
    title: "View the growth path from citizen to global leader.",
    text: "Certification progress is prepared for backend-managed requirements and completion rules."
  },
  communication: {
    eyebrow: "Communication",
    title: "Announcements, prayer networks, and project updates.",
    text: "Leader forums stay out of the general communication surface by design."
  },
  "cluster-center": {
    eyebrow: "Cluster center",
    title: "Find and view your assigned cluster center.",
    text: "Center details, proximity matching, and leader contact information live here."
  },
  partner: {
    eyebrow: "Become a partner",
    title: "Submit a partnership application.",
    text: "Members can apply with occupation, location, reason, and skills."
  },
  social: {
    eyebrow: "Social media",
    title: "Pastor Joshua platform links.",
    text: "Admin-managed social links are presented in a simple directory."
  },
  attendance: {
    eyebrow: "Attendance",
    title: "Meeting check-in and attendance history.",
    text: "Check-in becomes available only within 30 minutes from meeting start time."
  }
};

export function GeneralDashboard({ section = "home" }: { section?: GeneralDashboardSection }) {
  const role = useDashboardStore((state) => state.role);
  const search = useDashboardStore((state) => state.search);
  const setSearch = useDashboardStore((state) => state.setSearch);
  const skillCategory = useDashboardStore((state) => state.skillCategory);
  const setSkillCategory = useDashboardStore((state) => state.setSkillCategory);

  const home = useDashboardHome(role);
  const resources = useResources(role);
  const academy = useAcademy();
  const deployment = useDeployment();
  const members = useMembers();
  const communication = useCommunication();
  const meetings = useMeetings();
  const clusterCenters = useClusterCenters();
  const socialLinks = useSocialLinks();
  const certificationLevels = useCertificationLevels();

  const filteredMembers = (members.data || []).filter((member) => {
    const matchesSearch = [member.name, member.profession, member.trainingLevel, member.skills.join(" ")]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = skillCategory === "All" || member.category === skillCategory;
    return matchesSearch && matchesCategory;
  });

  const copy = pageCopy[section];

  return (
    <>
      <DashboardHeader eyebrow={copy.eyebrow} title={copy.title} text={copy.text} />
      <div className="grid gap-5">
        {section === "home" ? (
          <HomeSection home={home} />
        ) : section === "resources" ? (
          <ResourcesSection resources={resources} />
        ) : section === "academy" ? (
          <AcademySection academy={academy} />
        ) : section === "deployment" ? (
          <DeploymentSection deployment={deployment} />
        ) : section === "skills" ? (
          <SkillsSection
            search={search}
            setSearch={setSearch}
            skillCategory={skillCategory}
            setSkillCategory={setSkillCategory}
            filteredMembers={filteredMembers}
          />
        ) : section === "certification" ? (
          <CertificationSection certificationLevels={certificationLevels} />
        ) : section === "communication" ? (
          <CommunicationSection communication={communication} />
        ) : section === "cluster-center" ? (
          <ClusterCenterSection clusterCenters={clusterCenters} />
        ) : section === "partner" ? (
          <PartnerSection />
        ) : section === "social" ? (
          <SocialSection socialLinks={socialLinks} />
        ) : (
          <AttendanceSection meetings={meetings} />
        )}
      </div>
    </>
  );
}

function HomeSection({ home }: { home: ReturnType<typeof useDashboardHome> }) {
  return (
    <>
      <GlassPanel>
        {home.isLoading ? (
          <SkeletonBlock className="h-48" />
        ) : (
          <div className="grid gap-6 xl:grid-cols-[1.05fr_.95fr]">
            <div>
              <p className="eyebrow">Welcome</p>
              <h2 className="mt-3 text-3xl font-black">Good evening, {home.data?.user.name}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ["Role", home.data?.user.role],
                  ["Cluster center", home.data?.user.clusterCenter],
                  ["Training level", home.data?.user.trainingLevel],
                  ["Certification", home.data?.user.certificationLevel]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-sm border border-line/60 bg-paper/30 p-4">
                    <p className="text-xs font-black uppercase text-muted">{label}</p>
                    <p className="mt-2 font-black">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {home.data?.metrics.map((metric) => (
                <div key={metric.label} className="rounded-sm border border-line/60 bg-paper/30 p-4">
                  <p className="text-xs font-black uppercase text-muted">{metric.label}</p>
                  <strong className="mt-3 block text-3xl font-black text-accent">{metric.value}</strong>
                  <p className="mt-2 text-sm font-semibold text-muted">{metric.helper}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </GlassPanel>

      <div className="grid gap-5 xl:grid-cols-[1fr_.85fr]">
        <GlassPanel>
          <PanelTitle eyebrow="Announcements" title="Latest movement updates" />
          <div className="grid gap-3">
            {home.data?.announcements.map((item) => (
              <div key={item.title} className="flex flex-col gap-2 rounded-sm border border-line/60 bg-paper/25 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-black">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.audience}</p>
                </div>
                <span className="text-sm font-black text-accent">{item.date}</span>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel>
          <PanelTitle eyebrow="Quick actions" title="Move work forward" />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <Button href="/dashboard/academy" variant="secondary">Continue Training</Button>
            <Button href="/dashboard/attendance" variant="secondary">Check Attendance</Button>
            <Button href="/dashboard/partner" variant="secondary">Become a Partner</Button>
          </div>
        </GlassPanel>
      </div>
    </>
  );
}

function ResourcesSection({ resources }: { resources: ReturnType<typeof useResources> }) {
  return (
    <GlassPanel>
      <PanelTitle eyebrow="Resources" title="Downloadable videos, PDFs, and audio" />
      {resources.isLoading ? <SkeletonBlock /> : resources.data?.length ? (
        <DataTable
          columns={["Resource", "Category", "Type", "Upload date", "Action"]}
          rows={resources.data.map((item) => [
            <div key="resource"><strong className="block text-ink">{item.title}</strong><span>{item.description}</span></div>,
            item.category,
            item.type,
            item.uploadedAt,
            item.fileUrl ? (
              <a key="download" href={item.fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-sm border border-line/60 px-3 py-2 font-black text-ink transition hover:border-accent/50"><Download className="h-4 w-4" />Download</a>
            ) : (
              <button key="download" type="button" disabled className="inline-flex items-center gap-2 rounded-sm border border-line/60 px-3 py-2 font-black text-muted opacity-60"><Download className="h-4 w-4" />Unavailable</button>
            )
          ])}
        />
      ) : <EmptyState title="No visible resources" text="Your role does not currently have assigned files." />}
    </GlassPanel>
  );
}

function AcademySection({ academy }: { academy: ReturnType<typeof useAcademy> }) {
  return (
    <GlassPanel>
      <PanelTitle eyebrow="Kingdom Academy" title="Lessons, manuals, quizzes, exams, and certificates" />
      <div className="grid gap-4 lg:grid-cols-3">
        {academy.data?.lessons.map((lesson) => (
          <article key={lesson.title} className="overflow-hidden rounded-sm border border-line/60 bg-paper/25">
            <img src={lesson.thumbnail} alt="" className="h-40 w-full object-cover image-treatment" />
            <div className="p-4">
              <h3 className="font-black">{lesson.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{lesson.description}</p>
              <div className="mt-4"><ProgressBar value={lesson.progress} /></div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-4">
        <MiniList title="PDF Manuals" items={academy.data?.manuals || []} />
        <MiniList title="Quizzes" items={(academy.data?.quizzes || []).map((quiz) => `${quiz.title} - ${quiz.score}`)} />
        <MiniList title="Exams" items={(academy.data?.exams || []).map((exam) => `${exam.title} - ${exam.timer} - ${exam.questions} questions`)} />
        <MiniList title="Certificates" items={academy.data?.certificates || []} />
      </div>
    </GlassPanel>
  );
}

function DeploymentSection({ deployment }: { deployment: ReturnType<typeof useDeployment> }) {
  return (
    <GlassPanel>
      <PanelTitle eyebrow="Cluster deployment" title="Activities, projects, volunteers, and impact reports" />
      <div className="grid gap-4 lg:grid-cols-4">
        <MiniList title="Outreach Activities" items={(deployment.data?.outreach || []).map((item) => `${item.name} - ${item.status}`)} />
        <div className="rounded-sm border border-line/60 bg-paper/25 p-4">
          <h3 className="font-black">Community Projects</h3>
          <div className="mt-4 grid gap-4">
            {deployment.data?.projects.map((project) => (
              <div key={project.description}>
                <div className="mb-2 flex justify-between gap-3 text-sm font-bold text-muted"><span>{project.description}</span><span>{project.progress}%</span></div>
                <ProgressBar value={project.progress} />
              </div>
            ))}
          </div>
        </div>
        <MiniList title="Volunteer Participation" items={deployment.data?.participation || []} />
        <MiniList title="Impact Reports" items={deployment.data?.reports || []} />
      </div>
    </GlassPanel>
  );
}

function SkillsSection({
  search,
  setSearch,
  skillCategory,
  setSkillCategory,
  filteredMembers
}: {
  search: string;
  setSearch: (value: string) => void;
  skillCategory: string;
  setSkillCategory: (value: string) => void;
  filteredMembers: { name: string; profession: string; trainingLevel: string; availability: string; skills: string[] }[];
}) {
  return (
    <GlassPanel>
      <PanelTitle eyebrow="Skills database" title="Search deployment-ready profiles" />
      <div className="mb-4 grid gap-3 md:grid-cols-[1fr_14rem]">
        <label className="flex min-h-12 items-center gap-3 rounded-sm border border-line/60 bg-paper/30 px-4">
          <Search className="h-4 w-4 text-muted" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search skills, profession, training level" className="w-full bg-transparent text-sm font-semibold outline-none" />
        </label>
        <select value={skillCategory} onChange={(event) => setSkillCategory(event.target.value)} className="min-h-12 rounded-sm border border-line/60 bg-paper/30 px-4 text-sm font-bold outline-none focus:border-accent">
          {skillCategories.map((category) => <option key={category}>{category}</option>)}
        </select>
      </div>
      <DataTable
        columns={["Name", "Profession", "Training", "Availability", "Skills"]}
        rows={filteredMembers.map((member) => [member.name, member.profession, member.trainingLevel, member.availability, member.skills.join(", ")])}
      />
    </GlassPanel>
  );
}

function CertificationSection({ certificationLevels }: { certificationLevels: ReturnType<typeof useCertificationLevels> }) {
  const levels = certificationLevels.data?.length ? certificationLevels.data : ["Kingdom Citizen", "Cluster Worker", "Cluster Leader", "Regional Leader", "Global Leader"];

  return (
    <GlassPanel>
      <PanelTitle eyebrow="Certification system" title="Current level and path" />
      <div className="grid gap-3">
        {levels.map((level, index) => (
          <div key={level} className="flex items-center justify-between rounded-sm border border-line/60 bg-paper/25 p-4">
            <span className="font-black">{level}</span>
            <span className="text-sm font-black text-muted">{index === 0 ? "Current" : index === 1 ? "In progress" : "Locked"}</span>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

function CommunicationSection({ communication }: { communication: ReturnType<typeof useCommunication> }) {
  return (
    <GlassPanel>
      <PanelTitle eyebrow="Communication" title="Announcements, prayer networks, project updates" />
      <div className="grid gap-4 lg:grid-cols-3">
        <MiniList title="Announcements" items={communication.data?.announcements || []} />
        <MiniList title="Prayer Networks" items={communication.data?.prayer || []} />
        <MiniList title="Project Updates" items={communication.data?.updates || []} />
      </div>
    </GlassPanel>
  );
}

function ClusterCenterSection({ clusterCenters }: { clusterCenters: ReturnType<typeof useClusterCenters> }) {
  return (
    <GlassPanel>
      <PanelTitle eyebrow="Cluster center" title="Assigned center and leader contact" />
      {clusterCenters.isLoading ? <SkeletonBlock /> : clusterCenters.data?.length ? (
        <div className="grid gap-3">
          {clusterCenters.data.map((center) => (
            <div key={center.id || center.name} className="rounded-sm border border-line/60 bg-paper/25 p-4">
              <h3 className="text-xl font-black">{center.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{center.address || "No address provided."}</p>
              <p className="mt-4 text-sm font-black text-accent">Leader contact: {center.leaderContact}</p>
            </div>
          ))}
        </div>
      ) : <EmptyState title="No cluster centers" text="No centers are currently available from the backend." />}
    </GlassPanel>
  );
}

function PartnerSection() {
  const [form, setForm] = useState({ occupation: "", location: "", reason: "", skills: "" });
  const mutation = useMutation({ mutationFn: submitPartnerApplication });

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <GlassPanel>
      <PanelTitle eyebrow="Become a partner" title="Application snapshot" />
      <form
        className="grid gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate(form);
        }}
      >
        <input value={form.occupation} onChange={(event) => updateField("occupation", event.target.value)} placeholder="Occupation" className="min-h-11 rounded-sm border border-line/60 bg-paper/30 px-4 text-sm font-semibold outline-none focus:border-accent" />
        <input value={form.location} onChange={(event) => updateField("location", event.target.value)} placeholder="Location" className="min-h-11 rounded-sm border border-line/60 bg-paper/30 px-4 text-sm font-semibold outline-none focus:border-accent" />
        <input value={form.reason} onChange={(event) => updateField("reason", event.target.value)} placeholder="Reason" className="min-h-11 rounded-sm border border-line/60 bg-paper/30 px-4 text-sm font-semibold outline-none focus:border-accent" />
        <input value={form.skills} onChange={(event) => updateField("skills", event.target.value)} placeholder="Skills" className="min-h-11 rounded-sm border border-line/60 bg-paper/30 px-4 text-sm font-semibold outline-none focus:border-accent" />
        <button type="submit" disabled={mutation.isPending} className="inline-flex min-h-10 items-center justify-center rounded-sm border border-line/70 bg-paper/30 px-5 py-2.5 text-sm font-black text-ink transition hover:border-accent/50 hover:bg-accent/10 disabled:opacity-60">
          {mutation.isPending ? "Submitting..." : "Submit Partner Request"}
        </button>
        {mutation.isSuccess ? <p className="text-sm font-bold text-accent">Partner request submitted.</p> : null}
        {mutation.isError ? <p className="text-sm font-bold text-red-500">Unable to submit. Confirm your API token and try again.</p> : null}
      </form>
    </GlassPanel>
  );
}

function SocialSection({ socialLinks }: { socialLinks: ReturnType<typeof useSocialLinks> }) {
  return (
    <GlassPanel>
      <PanelTitle eyebrow="Social media" title="Pastor Joshua platforms" />
      {socialLinks.isLoading ? <SkeletonBlock /> : socialLinks.data?.length ? (
        <div className="grid gap-3 sm:grid-cols-3">
          {socialLinks.data.map((link) => (
            <a key={`${link.platform}-${link.url}`} href={link.url} target="_blank" rel="noreferrer" className="rounded-sm border border-line/60 bg-paper/25 p-4 font-black transition hover:border-accent/50">{link.platform}</a>
          ))}
        </div>
      ) : <EmptyState title="No social links" text="No active social links are currently published." />}
    </GlassPanel>
  );
}

function AttendanceSection({ meetings }: { meetings: ReturnType<typeof useMeetings> }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: checkInToMeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-home"] });
    }
  });

  return (
    <GlassPanel>
      <PanelTitle eyebrow="Attendance" title="Check-in opens 30 minutes from meeting start" />
      <div className="rounded-sm border border-line/60 bg-paper/25 p-4">
        <h3 className="font-black">Upcoming Meetings</h3>
        <div className="mt-4 grid gap-2">
          {(meetings.data?.upcoming || []).length ? meetings.data?.upcoming.map((meeting) => (
            <div key={meeting.id || `${meeting.title}-${meeting.date}`} className="flex flex-col gap-3 rounded-sm border border-line/50 bg-paper/20 px-3 py-2 text-sm font-semibold text-muted sm:flex-row sm:items-center sm:justify-between">
              <span>{meeting.title} - {meeting.date} {meeting.startTime}</span>
              <button
                type="button"
                disabled={!meeting.id || !meeting.checkInOpen || mutation.isPending}
                onClick={() => meeting.id && mutation.mutate(meeting.id)}
                className="inline-flex min-h-9 items-center justify-center rounded-sm border border-line/70 px-3 py-2 text-xs font-black text-ink transition hover:border-accent/50 disabled:text-muted disabled:opacity-60"
              >
                {meeting.checkInOpen ? "Check in" : "Closed"}
              </button>
            </div>
          )) : <p className="text-sm text-muted">No records yet.</p>}
        </div>
        {mutation.isSuccess ? <p className="mt-3 text-sm font-bold text-accent">Check-in recorded.</p> : null}
        {mutation.isError ? <p className="mt-3 text-sm font-bold text-red-500">Unable to check in for this meeting.</p> : null}
      </div>
      <div className="mt-4">
        <MiniList title="Past Attendance" items={(meetings.data?.history || []).map((item) => `${item.date} - checked in ${item.checkIn}`)} />
      </div>
    </GlassPanel>
  );
}

function MiniList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-sm border border-line/60 bg-paper/25 p-4">
      <h3 className="font-black">{title}</h3>
      <div className="mt-4 grid gap-2">
        {items.length ? items.map((item) => (
          <div key={item} className="rounded-sm border border-line/50 bg-paper/20 px-3 py-2 text-sm font-semibold text-muted">{item}</div>
        )) : <p className="text-sm text-muted">No records yet.</p>}
      </div>
    </div>
  );
}

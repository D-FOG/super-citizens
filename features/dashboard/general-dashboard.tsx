"use client";

import { Download, Search } from "lucide-react";
import { Button } from "@/components/button";
import { DashboardHeader, DataTable, EmptyState, GlassPanel, PanelTitle, ProgressBar, SkeletonBlock } from "@/components/dashboard/dashboard-shell";
import { certificationLevels, skillCategories } from "@/constants/dashboard";
import { useAcademy, useCommunication, useDashboardHome, useDeployment, useMeetings, useMembers, useResources } from "@/hooks/use-dashboard-data";
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
          <CertificationSection />
        ) : section === "communication" ? (
          <CommunicationSection communication={communication} />
        ) : section === "cluster-center" ? (
          <ClusterCenterSection />
        ) : section === "partner" ? (
          <PartnerSection />
        ) : section === "social" ? (
          <SocialSection />
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
            <button key="download" type="button" className="inline-flex items-center gap-2 rounded-sm border border-line/60 px-3 py-2 font-black text-ink transition hover:border-accent/50"><Download className="h-4 w-4" />Download</button>
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

function CertificationSection() {
  return (
    <GlassPanel>
      <PanelTitle eyebrow="Certification system" title="Current level and path" />
      <div className="grid gap-3">
        {certificationLevels.map((level, index) => (
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
      <div className="grid gap-4 lg:grid-cols-2">
        <MiniList title="Prayer Networks" items={communication.data?.prayer || []} />
        <MiniList title="Project Updates" items={communication.data?.updates || []} />
      </div>
    </GlassPanel>
  );
}

function ClusterCenterSection() {
  return (
    <GlassPanel>
      <PanelTitle eyebrow="Cluster center" title="Assigned center and leader contact" />
      <div className="rounded-sm border border-line/60 bg-paper/25 p-4">
        <h3 className="text-xl font-black">Ikeja Formation Center</h3>
        <p className="mt-2 text-sm leading-6 text-muted">Allen Avenue, Ikeja, Lagos. Closest center matching your profile location.</p>
        <p className="mt-4 text-sm font-black text-accent">Leader contact: Pastor Daniel Okafor</p>
      </div>
    </GlassPanel>
  );
}

function PartnerSection() {
  return (
    <GlassPanel>
      <PanelTitle eyebrow="Become a partner" title="Application snapshot" />
      <div className="grid gap-3">
        {["Occupation", "Location", "Reason", "Skills"].map((field) => (
          <input key={field} placeholder={field} className="min-h-11 rounded-sm border border-line/60 bg-paper/30 px-4 text-sm font-semibold outline-none focus:border-accent" />
        ))}
        <Button variant="secondary">Submit Partner Request</Button>
      </div>
    </GlassPanel>
  );
}

function SocialSection() {
  return (
    <GlassPanel>
      <PanelTitle eyebrow="Social media" title="Pastor Joshua platforms" />
      <div className="grid gap-3 sm:grid-cols-3">
        {["YouTube", "Instagram", "Facebook"].map((platform) => (
          <a key={platform} href="#" className="rounded-sm border border-line/60 bg-paper/25 p-4 font-black transition hover:border-accent/50">{platform}</a>
        ))}
      </div>
    </GlassPanel>
  );
}

function AttendanceSection({ meetings }: { meetings: ReturnType<typeof useMeetings> }) {
  return (
    <GlassPanel>
      <PanelTitle eyebrow="Attendance" title="Check-in opens 30 minutes from meeting start" />
      <MiniList title="Upcoming Meetings" items={(meetings.data?.upcoming || []).map((meeting) => `${meeting.title} - ${meeting.date} ${meeting.startTime}`)} />
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

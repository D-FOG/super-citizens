import type { Announcement, Lesson, Meeting, MemberProfile, Metric, ResourceItem, UserRole } from "@/types/dashboard";

const visibleToAll: UserRole[] = ["Cluster Supervisor", "Cluster Leader", "Cluster Member", "Registered Partner", "Field Evangelist"];

export const currentUser = {
  name: "Grace Adeyemi",
  clusterCenter: "Ikeja Formation Center",
  trainingLevel: "Foundation Track",
  certificationLevel: "Kingdom Citizen",
  leaderContact: "Pastor Daniel Okafor"
};

export async function getDashboardHome(role: UserRole) {
  return {
    user: { ...currentUser, role },
    metrics: [
      { label: "Training", value: "68%", helper: "4 lessons left" },
      { label: "Certification", value: "Level 1", helper: "2 proofs pending" },
      { label: "Attendance", value: "92%", helper: "Last 8 meetings" },
      { label: "Deployment", value: "7", helper: "Activities logged" }
    ] satisfies Metric[],
    announcements: [
      { title: "Regional outreach briefing opens this Friday", audience: "All clusters", date: "Jun 26, 2026" },
      { title: "Kingdom Academy quiz window closes Sunday", audience: "Foundation Track", date: "Jun 28, 2026" },
      { title: "Partner application review batch starts next week", audience: "Partners", date: "Jul 1, 2026" }
    ] satisfies Announcement[]
  };
}

export async function getResources(role: UserRole) {
  const resources: ResourceItem[] = [
    {
      title: "Cluster Orientation Video",
      category: "Onboarding",
      description: "A structured walkthrough of the Supersite cluster rhythm.",
      type: "Video",
      uploadedAt: "2026-06-10",
      visibleTo: visibleToAll
    },
    {
      title: "Prayer Network Manual",
      category: "Communication",
      description: "Guidance for prayer cells, reporting, and escalation.",
      type: "PDF",
      uploadedAt: "2026-06-12",
      visibleTo: visibleToAll
    },
    {
      title: "Leader Care Audio",
      category: "Leadership",
      description: "Private audio resource for shepherding cluster members.",
      type: "MP3",
      uploadedAt: "2026-06-15",
      visibleTo: ["Cluster Supervisor", "Cluster Leader"]
    },
    {
      title: "Partner Stewardship Guide",
      category: "Partnership",
      description: "Financial and service partnership expectations.",
      type: "PDF",
      uploadedAt: "2026-06-17",
      visibleTo: ["Cluster Supervisor", "Registered Partner"]
    }
  ];

  return resources.filter((resource) => resource.visibleTo.includes(role));
}

export async function getAcademy() {
  return {
    lessons: [
      {
        title: "Identity and Kingdom Output",
        description: "The inner frame for measurable life and service results.",
        progress: 72,
        thumbnail: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
      },
      {
        title: "Cluster Formation Rhythm",
        description: "How meetings, care, prayer, and deployment reinforce growth.",
        progress: 48,
        thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80"
      },
      {
        title: "Deployment Readiness",
        description: "Preparing skills and availability for community impact.",
        progress: 35,
        thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
      }
    ] satisfies Lesson[],
    manuals: ["Kingdom Citizen Manual", "Cluster Worker Field Guide", "Prayer Network Playbook"],
    quizzes: [
      { title: "Foundation Checkpoint", progress: 80, score: "18/20" },
      { title: "Deployment Basics", progress: 45, score: "In progress" }
    ],
    exams: [{ title: "Kingdom Citizen Exam", timer: "45 min", questions: 40, status: "Available" }],
    certificates: ["Kingdom Citizen Certificate"]
  };
}

export async function getMembers() {
  return [
    {
      id: "SC-1021",
      name: "Miriam Cole",
      role: "Cluster Member",
      profession: "Software Engineer",
      trainingLevel: "Foundation Track",
      availability: "Weekends",
      skills: ["React", "Data analysis", "Teaching"],
      category: "Technologists"
    },
    {
      id: "SC-1044",
      name: "Emeka Bello",
      role: "Registered Partner",
      profession: "Legal Counsel",
      trainingLevel: "Worker Track",
      availability: "Evenings",
      skills: ["Compliance", "Mediation"],
      category: "Lawyers"
    },
    {
      id: "SC-1068",
      name: "Tara Mensah",
      role: "Field Evangelist",
      profession: "Public Health Scientist",
      trainingLevel: "Foundation Track",
      availability: "Flexible",
      skills: ["Research", "Community health"],
      category: "Scientists"
    },
    {
      id: "SC-1090",
      name: "Joshua Eze",
      role: "Cluster Leader",
      profession: "Operations Manager",
      trainingLevel: "Leader Track",
      availability: "Weekdays",
      skills: ["Planning", "Reporting", "Team care"],
      category: "Leaders"
    }
  ] satisfies MemberProfile[];
}

export async function getDeployment() {
  return {
    outreach: [
      { name: "Market Square Prayer Walk", date: "Jun 29, 2026", status: "Scheduled" },
      { name: "Youth Skills Desk", date: "Jul 6, 2026", status: "In Progress" }
    ],
    projects: [
      { description: "Community literacy support", progress: 64 },
      { description: "Small business mentoring", progress: 38 }
    ],
    participation: ["3 volunteer shifts completed", "2 outreach reports submitted"],
    reports: ["June Week 2 Impact Report", "June Week 3 Volunteer Report"]
  };
}

export async function getCommunication() {
  return {
    prayer: ["Monday dawn network", "Friday cluster intercession"],
    updates: ["Food support project needs two administrators", "Outreach media recap awaiting review"],
    announcements: ["General communication excludes private leader forums by design."]
  };
}

export async function getMeetings() {
  return {
    upcoming: [
      { title: "Cluster Prayer and Training", date: "2026-06-27", startTime: "18:00", checkInOpen: false },
      { title: "Deployment Review", date: "2026-07-04", startTime: "10:00", checkInOpen: false }
    ] satisfies Meeting[],
    history: [
      { date: "2026-06-14", checkIn: "17:43" },
      { date: "2026-06-07", checkIn: "17:50" }
    ]
  };
}

export async function getLeaderWorkspace() {
  return {
    cluster: {
      name: "Ikeja Formation Center",
      address: "Allen Avenue, Ikeja, Lagos",
      members: 48,
      activeTraining: 31,
      weeklyAttendance: "89%"
    },
    assignments: [
      { title: "Complete prayer network mapping", due: "Jun 30, 2026", completion: 58 },
      { title: "Submit skills inventory", due: "Jul 3, 2026", completion: 74 }
    ],
    reports: [
      { title: "Weekly Report", status: "Submitted", date: "Jun 20, 2026" },
      { title: "Monthly Report", status: "Draft", date: "Jun 30, 2026" }
    ],
    forums: [
      { title: "Handling member growth stalls", replies: 12 },
      { title: "July outreach planning", replies: 8 }
    ]
  };
}

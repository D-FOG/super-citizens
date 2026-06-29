import type { Announcement, Assignment, ForumThread, Lesson, Meeting, MemberProfile, Metric, ReportItem, ResourceItem, UserRole } from "@/types/dashboard";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
};

type Paginated<T> = {
  data: T[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type ApiUser = {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  roles?: UserRole[];
  role?: UserRole;
  profession?: string;
  trainingLevel?: string;
  certificationLevel?: string;
  availability?: string;
  skills?: string[];
  category?: MemberProfile["category"];
  clusterCenterId?: ApiClusterCenter | string;
};

type AuthPayload = {
  user: ApiUser;
  accessToken: string;
  refreshToken: string;
};

type ApiClusterCenter = {
  _id?: string;
  id?: string;
  name?: string;
  address?: string;
  state?: string;
  country?: string;
  leaderContact?: string;
};

type ApiResource = {
  _id?: string;
  id?: string;
  title?: string;
  category?: string;
  description?: string;
  type?: ResourceItem["type"] | "video" | "pdf" | "audio";
  fileUrl?: string;
  uploadedAt?: string;
  createdAt?: string;
  visibleTo?: UserRole[];
};

type ApiLesson = {
  _id?: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  progress?: number;
};

type ApiManual = {
  title?: string;
};

type ApiQuiz = {
  title?: string;
  score?: string;
  progress?: number;
};

type ApiExam = {
  title?: string;
  durationMinutes?: number;
  questions?: unknown[];
  status?: string;
};

type ApiCertificate = {
  title?: string;
  level?: string;
};

type ApiMeeting = {
  _id?: string;
  id?: string;
  title?: string;
  date?: string;
  startTime?: string;
  checkInOpen?: boolean;
};

type ApiAttendance = {
  date?: string;
  checkInTime?: string;
};

type ApiOutreach = {
  name?: string;
  date?: string;
  status?: string;
};

type ApiProject = {
  name?: string;
  description?: string;
  progress?: number;
};

type ApiReport = {
  type?: string;
  title?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

type ApiForumThread = {
  title?: string;
  replies?: unknown[];
};

type ApiAssignment = {
  _id?: string;
  id?: string;
  title?: string;
  description?: string;
  dueDate?: string;
  status?: Assignment["status"];
  completion?: number;
};

type ApiSocialLink = {
  platform?: string;
  url?: string;
  isActive?: boolean;
  order?: number;
};

type PartnerApplicationInput = {
  occupation: string;
  location: string;
  reason: string;
  skills: string;
};

type AssignmentInput = {
  title: string;
  description: string;
  dueDate: string;
  assignedTo?: string;
  clusterCenterId?: string;
};

type ReportInput = {
  type: "Weekly" | "Monthly";
  clusterCenterId: string;
  summary: string;
  challenges?: string;
  needs?: string;
};

type ForumThreadInput = {
  title: string;
  body: string;
};

const fallbackUser = {
  name: "Dashboard User",
  clusterCenter: "No assigned cluster center",
  trainingLevel: "Not started",
  certificationLevel: "Not certified",
  leaderContact: "Not assigned"
};

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1").replace(/\/$/, "");
const API_ACCESS_TOKEN = process.env.NEXT_PUBLIC_API_ACCESS_TOKEN;

class ApiUnavailableError extends Error {}

function authHeaders() {
  const browserToken = typeof window !== "undefined" ? window.localStorage.getItem("superCitizensAccessToken") : undefined;
  const token = browserToken || API_ACCESS_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function hasAuthToken() {
  return Boolean(authHeaders().Authorization);
}

async function apiFetch<T>(path: string, init?: RequestInit & { auth?: boolean }): Promise<T> {
  if (init?.auth !== false && !hasAuthToken()) {
    throw new ApiUnavailableError("NEXT_PUBLIC_API_ACCESS_TOKEN is required for protected dashboard endpoints.");
  }

  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  if (init?.auth !== false) {
    Object.entries(authHeaders()).forEach(([key, value]) => headers.set(key, value));
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers
  });

  const payload = (await response.json().catch(() => ({}))) as ApiResponse<T>;
  if (!response.ok || payload.success === false) {
    throw new Error(payload.message || `API request failed: ${path}`);
  }
  return payload.data as T;
}

export async function login(input: { email: string; password: string }) {
  return apiFetch<AuthPayload>("/auth/login", {
    auth: false,
    method: "POST",
    body: JSON.stringify(input)
  });
}

export async function register(input: { name: string; email: string; password: string }) {
  return apiFetch<AuthPayload>("/auth/register", {
    auth: false,
    method: "POST",
    body: JSON.stringify(input)
  });
}

async function safeApi<T>(factory: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await factory();
  } catch (error) {
    if (error instanceof ApiUnavailableError) return fallback;
    console.error(error);
    return fallback;
  }
}

function unwrapList<T>(payload: Paginated<T> | T[] | undefined): T[] {
  if (!payload) return [];
  return Array.isArray(payload) ? payload : payload.data || [];
}

function formatDate(value?: string) {
  if (!value) return "Not dated";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

function formatTime(value?: string) {
  if (!value) return "unknown time";
  return new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function normalizeResourceType(type?: ApiResource["type"]): ResourceItem["type"] {
  if (type === "pdf" || type === "PDF") return "PDF";
  if (type === "audio" || type === "MP3") return "MP3";
  return "Video";
}

function primaryRole(user?: ApiUser, fallback: UserRole = "Cluster Member"): UserRole {
  return user?.roles?.[0] || user?.role || fallback;
}

export async function getDashboardHome(role: UserRole) {
  return safeApi(async () => {
    const [profile, academy, attendance, deployments, announcements] = await Promise.all([
      apiFetch<{ user?: ApiUser } | ApiUser>("/auth/me"),
      apiFetch<Record<string, number>>("/academy/overview"),
      apiFetch<Paginated<ApiAttendance>>("/attendance/me"),
      apiFetch<Record<string, number>>("/deployments/overview"),
      apiFetch<Paginated<{ title?: string; audienceRoles?: UserRole[]; publishAt?: string; createdAt?: string }>>("/announcements")
    ]);

    const user = (profile as { user?: ApiUser }).user ?? (profile as ApiUser);
    const center = typeof user?.clusterCenterId === "object" ? user.clusterCenterId : undefined;
    const attendanceItems = unwrapList(attendance);
    const announcementItems = unwrapList(announcements);

    return {
      user: {
        name: user?.name || fallbackUser.name,
        role: primaryRole(user, role),
        clusterCenter: center?.name || fallbackUser.clusterCenter,
        trainingLevel: user?.trainingLevel || fallbackUser.trainingLevel,
        certificationLevel: user?.certificationLevel || fallbackUser.certificationLevel,
        leaderContact: center?.leaderContact || fallbackUser.leaderContact
      },
      metrics: [
        { label: "Training", value: String(academy.lessons || 0), helper: "Lessons available" },
        { label: "Certification", value: String(academy.certificates || 0), helper: "Certificates earned or issued" },
        { label: "Attendance", value: String(attendanceItems.length), helper: "Recorded check-ins" },
        { label: "Deployment", value: String((deployments.outreach || 0) + (deployments.projects || 0)), helper: "Activities and projects" }
      ] satisfies Metric[],
      announcements: announcementItems.map((item) => ({
        title: item.title || "Untitled announcement",
        audience: item.audienceRoles?.length ? item.audienceRoles.join(", ") : "All clusters",
        date: formatDate(item.publishAt || item.createdAt)
      })) satisfies Announcement[]
    };
  }, {
    user: { ...fallbackUser, role },
    metrics: [
      { label: "Training", value: "0", helper: "Connect API token to load" },
      { label: "Certification", value: "0", helper: "Connect API token to load" },
      { label: "Attendance", value: "0", helper: "Connect API token to load" },
      { label: "Deployment", value: "0", helper: "Connect API token to load" }
    ],
    announcements: []
  });
}

export async function getResources(_role: UserRole) {
  return safeApi(async () => {
    const payload = await apiFetch<Paginated<ApiResource>>("/resources");
    return unwrapList(payload).map((resource) => ({
      id: resource.id || resource._id || "",
      title: resource.title || "Untitled resource",
      category: resource.category || "General",
      description: resource.description || "",
      type: normalizeResourceType(resource.type),
      uploadedAt: formatDate(resource.uploadedAt || resource.createdAt),
      visibleTo: resource.visibleTo || [],
      fileUrl: resource.fileUrl
    }));
  }, [] as ResourceItem[]);
}

export async function getAcademy() {
  return safeApi(async () => {
    const [lessons, manuals, quizzes, exams, certificates] = await Promise.all([
      apiFetch<Paginated<ApiLesson>>("/academy/lessons"),
      apiFetch<Paginated<ApiManual>>("/academy/manuals"),
      apiFetch<Paginated<ApiQuiz>>("/quizzes"),
      apiFetch<Paginated<ApiExam>>("/exams"),
      apiFetch<Paginated<ApiCertificate>>("/certificates")
    ]);

    return {
      lessons: unwrapList(lessons).map((lesson) => ({
        title: lesson.title || "Untitled lesson",
        description: lesson.description || "",
        progress: lesson.progress || 0,
        thumbnail: lesson.thumbnailUrl || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80"
      })) satisfies Lesson[],
      manuals: unwrapList(manuals).map((manual) => manual.title || "Untitled manual"),
      quizzes: unwrapList(quizzes).map((quiz) => ({ title: quiz.title || "Untitled quiz", progress: quiz.progress || 0, score: quiz.score || "Not submitted" })),
      exams: unwrapList(exams).map((exam) => ({
        title: exam.title || "Untitled exam",
        timer: `${exam.durationMinutes || 0} min`,
        questions: exam.questions?.length || 0,
        status: exam.status || "Available"
      })),
      certificates: unwrapList(certificates).map((certificate) => certificate.title || certificate.level || "Certificate")
    };
  }, { lessons: [], manuals: [], quizzes: [], exams: [], certificates: [] });
}

export async function getMembers() {
  return safeApi(async () => {
    const payload = await apiFetch<Paginated<ApiUser>>("/skills/profiles");
    return unwrapList(payload).map((member) => ({
      id: member.id || member._id || "",
      name: member.name || "Unnamed member",
      role: primaryRole(member),
      profession: member.profession || "Not provided",
      trainingLevel: member.trainingLevel || "Not started",
      availability: member.availability || "Not provided",
      skills: member.skills || [],
      category: member.category || "Administrators"
    })) satisfies MemberProfile[];
  }, [] as MemberProfile[]);
}

export async function getDeployment() {
  return safeApi(async () => {
    const [outreach, projects, reports] = await Promise.all([
      apiFetch<Paginated<ApiOutreach>>("/deployments/outreach"),
      apiFetch<Paginated<ApiProject>>("/deployments/projects"),
      apiFetch<Paginated<ApiReport>>("/reports")
    ]);
    return {
      outreach: unwrapList(outreach).map((item) => ({ name: item.name || "Untitled outreach", date: formatDate(item.date), status: item.status || "Scheduled" })),
      projects: unwrapList(projects).map((project) => ({ description: project.description || project.name || "Untitled project", progress: project.progress || 0 })),
      participation: ["Volunteer participation is loaded through project records."],
      reports: unwrapList(reports).map((report) => `${report.title || report.type || "Report"} - ${report.status || "Submitted"}`)
    };
  }, { outreach: [], projects: [], participation: [], reports: [] });
}

export async function getCommunication() {
  return safeApi(async () => {
    const [prayer, updates, announcements] = await Promise.all([
      apiFetch<Paginated<{ title?: string; schedule?: string }>>("/prayer-networks"),
      apiFetch<Paginated<{ title?: string; body?: string }>>("/project-updates"),
      apiFetch<Paginated<{ title?: string }>>("/announcements")
    ]);
    return {
      prayer: unwrapList(prayer).map((item) => `${item.title || "Prayer network"}${item.schedule ? ` - ${item.schedule}` : ""}`),
      updates: unwrapList(updates).map((item) => item.title || item.body || "Project update"),
      announcements: unwrapList(announcements).map((item) => item.title || "Announcement")
    };
  }, { prayer: [], updates: [], announcements: [] });
}

export async function getMeetings() {
  return safeApi(async () => {
    const [meetings, history] = await Promise.all([
      apiFetch<Paginated<ApiMeeting>>("/meetings"),
      apiFetch<Paginated<ApiAttendance>>("/attendance/me")
    ]);
    return {
      upcoming: unwrapList(meetings).map((meeting) => ({
        id: meeting.id || meeting._id || "",
        title: meeting.title || "Untitled meeting",
        date: meeting.date || "",
        startTime: meeting.startTime || "",
        checkInOpen: Boolean(meeting.checkInOpen)
      })) satisfies Meeting[],
      history: unwrapList(history).map((item) => ({ date: formatDate(item.date), checkIn: formatTime(item.checkInTime) }))
    };
  }, { upcoming: [] as Meeting[], history: [] as { date: string; checkIn: string }[] });
}

export async function getClusterCenters() {
  return safeApi(async () => {
    const payload = await apiFetch<Paginated<ApiClusterCenter>>("/cluster-centers");
    return unwrapList(payload).map((center) => ({
      id: center.id || center._id || "",
      name: center.name || "Unnamed center",
      address: [center.address, center.state, center.country].filter(Boolean).join(", "),
      leaderContact: center.leaderContact || "Not assigned"
    }));
  }, [] as { id: string; name: string; address: string; leaderContact: string }[]);
}

export async function getSocialLinks() {
  return safeApi(async () => {
    const payload = await apiFetch<Paginated<ApiSocialLink>>("/social-links", { auth: false });
    return unwrapList(payload)
      .filter((link) => link.isActive !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((link) => ({ platform: link.platform || "Social", url: link.url || "#" }));
  }, [] as { platform: string; url: string }[]);
}

export async function getCertificationLevels() {
  return safeApi(async () => {
    const payload = await apiFetch<Paginated<{ name?: string }>>("/certification-levels");
    return unwrapList(payload).map((level) => level.name || "Certification level");
  }, [] as string[]);
}

export async function getAssignments() {
  return safeApi(async () => {
    const payload = await apiFetch<Paginated<ApiAssignment>>("/assignments");
    return unwrapList(payload).map((assignment) => ({
      id: assignment.id || assignment._id || "",
      title: assignment.title || "Untitled assignment",
      description: assignment.description || "",
      due: formatDate(assignment.dueDate),
      status: assignment.status || "Open",
      completion: assignment.completion || 0
    })) satisfies Assignment[];
  }, [] as Assignment[]);
}

export async function createAssignment(input: AssignmentInput) {
  return apiFetch("/assignments", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export async function updateAssignment(id: string, input: Partial<Pick<Assignment, "status" | "completion">>) {
  return apiFetch(`/assignments/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input)
  });
}

export async function submitPartnerApplication(input: PartnerApplicationInput) {
  return apiFetch("/partner-applications", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export async function checkInToMeeting(meetingId: string) {
  return apiFetch("/attendance/check-in", {
    method: "POST",
    body: JSON.stringify({ meetingId })
  });
}

export async function submitReport(input: ReportInput) {
  return apiFetch("/reports", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export async function createForumThread(input: ForumThreadInput) {
  return apiFetch("/leader-forums/threads", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export async function getLeaderWorkspace() {
  return safeApi(async () => {
    const [centers, members, assignments, reports, forums] = await Promise.all([
      getClusterCenters(),
      getMembers(),
      getAssignments(),
      apiFetch<Paginated<ApiReport>>("/reports"),
      apiFetch<Paginated<ApiForumThread>>("/leader-forums/threads")
    ]);
    const cluster = centers[0];
    const activeTraining = members.filter((member) => member.trainingLevel !== "Not started").length;
    return {
      cluster: {
        name: cluster?.name || "No cluster assigned",
        address: cluster?.address || "Connect a cluster center to this leader.",
        members: members.length,
        activeTraining,
        weeklyAttendance: "See attendance module"
      },
      assignments,
      reports: unwrapList(reports).map((report) => ({
        title: report.title || report.type || "Report",
        status: report.status || "Submitted",
        date: formatDate(report.updatedAt || report.createdAt)
      })) satisfies ReportItem[],
      forums: unwrapList(forums).map((forum) => ({ title: forum.title || "Untitled thread", replies: forum.replies?.length || 0 })) satisfies ForumThread[]
    };
  }, {
    cluster: { name: "No cluster assigned", address: "Connect API token to load leader workspace.", members: 0, activeTraining: 0, weeklyAttendance: "0%" },
    assignments: [],
    reports: [],
    forums: []
  });
}

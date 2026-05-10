import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Crown,
  Flame,
  GraduationCap,
  HandCoins,
  Layers3,
  MapPin,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap
} from "lucide-react";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/clusters", label: "Kingdom Clusters" },
  { href: "/leadership", label: "Leadership System" },
  { href: "/training", label: "Training Hub" },
  { href: "/resources", label: "Resources" },
  { href: "/start-cluster", label: "Start a Cluster" },
  { href: "/events", label: "Events" },
  { href: "/payments", label: "Payments" },
  { href: "/join", label: "Join" },
  { href: "/contact", label: "Contact" }
];

export const imageSet = {
  worship: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1600&q=80",
  leaders: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80",
  learning: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
  library: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80",
  city: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=80",
  prayer: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1400&q=80"
};

export const systemPillars = [
  { icon: ShieldCheck, title: "Spiritually Grounded", text: "Doctrine, prayer, discipline, and identity become a weekly operating rhythm." },
  { icon: Zap, title: "Economically Productive", text: "Members are trained to solve problems, build useful skills, and create measurable value." },
  { icon: GraduationCap, title: "Skillfully Developed", text: "The training hub turns hunger into structured learning, practice, feedback, and deployment." },
  { icon: Target, title: "Strategically Positioned", text: "Clusters become leadership laboratories for multiplication, reporting, and territory impact." }
];

export const problems = [
  "Spiritual growth without structure",
  "Prayer without productivity",
  "Gathering without results"
];

export const workflow = [
  "Join a Cluster",
  "Structured Training",
  "Skill Development",
  "Leadership Growth",
  "System Multiplication"
];

export const activities = [
  { icon: Flame, title: "Morning Prayers", day: "Mon - Fri", time: "5:30 AM", text: "A daily altar for discipline, clarity, and spiritual stamina." },
  { icon: Crown, title: "Mandate Service", day: "Sunday", time: "9:00 AM", text: "Corporate instruction, worship, testimony, and commissioning." },
  { icon: Network, title: "Kingdom Clusters", day: "Weekly", time: "Local", text: "Small-group growth systems for learning, accountability, and multiplication." }
];

export const clusterLevels = [
  "Basic Cluster",
  "Mother Cluster",
  "Master Cluster",
  "Dominion Cluster",
  "City Cluster",
  "Governing Cluster",
  "Regional Cluster"
];

export const trainings = [
  { title: "Foundation Training", tag: "Identity", icon: ShieldCheck, text: "Spiritual roots, doctrine, culture, and system language." },
  { title: "Skill Development", tag: "Value", icon: GraduationCap, text: "High-income skills, digital execution, communication, and problem solving." },
  { title: "Application", tag: "Practice", icon: CheckCircle2, text: "Assignments, accountability, feedback, and measurable weekly outputs." },
  { title: "Leadership Training", tag: "Capacity", icon: Crown, text: "Ownership, reporting, pastoral care, team building, and multiplication." },
  { title: "Deployment", tag: "Results", icon: MapPin, text: "Cluster launches, ministry teams, projects, mentorship, and public proof." }
];

export const books = [
  "The Instrumentation of Spiritual Control",
  "Anointed With Skills",
  "You-Man-God Partnership",
  "Building Purpose on Purpose"
];

export const events = [
  { title: "Morning Prayer Fire", date: "Weekdays", type: "Prayer", icon: Flame },
  { title: "Mandate Service", date: "Sundays", type: "Service", icon: Crown },
  { title: "Cluster Circles", date: "Local schedules", type: "Clusters", icon: Users },
  { title: "Builder Intensives", date: "Monthly", type: "Training", icon: BookOpen }
];

export const paymentOptions = [
  { title: "Mentorship Fees", icon: HandCoins, text: "Structured mentoring, accountability, and growth reviews." },
  { title: "Training Payments", icon: GraduationCap, text: "Skill courses, labs, bootcamps, and certification tracks." },
  { title: "Donations", icon: Sparkles, text: "Support movement expansion, resource access, and local cluster infrastructure." }
];

export const apiRoles = ["Visitor", "Member", "Leader", "Admin"] as const;
export const accessLevels = ["Public", "Member", "Leader"] as const;

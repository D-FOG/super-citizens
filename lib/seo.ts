import type { Metadata } from "next";

const rawSiteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://supersitecitizens.org";

export const siteUrl = rawSiteUrl.replace(/\/$/, "");

export const siteName = process.env.NEXT_PUBLIC_APP_NAME || "Supersite Citizens";

export const defaultDescription =
  "A structured Kingdom growth system for spiritual grounding, skill development, leadership, and multiplication.";

export const defaultOgImage =
  process.env.NEXT_PUBLIC_SEO_OG_IMAGE ||
  "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1600&q=80";

export const publicRoutes = [
  "",
  "about",
  "clusters",
  "leadership",
  "training",
  "resources",
  "start-cluster",
  "events",
  "payments",
  "join",
  "contact",
  "leader-registration"
] as const;

export const pageSeo = {
  home: {
    title: "Supersite Citizens | Kingdom Growth, Skills, Leadership, and Clusters",
    description: "Join a structured Kingdom growth system for prayer, cluster life, skill development, training, leadership, and measurable deployment.",
    path: "/"
  },
  about: {
    title: "About Supersite Citizens",
    description: "Learn the mandate, mission, culture, and approach behind Supersite Citizens: identity, discipline, skill, and Kingdom movement.",
    path: "/about"
  },
  clusters: {
    title: "Kingdom Clusters",
    description: "Explore Supersite Kingdom Clusters: structured small groups for spiritual growth, accountability, skill practice, and multiplication.",
    path: "/clusters"
  },
  leadership: {
    title: "Leadership System",
    description: "See how Supersite Citizens trains, tests, and trusts leaders through prayer, service, reporting, skill output, and people development.",
    path: "/leadership"
  },
  training: {
    title: "Training Hub",
    description: "Enter the Supersite training path for foundation, mentorship, skill development, execution, and leadership readiness.",
    path: "/training"
  },
  resources: {
    title: "Resources Library",
    description: "Access structured Supersite resources, manuals, books, and learning materials for formation, skills, and leadership growth.",
    path: "/resources"
  },
  startCluster: {
    title: "Start a Cluster",
    description: "Apply to start a Supersite cluster and move through readiness, review, orientation, pre-launch checks, and launch approval.",
    path: "/start-cluster"
  },
  events: {
    title: "Events",
    description: "Follow the Supersite rhythm of morning prayer, mandate services, cluster circles, training gatherings, and builder intensives.",
    path: "/events"
  },
  payments: {
    title: "Payments and Giving",
    description: "Make secure Supersite payments for mentorship, training, and donations through a Flutterwave-ready payment flow.",
    path: "/payments"
  },
  join: {
    title: "Join Supersite Citizens",
    description: "Register to join a cluster, begin training, or start your Supersite Citizens growth path.",
    path: "/join"
  },
  contact: {
    title: "Contact Supersite Citizens",
    description: "Contact Supersite Citizens for support, onboarding questions, cluster information, and communication.",
    path: "/contact"
  },
  leaderRegistration: {
    title: "Leader Application",
    description: "Apply to lead a Supersite cluster. Submit your background, location, skills, calling, and leadership readiness for review.",
    path: "/leader-registration"
  }
} satisfies Record<string, { title: string; description: string; path: string }>;

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createMetadata({ title, description, path = "/", index = true }: { title: string; description: string; path?: string; index?: boolean }): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url,
      images: [
        {
          url: defaultOgImage,
          width: 1600,
          height: 900,
          alt: `${siteName} gathering and leadership system`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage]
    },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1
          }
        }
      : {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false
          }
        }
  };
}

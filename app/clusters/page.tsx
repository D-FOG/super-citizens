import { PageTransition } from "@/components/motion";
import { ClusterHierarchy, InlineNextAction, StoryPage, WeeklyActivities } from "@/components/sections";
import { imageSet } from "@/lib/content";
import { createMetadata, pageSeo } from "@/lib/seo";

export const metadata = createMetadata(pageSeo.clusters);

export default function ClustersPage() {
  return (
    <PageTransition>
      <StoryPage
        eyebrow="Kingdom Clusters"
        title="Small groups with structure, accountability, and multiplication logic."
        text="A cluster is a local growth environment where people pray, learn, practice, report, and multiply under trained leadership."
        image={imageSet.leaders}
        blocks={[
          { title: "What is a Cluster", text: "A weekly unit for spiritual growth, skill accountability, pastoral care, and mission-driven productivity." },
          { title: "Cluster Structure", text: "Clusters grow through clear levels, leadership reviews, reporting, and launch readiness." },
          { title: "Join CTA", text: "Visitors can join a local cluster and immediately enter the rhythm of growth." },
          { title: "Schedule", text: "Cluster meetings are scheduled locally while staying aligned with the global movement rhythm." }
        ]}
      />
      <ClusterHierarchy />
      <WeeklyActivities />
      <InlineNextAction href="/join" label="Join a cluster near you" />
    </PageTransition>
  );
}

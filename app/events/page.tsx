import { PageTransition } from "@/components/motion";
import { EventTimeline, InlineNextAction, StoryPage, WeeklyActivities } from "@/components/sections";
import { imageSet } from "@/lib/content";

export default function EventsPage() {
  return (
    <PageTransition>
      <StoryPage
        eyebrow="Events"
        title="Prayer sessions, services, clusters, and gatherings in one living rhythm."
        text="Events keep the movement synchronized across prayer, instruction, community, leadership, and special intensives."
        image={imageSet.worship}
        blocks={[
          { title: "Calendar-Ready", text: "The UI is structured for a future database-backed calendar and registration system." },
          { title: "Engagement Flow", text: "Every event points people toward growth, training, cluster participation, and service." }
        ]}
      />
      <EventTimeline />
      <WeeklyActivities />
      <InlineNextAction href="/join" label="Join the next meaningful step" />
    </PageTransition>
  );
}

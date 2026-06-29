import { PageTransition } from "@/components/motion";
import { InlineNextAction, LeadershipProgression, StoryPage } from "@/components/sections";
import { imageSet } from "@/lib/content";
import { createMetadata, pageSeo } from "@/lib/seo";

export const metadata = createMetadata(pageSeo.leadership);

export default function LeadershipPage() {
  return (
    <PageTransition>
      <StoryPage
        eyebrow="Leadership System"
        title="Leadership is not guessed. It is trained, tested, and trusted."
        text="The Supersite leadership system develops people through expectations, mentorship, measurable faithfulness, and multiplying responsibility."
        image={imageSet.city}
        blocks={[
          { title: "How You Grow", text: "You grow by showing consistency in prayer, learning, service, reporting, skill output, and people development." },
          { title: "Expectations", text: "Leaders carry culture, protect doctrine, care for people, keep records, and reproduce reliable builders." }
        ]}
      />
      <LeadershipProgression />
      <InlineNextAction href="/start-cluster" label="Apply to enter the leader pipeline" />
    </PageTransition>
  );
}

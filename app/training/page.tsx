import { PageTransition } from "@/components/motion";
import { InlineNextAction, StoryPage, TrainingGrid } from "@/components/sections";
import { imageSet } from "@/lib/content";

export default function TrainingPage() {
  return (
    <PageTransition>
      <StoryPage
        eyebrow="Training Hub"
        title="High-income skills, monetization, discipline, and execution."
        text="The Training Hub turns desire into a guided path of foundation, practical skill development, application, leadership, and deployment."
        image={imageSet.learning}
        blocks={[
          { title: "Foundation Training", text: "Identity, doctrine, culture, and the operating language of the movement." },
          { title: "Mentorship", text: "Skill development, monetization, discipline, execution, review, and course correction." }
        ]}
      />
      <TrainingGrid />
      <InlineNextAction href="/join" label="Start your training path" />
    </PageTransition>
  );
}

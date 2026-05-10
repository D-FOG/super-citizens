import { PageTransition } from "@/components/motion";
import { InlineNextAction, ResourceLibrary, StoryPage } from "@/components/sections";
import { imageSet } from "@/lib/content";

export default function ResourcesPage() {
  return (
    <PageTransition>
      <StoryPage
        eyebrow="Resources"
        title="A premium digital library for formation, skill, and leadership."
        text="Materials, manuals, books, and access-controlled resources support public learning, member growth, and leader readiness."
        image={imageSet.library}
        blocks={[
          { title: "Materials", text: "Structured documents and guides for meetings, reporting, training, and leadership execution." },
          { title: "Access Levels", text: "Public, Member, and Leader levels keep resources organized by responsibility and readiness." }
        ]}
      />
      <ResourceLibrary />
      <InlineNextAction href="/training" label="Move from reading to training" />
    </PageTransition>
  );
}

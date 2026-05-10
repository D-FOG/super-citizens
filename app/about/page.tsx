import { PageTransition } from "@/components/motion";
import { InlineNextAction, StoryPage } from "@/components/sections";
import { imageSet } from "@/lib/content";

export default function AboutPage() {
  return (
    <PageTransition>
      <StoryPage
        eyebrow="About"
        title="A culture of identity, discipline, skill, and Kingdom movement."
        text="Supersite Citizens exists to raise spiritually grounded people who can build systems, serve with excellence, and produce visible results in life, work, and ministry."
        image={imageSet.prayer}
        blocks={[
          { title: "Our Mandate", text: "Raise Kingdom citizens who carry spiritual authority, practical competence, and disciplined execution." },
          { title: "Our Mission", text: "Turn believers into builders through clusters, training, mentorship, and measurable deployment." },
          { title: "Our Culture", text: "Prayerful, skillful, accountable, excellent, teachable, structured, and multiplication-minded." },
          { title: "Our Approach", text: "We combine spiritual formation with high-income skills, leadership pipelines, and clear reporting systems." }
        ]}
      />
      <InlineNextAction href="/clusters" label="Explore the cluster system" />
    </PageTransition>
  );
}

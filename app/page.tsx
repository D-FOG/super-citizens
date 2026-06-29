import { FinalCta, Hero, HowItWorks, Pillars, ProblemSolution, WeeklyActivities } from "@/components/sections";
import { PageTransition } from "@/components/motion";
import { createMetadata, pageSeo } from "@/lib/seo";

export const metadata = createMetadata(pageSeo.home);

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Pillars />
      <ProblemSolution />
      <HowItWorks />
      <WeeklyActivities />
      <FinalCta />
    </PageTransition>
  );
}

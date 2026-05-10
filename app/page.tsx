import { FinalCta, Hero, HowItWorks, Pillars, ProblemSolution, WeeklyActivities } from "@/components/sections";
import { PageTransition } from "@/components/motion";

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

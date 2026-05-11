import { PageTransition } from "@/components/motion";
import { InlineNextAction, OrientationAccess, SectionHeader, SkeletonStrip } from "@/components/sections";

export default function OrientationPage() {
  return (
    <PageTransition>
      <section className="pt-28">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Private orientation"
            title="Onboarding content for approved cluster leaders."
            text="This area is prepared for authentication, role checks, videos, resources, checklists, and launch readiness reporting."
          />
          <SkeletonStrip />
        </div>
      </section>
      <OrientationAccess />
      <InlineNextAction href="/events" label="Step into the movement rhythm" />
    </PageTransition>
  );
}

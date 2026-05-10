import { JoinForm } from "@/components/forms";
import { PageTransition } from "@/components/motion";
import { InlineNextAction, SectionHeader } from "@/components/sections";

export default function JoinPage() {
  return (
    <PageTransition>
      <section className="pt-32">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Join"
            title="Choose your path: cluster, training, or leadership growth."
            text="This registration flow is prepared for database storage, email confirmation, onboarding, and role assignment."
          />
          <div className="mx-auto max-w-2xl">
            <JoinForm />
          </div>
        </div>
      </section>
      <InlineNextAction href="/training" label="Enter the training hub after registration" />
    </PageTransition>
  );
}

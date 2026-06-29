import { ClusterApplicationForm } from "@/components/forms";
import { PageTransition } from "@/components/motion";
import { InlineNextAction, SectionHeader } from "@/components/sections";
import { createMetadata, pageSeo } from "@/lib/seo";

export const metadata = createMetadata(pageSeo.startCluster);

export default function StartClusterPage() {
  return (
    <PageTransition>
      <section className="pt-28">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Start a Cluster"
            title="The leader pipeline begins with readiness, review, orientation, and launch approval."
            text="Applications move through confirmation, admin review, orientation access, pre-launch checklist, and final launch approval."
          />
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[.8fr_1.2fr]">
            <div className="premium-card p-6">
              <h2 className="text-2xl font-black">Requirements</h2>
              <div className="mt-5 grid gap-3 text-sm text-muted">
                {["Stable spiritual discipline", "Teachable leadership posture", "Meeting capacity", "Reporting commitment", "Training readiness"].map((item) => (
                  <p key={item} className="rounded-sm border border-line/60 bg-paper/25 p-3 font-semibold">{item}</p>
                ))}
              </div>
            </div>
            <ClusterApplicationForm />
          </div>
        </div>
      </section>
      <InlineNextAction href="/orientation" label="Approved leaders continue into orientation" />
    </PageTransition>
  );
}

import { PaymentForm } from "@/components/forms";
import { PageTransition } from "@/components/motion";
import { InlineNextAction, PaymentsGrid, SectionHeader } from "@/components/sections";
import { createMetadata, pageSeo } from "@/lib/seo";

export const metadata = createMetadata(pageSeo.payments);

export default function PaymentsPage() {
  return (
    <PageTransition>
      <section className="pt-28">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Payments"
            title="Global giving and training payments with Flutterwave-ready architecture."
            text="The checkout UI supports multiple countries, currencies, mentorship fees, training payments, donations, success states, and failure handling."
          />
        </div>
      </section>
      <PaymentsGrid />
      <section id="checkout" className="pb-20">
        <div className="section-shell mx-auto max-w-2xl">
          <PaymentForm />
        </div>
      </section>
      <InlineNextAction href="/resources" label="Access the right resources after payment" />
    </PageTransition>
  );
}

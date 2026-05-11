import { Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/forms";
import { PageTransition } from "@/components/motion";
import { SectionHeader } from "@/components/sections";

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="min-h-screen pt-28">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Contact"
            title="Clear channels for support, onboarding, and communication."
            text="Reach the team through WhatsApp, email, or the contact form."
          />
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[.85fr_1.15fr]">
            <div className="grid gap-4">
              <a href="https://wa.me/" className="premium-card flex items-center gap-4 p-6">
                <MessageCircle className="h-6 w-6 text-accent/80" />
                <div>
                  <h2 className="font-black">WhatsApp</h2>
                  <p className="text-sm text-muted">Fast support and movement updates.</p>
                </div>
              </a>
              <a href="mailto:hello@supersitecitizens.org" className="premium-card flex items-center gap-4 p-6">
                <Mail className="h-6 w-6 text-accent/80" />
                <div>
                  <h2 className="font-black">Email</h2>
                  <p className="text-sm text-muted">hello@supersitecitizens.org</p>
                </div>
              </a>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

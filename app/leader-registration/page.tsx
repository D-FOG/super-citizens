import { LeaderRegistrationForm } from "@/features/applications/leader-registration-form";

export default function LeaderRegistrationPage() {
  return (
    <main className="pt-28">
      <section className="section-shell grid gap-10 pb-16 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <p className="eyebrow">Leader registration portal</p>
          <h1 className="editorial-heading mt-4 text-5xl sm:text-7xl">Apply to lead a Supersite cluster.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Applications collect personal information, background, location, skills, and calling interests. Submitted applications begin as Pending until admin review.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {["Pending", "Approved", "Rejected"].map((status) => (
              <div key={status} className="rounded-sm border border-line/60 bg-paper/25 p-4 font-black backdrop-blur-xl">{status}</div>
            ))}
          </div>
        </div>
        <LeaderRegistrationForm />
      </section>
    </main>
  );
}

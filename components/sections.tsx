import { ArrowUpRight, Check, LockKeyhole, Play, ShieldCheck } from "lucide-react";
import { Button } from "@/components/button";
import { Reveal } from "@/components/motion";
import {
  accessLevels,
  activities,
  books,
  clusterLevels,
  events,
  imageSet,
  paymentOptions,
  problems,
  systemPillars,
  trainings,
  workflow
} from "@/lib/content";

export function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden pt-24">
      <div className="absolute inset-0 bg-hero-grid bg-[length:88px_88px] opacity-20" />
      <div className="section-shell relative grid min-h-[calc(100vh-6rem)] items-center gap-12 pb-14 lg:grid-cols-[1.06fr_.94fr]">
        <Reveal>
          <div>
            <p className="eyebrow mb-5">
              Your Result Shows It.
            </p>
            <h1 className="editorial-heading max-w-5xl text-5xl sm:text-7xl lg:text-8xl">
              Raising Kingdom Citizens Who Produce Results
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
              A structured system for spiritual growth, skill development, and Kingdom deployment.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/join">Join a Cluster</Button>
              <Button href="/start-cluster" variant="secondary">Start a Cluster</Button>
              <Button href="/training" variant="secondary">Enter Training Hub</Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="cinematic-panel glass-line relative overflow-hidden rounded-md p-2">
            <img src={imageSet.worship} alt="People gathered in worship" className="image-treatment h-[30rem] w-full rounded-sm object-cover" />
            <div className="absolute inset-x-5 bottom-5 grid gap-3 rounded-sm border border-white/15 bg-black/40 p-4 text-white backdrop-blur-xl sm:grid-cols-3">
              {[
                ["12+", "Growth Tracks"],
                ["7", "Cluster Levels"],
                ["24/7", "Movement Rhythm"]
              ].map(([value, label]) => (
                <div key={label}>
                  <strong className="block text-2xl font-black text-accent">{value}</strong>
                  <span className="text-[11px] font-bold uppercase text-white/70">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <Reveal className="mx-auto mb-10 max-w-4xl text-center">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="editorial-heading text-3xl sm:text-5xl">{title}</h2>
      {text ? <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted">{text}</p> : null}
    </Reveal>
  );
}

export function Pillars() {
  return (
    <section className="section-band">
      <div className="section-shell">
        <SectionHeader
          eyebrow="What this is"
          title="Not casual meetings. A disciplined Kingdom growth system."
          text="Supersite Citizens builds people who become spiritually grounded, economically productive, skillfully developed, and strategically positioned."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {systemPillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.05} className="premium-card p-6">
              <pillar.icon className="mb-8 h-6 w-6 text-accent/80" />
              <h3 className="text-xl font-black">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-6 text-muted">{pillar.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProblemSolution() {
  return (
    <section className="section-band">
      <div className="section-shell grid gap-5 lg:grid-cols-2">
        <Reveal className="premium-card p-7">
          <p className="eyebrow text-muted">The problem</p>
          <h2 className="editorial-heading mt-4 text-4xl">Activity without structure cannot carry destiny.</h2>
          <div className="mt-8 grid gap-3">
            {problems.map((problem) => (
              <div key={problem} className="flex items-center gap-3 rounded-sm border border-line/55 bg-paper/25 p-4">
                <span className="h-2 w-2 rounded-full bg-gold" />
                <span className="font-bold">{problem}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.08} className="cinematic-panel glass-line overflow-hidden rounded-md">
          <img src={imageSet.leaders} alt="Leaders planning a structured system" className="image-treatment h-64 w-full object-cover" />
          <div className="p-7">
            <p className="eyebrow">The solution</p>
            <h2 className="editorial-heading mt-4 text-4xl">Intentional growth, practical training, real-world deployment.</h2>
            <p className="mt-5 text-sm leading-7 text-muted">
              The Supersite Cluster System joins prayer, skills, leadership, reporting, mentorship, and multiplication into one clear path.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="section-band">
      <div className="section-shell">
        <SectionHeader eyebrow="How it works" title="One movement path, five deliberate stages." />
        <div className="grid gap-4 lg:grid-cols-5">
          {workflow.map((step, index) => (
            <Reveal key={step} delay={index * 0.05} className="relative premium-card p-6">
              <span className="mb-8 block border-b border-line/60 pb-4 text-4xl font-black text-accent/90">{index + 1}</span>
              <h3 className="text-xl font-black">{step}</h3>
              <p className="mt-4 text-sm text-muted">Progress is tracked through formation, practice, accountability, and deployment.</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WeeklyActivities() {
  return (
    <section className="section-band">
      <div className="section-shell">
        <SectionHeader eyebrow="Weekly activities" title="A rhythm that keeps people awake, trained, and connected." />
        <div className="grid gap-4 md:grid-cols-3">
          {activities.map((activity, index) => (
            <Reveal key={activity.title} delay={index * 0.05} className="premium-card p-6">
              <activity.icon className="h-6 w-6 text-accent/80" />
              <div className="mt-10 flex items-end justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black">{activity.title}</h3>
                  <p className="mt-2 text-sm text-muted">{activity.text}</p>
                </div>
                <div className="rounded-sm border border-line/60 bg-paper/25 p-3 text-right">
                  <span className="block text-xs font-black uppercase text-muted">{activity.day}</span>
                  <span className="block font-black">{activity.time}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="section-band">
      <div className="section-shell">
        <Reveal className="cinematic-panel glass-line overflow-hidden rounded-md p-8 text-center sm:p-14">
          <h2 className="editorial-heading mx-auto max-w-4xl text-4xl sm:text-6xl">
            If you are ready to grow, build, and produce results, this system is for you.
          </h2>
          <div className="mt-8">
            <Button href="/join">Get Started</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function StoryPage({
  eyebrow,
  title,
  text,
  image,
  blocks
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  blocks: { title: string; text: string }[];
}) {
  return (
    <section className="pt-28">
      <div className="section-shell grid gap-8 lg:grid-cols-[.95fr_1.05fr]">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="editorial-heading mt-4 text-5xl sm:text-7xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{text}</p>
        </Reveal>
        <Reveal delay={0.08} className="cinematic-panel glass-line overflow-hidden rounded-md p-2">
          <img src={image} alt="" className="image-treatment h-[28rem] w-full rounded-sm object-cover" />
        </Reveal>
      </div>
      <div className="section-shell grid gap-4 py-16 md:grid-cols-2">
        {blocks.map((block, index) => (
          <Reveal key={block.title} delay={index * 0.05} className="premium-card p-7">
            <h2 className="text-2xl font-black">{block.title}</h2>
            <p className="mt-4 leading-7 text-muted">{block.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ClusterHierarchy() {
  return (
    <section className="section-band">
      <div className="section-shell">
        <SectionHeader eyebrow="Cluster hierarchy" title="A multiplication structure from home circles to regional leadership." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {clusterLevels.map((level, index) => (
            <Reveal key={level} delay={index * 0.04} className="premium-card p-5">
              <span className="eyebrow">Level {index + 1}</span>
              <h3 className="mt-4 text-lg font-black">{level}</h3>
              <p className="mt-3 text-sm text-muted">Capacity, oversight, reporting, and multiplication increase at this stage.</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrainingGrid() {
  return (
    <section className="section-band">
      <div className="section-shell">
        <SectionHeader eyebrow="Training hub" title="From foundation to deployment, every track creates visible output." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {trainings.map((training, index) => (
            <Reveal key={training.title} delay={index * 0.05} className="premium-card p-6">
              <training.icon className="h-6 w-6 text-accent/80" />
              <span className="mt-8 inline-block border-b border-accent/50 pb-1 text-xs font-black uppercase text-accent">{training.tag}</span>
              <h3 className="mt-4 text-xl font-black">{training.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{training.text}</p>
              <div className="mt-6 h-px overflow-hidden bg-line/70">
                <div className="h-full bg-accent" style={{ width: `${44 + index * 11}%` }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResourceLibrary() {
  return (
    <section className="section-band">
      <div className="section-shell">
        <SectionHeader eyebrow="Supersite library" title="Manuals, books, and structured materials for every access level." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {books.map((book, index) => (
            <Reveal key={book} delay={index * 0.05} className="premium-card overflow-hidden">
              <div className="grid aspect-[4/5] place-items-end bg-gradient-to-br from-accent/10 via-royal/10 to-gold/10 p-5">
                <BookCover title={book} />
              </div>
              <div className="p-5">
                <h3 className="font-black">{book}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {accessLevels.map((level) => (
                    <span key={level} className="rounded-sm border border-line/60 bg-paper/25 px-3 py-1 text-xs font-bold text-muted">{level}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookCover({ title }: { title: string }) {
  return (
    <div className="w-full rounded-sm border border-white/15 bg-black/65 p-5 text-white backdrop-blur-xl">
      <LockKeyhole className="mb-12 h-5 w-5 text-accent/80" />
      <p className="text-lg font-black leading-tight">{title}</p>
      <p className="mt-4 text-xs uppercase text-white/60">Supersite Citizens</p>
    </div>
  );
}

export function EventTimeline() {
  return (
    <section className="section-band">
      <div className="section-shell">
        <SectionHeader eyebrow="Events" title="Weekly engagement with room for prayer, service, clusters, and intensives." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {events.map((event, index) => (
            <Reveal key={event.title} delay={index * 0.05} className="premium-card p-6">
              <event.icon className="h-6 w-6 text-accent/80" />
              <p className="mt-8 text-xs font-black uppercase text-muted">{event.type}</p>
              <h3 className="mt-3 text-xl font-black">{event.title}</h3>
              <p className="mt-3 font-semibold text-accent">{event.date}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PaymentsGrid() {
  return (
    <section className="section-band">
      <div className="section-shell">
        <SectionHeader eyebrow="Payments" title="A secure global payment flow prepared for Flutterwave checkout." />
        <div className="grid gap-4 md:grid-cols-3">
          {paymentOptions.map((option, index) => (
            <Reveal key={option.title} delay={index * 0.05} className="premium-card p-6">
              <option.icon className="h-6 w-6 text-accent/80" />
              <h3 className="mt-8 text-xl font-black">{option.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{option.text}</p>
              <Button href="/payments#checkout" variant="secondary" className="mt-6 w-full">Checkout</Button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkeletonStrip() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div key={item} className="skeleton h-24 rounded-md" />
      ))}
    </div>
  );
}

export function LeadershipProgression() {
  const steps = ["Member", "Builder", "Cluster Lead", "Mother Cluster Lead", "City Builder", "Regional Builder"];
  return (
    <section className="section-band">
      <div className="section-shell">
        <SectionHeader eyebrow="Leadership ladder" title="Growth is visible, reviewed, and multiplied through responsibility." />
        <div className="grid gap-4 lg:grid-cols-6">
          {steps.map((step, index) => (
            <Reveal key={step} delay={index * 0.05} className="premium-card p-5">
              <Check className="h-5 w-5 text-accent/80" />
              <h3 className="mt-8 font-black">{step}</h3>
              <p className="mt-3 text-sm text-muted">Expectations include discipline, reporting, care, skill output, and multiplication.</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InlineNextAction({ href, label }: { href: string; label: string }) {
  return (
    <div className="section-shell pb-16">
      <Reveal className="cinematic-panel glass-line flex flex-col items-start justify-between gap-4 rounded-md p-6 sm:flex-row sm:items-center">
        <div>
          <p className="eyebrow">Next step</p>
          <h2 className="mt-2 text-2xl font-black">{label}</h2>
        </div>
        <Button href={href} variant="secondary">
          Continue <ArrowUpRight className="h-4 w-4" />
        </Button>
      </Reveal>
    </div>
  );
}

export function OrientationAccess() {
  return (
    <section className="section-band">
      <div className="section-shell grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {["System Structure", "Leadership Expectations", "Meeting Format", "Reporting System"].map((item, index) => (
          <Reveal key={item} delay={index * 0.05} className="premium-card p-6">
            <Play className="h-6 w-6 text-accent/80" />
            <h3 className="mt-8 text-xl font-black">{item}</h3>
            <p className="mt-3 text-sm text-muted">Private onboarding content, video resources, and launch checklists live here.</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

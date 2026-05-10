"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/button";
import { cn, isValidEmail } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

async function submitJson(endpoint: string, payload: Record<string, FormDataEntryValue>) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error("Submission failed");
  return response.json();
}

export function JoinForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      await submitJson("/api/join", Object.fromEntries(form));
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setError("We could not complete this right now. Please try again.");
    }
  }

  return (
    <SmartForm title="Become a Supersite Citizen" status={status} error={error} onSubmit={onSubmit}>
      <Field name="name" label="Full name" required />
      <Field name="email" label="Email" type="email" required />
      <Field name="location" label="Location" required />
      <Select name="path" label="I want to" options={["Join Cluster", "Start Training", "Become Leader"]} />
      <TextArea name="goal" label="What result are you ready to produce?" />
    </SmartForm>
  );
}

export function ClusterApplicationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const steps = ["Identity", "Capacity", "Commitment"];

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < steps.length - 1) {
      setStep((value) => value + 1);
      return;
    }
    const form = new FormData(event.currentTarget);
    setStatus("loading");
    setError("");
    try {
      await submitJson("/api/cluster-applications", Object.fromEntries(form));
      setStatus("success");
      event.currentTarget.reset();
      setStep(0);
    } catch {
      setStatus("error");
      setError("Application could not be submitted yet.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="premium-card p-6">
      <div className="mb-7">
        <p className="text-xs font-black uppercase tracking-[.18em] text-accent">Cluster application</p>
        <h2 className="mt-3 text-3xl font-black">Start a Cluster</h2>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {steps.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => setStep(index)}
              className={cn("h-2 rounded-full bg-line transition", index <= step && "bg-accent")}
              aria-label={label}
            />
          ))}
        </div>
      </div>

      <div className={cn("grid gap-4", step !== 0 && "hidden")}>
        <Field name="name" label="Name" required />
        <Field name="location" label="Location" required />
        <Field name="contact" label="Contact" required />
      </div>
      <div className={cn("grid gap-4", step !== 1 && "hidden")}>
        <TextArea name="experience" label="Leadership or ministry experience" />
        <TextArea name="trainingBackground" label="Training background" />
        <Field name="meetingCapacity" label="Meeting capacity" required />
      </div>
      <div className={cn("grid gap-4", step !== 2 && "hidden")}>
        <TextArea name="skills" label="Skills" />
        <TextArea name="commitment" label="Commitment" required />
      </div>

      {error ? <p className="mt-4 text-sm font-semibold text-red-500">{error}</p> : null}
      {status === "success" ? <SuccessMessage text="Application received. Admin review, orientation access, checklist, and launch approval are next." /> : null}
      <div className="mt-6 flex gap-3">
        {step > 0 ? (
          <button type="button" className="rounded-md border border-line/70 px-5 py-3 text-sm font-bold" onClick={() => setStep((value) => value - 1)}>
            Back
          </button>
        ) : null}
        <Button type="submit" className="flex-1">
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : step === steps.length - 1 ? "Submit Application" : "Continue"}
        </Button>
      </div>
    </form>
  );
}

export function PaymentForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus("loading");
    setMessage("");
    try {
      const result = await submitJson("/api/payments/flutterwave", Object.fromEntries(form));
      setStatus("success");
      setMessage(result.message);
    } catch {
      setStatus("error");
      setMessage("Payment initialization failed.");
    }
  }

  return (
    <SmartForm title="Secure Checkout" status={status} error={status === "error" ? message : ""} onSubmit={onSubmit}>
      <Select name="purpose" label="Purpose" options={["Mentorship Fees", "Training Payments", "Donations"]} />
      <Field name="amount" label="Amount" type="number" required />
      <Select name="currency" label="Currency" options={["NGN", "USD", "GBP", "GHS", "KES", "ZAR"]} />
      <Field name="email" label="Email" type="email" required />
      {status === "success" ? <SuccessMessage text={message} /> : null}
    </SmartForm>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    await submitJson("/api/contact", Object.fromEntries(new FormData(event.currentTarget)));
    setStatus("success");
    event.currentTarget.reset();
  }

  return (
    <SmartForm title="Send a Message" status={status} onSubmit={onSubmit}>
      <Field name="name" label="Name" required />
      <Field name="email" label="Email" type="email" required />
      <TextArea name="message" label="Message" required />
      {status === "success" ? <SuccessMessage text="Message received. The team will respond through the right channel." /> : null}
    </SmartForm>
  );
}

function SmartForm({
  title,
  children,
  status,
  error,
  onSubmit
}: {
  title: string;
  children: React.ReactNode;
  status: Status;
  error?: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="premium-card p-6">
      <h2 className="text-3xl font-black">{title}</h2>
      <div className="mt-6 grid gap-4">{children}</div>
      {error ? <p className="mt-4 text-sm font-semibold text-red-500">{error}</p> : null}
      <Button type="submit" className="mt-6 w-full">
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit"}
      </Button>
    </form>
  );
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="min-h-12 rounded-md border border-line/80 bg-paper/70 px-4 text-ink outline-none transition focus:border-accent"
      />
    </label>
  );
}

function TextArea({ name, label, required }: { name: string; label: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      <textarea
        name={name}
        required={required}
        rows={4}
        className="rounded-md border border-line/80 bg-paper/70 px-4 py-3 text-ink outline-none transition focus:border-accent"
      />
    </label>
  );
}

function Select({ name, label, options }: { name: string; label: string; options: string[] }) {
  return (
    <label className="grid gap-2 text-sm font-bold">
      {label}
      <select name={name} className="min-h-12 rounded-md border border-line/80 bg-paper/70 px-4 text-ink outline-none transition focus:border-accent">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function SuccessMessage({ text }: { text: string }) {
  return (
    <div className="mt-4 flex items-start gap-3 rounded-md border border-accent/40 bg-accent/10 p-4 text-sm font-semibold">
      <CheckCircle2 className="h-5 w-5 text-accent" />
      <span>{text}</span>
    </div>
  );
}

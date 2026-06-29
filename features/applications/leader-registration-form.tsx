"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { cn, isValidEmail } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const fields = {
  personal: ["Full name", "Email address", "Phone number"],
  background: ["Occupation", "Ministry background", "Leadership experience"],
  location: ["City", "State", "Country"],
  calling: ["Skills", "Calling / interest areas", "Why do you want to lead?"]
};

export function LeaderRegistrationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("Email address") || "");
    if (!isValidEmail(email)) {
      setError("Enter a valid email address before submitting.");
      setStatus("error");
      return;
    }
    const payload = {
      name: String(form.get("Full name") || ""),
      email,
      phone: String(form.get("Phone number") || ""),
      occupation: String(form.get("Occupation") || ""),
      ministryBackground: String(form.get("Ministry background") || ""),
      experience: String(form.get("Leadership experience") || ""),
      location: [form.get("City"), form.get("State"), form.get("Country")].filter(Boolean).join(", "),
      city: String(form.get("City") || ""),
      state: String(form.get("State") || ""),
      country: String(form.get("Country") || ""),
      skills: String(form.get("Skills") || ""),
      calling: String(form.get("Calling / interest areas") || ""),
      commitment: String(form.get("Why do you want to lead?") || "")
    };

    setStatus("loading");
    setError("");
    try {
      const response = await fetch("/api/cluster-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setError("Application could not be submitted yet. Check the backend connection and try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="cinematic-panel glass-line rounded-md p-5 sm:p-7">
      <div className="grid gap-6">
        {Object.entries(fields).map(([group, items]) => (
          <fieldset key={group} className="grid gap-3 rounded-sm border border-line/60 bg-paper/25 p-4">
            <legend className="px-2 text-xs font-black uppercase text-accent">{group}</legend>
            {items.map((label) => {
              const isLong = label.includes("background") || label.includes("experience") || label.includes("Skills") || label.includes("Why") || label.includes("Calling");
              const inputClass = "rounded-sm border border-line/60 bg-paper/40 px-4 py-3 text-sm font-semibold outline-none transition focus:border-accent";
              return (
                <label key={label} className="grid gap-2 text-sm font-bold text-muted">
                  {label}
                  {isLong ? (
                    <textarea name={label} rows={3} className={inputClass} required />
                  ) : (
                    <input name={label} type={label.includes("Email") ? "email" : "text"} className={cn("min-h-11", inputClass)} required />
                  )}
                </label>
              );
            })}
          </fieldset>
        ))}
      </div>
      {status === "success" ? (
        <div className="mt-5 rounded-sm border border-accent/35 bg-accent/10 p-4 text-sm font-bold">Application received with Pending status. Admin review and approval workflows can continue through the backend API.</div>
      ) : null}
      {status === "error" ? (
        <div className="mt-5 rounded-sm border border-red-500/35 bg-red-500/10 p-4 text-sm font-bold text-red-500">{error}</div>
      ) : null}
      <Button type="submit" className="mt-6 w-full">{status === "loading" ? "Submitting..." : "Submit Leader Application"}</Button>
    </form>
  );
}

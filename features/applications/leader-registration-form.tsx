"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { cn, isValidEmail } from "@/lib/utils";

type Status = "idle" | "success" | "error";

const fields = {
  personal: ["Full name", "Email address", "Phone number"],
  background: ["Occupation", "Ministry background", "Leadership experience"],
  location: ["City", "State", "Country"],
  calling: ["Skills", "Calling / interest areas", "Why do you want to lead?"]
};

export function LeaderRegistrationForm() {
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("Email address") || "");
    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    event.currentTarget.reset();
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
        <div className="mt-5 rounded-sm border border-accent/35 bg-accent/10 p-4 text-sm font-bold">Application received with Pending status. Approval workflows will connect through the backend API.</div>
      ) : null}
      {status === "error" ? (
        <div className="mt-5 rounded-sm border border-red-500/35 bg-red-500/10 p-4 text-sm font-bold text-red-500">Enter a valid email address before submitting.</div>
      ) : null}
      <Button type="submit" className="mt-6 w-full">Submit Leader Application</Button>
    </form>
  );
}

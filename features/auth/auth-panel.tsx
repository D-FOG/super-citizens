"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login, register } from "@/services/dashboard-service";
import { useDashboardStore } from "@/store/use-dashboard-store";
import type { UserRole } from "@/types/dashboard";

const leaderRoles = ["Cluster Leader", "Cluster Supervisor"];

export function AuthPanel({ leaderOnly = false }: { leaderOnly?: boolean }) {
  const router = useRouter();
  const setRole = useDashboardStore((state) => state.setRole);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: () => mode === "login" ? login({ email: form.email, password: form.password }) : register(form),
    onSuccess: (payload) => {
      window.localStorage.setItem("superCitizensAccessToken", payload.accessToken);
      window.localStorage.setItem("superCitizensRefreshToken", payload.refreshToken);
      const role = payload.user.roles?.[0] || payload.user.role;
      if (role) setRole(role as UserRole);

      if (leaderOnly) {
        if (role && leaderRoles.includes(role)) {
          router.push("/leader-dashboard");
          return;
        }
        setMessage("This account is not approved for leader dashboard access yet.");
        return;
      }

      router.push(role && leaderRoles.includes(role) ? "/leader-dashboard" : "/dashboard");
    }
  });

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  const canRegister = !leaderOnly;

  return (
    <div className="mx-auto w-full max-w-xl cinematic-panel glass-line rounded-md p-6 sm:p-8">
      <p className="eyebrow">{leaderOnly ? "Leader dashboard access" : mode === "login" ? "Dashboard access" : "Create account"}</p>
      <h1 className="editorial-heading mt-3 text-4xl sm:text-5xl">
        {leaderOnly ? "Sign in as a leader" : mode === "login" ? "Sign in to continue" : "Join Supersite Citizens"}
      </h1>
      <form
        className="mt-7 grid gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          setMessage("");
          mutation.mutate();
        }}
      >
        {mode === "register" ? (
          <input required value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Full name" className="min-h-12 rounded-sm border border-line/60 bg-paper/30 px-4 text-sm font-semibold outline-none focus:border-accent" />
        ) : null}
        <input required type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="Email address" className="min-h-12 rounded-sm border border-line/60 bg-paper/30 px-4 text-sm font-semibold outline-none focus:border-accent" />
        <input required type="password" value={form.password} onChange={(event) => updateField("password", event.target.value)} placeholder="Password" className="min-h-12 rounded-sm border border-line/60 bg-paper/30 px-4 text-sm font-semibold outline-none focus:border-accent" />
        <button type="submit" disabled={mutation.isPending} className="inline-flex min-h-11 items-center justify-center rounded-sm border border-accent/80 bg-accent px-5 py-2.5 text-sm font-black text-black transition hover:bg-accent/90 disabled:opacity-60">
          {mutation.isPending ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
        </button>
        {mutation.isError ? <p className="text-sm font-bold text-red-500">Authentication failed. Check your details and backend connection.</p> : null}
        {message ? <p className="text-sm font-bold text-red-500">{message}</p> : null}
      </form>
      <div className="mt-5 flex flex-col gap-3">
        {canRegister ? (
          <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-left text-sm font-black text-muted transition hover:text-ink">
            {mode === "login" ? "Need an account? Register" : "Already registered? Sign in"}
          </button>
        ) : (
          <Link href="/leader-registration" className="text-sm font-black text-muted transition hover:text-ink">
            Need leader access? Submit a leader application
          </Link>
        )}
      </div>
    </div>
  );
}

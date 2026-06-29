"use client";

import { AuthPanel } from "@/features/auth/auth-panel";

export default function LoginPage() {
  return (
    <section className="pt-28">
      <div className="section-shell grid min-h-[70vh] items-center">
        <AuthPanel />
      </div>
    </section>
  );
}

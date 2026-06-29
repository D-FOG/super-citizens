import { badRequest, createRecord, ok, readPayload } from "@/lib/server";

const API_BASE_URL = (process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

export async function POST(request: Request) {
  const payload = await readPayload(request);
  if (!payload || !payload.name || !payload.location || !payload.commitment) {
    return badRequest("Name, location, and commitment are required.");
  }

  if (API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}/leader-applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => null);
      if (response.ok) {
        return ok({
          message: "Cluster application received by backend.",
          backend: data
        }, response.status);
      }
    } catch {
      // Fall through to local pending record for development/offline environments.
    }
  }

  const record = createRecord(payload, "pending_review", "Leader");

  return ok({
    message: "Cluster application received.",
    record,
    automation: [
      "Instant confirmation response",
      "Admin review process",
      "Approval or rejection decision",
      "Orientation access",
      "Pre-launch checklist",
      "Final launch approval"
    ]
  });
}

import { badRequest, createRecord, ok, readPayload } from "@/lib/server";

const API_BASE_URL = (process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

export async function POST(request: Request) {
  const payload = await readPayload(request);
  if (!payload || !payload.name || !payload.location || !payload.commitment) {
    return badRequest("Name, location, and commitment are required.");
  }

  const backendPayload = {
    ...payload,
    personalInfo: {
      fullName: String(payload.name || payload.fullName || ""),
      email: String(payload.email || ""),
      phone: String(payload.phone || payload.contact || ""),
      occupation: String(payload.occupation || ""),
      ministryBackground: String(payload.ministryBackground || payload.trainingBackground || ""),
      experience: String(payload.experience || payload.meetingCapacity || "")
    },
    background: [payload.occupation, payload.ministryBackground || payload.trainingBackground, payload.experience || payload.meetingCapacity].filter(Boolean).join(" | "),
    location: {
      city: String(payload.city || ""),
      state: String(payload.state || ""),
      country: String(payload.country || ""),
      raw: String(payload.location || "")
    },
    skills: String(payload.skills || ""),
    callingInterests: [payload.calling || payload.callingInterests, payload.commitment || payload.reason].filter(Boolean).join(" | ")
  };

  if (API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}/leader-applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backendPayload)
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

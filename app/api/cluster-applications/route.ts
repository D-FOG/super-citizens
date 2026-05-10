import { badRequest, createRecord, ok, readPayload } from "@/lib/server";

export async function POST(request: Request) {
  const payload = await readPayload(request);
  if (!payload || !payload.name || !payload.location || !payload.commitment) {
    return badRequest("Name, location, and commitment are required.");
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

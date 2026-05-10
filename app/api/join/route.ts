import { badRequest, createRecord, ok, readPayload } from "@/lib/server";

export async function POST(request: Request) {
  const payload = await readPayload(request);
  if (!payload || !payload.name || !payload.email) {
    return badRequest("Name and email are required.");
  }

  const record = createRecord(payload, "received", "Member");

  return ok({
    message: "Registration received. Email confirmation and onboarding can be triggered here.",
    record,
    next: ["Store member profile", "Send confirmation email", "Assign cluster", "Unlock training"]
  });
}

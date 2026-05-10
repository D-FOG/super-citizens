import { badRequest, createRecord, ok, readPayload } from "@/lib/server";

export async function POST(request: Request) {
  const payload = await readPayload(request);
  if (!payload || !payload.name || !payload.email || !payload.message) {
    return badRequest("Name, email, and message are required.");
  }

  const record = createRecord(payload, "received", "Visitor");

  return ok({
    message: "Contact message received. Email or WhatsApp routing can be triggered here.",
    record
  });
}

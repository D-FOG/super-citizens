import { badRequest, createRecord, ok, readPayload } from "@/lib/server";

export async function POST(request: Request) {
  const payload = await readPayload(request);
  if (!payload || !payload.amount || !payload.currency || !payload.email) {
    return badRequest("Amount, currency, and email are required.");
  }

  const record = createRecord(payload, "initialized");

  return ok({
    message: "Flutterwave checkout is ready to initialize once FLW_SECRET_KEY and redirect URLs are configured.",
    record,
    provider: "flutterwave",
    checkout: {
      tx_ref: `SC-${record.id}`,
      currency: payload.currency,
      amount: payload.amount,
      redirect_url: "/payments?status=success"
    }
  });
}

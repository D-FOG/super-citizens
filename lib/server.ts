import { NextResponse } from "next/server";

export type SubmissionRecord = {
  id: string;
  status: "received" | "pending_review" | "approved" | "rejected" | "initialized";
  role?: "Visitor" | "Member" | "Leader" | "Admin";
  createdAt: string;
  payload: Record<string, unknown>;
};

export function createRecord(payload: Record<string, unknown>, status: SubmissionRecord["status"], role?: SubmissionRecord["role"]): SubmissionRecord {
  return {
    id: crypto.randomUUID(),
    status,
    role,
    createdAt: new Date().toISOString(),
    payload
  };
}

export function ok(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, { status });
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function readPayload(request: Request) {
  try {
    return (await request.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

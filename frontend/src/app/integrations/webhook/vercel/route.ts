import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const body = await req.json();
  const headers = req.headers;

  console.log("[VERCEL WEBHOOK]", { body, headers })

  return NextResponse.json(
    { message: "[VERCEL WEBHOOK] Vercel Webhook Request Processed Successfully" },
    { status: 201 }
  );
};

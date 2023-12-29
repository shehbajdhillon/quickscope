import { NextResponse } from "next/server";
import { App } from "octokit";

export async function POST(req: Request) {

  const appId = process.env.GITHUB_APP_ID || "";
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY || "";
  const secret = process.env.GITHUB_WEBHOOK_SECRET || "";

  const githubApp = new App({
    appId,
    privateKey,
    webhooks: {
      secret,
    },
  });

  githubApp.webhooks.on("installation.created", async ({ id, name, payload }) => {
    console.log("[GITHUB WEBHOOK] APP INSTALLATION GITHUB REQUEST", { id, name, payload });
    return;
  })

  githubApp.webhooks.on("installation.deleted", async ({ id, name, payload }) => {
    console.log("[GITHUB WEBHOOK] APP DELETION GITHUB REQUEST", { id, name, payload });
    return;
  })

  githubApp.webhooks.on("installation.suspend", async ({ id, name, payload }) => {
    console.log("[GITHUB WEBHOOK] APP SUSPENSION GITHUB REQUEST", { id, name, payload });
    return;
  })

  githubApp.webhooks.on("installation.unsuspend", async ({ id, name, payload }) => {
    console.log("[GITHUB WEBHOOK] APP UNSUSPENSION GITHUB REQUEST", { id, name, payload });
    return;
  })

  const body = await req.json();
  const headers = req.headers;

  console.log("[GITHUB WEBHOOK] Here is the GitHub webhook request", { body, headers });

  try {
    await githubApp.webhooks.verifyAndReceive({
      id: req.headers.get('x-github-delivery') || "",
      name: (req.headers.get('x-github-event') || "" as any),
      signature: req.headers.get('x-hub-signature-256') || "",
      payload: await req.text(),
    });
    return NextResponse.json(
      { message: "[GITHUB WEBHOOK] GitHub Webhook Request Processed Successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.log(`[GITHUB WEBHOOK] GitHub Webhook Request Failed: ${error}`);
    return NextResponse.json(
      { error: `[GITHUB WEBHOOK] GitHub Webhook Request Failed: ${error}` },
      { status: 400 },
    );
  }
};


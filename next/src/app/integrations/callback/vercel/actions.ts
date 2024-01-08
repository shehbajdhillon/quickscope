"use server";

import qs from "querystring";

export type VercelToken = {
  token_type: string;
  access_token: string;
  installation_id: string;
  user_id: string;
  team_id: string | null;
};

export async function exchangeCodeForAccessToken(code: string) {

  const result = await fetch("https://api.vercel.com/v2/oauth/access_token", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: qs.stringify({
      client_id: process.env.VERCEL_CLIENT_ID,
      client_secret: process.env.VERCEL_CLIENT_SECRET,
      code,
      redirect_uri: `${process.env.HOST}/callback`, // This parameter should match the Redirect URL in your integration settings on Vercel
    }),
  });

  const body = await result.json();

  return body as VercelToken;
};

export async function getVercelTeamName(vercelToken: VercelToken) {

  const token = vercelToken.access_token;

  const result = await fetch("https://api.vercel.com/v2/user", {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    method: "GET",
  });

  const body = await result.json();

  return body["user"]["username"];
};

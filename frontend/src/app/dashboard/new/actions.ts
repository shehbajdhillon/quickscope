"use server";

import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/rest";

export const validatePostHogAPIKey = async (apiKey: string) => {
  const url = 'https://app.posthog.com/api/organizations/@current';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${apiKey}`
      }
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};


export const validateRailwayAPIKey = async (apiKey: string) => {
  const url = 'https://backboard.railway.app/graphql/v2';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: "query { projects { edges { node { name id } } } }"
      })
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const res = await response.json();
    if (!res.data) {
      throw new Error(`Error: ${response.status}`);
    }
    return res;
  } catch (error) {
    throw error;
  }
};


export const generateInstallationAccessToken = async (installationId: number) => {

  const auth = createAppAuth({
    appId: process.env.GITHUB_APP_ID || "",
    privateKey: process.env.GITHUB_APP_PRIVATE_KEY || "",
    clientId: process.env.GITHUB_APP_CLIENT_ID || "",
    clientSecret: process.env.GITHUB_APP_CLIENT_SECRET || "",
  });

  const installationAuthentication = await auth({
    type: "installation",
    installationId: installationId,
  });

  return installationAuthentication.token;
};


export const listRepositories = async (installationId: number) => {

  const accessToken = await generateInstallationAccessToken(installationId);
  const octokit = new Octokit({ auth: accessToken });
  const repos = await octokit.rest.apps.listReposAccessibleToInstallation();
  return repos;
};

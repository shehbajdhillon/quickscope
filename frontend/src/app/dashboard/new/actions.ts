"use server";

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


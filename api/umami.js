export default async function handler(req, res) {
  const apiKey = process.env.UMAMI_API_KEY;
  const websiteId = process.env.UMAMI_WEBSITE_ID;

  if (!apiKey || !websiteId) {
    return res.status(500).json({ error: "Missing env vars" });
  }

  const response = await fetch(
    `https://api.umami.is/v1/websites/${websiteId}/stats`,
    {
      headers: {
        "x-umami-api-key": apiKey,
        Accept: "application/json",
      },
    }
  );

  const data = await response.json();
  res.status(response.status).json(data);
}

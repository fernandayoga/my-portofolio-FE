export default async function handler(req, res) {
  try {
    const websiteId = process.env.UMAMI_WEBSITE_ID;
    const token = process.env.UMAMI_API_TOKEN;

    if (!websiteId || !token) {
      return res.status(500).json({ error: "Missing Umami env vars" });
    }

    const endAt = Date.now();
    const startAt = endAt - 7 * 24 * 60 * 60 * 1000;

    const response = await fetch(
      `https://cloud.umami.is/api/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch Umami" });
  }
}

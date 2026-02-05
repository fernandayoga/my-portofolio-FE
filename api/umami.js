export default async function handler(req, res) {
  try {
    const apiKey = process.env.UMAMI_API_KEY;
    const websiteId = process.env.UMAMI_WEBSITE_ID;

    if (!apiKey || !websiteId) {
      return res.status(500).json({ error: "Missing env vars" });
    }

    // 🔥 WAKTU (7 hari terakhir)
    const endAt = Date.now();
    const startAt = endAt - 7 * 24 * 60 * 60 * 1000;

    const url = `https://api.umami.is/v1/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}`;

    const response = await fetch(url, {
      headers: {
        "x-umami-api-key": apiKey,
        Accept: "application/json",
      },
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error("UMAMI API ERROR:", err);
    return res.status(500).json({
      error: "Serverless crashed",
      message: err.message,
    });
  }
}

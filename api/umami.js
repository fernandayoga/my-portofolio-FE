export default async function handler(req, res) {
  try {
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

    const text = await response.text();

    // ⛑️ proteksi kalau response bukan JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({
        error: "Invalid response from Umami",
        raw: text,
      });
    }

    return res.status(response.status).json(data);
  } catch (err) {
    console.error("UMAMI API CRASH:", err);
    return res.status(500).json({
      error: "Serverless crashed",
      message: err.message,
    });
  }
}

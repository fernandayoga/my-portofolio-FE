export default async function handler(req, res) {
  try {
    const apiKey = process.env.WAKATIME_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Missing WAKATIME_API_KEY in env variables" });
    }

    // WakaTime requires basic auth using the secret API Key encoded in base64
    const authHeader = `Basic ${Buffer.from(apiKey).toString('base64')}`;

    const url = `https://wakatime.com/api/v1/users/current/stats/last_7_days`;

    const response = await fetch(url, {
      headers: {
        Authorization: authHeader,
        Accept: "application/json",
      },
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error("WAKATIME API ERROR:", err);
    return res.status(500).json({
      error: "Serverless crashed",
      message: err.message,
    });
  }
}

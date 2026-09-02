export default async function handler(req, res) {
  try {
    const apiKey = process.env.WAKATIME_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Missing WAKATIME_API_KEY in env variables" });
    }

    // WakaTime requires basic auth using the secret API Key encoded in base64
    const authHeader = `Basic ${Buffer.from(apiKey).toString('base64')}`;

    const statsUrl = `https://wakatime.com/api/v1/users/current/stats/last_7_days`;
    
    // Get date range for summaries
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 6);
    
    const start = lastWeek.toISOString().split('T')[0];
    const end = today.toISOString().split('T')[0];
    const summariesUrl = `https://wakatime.com/api/v1/users/current/summaries?start=${start}&end=${end}`;

    const fetchOptions = {
      headers: {
        Authorization: authHeader,
        Accept: "application/json",
      },
    };

    const [statsRes, summariesRes] = await Promise.all([
      fetch(statsUrl, fetchOptions),
      fetch(summariesUrl, fetchOptions)
    ]);

    const statsData = await statsRes.json();
    const summariesData = await summariesRes.json();

    return res.status(200).json({
      stats: statsData,
      summaries: summariesData
    });
  } catch (err) {
    console.error("WAKATIME API ERROR:", err);
    return res.status(500).json({
      error: "Serverless crashed",
      message: err.message,
    });
  }
}

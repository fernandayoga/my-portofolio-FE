import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { GitHubCalendar } from "react-github-calendar";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  // State untuk setiap analytics
  const [githubData, setGithubData] = useState(null);
  const [wakatimeData, setWakatimeData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch GitHub Contributions
  const fetchGitHubData = async () => {
    try {
      const username = "fernandayoga"; // Ganti dengan username kamu
      const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      });
      const data = await response.json();

      // Fetch contributions count
      const contributionsResponse = await fetch(
        `https://api.github.com/search/commits?q=author:${username}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
            Accept: "application/vnd.github.cloak-preview",
          },
        },
      );
      const contributionsData = await contributionsResponse.json();

      setGithubData({
        name: data.name,
        avatar: data.avatar_url,
        repos: data.public_repos,
        followers: data.followers,
        contributions: contributionsData.total_count || 0,
      });
    } catch (error) {
      console.error("GitHub fetch error:", error);
      setGithubData({ error: "Failed to load GitHub data" });
    }
  };

  // Fetch WakaTime Stats
  const fetchWakatimeData = async () => {
    try {
      const response = await fetch("/api/wakatime");

      if (!response.ok) {
        throw new Error("Failed to fetch WakaTime data");
      }

      const data = await response.json();
      
      if (data.stats && data.stats.data) {
        setWakatimeData({
          totalTimeText: data.stats.data.human_readable_total_including_other_language || data.stats.data.human_readable_total || "0 hrs",
          dailyAverageText: data.stats.data.human_readable_daily_average || "0 hrs",
          languages: data.stats.data.languages || [],
          operatingSystems: data.stats.data.operating_systems || [],
          editors: data.stats.data.editors || [],
          summaries: data.summaries?.data || [],
        });
      }
    } catch (error) {
      console.error("❌ WakaTime fetch error:", error);
      setWakatimeData({
        error: error.message,
      });
    }
  };

  //helper format waktu umami
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  // Helper function untuk fetch top languages
  const [topLanguages, setTopLanguages] = useState([]);
  const fetchTopLanguages = async () => {
    try {
      const username = import.meta.env.VITE_GITHUB_USERNAME;
      const token = import.meta.env.VITE_GITHUB_TOKEN;

      // Fetch all repos
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );

      const repos = await reposResponse.json();

      // Count languages
      const languageCounts = {};

      for (const repo of repos) {
        if (repo.language) {
          languageCounts[repo.language] =
            (languageCounts[repo.language] || 0) + 1;
        }
      }

      // Sort by count
      const sortedLanguages = Object.entries(languageCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({
          name,
          count,
          percentage: Math.round((count / repos.length) * 100),
        }));

      setTopLanguages(sortedLanguages);
    } catch (error) {
      console.error("Failed to fetch languages:", error);
      setTopLanguages([]);
    }
  };

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      Python: "#3572A5",
      Java: "#b07219",
      HTML: "#e34c26",
      CSS: "#563d7c",
      PHP: "#4F5D95",
      Ruby: "#701516",
      Go: "#00ADD8",
      Rust: "#dea584",
      C: "#555555",
      "C++": "#f34b7d",
      "C#": "#178600",
      Swift: "#ffac45",
      Kotlin: "#A97BFF",
      Dart: "#00B4AB",
    };
    return colors[language] || "#8b949e";
  };

  // Tambahkan state
  const [githubActivity, setGithubActivity] = useState([]);

  // function fetch github activity
  const fetchGithubActivity = async () => {
    try {
      const username = import.meta.env.VITE_GITHUB_USERNAME;
      const token = import.meta.env.VITE_GITHUB_TOKEN;

      const response = await fetch(
        `https://api.github.com/users/${username}/events/public?per_page=20`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );

      if (!response.ok) throw new Error("Failed to fetch activity");

      const events = await response.json();

      // Parse events dan filter yang valid

      const activities = events
        .map((event) => {
          const repo = event.repo.name;
          const type = event.type;
          const createdAt = new Date(event.created_at);

          let action = "";
          let icon = "";
          let color = "";

          switch (type) {
            case "PushEvent":
              const commits = event.payload.commits?.length || 0;
              // if (commits === 0) return null; // ✅ Skip kalau 0 commits
              action = `Pushed commits to repository : `;
              icon = "fa-code-branch";
              color = "text-green-500";
              break;

            case "CreateEvent":
              const refType = event.payload.ref_type;
              if (refType === "repository") {
                action = "Created repository";
              } else if (refType === "branch") {
                action = `Created branch ${event.payload.ref} in`;
              } else if (refType === "tag") {
                action = `Created tag ${event.payload.ref} in`;
              } else {
                action = `Created ${refType} in`;
              }
              icon = "fa-plus-circle";
              color = "text-blue-500";
              break;

            case "DeleteEvent":
              action = `Deleted ${event.payload.ref_type} ${event.payload.ref} from`;
              icon = "fa-trash";
              color = "text-red-500";
              break;

            case "IssuesEvent":
              action = `${
                event.payload.action.charAt(0).toUpperCase() +
                event.payload.action.slice(1)
              } issue in`;
              icon = "fa-exclamation-circle";
              color = "text-yellow-500";
              break;

            case "PullRequestEvent":
              const prAction = event.payload.action;
              if (prAction === "opened") {
                action = "Opened pull request in";
              } else if (
                prAction === "closed" &&
                event.payload.pull_request.merged
              ) {
                action = "Merged pull request in";
              } else if (prAction === "closed") {
                action = "Closed pull request in";
              } else {
                action = `${
                  prAction.charAt(0).toUpperCase() + prAction.slice(1)
                } pull request in`;
              }
              icon = "fa-code-pull-request";
              color = "text-purple-500";
              break;

            case "WatchEvent":
              action = "Starred";
              icon = "fa-star";
              color = "text-yellow-400";
              break;

            case "ForkEvent":
              action = "Forked";
              icon = "fa-code-fork";
              color = "text-blue-400";
              break;

            case "ReleaseEvent":
              action = `Published release ${event.payload.release.tag_name} for`;
              icon = "fa-rocket";
              color = "text-green-400";
              break;

            case "IssueCommentEvent":
              action = "Commented on issue in";
              icon = "fa-comment";
              color = "text-gray-400";
              break;

            case "PullRequestReviewEvent":
              action = "Reviewed pull request in";
              icon = "fa-eye";
              color = "text-indigo-500";
              break;

            default:
              // Skip event types yang ga penting
              return null;
          }

          return {
            id: event.id,
            action,
            repo,
            icon,
            color,
            createdAt,
            timeAgo: getTimeAgo(createdAt),
          };
        })
        .filter(Boolean) // ✅ Remove null values
        .slice(0, 5); // Ambil 5 hasil akhir

      setGithubActivity(activities);
    } catch (error) {
      console.error("GitHub activity fetch error:", error);
      setGithubActivity([]);
    }
  };

  // Helper function untuk "time ago"
  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";

    return "Just now";
  };

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchGitHubData(),
        fetchWakatimeData(),
        fetchTopLanguages(),
        fetchGithubActivity(),
      ]);
      setLoading(false);
    };

    loadAllData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8 pt-20 xl:pt-8">
        <div className="text-center">
          <div
            className={`flex items-center gap-3 font-mono text-sm mb-4 justify-center ${
              isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
            }`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full animate-ping ${
                isDarkMode ? "bg-[#D4F933]" : "bg-[#2D5204]"
              }`}
            ></div>
            <span>FETCHING TELEMETRY METRICS...</span>
          </div>
          <p
            className={
              isDarkMode
                ? "text-gray-400 font-mono text-xs"
                : "text-gray-600 font-mono text-xs"
            }
          >
            {t("loadingDashboard")}
          </p>
        </div>
      </div>
    );
  }

  // WakaTime Chart Configs
  const weekdaysData = {
    labels:
      wakatimeData?.summaries?.map((day) =>
        day.range.text ? day.range.text.split(" ")[0] : ""
      ) || [],
    datasets: [
      {
        label: "Coding Hours",
        data:
          wakatimeData?.summaries?.map(
            (day) => day.grand_total.total_seconds / 3600
          ) || [],
        backgroundColor: isDarkMode ? "#D4F933" : "#2D5204",
        borderRadius: 4,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { display: false, beginAtZero: true },
      x: { grid: { display: false }, ticks: { color: isDarkMode ? '#9ca3af' : '#4b5563' } }
    }
  };

  const chartColors = [
    '#D4F933', '#D0EEFF', '#bce615', '#94a3b8', '#64748b', '#38bdf8', '#10b981'
  ];

  const editorsData = {
    labels: wakatimeData?.editors?.map(e => e.name) || [],
    datasets: [
      {
        data: wakatimeData?.editors?.map(e => e.total_seconds) || [],
        backgroundColor: chartColors,
        borderWidth: 0,
      }
    ]
  };

  const osData = {
    labels: wakatimeData?.operatingSystems?.map(o => o.name) || [],
    datasets: [
      {
        data: wakatimeData?.operatingSystems?.map(o => o.total_seconds) || [],
        backgroundColor: chartColors,
        borderWidth: 0,
      }
    ]
  };

  const doughnutOptions = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: isDarkMode ? '#9ca3af' : '#4b5563',
          font: { size: 11 }
        }
      }
    },
    cutout: '70%',
    maintainAspectRatio: false,
  };

  return (
    <div className="min-h-screen py-8 pt-20 xl:pt-8 max-w-6xl">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-2 h-2 rounded-full ${
              isDarkMode ? "bg-[#D4F933]" : "bg-[#2D5204]"
            }`}
          ></div>
          <span
            className={`font-mono text-xs font-semibold tracking-widest uppercase ${
              isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
            }`}
          >
            // TELEMETRY & SYSTEM METRICS
          </span>
          <div
            className={`flex-1 h-[1px] ${
              isDarkMode ? "bg-white/[0.08]" : "bg-black/[0.08]"
            }`}
          ></div>
        </div>

        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Dashboard
        </h1>
        <p className={`font-mono text-xs sm:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          {t("dashboardSubtitle")}
        </p>

        <div className="mt-8 hairline-divider"></div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* 1. GitHub Contributions */}
        <div
          className={`rounded-2xl p-6 sm:p-8 border ${
            isDarkMode
              ? "bg-[#121216] border-white/[0.08]"
              : "bg-white border-black/[0.08] shadow-sm"
          }`}
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-inherit">
            <div className="w-10 h-10 bg-white/[0.04] border border-white/[0.08] rounded-lg flex items-center justify-center text-gray-200">
              <i className="fab fa-github text-lg"></i>
            </div>
            <div>
              <h2
                className={`text-lg sm:text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {t("githubActivity")}
              </h2>
              <p className="font-mono text-xs text-gray-400">
                {t("githubContributions")}
              </p>
            </div>
          </div>

          {githubData?.error ? (
            <p className="text-red-400 font-mono text-xs">{githubData.error}</p>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                <div
                  className={`p-4 sm:p-5 rounded-xl border ${
                    isDarkMode ? "bg-[#181920] border-white/[0.06]" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <p
                    className={`text-2xl sm:text-3xl font-mono font-bold ${
                      isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                    }`}
                  >
                    {githubData?.repos || 0}
                  </p>
                  <p
                    className={`font-mono text-[10px] sm:text-xs uppercase tracking-wider mt-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Repositories
                  </p>
                </div>

                <div
                  className={`p-4 sm:p-5 rounded-xl border ${
                    isDarkMode ? "bg-[#181920] border-white/[0.06]" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <p
                    className={`text-2xl sm:text-3xl font-mono font-bold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {githubData?.followers || 0}
                  </p>
                  <p
                    className={`font-mono text-[10px] sm:text-xs uppercase tracking-wider mt-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Followers
                  </p>
                </div>

                <div
                  className={`p-4 sm:p-5 rounded-xl border ${
                    isDarkMode ? "bg-[#181920] border-white/[0.06]" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <p
                    className={`text-2xl sm:text-3xl font-mono font-bold ${
                      isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                    }`}
                  >
                    {githubData?.contributions || 0}
                  </p>
                  <p
                    className={`font-mono text-[10px] sm:text-xs uppercase tracking-wider mt-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Commits
                  </p>
                </div>
              </div>

              {/* GitHub Contribution Graph */}
              <div
                className={`rounded-xl border overflow-x-auto p-4 ${
                  isDarkMode ? "bg-[#0A0A0C] border-white/[0.08]" : "bg-gray-50 border-gray-200"
                }`}
              >
                <GitHubCalendar
                  username={import.meta.env.VITE_GITHUB_USERNAME}
                  blockSize={12}
                  blockMargin={4}
                  fontSize={12}
                  colorScheme={isDarkMode ? "dark" : "light"}
                  theme={{
                    light: [
                      "#ebedf0",
                      "#e8fba3",
                      "#d4f933",
                      "#b5d81e",
                      "#8ba90f",
                    ],
                    dark: [
                      "#121216",
                      "#202c00",
                      "#455a00",
                      "#94b80b",
                      "#d4f933",
                    ],
                  }}
                />
              </div>

              {/* Top Languages */}
              <div
                className={`p-5 rounded-xl border ${
                  isDarkMode ? "bg-[#181920] border-white/[0.06]" : "bg-gray-50 border-gray-200"
                }`}
              >
                <p
                  className={`font-mono text-xs uppercase tracking-wider font-semibold mb-4 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Top Technology Used in GitHub
                </p>

                {topLanguages.length > 0 ? (
                  <div className="space-y-3.5">
                    {topLanguages.map((lang) => (
                      <div key={lang.name}>
                        <div className="flex items-center justify-between mb-1.5 font-mono text-xs">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2.5 h-2.5 rounded-full"
                              style={{
                                backgroundColor: getLanguageColor(lang.name),
                              }}
                            ></div>
                            <span
                              className={
                                isDarkMode ? "text-gray-300" : "text-gray-700"
                              }
                            >
                              {lang.name}
                            </span>
                          </div>
                          <span
                            className={`font-semibold ${
                              isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                            }`}
                          >
                            {lang.percentage}%
                          </span>
                        </div>
                        <div
                          className={`w-full h-1.5 rounded-full ${
                            isDarkMode ? "bg-[#121216]" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${lang.percentage}%`,
                              backgroundColor: getLanguageColor(lang.name),
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p
                    className={`font-mono text-xs ${
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Loading languages...
                  </p>
                )}
              </div>

              {/* GitHub Recent Activity */}
              <div
                className={`rounded-2xl p-6 sm:p-7 border ${
                  isDarkMode
                    ? "bg-[#121216] border-white/[0.08]"
                    : "bg-white border-black/[0.08]"
                }`}
              >
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-inherit">
                  <div className="w-9 h-9 bg-white/[0.04] border border-white/[0.08] rounded-lg flex items-center justify-center text-gray-200">
                    <i className="fab fa-github text-base"></i>
                  </div>
                  <div>
                    <h2
                      className={`text-base sm:text-lg font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {t("githubActivityLatest")}
                    </h2>
                    <p className="font-mono text-xs text-gray-400">
                      {t("RecentActivity")}
                    </p>
                  </div>
                </div>

                {githubActivity.length > 0 ? (
                  <div className="space-y-2.5">
                    {githubActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                          isDarkMode
                            ? "bg-[#181920] border-white/[0.06] hover:border-[#D4F933]/40"
                            : "bg-gray-50 border-gray-200 hover:border-[#D4F933]"
                        }`}
                      >
                        <div
                          className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${
                            isDarkMode
                              ? "bg-white/[0.04] text-[#D4F933]"
                              : "bg-black/[0.05] text-[#2D5204]"
                          }`}
                        >
                          <i
                            className={`fas ${activity.icon} text-xs`}
                          ></i>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-xs sm:text-sm ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {activity.action}{" "}
                            <span
                              className={`font-mono font-semibold ${
                                isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                              }`}
                            >
                              {activity.repo.split("/")[1]}
                            </span>
                          </p>
                          <p className="font-mono text-[10px] text-gray-500 mt-0.5">
                            {activity.timeAgo}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className={`text-center py-8 ${
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    <i className="fab fa-github text-3xl mb-2 text-gray-600"></i>
                    <p className="font-mono text-xs">No recent activity</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 2. WakaTime Coding Stats */}
        <div
          className={`rounded-2xl p-6 sm:p-8 border ${
            isDarkMode
              ? "bg-[#121216] border-white/[0.08]"
              : "bg-white border-black/[0.08] shadow-sm"
          }`}
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-inherit">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isDarkMode
                  ? "bg-[#D4F933]/10 border border-[#D4F933]/30 text-[#D4F933]"
                  : "bg-[#0A0A0C] border border-black text-[#D4F933] shadow-xs"
              }`}
            >
              <i className="fas fa-code text-base"></i>
            </div>
            <div>
              <h2
                className={`text-lg sm:text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {t("wakatimeTitle")}
              </h2>
              <p className="font-mono text-xs text-gray-400">{t("wakatimeSub")}</p>
            </div>
          </div>

          {wakatimeData?.error ? (
            <p className="text-red-400 font-mono text-xs">{wakatimeData.error}</p>
          ) : (
            <div className="space-y-6">
              {/* Total Time & Daily Average */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div
                  className={`p-5 rounded-xl border ${
                    isDarkMode ? "bg-[#181920] border-white/[0.06]" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <p
                    className={`text-2xl sm:text-3xl font-mono font-bold ${
                      isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                    }`}
                  >
                    {wakatimeData?.totalTimeText || "0 hrs"}
                  </p>
                  <p
                    className={`font-mono text-[10px] sm:text-xs uppercase tracking-wider mt-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {t("totalCodingTime")}
                  </p>
                </div>

                <div
                  className={`p-5 rounded-xl border ${
                    isDarkMode ? "bg-[#181920] border-white/[0.06]" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <p
                    className={`text-2xl sm:text-3xl font-mono font-bold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {wakatimeData?.dailyAverageText || "0 hrs"}
                  </p>
                  <p
                    className={`font-mono text-[10px] sm:text-xs uppercase tracking-wider mt-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {t("dailyAverage")}
                  </p>
                </div>
              </div>

              {/* WakaTime Top Languages */}
              <div
                className={`p-5 rounded-xl border ${
                  isDarkMode ? "bg-[#181920] border-white/[0.06]" : "bg-gray-50 border-gray-200"
                }`}
              >
                <p
                  className={`font-mono text-xs uppercase tracking-wider font-semibold mb-4 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {t("topTech")}
                </p>
                
                {wakatimeData?.languages && wakatimeData.languages.length > 0 ? (
                  <div className="space-y-3.5">
                    {wakatimeData.languages.slice(0, 5).map((lang) => (
                      <div key={lang.name}>
                        <div className="flex items-center justify-between mb-1.5 font-mono text-xs">
                          <span
                            className={
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }
                          >
                            {lang.name}
                          </span>
                          <span
                            className={`font-semibold ${
                              isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                            }`}
                          >
                            {lang.text} ({Math.round(lang.percent)}%)
                          </span>
                        </div>
                        <div
                          className={`w-full h-1.5 rounded-full ${
                            isDarkMode ? "bg-[#121216]" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${lang.percent}%`,
                              backgroundColor: lang.color || getLanguageColor(lang.name),
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="font-mono text-xs text-gray-500">{t("noTechData")}</p>
                )}
              </div>
              
              {/* Weekdays Chart */}
              <div
                className={`p-5 rounded-xl border ${
                  isDarkMode ? "bg-[#181920] border-white/[0.06]" : "bg-gray-50 border-gray-200"
                }`}
              >
                <p
                  className={`font-mono text-xs uppercase tracking-wider font-semibold mb-4 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {t("weekdays")}
                </p>
                <div>
                  {wakatimeData?.summaries && wakatimeData.summaries.length > 0 ? (
                    <div className="h-48">
                      <Bar data={weekdaysData} options={barOptions} />
                    </div>
                  ) : (
                    <p className="font-mono text-xs text-gray-500">{t("noDailyStats")}</p>
                  )}
                </div>
              </div>
              
              {/* Editors / OS Doughnuts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                {/* Editors */}
                <div
                  className={`p-5 rounded-xl border ${
                    isDarkMode ? "bg-[#181920] border-white/[0.06]" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <p
                    className={`font-mono text-xs uppercase tracking-wider font-semibold mb-4 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t("editors")}
                  </p>
                  <div className="flex items-center justify-center">
                    {wakatimeData?.editors && wakatimeData.editors.length > 0 ? (
                      <div className="h-48 w-full">
                        <Doughnut data={editorsData} options={doughnutOptions} />
                      </div>
                    ) : (
                      <p className="font-mono text-xs text-gray-500">{t("noEditorStats")}</p>
                    )}
                  </div>
                </div>

                {/* OS */}
                <div
                  className={`p-5 rounded-xl border ${
                    isDarkMode ? "bg-[#181920] border-white/[0.06]" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <p
                    className={`font-mono text-xs uppercase tracking-wider font-semibold mb-4 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {t("operatingSystems")}
                  </p>
                  <div className="flex items-center justify-center">
                    {wakatimeData?.operatingSystems && wakatimeData.operatingSystems.length > 0 ? (
                      <div className="h-48 w-full">
                        <Doughnut data={osData} options={doughnutOptions} />
                      </div>
                    ) : (
                      <p className="font-mono text-xs text-gray-500">{t("noOsStats")}</p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Refresh Button */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => window.location.reload()}
          className={`px-6 py-3 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 border ${
            isDarkMode
              ? "bg-[#181920] hover:bg-[#D4F933] hover:text-black text-white border-white/[0.12] hover:border-[#D4F933] shadow-md"
              : "bg-gray-900 hover:bg-[#D4F933] hover:text-black text-white border-transparent"
          }`}
        >
          <i className="fas fa-sync-alt text-xs"></i>
          <span>Refresh Data</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

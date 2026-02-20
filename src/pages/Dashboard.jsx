import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { GitHubCalendar } from "react-github-calendar";

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  // State untuk setiap analytics
  const [githubData, setGithubData] = useState(null);
  const [umamiData, setUmamiData] = useState(null);
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

  // Fetch Umami Analytics
  const fetchUmamiData = async () => {
    try {
      const response = await fetch("/api/umami");

      if (!response.ok) {
        throw new Error("Failed to fetch Umami data");
      }

      const data = await response.json();

      setUmamiData({
        pageviews: data.pageviews,
        visitors: data.visitors,
        visits: data.visits,
        bounceRate: data.visits
          ? Math.round((data.bounces / data.visits) * 100)
          : 0,
        avgTime: data.visits ? Math.round(data.totaltime / data.visits) : 0,
      });
    } catch (error) {
      console.error("❌ Umami fetch error:", error);
      setUmamiData({
        error: error.message,
        pageviews: 0,
        visitors: 0,
        bounceRate: 0,
        avgTime: 0,
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
        fetchUmamiData(),
        fetchTopLanguages(),
        fetchGithubActivity(),
      ]);
      setLoading(false);
    };

    loadAllData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8 pt-20 lg:pt-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
            {t("loadingDashboard")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-8 pt-20 lg:pt-8   gap-6">
      {/* Header */}
      <div className="mb-8">
        <h1
          className={`text-3xl md:text-4xl font-bold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Dashboard
        </h1>
        <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
          {t("dashboardSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* 1. GitHub Contributions */}
        <div
          className={`rounded-2xl p-6 border ${
            isDarkMode
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-200 shadow-lg"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
              <i className="fab fa-github text-white text-xl"></i>
            </div>
            <div>
              <h2
                className={`text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {t("githubActivity")}
              </h2>
              <p className="text-sm text-gray-400">
                {t("githubContributions")}
              </p>
            </div>
          </div>

          {githubData?.error ? (
            <p className="text-red-500 text-sm">{githubData.error}</p>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center ">
                <div
                  className={`p-4 rounded-lg ${
                    isDarkMode ? "bg-gray-800" : "bg-gray-50"
                  }`}
                >
                  <p className="text-2xl font-bold text-purple-600">
                    {githubData?.repos || 0}
                  </p>
                  <p
                    className={`text-xs sm:text-sm break-words whitespace-normal ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Repositories
                  </p>
                </div>

                <div
                  className={`p-4 rounded-lg ${
                    isDarkMode ? "bg-gray-800" : "bg-gray-50"
                  }`}
                >
                  <p className="text-2xl font-bold text-blue-600">
                    {githubData?.followers || 0}
                  </p>
                  <p
                    className={`text-xs sm:text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Followers
                  </p>
                </div>

                <div
                  className={`p-4 rounded-lg ${
                    isDarkMode ? "bg-gray-800" : "bg-gray-50"
                  }`}
                >
                  <p className="text-2xl font-bold text-green-600">
                    {githubData?.contributions || 0}
                  </p>
                  <p
                    className={`text-xs sm:text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Commits
                  </p>
                </div>
              </div>

              {/* GitHub Contribution Graph */}
              <div
                className={`rounded-lg overflow-hidden p-3 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                <GitHubCalendar
                  username={import.meta.env.VITE_GITHUB_USERNAME}
                  blockSize={12}
                  blockMargin={4}
                  fontSize={14}
                  colorScheme={isDarkMode ? "dark" : "light"}
                  theme={{
                    light: [
                      "#ebedf0",
                      "#9be9a8",
                      "#40c463",
                      "#30a14e",
                      "#216e39",
                    ],
                    dark: [
                      "#161b22",
                      "#0e4429",
                      "#006d32",
                      "#26a641",
                      "#39d353",
                    ],
                  }}
                />
              </div>

              {/* Top Languages - Custom */}
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                <p
                  className={`text-sm font-medium mb-3 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Top Languages
                </p>

                {topLanguages.length > 0 ? (
                  <div className="space-y-3">
                    {topLanguages.map((lang, index) => (
                      <div key={lang.name}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: getLanguageColor(lang.name),
                              }}
                            ></div>
                            <span
                              className={`text-sm ${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {lang.name}
                            </span>
                          </div>
                          <span
                            className={`text-sm ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {lang.percentage}%
                          </span>
                        </div>
                        <div
                          className={`w-full h-2 rounded-full ${
                            isDarkMode ? "bg-gray-700" : "bg-gray-200"
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
                    className={`text-sm ${
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Loading languages...
                  </p>
                )}
              </div>

              {/* GitHub Recent Activity */}
              <div
                className={`rounded-2xl p-6 border ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200 shadow-lg"
                }`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                    <i className="fab fa-github text-white text-xl"></i>
                  </div>
                  <div>
                    <h2
                      className={`text-xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {t("githubActivityLatest")}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {t("RecentActivity")}
                    </p>
                  </div>
                </div>

                {githubActivity.length > 0 ? (
                  <div className="space-y-3">
                    {githubActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className={`flex items-start gap-3 p-3 rounded-lg transition-all hover:scale-[1.02] ${
                          isDarkMode
                            ? "bg-gray-800 hover:bg-gray-750"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            isDarkMode ? "bg-gray-700" : "bg-white"
                          }`}
                        >
                          <i
                            className={`fas ${activity.icon} ${activity.color} text-sm`}
                          ></i>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {activity.action}{" "}
                            <span className="font-semibold text-purple-600">
                              {activity.repo.split("/")[1]}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
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
                    <i className="fab fa-github text-4xl mb-2"></i>
                    <p className="text-sm">No recent activity</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 4. Umami Web Analytics */}
        <div
          className={`rounded-2xl p-6 border ${
            isDarkMode
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-200 shadow-lg"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <i className="fas fa-chart-line text-white text-xl"></i>
            </div>
            <div>
              <h2
                className={`text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {t("umamiTitle")}
              </h2>
              <p className="text-sm text-gray-400">{t('umamiSub')}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <p className="text-2xl font-bold text-orange-500">
                {umamiData?.pageviews?.toLocaleString() || 0}
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {t("pageViews")}
              </p>
            </div>

            <div
              className={`p-4 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <p className="text-2xl font-bold text-blue-500">
                {umamiData?.visitors?.toLocaleString() || 0}
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {t("totalVisitors")}
              </p>
            </div>

            <div
              className={`p-4 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <p className="text-2xl font-bold text-red-500">
                {umamiData?.bounceRate || 0}%
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {t("bounceRate")}
              </p>
            </div>

            <div
              className={`p-4 rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <p className="text-2xl font-bold text-green-500">
                {formatTime(umamiData?.avgTime || 0)}
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {t("avgTimeOnSite")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => window.location.reload()}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            isDarkMode
              ? "bg-gray-800 hover:bg-gray-700 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-900"
          }`}
        >
          <i className="fas fa-sync-alt mr-2"></i>
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

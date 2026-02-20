import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { cardClass, textClass } from "../utils/themeUtils";
import { projects } from "../data/dataProject";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const Projects = () => {
  const { isDarkMode } = useTheme();
  const [filter, setFilter] = useState("all");
  const { t } = useTranslation();
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const navigate = useNavigate();

  useEffect(() => {
    if (filter === "all") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((p) => p.category === filter);
      setFilteredProjects(filtered);
    }
  }, [filter]);

  console.log(filteredProjects);

  return (
    <div
      className="min-h-screen py-8 pt-20 lg:pt-8"
      data-aos="fade-down"
      data-aos-delay="100"
      data-aos-duration="600"
    >
      <h1
        className={`text-3xl md:text-4xl font-bold mb-2 ${textClass(
          isDarkMode,
        )}`}
      >
        {t("projectsTitle")}
      </h1>
      <p className="text-gray-400 mb-8">{t("projectsSubtitle")}</p>

      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 md:px-6 py-2 rounded-lg transition-all text-sm md:text-base ${
            filter === "all"
              ? "bg-purple-600 text-white"
              : isDarkMode
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {t("allProjects")}
        </button>
        <button
          onClick={() => setFilter("web")}
          className={`px-4 md:px-6 py-2 rounded-lg transition-all text-sm md:text-base ${
            filter === "web"
              ? "bg-purple-600 text-white"
              : isDarkMode
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {t("webApps")}
        </button>
        <button
          onClick={() => setFilter("mobile")}
          className={`px-4 md:px-6 py-2 rounded-lg transition-all text-sm md:text-base ${
            filter === "mobile"
              ? "bg-purple-600 text-white"
              : isDarkMode
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {t("mobileApps")}
        </button>
        <button
          onClick={() => setFilter("backend")}
          className={`px-4 md:px-6 py-2 rounded-lg transition-all text-sm md:text-base ${
            filter === "backend"
              ? "bg-purple-600 text-white"
              : isDarkMode
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {t("backend")}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => navigate(`/projects/${project.id}`)}
            className={`${cardClass(
              isDarkMode,
            )} overflow-hidden hover:border-primary transition-all hover:scale-105 cursor-pointer flex flex-col`}
            // ↑ Tambahkan: flex flex-col
          >
            <div
              className={`h-48 ${
                isDarkMode ? "bg-gray-800" : "bg-gray-200"
              } overflow-hidden`}
            >
              <img
                src={project.mainImage}
                alt={project.title}
                className="w-full h-full object-cover "
              />
            </div>

            <div className="p-6 flex flex-col flex-1">
              {/* ↑ Tambahkan: flex flex-col flex-1 */}

              <h3
                className={`text-xl font-semibold mb-2 ${textClass(
                  isDarkMode,
                )}`}
              >
                {project.title}
              </h3>

              {project.pre && (
                <p className="text-gray-400 text-sm mb-2">{project.pre}</p>
              )}

              <p className="text-gray-400 text-sm mb-4 flex-1">
                {/* ↑ Tambahkan: flex-1 */}
                {project.shortDescription}
              </p>

              {/* Button di paling bawah */}
              <div className="flex gap-3 mt-auto">
                {/* ↑ Tambahkan: mt-auto */}

                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => (
                    e.stopPropagation(), navigate(`/projects/${project.id}`)
                  )}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-center py-2 rounded-lg transition-all"
                >
                  {t("detail")}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

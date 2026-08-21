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
  const [zoomedImage, setZoomedImage] = useState(null);

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


      {/* filter buttons */}
      {/* <div className="flex flex-wrap gap-3 mb-8">
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
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`${cardClass(
              isDarkMode,
            )} overflow-hidden transition-all flex flex-col`}
          >
            <div
              onClick={() => setZoomedImage(project.etalase)}
              className={`aspect-video w-full ${
                isDarkMode ? "bg-gray-800" : "bg-gray-200"
              } overflow-hidden cursor-pointer relative group`}
            >
              <img
                src={project.etalase}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-6 flex flex-col flex-1">
              {/* ↑ Tambahkan: flex flex-col flex-1 */}

              <h3
                className={`text-md font-semibold mb-2 ${textClass(
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
              <div className="flex justify-center gap-3 mt-auto">
                {/* ↑ Tambahkan: mt-auto */}

                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => (
                    e.stopPropagation(), navigate(`/projects/${project.id}`)
                  )}
                  className="cursor-pointer w-full md:w-auto md:mt-5 md:px-20 bg-purple-600 hover:bg-purple-700 text-white text-center py-2 rounded-lg transition-all"
                >
                  {t("detail")}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm transition-opacity"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-6xl w-full flex justify-center animate-fade-in">
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white text-4xl font-bold transition-colors"
              title="Close"
            >
              &times;
            </button>
            <img
              src={zoomedImage}
              alt="Zoomed Project"
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;

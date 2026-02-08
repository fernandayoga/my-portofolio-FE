import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { getProjectById } from "../data/dataProject";
import AOS from "aos";

const DetailProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  const [project, setProject] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Get project data
    const projectData = getProjectById(id);

    if (!projectData) {
      // Redirect ke projects jika tidak ditemukan
      navigate("/projects");
      return;
    }

    setProject(projectData);
  }, [id, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Custom icon renderer (untuk Tailwind, dll)
  const renderTechIcon = (tech) => {
    if (!tech.isCustom) {
      return <i className={`${tech.icon} text-xl ${tech.color}`}></i>;
    }

    // Custom SVG icons
    if (tech.icon === "tailwind") {
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-5 h-5 ${tech.color}`}
        >
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
        </svg>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen py-8 pt-20 lg:pt-8 pl-4">
      {/* Back Button */}
      <Link
        to="/projects"
        className={`inline-flex items-center gap-2 mb-6 text-md  ${
          isDarkMode
            ? "text-gray-400 hover:text-white"
            : "text-gray-600 hover:text-gray-900"
        } transition-colors`}
      >
        <i className="fas fa-arrow-left "></i>
        {t("backButton")}
      </Link>

      {/* Header Section */}
      <div className="mb-8">
        <h1
          className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {project.title}
        </h1>

        <p
          className={`text-lg mb-6 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {project.shortDescription}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-3 mb-6">
          {project.technologies.map((tech, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isDarkMode
                  ? "bg-gray-900 border border-gray-800"
                  : "bg-white border border-gray-200"
              }`}
            >
              {renderTechIcon(tech)}
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          {project.sourceCode && (
            <a
              href={project.sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                isDarkMode
                  ? "bg-gray-900 hover:bg-gray-800 text-white border border-gray-800"
                  : "bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200"
              }`}
            >
              <i className="fab fa-github"></i>
              {t("sourceCode")}
            </a>
          )}

          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-lg font-medium transition-all"
            >
              <i className="fas fa-external-link-alt"></i>
              {t("livePreview")}
            </a>
          )}
        </div>
      </div>

      <div
        className={`mb-8 border-b ${
          isDarkMode ? "border-gray-800" : "border-gray-200"
        }`}
      ></div>

      {/* Main Image */}
      <div
        className={`rounded-2xl overflow-hidden mb-12 ${
          isDarkMode
            ? "bg-gray-900 border border-gray-800"
            : "bg-white border border-gray-200"
        }`}
      >
        <img
          src={project.mainImage}
          alt={project.title}
          className="w-full h-auto"
        />
      </div>

      {/* Introduction Section */}
      <div className="mb-12">
        <h2
          className={`text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <i className="fas fa-info-circle text-purple-600"></i>
          {t("introduction")}
        </h2>
        <p
          className={`text-base leading-relaxed ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {project.introduction}
        </p>
      </div>

      {/* Tech Stack Section */}
      <div className="mb-12">
        <h2
          className={`text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <i className="fas fa-code text-purple-600"></i>
          {t("techStak")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.techStack.map((stack, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 ${
                isDarkMode
                  ? "bg-gray-900 border border-gray-800"
                  : "bg-white border border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-bold mb-4 pb-2 border-b ${
                  isDarkMode
                    ? "text-white border-gray-800"
                    : "text-gray-900 border-gray-200"
                }`}
              >
                {stack.category}
              </h3>

              <ul className="space-y-3">
                {stack.items.map((item, idx) => (
                  <li key={idx}>
                    <div
                      className={`font-medium ${
                        isDarkMode ? "text-purple-400" : "text-purple-600"
                      }`}
                    >
                      {item.name}
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {item.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-12">
        <h2
          className={`text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <i className="fas fa-star text-purple-600"></i>
          {t("keyFeatures")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.features.map((feature, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 transition-all hover:scale-105 ${
                isDarkMode
                  ? "bg-gray-900 border border-gray-800 hover:border-purple-500"
                  : "bg-white border border-gray-200 hover:border-purple-500 shadow-lg"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <i className={`fas ${feature.icon} text-white text-xl`}></i>
                </div>

                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Section (Optional) */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="mb-12">
          <h2
            className={`text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <i className="fas fa-images text-purple-600"></i>
            Gallery
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((image, index) => (
              <div
                key={index}
                onClick={() => setActiveImage(index)}
                className={`group rounded-xl overflow-hidden cursor-pointer transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
        ${isDarkMode ? "bg-gray-900" : "bg-white border border-gray-200"}
      `}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to preview
                    </span>
                  </div>
                </div>

                {/* Caption */}
                <div className="p-4">
                  <p
                    className={`text-sm font-medium leading-snug ${
                      isDarkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {image.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={() => setActiveImage(null)}
        >
          {/* Stop propagation biar klik gambar ga nutup */}
          <div
            className={`relative max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl
        ${isDarkMode ? "bg-gray-900" : "bg-white"}
      `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full
          flex items-center justify-center
          bg-black/60 hover:bg-black/80 text-white hover:text-purple-600 transition"
            >
              <i className="fas fa-times"></i>
            </button>

            {/* Image */}
            <div className="w-full bg-black flex items-center justify-center">
              <img
                src={project.gallery[activeImage].src}
                alt={project.gallery[activeImage].alt}
                className="max-h-[80vh] w-auto object-contain"
              />
            </div>

            {/* Caption */}
            <div className="p-5 border-t">
              <p
                className={`text-sm md:text-base leading-relaxed
            ${isDarkMode ? "text-gray-300" : "text-gray-700"}
          `}
              >
                {project.gallery[activeImage].caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation to other projects */}
      <div className="mt-12 text-center">
        <Link
          to="/projects"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            isDarkMode
              ? "bg-gray-900 hover:bg-gray-800 text-white border border-gray-800"
              : "bg-gray-100 hover:bg-gray-200 text-gray-900"
          }`}
        >
          <i className="fas fa-grid"></i>
          {t("viewAllProjects")}
        </Link>
      </div>
    </div>
  );
};

export default DetailProject;

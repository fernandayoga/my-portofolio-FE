import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { getProjectById } from "../data/dataProject";

const DetailProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  
  const getLoc = (val) => (typeof val === 'object' && val !== null) ? (val[i18n.language] || val.en) : val;

  const [project, setProject] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const projectData = getProjectById(id);

    if (!projectData) {
      navigate("/projects");
      return;
    }

    setProject(projectData);
  }, [id, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className={`flex items-center gap-3 font-mono text-sm ${
            isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full animate-ping ${
              isDarkMode ? "bg-[#D4F933]" : "bg-[#2D5204]"
            }`}
          ></div>
          <span>LOADING CASE STUDY...</span>
        </div>
      </div>
    );
  }

  // Custom icon renderer
  const renderTechIcon = (tech) => {
    if (!tech.isCustom) {
      return <i className={`${tech.icon} text-sm ${isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"}`}></i>;
    }

    if (tech.icon === "tailwind") {
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-cyan-400">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
        </svg>
      );
    }

    if (tech.icon === "express") {
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-300">
          <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen py-8 pt-20 xl:pt-8 max-w-5xl">
      {/* Back to Projects Action */}
      <Link
        to="/projects"
        className={`inline-flex items-center gap-2 mb-8 font-mono text-xs font-semibold tracking-wider uppercase transition-colors ${
          isDarkMode
            ? "text-gray-400 hover:text-[#D4F933]"
            : "text-gray-600 hover:text-black"
        }`}
      >
        <i className="fas fa-arrow-left text-[10px]"></i>
        <span>{t("backButton")}</span>
      </Link>

      {/* Case Study Header Banner */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-[#D4F933]" : "bg-[#2D5204]"}`}></div>
          <span className={`font-mono text-xs font-semibold tracking-widest uppercase ${
            isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
          }`}>
            // CASE STUDY ARCHIVE • {project.id?.toUpperCase()}
          </span>
          <div className={`flex-1 h-[1px] ${isDarkMode ? "bg-white/[0.08]" : "bg-black/[0.08]"}`}></div>
        </div>

        <h1
          className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {getLoc(project.title)}
        </h1>

        <p
          className={`text-base sm:text-lg leading-relaxed mb-8 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {getLoc(project.shortDescription)}
        </p>

        {/* Technologies Index */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {project.technologies.map((tech, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md border font-mono text-xs ${
                isDarkMode
                  ? "bg-[#121216] border-white/[0.08] text-gray-300"
                  : "bg-white border-black/[0.08] text-gray-800 shadow-xs"
              }`}
            >
              {renderTechIcon(tech)}
              <span>{tech.name}</span>
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
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all border ${
                isDarkMode
                  ? "bg-[#181920] hover:bg-white hover:text-black text-white border-white/[0.12]"
                  : "bg-white hover:bg-gray-100 text-gray-900 border-black/[0.12]"
              }`}
            >
              <i className="fab fa-github text-sm"></i>
              <span>{t("sourceCode")}</span>
            </a>
          )}

          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                isDarkMode
                  ? "bg-[#D4F933] hover:bg-[#bce615] text-black"
                  : "bg-[#0A0A0C] hover:bg-black text-[#D4F933] border border-black"
              }`}
            >
              <i className="fas fa-external-link-alt text-xs"></i>
              <span>{t("livePreview")}</span>
            </a>
          )}
        </div>

        <div className="mt-10 hairline-divider"></div>
      </div>

      {/* Section 01: Executive Brief / Introduction */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-4">
          <span className={`font-mono text-xs tracking-wider font-semibold ${
            isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
          }`}>
            // 01
          </span>
          <h2
            className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {t("introduction")}
          </h2>
          <div className={`flex-1 h-[1px] ${isDarkMode ? "bg-white/[0.08]" : "bg-black/[0.08]"}`}></div>
        </div>

        <div
          className={`p-6 sm:p-8 rounded-xl border ${
            isDarkMode
              ? "bg-[#121216] border-white/[0.08]"
              : "bg-white border-black/[0.08] shadow-sm"
          }`}
        >
          <p
            className={`text-sm sm:text-base leading-relaxed text-justify hyphens-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {getLoc(project.introduction)}
          </p>
        </div>
      </div>

      {/* Section 02: Architecture & Tech Stack Matrix */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-4">
          <span className={`font-mono text-xs tracking-wider font-semibold ${
            isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
          }`}>
            // 02
          </span>
          <h2
            className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {t("techStak")}
          </h2>
          <div className={`flex-1 h-[1px] ${isDarkMode ? "bg-white/[0.08]" : "bg-black/[0.08]"}`}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {project.techStack.map((stack, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 border ${
                isDarkMode
                  ? "bg-[#121216] border-white/[0.08]"
                  : "bg-white border-black/[0.08] shadow-sm"
              }`}
            >
              <h3
                className={`font-mono text-xs uppercase tracking-wider pb-3 mb-4 border-b font-semibold ${
                  isDarkMode 
                    ? "border-white/[0.08] text-[#D4F933]" 
                    : "border-black/[0.08] text-[#2D5204]"
                }`}
              >
                {getLoc(stack.category)}
              </h3>

              <ul className="space-y-4">
                {stack.items.map((item, idx) => (
                  <li key={idx}>
                    <div
                      className={`text-sm font-semibold mb-0.5 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {getLoc(item.name)}
                    </div>
                    <div
                      className={`text-xs leading-relaxed ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {getLoc(item.description)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Section 03: Key Features & Capabilities */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-4">
          <span className={`font-mono text-xs tracking-wider font-semibold ${
            isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
          }`}>
            // 03
          </span>
          <h2
            className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {t("keyFeatures")}
          </h2>
          <div className={`flex-1 h-[1px] ${isDarkMode ? "bg-white/[0.08]" : "bg-black/[0.08]"}`}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {project.features.map((feature, index) => (
            <div
              key={index}
              className={`rounded-xl p-6 border transition-all duration-200 ${
                isDarkMode
                  ? "bg-[#121216] border-white/[0.08] hover:border-white/[0.18]"
                  : "bg-white border-black/[0.08] hover:border-black/[0.18] shadow-sm"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isDarkMode
                    ? "bg-[#D4F933]/10 border border-[#D4F933]/30 text-[#D4F933]"
                    : "bg-[#0A0A0C] border border-black text-[#D4F933] shadow-xs"
                }`}>
                  <i className={`fas ${feature.icon} text-sm`}></i>
                </div>

                <div className="flex-1">
                  <h3
                    className={`text-base font-bold mb-1.5 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {getLoc(feature.title)}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {getLoc(feature.description)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 04: Visual Interface Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className={`font-mono text-xs tracking-wider font-semibold ${
              isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
            }`}>
              // 04
            </span>
            <h2
              className={`text-xl sm:text-2xl font-bold tracking-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Gallery
            </h2>
            <div className={`flex-1 h-[1px] ${isDarkMode ? "bg-white/[0.08]" : "bg-black/[0.08]"}`}></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {project.gallery.map((image, index) => (
              <div
                key={index}
                onClick={() => setActiveImage(index)}
                className={`group rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 ${
                  isDarkMode
                    ? "bg-[#121216] border-white/[0.08] hover:border-white/[0.2]"
                    : "bg-white border-black/[0.08] hover:border-black/[0.2] shadow-sm"
                }`}
              >
                <div className="relative overflow-hidden aspect-video bg-[#181920]">
                  <img
                    src={image.src}
                    alt={getLoc(image.alt)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="font-mono text-[11px] text-white bg-black/80 px-2.5 py-1 rounded border border-white/[0.2]">
                      INSPECT
                    </span>
                  </div>
                </div>

                <div className="p-4 border-t border-inherit">
                  <p
                    className={`text-xs font-medium leading-snug line-clamp-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {getLoc(image.caption)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {activeImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md px-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className={`relative max-w-5xl w-full rounded-xl overflow-hidden border border-white/[0.15] shadow-2xl ${
              isDarkMode ? "bg-[#121216]" : "bg-white"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 font-mono text-xs text-white/70 hover:text-[#D4F933] bg-black/60 px-3 py-1.5 rounded border border-white/[0.2] transition-colors"
            >
              [ESC / CLOSE]
            </button>

            <div className="w-full bg-black flex items-center justify-center p-2">
              <img
                src={project.gallery[activeImage].src}
                alt={getLoc(project.gallery[activeImage].alt)}
                className="max-h-[75vh] w-auto object-contain rounded-md"
              />
            </div>

            <div className="p-5 border-t border-white/[0.08]">
              <p
                className={`text-xs sm:text-sm font-mono leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {getLoc(project.gallery[activeImage].caption)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className={`mt-14 pt-8 border-t text-center ${isDarkMode ? "border-white/[0.08]" : "border-black/[0.08]"}`}>
        <Link
          to="/projects"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all border ${
            isDarkMode
              ? "bg-[#181920] hover:bg-[#D4F933] hover:text-black text-white border-white/[0.12] hover:border-[#D4F933]"
              : "bg-gray-900 hover:bg-[#2D5204] text-white border-transparent shadow-xs"
          }`}
        >
          <i className="fas fa-th-large text-[10px]"></i>
          <span>{t("viewAllProjects")}</span>
        </Link>
      </div>
    </div>
  );
};

export default DetailProject;

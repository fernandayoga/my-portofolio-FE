import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { projects } from "../data/dataProject";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";

const Projects = () => {
  const { isDarkMode } = useTheme();
  const [filter, setFilter] = useState("all");
  const { t, i18n } = useTranslation();
  const getLoc = (val) => (typeof val === 'object' && val !== null) ? (val[i18n.language] || val.en) : val;
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

  // Lock body scroll when zoom modal is open & handle ESC key
  useEffect(() => {
    if (zoomedImage) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") setZoomedImage(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, [zoomedImage]);

  return (
    <div
      className="min-h-screen py-8 pt-20 xl:pt-8"
      data-aos="fade-down"
      data-aos-delay="100"
      data-aos-duration="600"
    >
      {/* Header Section */}
      <div className="mb-12">
        

        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {t("projectsTitle")}
        </h1>
        <p className={`font-mono text-xs sm:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          {t("projectsSubtitle")}
        </p>

        <div className="mt-8 hairline-divider"></div>
      </div>

      {/* Projects Grid — Curated Digital Artifacts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className={`group relative rounded-2xl border transition-colors duration-300 flex flex-col overflow-hidden [content-visibility:auto] [contain-intrinsic-size:500px] ${
              isDarkMode
                ? "bg-[#121216] hover:bg-[#1A1A22] border-white/[0.08] hover:border-white/[0.18]"
                : "bg-white hover:bg-slate-50 border-black/[0.08] hover:border-black/[0.16] shadow-sm"
            }`}
          >
            {/* Visual Preview Framing */}
            <div
              onClick={() => setZoomedImage(project.etalase)}
              className="group/img aspect-video w-full bg-[#181920] overflow-hidden cursor-pointer relative border-b border-inherit"
            >
              <img
                src={project.etalase}
                alt={getLoc(project.title)}
                loading={idx < 2 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={idx < 2 ? "high" : "low"}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
              />

              {/* Holographic Shine Sweep Effect */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover/img:translate-x-full transition-transform duration-1000 ease-out z-10 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent skew-x-[-20deg]" />

              {/* Technical Indicator Badge */}
              <div className="absolute top-3 left-3 font-mono text-[10px] px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm border border-white/[0.15] text-white flex items-center gap-1.5 z-10">
                <span className="text-[#D4F933] font-semibold">[{idx < 9 ? `0${idx + 1}` : idx + 1}]</span>
                
              </div>

              {/* Hover Zoom Hint - only appears when hovering the image itself */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none z-10">
                <span className="font-mono text-xs text-white bg-black/80 px-3 py-1.5 rounded border border-white/[0.2] flex items-center gap-2 shadow-lg">
                  <i className="fas fa-search-plus text-[#D4F933] text-xs"></i>
                  <span>PREVIEW FULL</span>
                </span>
              </div>
            </div>

            {/* Artifact Metadata & Details */}
            <div className="relative z-10 p-6 sm:p-7 flex flex-col flex-1">
              {project.pre && (
                <div className={`font-mono text-[11px] font-semibold tracking-wider uppercase mb-2 ${
                  isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                }`}>
                  {getLoc(project.pre)}
                </div>
              )}

              <h3
                className={`text-xl font-bold tracking-tight mb-2.5 transition-colors duration-200 ${
                  isDarkMode 
                    ? "text-white group-hover:text-[#D4F933]" 
                    : "text-gray-900 group-hover:text-[#2D5204]"
                }`}
              >
                {getLoc(project.title)}
              </h3>

              <p
                className={`text-sm leading-relaxed mb-5 flex-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {getLoc(project.shortDescription)}
              </p>

              {/* Tech Stack Badges with Micro-Hover Glow */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className={`font-mono text-[11px] px-2.5 py-1 rounded-md border transition-all duration-200 flex items-center gap-1.5 ${
                        isDarkMode
                          ? "bg-white/[0.03] border-white/[0.08] text-gray-400 hover:border-[#D4F933]/40 hover:text-[#D4F933] hover:bg-white/[0.06]"
                          : "bg-black/[0.03] border-black/[0.08] text-gray-600 hover:border-[#2D5204]/40 hover:text-[#2D5204] hover:bg-black/[0.06]"
                      }`}
                    >
                      {tech.icon && !tech.isCustom && (
                        <i className={`${tech.icon} text-[10px]`}></i>
                      )}
                      <span>{tech.name}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Action Button with Hover Arrow Slide & Glow */}
              <div className={`pt-4 border-t mt-auto ${isDarkMode ? "border-white/[0.06]" : "border-black/[0.06]"}`}>
                <Link
                  to={`/projects/${project.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={`group/btn w-full py-3 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider text-center transition-all duration-200 flex items-center justify-center gap-2.5 border cursor-pointer select-none ${
                    isDarkMode
                      ? "bg-[#181920] hover:bg-[#D4F933] hover:text-black text-white border-white/[0.12] hover:border-[#D4F933] hover:shadow-[0_0_24px_rgba(212,249,51,0.25)]"
                      : "bg-gray-900 hover:bg-[#2D5204] text-white border-transparent hover:shadow-lg"
                  }`}
                >
                  <span>{t("detail")}</span>
                  <i className="fas fa-arrow-right text-xs transition-transform duration-300 ease-out group-hover/btn:translate-x-2.5 group-hover/btn:scale-110"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Zoom Modal with Smooth Scale Animation */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-md animate-backdrop-fade overscroll-contain touch-none select-none"
          onClick={() => setZoomedImage(null)}
          onWheel={(e) => e.stopPropagation()}
        >
          <div
            className="relative inline-flex flex-col items-end max-w-[92vw] animate-modal-zoom"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomedImage(null)}
              className="group mb-2 font-mono text-xs text-white/80 hover:text-[#D4F933] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="tracking-wider">[ESC / CLOSE]</span>
              <span className="text-xl leading-none transition-transform duration-200 group-hover:rotate-90">&times;</span>
            </button>
            <img
              src={zoomedImage}
              alt="Zoomed Project"
              decoding="async"
              className="max-h-[85vh] max-w-full w-auto h-auto object-contain rounded-lg shadow-2xl cursor-default"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;

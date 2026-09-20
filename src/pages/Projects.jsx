import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { projects } from "../data/dataProject";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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

  // Lock body scroll when zoom modal is open
  useEffect(() => {
    if (zoomedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
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
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-[#D4F933]" : "bg-[#2D5204]"}`}></div>
          <span className={`font-mono text-xs font-semibold tracking-widest uppercase ${
            isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
          }`}>
            // SELECTED WORKS & DIGITAL ARTIFACTS
          </span>
          <div className={`flex-1 h-[1px] ${isDarkMode ? "bg-white/[0.08]" : "bg-black/[0.08]"}`}></div>
        </div>

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
            className={`rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden group ${
              isDarkMode
                ? "bg-[#121216] border-white/[0.08] hover:border-white/[0.18]"
                : "bg-white border-black/[0.08] hover:border-black/[0.18] shadow-sm"
            }`}
          >
            {/* Visual Preview Framing */}
            <div
              onClick={() => setZoomedImage(project.etalase)}
              className="aspect-video w-full bg-[#181920] overflow-hidden cursor-pointer relative border-b border-inherit"
            >
              <img
                src={project.etalase}
                alt={getLoc(project.title)}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />

              {/* Technical Indicator Badge */}
              <div className="absolute top-3 left-3 font-mono text-[10px] px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm border border-white/[0.15] text-white flex items-center gap-1.5">
                <span className="text-[#D4F933] font-semibold">[{idx < 9 ? `0${idx + 1}` : idx + 1}]</span>
                <span>ARTIFACT</span>
              </div>

              {/* Hover Zoom Hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="font-mono text-xs text-white bg-black/80 px-3 py-1.5 rounded border border-white/[0.2] flex items-center gap-2">
                  <i className="fas fa-search-plus text-[#D4F933] text-xs"></i>
                  <span>PREVIEW FULL</span>
                </span>
              </div>
            </div>

            {/* Artifact Metadata & Details */}
            <div className="p-6 sm:p-7 flex flex-col flex-1">
              {project.pre && (
                <div className={`font-mono text-[11px] font-semibold tracking-wider uppercase mb-2 ${
                  isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                }`}>
                  {getLoc(project.pre)}
                </div>
              )}

              <h3
                className={`text-xl font-bold tracking-tight mb-2.5 transition-colors ${
                  isDarkMode 
                    ? "text-white group-hover:text-[#D4F933]" 
                    : "text-gray-900 group-hover:text-[#2D5204]"
                }`}
              >
                {getLoc(project.title)}
              </h3>

              <p
                className={`text-sm leading-relaxed mb-6 flex-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {getLoc(project.shortDescription)}
              </p>

              {/* Action Button */}
              <div className={`pt-4 border-t mt-auto ${isDarkMode ? "border-white/[0.06]" : "border-black/[0.06]"}`}>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/projects/${project.id}`);
                  }}
                  className={`w-full py-3 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 border ${
                    isDarkMode
                      ? "bg-[#181920] hover:bg-[#D4F933] hover:text-black text-white border-white/[0.12] hover:border-[#D4F933]"
                      : "bg-gray-900 hover:bg-[#2D5204] text-white border-transparent shadow-xs"
                  }`}
                >
                  <span>{t("detail")}</span>
                  <i className="fas fa-arrow-right text-[10px]"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md transition-opacity"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-6xl w-full flex justify-center animate-fade-in">
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute -top-12 right-0 text-white/70 hover:text-[#D4F933] font-mono text-sm uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              title="Close"
            >
              <span>[CLOSE]</span>
              <span className="text-xl leading-none">&times;</span>
            </button>
            <img
              src={zoomedImage}
              alt="Zoomed Project"
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl border border-white/[0.15] shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;

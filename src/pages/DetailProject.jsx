import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { projects, getProjectById } from "../data/dataProject";

const DetailProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  
  const getLoc = (val) => (typeof val === 'object' && val !== null) ? (val[i18n.language] || val.en) : val;

  const [project, setProject] = useState(() => getProjectById(id));
  const [activeImage, setActiveImage] = useState(null);
  const [heroZoom, setHeroZoom] = useState(false);

  // Compute previous and next project for seamless navigation
  const currentIndex = projects.findIndex((p) => p.id === id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    const projectData = getProjectById(id);

    if (!projectData) {
      navigate("/projects");
      return;
    }

    setProject(projectData);
    setActiveImage(null);
    setHeroZoom(false);
  }, [id, navigate]);

  // Lock body scroll and handle keyboard navigation for modal (ESC, Arrow Left/Right)
  useEffect(() => {
    const isModalOpen = activeImage !== null || heroZoom;
    if (isModalOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          setActiveImage(null);
          setHeroZoom(false);
        }
        if (activeImage !== null && project?.gallery && project.gallery.length > 1) {
          if (e.key === "ArrowLeft") {
            setActiveImage((prev) => (prev > 0 ? prev - 1 : project.gallery.length - 1));
          } else if (e.key === "ArrowRight") {
            setActiveImage((prev) => (prev < project.gallery.length - 1 ? prev + 1 : 0));
          }
        }
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
  }, [activeImage, heroZoom, project]);

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
    <div key={id} className="min-h-screen py-8 pt-20 xl:pt-8 max-w-5xl">
      {/* Back to Projects Action */}
      <Link
        to="/projects"
        className={`inline-flex items-center gap-2 mb-8 font-mono text-xs font-semibold tracking-wider uppercase transition-colors animate-fade-in-up ${
          isDarkMode
            ? "text-gray-400 hover:text-[#D4F933]"
            : "text-gray-600 hover:text-black"
        }`}
      >
        <i className="fas fa-arrow-left text-[10px]"></i>
        <span>{t("backButton")}</span>
      </Link>

      {/* Case Study Header Banner */}
      <div className="mb-12 animate-fade-in-up animation-delay-75">
        <h1
          className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {getLoc(project.title)}
        </h1>

        <p
          className={`text-base sm:text-lg leading-relaxed mb-6 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {getLoc(project.shortDescription)}
        </p>

        {/* Project Snapshot Matrix */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border mb-6 ${
            isDarkMode
              ? "bg-white/[0.02] border-white/[0.08]"
              : "bg-black/[0.02] border-black/[0.08] shadow-xs"
          }`}
        >
          <div>
            <div className={`font-mono text-[10px] uppercase tracking-wider mb-1 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              {t("categoryLabel", "CATEGORY")}
            </div>
            <div className={`font-mono text-xs sm:text-sm font-bold uppercase truncate ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              {project.categoryLabel ? getLoc(project.categoryLabel) : (project.category || "WEB APPLICATION")}
            </div>
          </div>

          <div>
            <div className={`font-mono text-[10px] uppercase tracking-wider mb-1 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              {t("roleLabel", "ROLE")}
            </div>
            <div className={`font-mono text-xs sm:text-sm font-bold uppercase truncate ${
              isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
            }`}>
              {project.role ? getLoc(project.role) : "FULLSTACK DEV"}
            </div>
          </div>

          <div>
            <div className={`font-mono text-[10px] uppercase tracking-wider mb-1 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              {t("deploymentLabel", "DEPLOYMENT")}
            </div>
            <div className={`font-mono text-xs sm:text-sm font-bold uppercase truncate ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              {project.deployment ? getLoc(project.deployment) : "VERCEL CLOUD"}
            </div>
          </div>

          <div>
            <div className={`font-mono text-[10px] uppercase tracking-wider mb-1 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              {t("statusLabel", "STATUS")}
            </div>
            <div className="font-mono text-xs sm:text-sm font-bold uppercase truncate text-emerald-500 flex items-center gap-2">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="truncate">{project.status ? getLoc(project.status) : "PRODUCTION"}</span>
            </div>
          </div>
        </div>

        {/* Technologies Index */}
        <div className="flex flex-wrap gap-2.5 mb-6">
          {project.technologies.map((tech, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md border font-mono text-xs transition-all ${
                isDarkMode
                  ? "bg-[#121216] border-white/[0.08] text-gray-300 hover:border-[#D4F933]/30 hover:text-white"
                  : "bg-white border-black/[0.08] text-gray-800 shadow-xs hover:border-black/[0.2]"
              }`}
            >
              {renderTechIcon(tech)}
              <span>{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/btn relative overflow-hidden flex items-center gap-2 px-5 py-3 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer select-none ${
                isDarkMode
                  ? "bg-[#D4F933] hover:bg-[#cbf522] text-black shadow-[0_0_20px_rgba(212,249,51,0.25)] hover:shadow-[0_0_32px_rgba(212,249,51,0.5)]"
                  : "bg-[#0A0A0C] hover:bg-black text-[#D4F933] border border-black shadow-lg hover:shadow-xl"
              }`}
            >
              {/* Holographic Light Sheen Sweep */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out z-10 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]" />

              <i className="fas fa-external-link-alt text-xs transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 relative z-20"></i>
              <span className="relative z-20">{t("livePreview")}</span>
            </a>
          )}

          {project.sourceCode && (
            <a
              href={project.sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/btn relative overflow-hidden flex items-center gap-2 px-5 py-3 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 border hover:-translate-y-0.5 active:translate-y-0 cursor-pointer select-none ${
                isDarkMode
                  ? "bg-[#181920] hover:bg-[#1f212a] text-white hover:text-[#D4F933] border-white/[0.12] hover:border-[#D4F933]/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_16px_rgba(212,249,51,0.12)]"
                  : "bg-white hover:bg-gray-50 text-gray-900 hover:text-black border-black/[0.12] hover:border-black/[0.3] shadow-xs hover:shadow-md"
              }`}
            >
              {/* Holographic Light Sheen Sweep */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out z-10 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent skew-x-[-20deg]" />

              <i className="fab fa-github text-sm transition-transform duration-300 ease-out group-hover/btn:rotate-12 group-hover/btn:scale-110 relative z-20"></i>
              <span className="relative z-20">{t("sourceCode")}</span>
            </a>
          )}
        </div>

        <div className="mt-10 hairline-divider"></div>
      </div>

      {/* Hero Visual Showcase Banner */}
      {(project.mainImage || project.etalase) && (
        <div className="relative mb-14 animate-fade-in-up animation-delay-150">
          {/* Ambient Cyber Glow Aura behind Mockup Frame */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -inset-2 sm:-inset-4 rounded-3xl blur-2xl sm:blur-3xl transition-opacity duration-700 -z-10 ${
              isDarkMode
                ? "bg-gradient-to-tr from-[#D4F933]/20 via-[#D4F933]/10 to-emerald-500/15 opacity-70 animate-pulse-slow"
                : "bg-gradient-to-tr from-emerald-500/10 via-[#2D5204]/10 to-teal-500/10 opacity-60"
            }`}
          />

          <div
            className={`rounded-2xl border overflow-hidden transition-all duration-300 shadow-xl ${
              isDarkMode
                ? "bg-[#121216] border-white/[0.1] hover:border-white/[0.2]"
                : "bg-white border-black/[0.1] hover:border-black/[0.2]"
            }`}
          >
            {/* Browser / Application Top Bar */}
            <div
              className={`px-4 py-3 border-b flex items-center justify-between gap-4 select-none ${
                isDarkMode ? "bg-[#181920] border-white/[0.08]" : "bg-gray-100 border-black/[0.08]"
              }`}
            >
              {/* Window Controls */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 inline-block"></span>
              </div>

              {/* URL / App Tab Bar */}
              <div
                className={`flex-1 max-w-md mx-auto px-3.5 py-1 rounded-md font-mono text-[11px] truncate text-center border ${
                  isDarkMode
                    ? "bg-[#121216] border-white/[0.06] text-gray-400"
                    : "bg-white border-black/[0.06] text-gray-600 shadow-xs"
                }`}
              >
                <i className="fas fa-lock text-[9px] mr-1.5 opacity-60"></i>
                <span>
                  {project.liveDemo
                    ? project.liveDemo.replace(/^https?:\/\//, "").replace(/\/$/, "")
                    : `${project.id}.app`}
                </span>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-500 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
                <span className="hidden sm:inline">ONLINE</span>
              </div>
            </div>

            {/* Mockup Preview Canvas */}
            <div
              onClick={() => setHeroZoom(true)}
              className="group/hero relative cursor-pointer overflow-hidden bg-[#181920]"
            >
              <img
                src={project.mainImage || project.etalase}
                alt={getLoc(project.title)}
                decoding="async"
                className="w-full h-auto object-cover object-top max-h-[580px] transition-transform duration-700 ease-out group-hover/hero:scale-[1.02]"
              />

              {/* Holographic Shine Sweep Effect */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover/hero:translate-x-full transition-transform duration-1000 ease-out z-10 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent skew-x-[-20deg]" />

              {/* Hover Inspect Hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/hero:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none z-20">
                <span className="font-mono text-xs text-white bg-black/85 px-4 py-2 rounded-lg border border-white/[0.2] flex items-center gap-2 shadow-2xl backdrop-blur-sm">
                  <i className="fas fa-search-plus text-[#D4F933] text-sm"></i>
                  <span className="tracking-wider uppercase font-semibold">INSPECT FULL PREVIEW</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 01: Executive Brief / Introduction */}
      <div className="mb-14 animate-fade-in-up animation-delay-225">
        <div className="flex items-center gap-3 mb-4">
          <h2
            className={`text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2.5 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <span className={`font-mono font-bold ${
              isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
            }`}>
              //
            </span>
            <span>{t("introduction")}</span>
          </h2>
          <div className={`flex-1 h-[1px] ${isDarkMode ? "bg-white/[0.08]" : "bg-black/[0.08]"}`}></div>
        </div>

        <div
          className={`p-6 sm:p-8 rounded-xl border transition-all duration-300 ${
            isDarkMode
              ? "bg-[#121216] border-white/[0.08] hover:border-white/[0.18]"
              : "bg-white border-black/[0.08] hover:border-black/[0.18] shadow-sm"
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
      <div className="mb-14 animate-fade-in-up animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <h2
            className={`text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2.5 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <span className={`font-mono font-bold ${
              isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
            }`}>
              //
            </span>
            <span>{t("techStak")}</span>
          </h2>
          <div className={`flex-1 h-[1px] ${isDarkMode ? "bg-white/[0.08]" : "bg-black/[0.08]"}`}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {project.techStack.map((stack, index) => (
            <div
              key={index}
              className={`group rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
                isDarkMode
                  ? "bg-[#121216] border-white/[0.08] hover:border-[#D4F933]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(212,249,51,0.08)]"
                  : "bg-white border-black/[0.08] hover:border-black/[0.22] shadow-sm hover:shadow-md"
              }`}
            >
              <h3
                className={`font-mono text-xs uppercase tracking-wider pb-3 mb-4 border-b font-semibold transition-colors ${
                  isDarkMode 
                    ? "border-white/[0.08] text-[#D4F933] group-hover:text-white" 
                    : "border-black/[0.08] text-[#2D5204] group-hover:text-black"
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
      <div className="mb-14 animate-fade-in-up animation-delay-375">
        <div className="flex items-center gap-3 mb-4">
          <h2
            className={`text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2.5 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <span className={`font-mono font-bold ${
              isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
            }`}>
              //
            </span>
            <span>{t("keyFeatures")}</span>
          </h2>
          <div className={`flex-1 h-[1px] ${isDarkMode ? "bg-white/[0.08]" : "bg-black/[0.08]"}`}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {project.features.map((feature, index) => (
            <div
              key={index}
              className={`group rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
                isDarkMode
                  ? "bg-[#121216] border-white/[0.08] hover:border-[#D4F933]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(212,249,51,0.08)]"
                  : "bg-white border-black/[0.08] hover:border-black/[0.22] shadow-sm hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                  isDarkMode
                    ? "bg-[#D4F933]/10 border border-[#D4F933]/30 text-[#D4F933]"
                    : "bg-[#0A0A0C] border border-black text-[#D4F933] shadow-xs"
                }`}>
                  <i className={`fas ${feature.icon} text-sm`}></i>
                </div>

                <div className="flex-1">
                  <h3
                    className={`text-base font-bold mb-1.5 transition-colors ${
                      isDarkMode ? "text-white group-hover:text-[#D4F933]" : "text-gray-900"
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
        <div className="mb-14 animate-fade-in-up animation-delay-450">
          <div className="flex items-center gap-3 mb-4">
            <h2
              className={`text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2.5 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <span className={`font-mono font-bold ${
                isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
              }`}>
                //
              </span>
              <span>Gallery</span>
            </h2>
            <div className={`flex-1 h-[1px] ${isDarkMode ? "bg-white/[0.08]" : "bg-black/[0.08]"}`}></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {project.gallery.map((image, index) => (
              <div
                key={index}
                onClick={() => setActiveImage(index)}
                className={`group rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 hover:-translate-y-1 ${
                  isDarkMode
                    ? "bg-[#121216] border-white/[0.08] hover:border-[#D4F933]/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_24px_rgba(212,249,51,0.1)]"
                    : "bg-white border-black/[0.08] hover:border-black/[0.22] shadow-sm hover:shadow-md"
                }`}
              >
                <div className="relative overflow-hidden aspect-video bg-[#181920]">
                  <img
                    src={image.src}
                    alt={getLoc(image.alt)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Holographic Shine Sweep Effect on Thumbnail */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-10 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent skew-x-[-20deg]" />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 pointer-events-none">
                    <span className="font-mono text-[11px] text-white bg-black/80 px-2.5 py-1 rounded border border-white/[0.2] flex items-center gap-1.5 shadow-lg backdrop-blur-xs">
                      <i className="fas fa-search-plus text-[#D4F933] text-xs"></i>
                      <span>INSPECT</span>
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

      {/* Project Pagination (Next / Prev Navigation) */}
      <div className={`mt-14 pt-8 border-t animate-fade-in-up animation-delay-525 ${isDarkMode ? "border-white/[0.08]" : "border-black/[0.08]"}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Previous Project Card */}
          {prevProject && (
            <Link
              to={`/projects/${prevProject.id}`}
              className={`group p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
                isDarkMode
                  ? "bg-[#121216] hover:bg-[#1A1A22] border-white/[0.08] hover:border-[#D4F933]/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_16px_rgba(212,249,51,0.06)]"
                  : "bg-white hover:bg-slate-50 border-black/[0.08] hover:border-[#2D5204]/40 shadow-sm hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider mb-2 text-gray-400 group-hover:text-[#D4F933] transition-colors">
                <i className="fas fa-arrow-left text-[10px] transition-transform duration-200 group-hover:-translate-x-1"></i>
                <span>PREVIOUS CASE STUDY</span>
              </div>
              <div className={`text-base font-bold tracking-tight truncate ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                {getLoc(prevProject.title)}
              </div>
            </Link>
          )}

          {/* Next Project Card */}
          {nextProject && (
            <Link
              to={`/projects/${nextProject.id}`}
              className={`group p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between text-right hover:-translate-y-1 ${
                isDarkMode
                  ? "bg-[#121216] hover:bg-[#1A1A22] border-white/[0.08] hover:border-[#D4F933]/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_16px_rgba(212,249,51,0.06)]"
                  : "bg-white hover:bg-slate-50 border-black/[0.08] hover:border-[#2D5204]/40 shadow-sm hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-end gap-2 font-mono text-[11px] uppercase tracking-wider mb-2 text-gray-400 group-hover:text-[#D4F933] transition-colors">
                <span>NEXT CASE STUDY</span>
                <i className="fas fa-arrow-right text-[10px] transition-transform duration-200 group-hover:translate-x-1"></i>
              </div>
              <div className={`text-base font-bold tracking-tight truncate ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                {getLoc(nextProject.title)}
              </div>
            </Link>
          )}
        </div>

        {/* Return to Grid Button */}
        <div className="text-center">
          <Link
            to="/projects"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all border hover:-translate-y-0.5 ${
              isDarkMode
                ? "bg-[#181920] hover:bg-[#D4F933] hover:text-black text-white border-white/[0.12] hover:border-[#D4F933] hover:shadow-[0_0_24px_rgba(212,249,51,0.25)]"
                : "bg-gray-900 hover:bg-[#2D5204] text-white border-transparent shadow-md"
            }`}
          >
            <i className="fas fa-th-large text-[10px]"></i>
            <span>{t("viewAllProjects")}</span>
          </Link>
        </div>
      </div>


      {/* Lightbox Modal for Gallery & Hero */}
      {(activeImage !== null || heroZoom) &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 sm:p-6 md:p-8 backdrop-blur-md animate-backdrop-fade select-none"
            onClick={() => {
              setActiveImage(null);
              setHeroZoom(false);
            }}
            onWheel={(e) => e.stopPropagation()}
          >
            <div
              className="relative flex flex-col items-center max-w-[92vw] max-h-[92vh] animate-modal-zoom"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Controls Header */}
              <div className="w-full flex items-center justify-between mb-3 font-mono text-xs text-white/80">
                {activeImage !== null && project.gallery ? (
                  <span className="text-[#D4F933] font-semibold tracking-wider flex items-center gap-1.5 bg-[#121216] px-3 py-1 rounded-md border border-white/[0.1]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4F933] animate-ping"></span>
                    <span>[ {activeImage + 1} / {project.gallery.length} ]</span>
                  </span>
                ) : (
                  <span className="text-[#D4F933] font-semibold tracking-wider flex items-center gap-1.5 bg-[#121216] px-3 py-1 rounded-md border border-white/[0.1]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4F933] animate-ping"></span>
                    <span>[ MAIN ARTIFACT PREVIEW ]</span>
                  </span>
                )}

                <button
                  onClick={() => {
                    setActiveImage(null);
                    setHeroZoom(false);
                  }}
                  className="group flex items-center gap-2 text-gray-300 hover:text-black hover:bg-[#D4F933] transition-all duration-200 cursor-pointer px-3 py-1 rounded-md bg-[#121216] border border-white/[0.15] hover:border-[#D4F933] hover:shadow-[0_0_16px_rgba(212,249,51,0.3)]"
                >
                  <span className="tracking-wider text-[11px] font-semibold">[ESC / CLOSE]</span>
                  <span className="text-lg leading-none transition-transform duration-200 group-hover:rotate-90">&times;</span>
                </button>
              </div>

              {/* Displayed Image Container with Bold Cyber Lime Border & Ambient Glow */}
              <div className="relative flex items-center justify-center overflow-hidden rounded-xl border-2 border-[#D4F933]/60 shadow-[0_0_40px_rgba(212,249,51,0.22)] bg-[#0E0E12]">
                <img
                  src={
                    heroZoom
                      ? project.mainImage || project.etalase
                      : project.gallery[activeImage].src
                  }
                  alt={
                    heroZoom
                      ? getLoc(project.title)
                      : getLoc(project.gallery[activeImage].alt)
                  }
                  decoding="async"
                  className="max-h-[66vh] sm:max-h-[70vh] max-w-[86vw] w-auto h-auto object-contain rounded-lg"
                />
              </div>

              {/* Caption bar for gallery items — High Contrast Colored Card */}
              {activeImage !== null && project.gallery && project.gallery[activeImage]?.caption && (
                <div className="w-full mt-3 px-5 py-3 rounded-xl bg-[#121216] border border-[#D4F933]/45 shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_24px_rgba(212,249,51,0.14)] text-center backdrop-blur-md">
                  <div className="flex items-center justify-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#D4F933] flex-shrink-0 animate-pulse"></span>
                    <p className="text-xs sm:text-sm font-mono text-white font-medium tracking-wide">
                      {getLoc(project.gallery[activeImage].caption)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default DetailProject;

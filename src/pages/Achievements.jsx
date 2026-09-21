import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { achievements } from "../data/dataAchivment.js";
import { useTranslation } from "react-i18next";

const Achievements = () => {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useTranslation();
  const [filteredAchievements, setFilteredAchievements] = useState(achievements);
  const [mousePos, setMousePos] = useState({});

  const handleMouseMove = (id, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos((prev) => ({
      ...prev,
      [id]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  useEffect(() => {
    const filter = achievements.filter(
      (achievement) =>
        achievement.title
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase()) ||
        achievement.issuer
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase()),
    );
    setFilteredAchievements(filter);
  }, [searchQuery]);

  // Lock scroll on zoom & handle ESC key
  useEffect(() => {
    if (selectedImage) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          setSelectedImage(null);
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
  }, [selectedImage]);

  return (
    <div
      className="min-h-screen py-8 pt-20 xl:pt-8"
      data-aos="fade-down"
      data-aos-delay="100"
      data-aos-duration="600"
    >
      {/* Header */}
      <div className="mb-10">

        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {t("achievementsTitle")}
        </h1>
        <p
          className={`font-mono text-xs sm:text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {t("achievementsSubtitle")}
        </p>

        <div className="mt-8 hairline-divider"></div>
      </div>

      {/* Controls & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div
          className={`relative max-w-md w-full rounded-lg transition-shadow duration-300 ${
            isDarkMode
              ? "focus-within:shadow-[0_0_24px_rgba(212,249,51,0.18)]"
              : "focus-within:shadow-[0_0_20px_rgba(45,82,4,0.14)]"
          }`}
        >
          <input
            type="text"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full px-4 py-2.5 pl-10 pr-9 rounded-lg border font-mono text-xs outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 transition-colors duration-200 ${
              isDarkMode
                ? "bg-[#121216] border-white/[0.1] text-white placeholder-gray-500 focus:border-[#D4F933] caret-[#D4F933]"
                : "bg-white border-black/[0.1] text-gray-900 placeholder-gray-400 focus:border-[#2D5204] caret-[#2D5204] shadow-xs"
            }`}
          />
          <i
            className={`fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-xs transition-colors duration-200 ${
              searchQuery
                ? isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                : isDarkMode ? "text-gray-500" : "text-gray-400"
            }`}
          ></i>

          {/* Quick Clear Button */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              title="Clear search"
              className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center font-mono text-xs transition-all duration-200 ${
                isDarkMode
                  ? "bg-white/10 hover:bg-[#D4F933] text-gray-300 hover:text-black"
                  : "bg-black/10 hover:bg-[#2D5204] text-gray-600 hover:text-white"
              }`}
            >
              &times;
            </button>
          )}
        </div>

        {/* Counter Badge - Inverted Dark Pill in Light Mode */}
        <div
          className={`font-mono text-xs px-3 py-1.5 rounded self-start sm:self-center font-semibold ${
            isDarkMode
              ? "text-[#D4F933] bg-[#D4F933]/10 border border-[#D4F933]/30"
              : "bg-[#0A0A0C] border border-black text-[#D4F933] shadow-xs"
          }`}
        >
          TOTAL: {filteredAchievements.length}{filteredAchievements.length !== achievements.length ? ` / ${achievements.length}` : ""}
        </div>
      </div>

      {/* Zoom Modal with Smooth Scale Animation */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-backdrop-fade overscroll-contain touch-none select-none"
          onClick={() => setSelectedImage(null)}
          onWheel={(e) => e.stopPropagation()}
        >
          <div
            className="relative max-w-4xl w-full animate-modal-zoom"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="group absolute -top-10 right-0 font-mono text-xs text-white/80 hover:text-[#D4F933] flex items-center gap-1.5 transition-colors"
            >
              <span className="tracking-wider">[ESC / CLOSE]</span>
              <span className="text-xl leading-none transition-transform duration-200 group-hover:rotate-90">&times;</span>
            </button>

            <img
              src={selectedImage}
              alt="Certificate Preview"
              className="w-full max-h-[82vh] object-contain rounded-xl border border-white/[0.15] shadow-2xl bg-black"
            />
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement, idx) => (
          <div
            key={achievement.id}
            onClick={() => setSelectedImage(achievement.image)}
            onMouseMove={(e) => handleMouseMove(achievement.id, e)}
            className={`group relative rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-1.5 ${
              isDarkMode
                ? "bg-[#121216] border-white/[0.08] hover:border-[#D4F933]/50 hover:shadow-[0_12px_32px_-8px_rgba(212,249,51,0.12)]"
                : "bg-white border-black/[0.08] hover:border-[#2D5204]/60 hover:shadow-xl"
            }`}
          >
            {/* Interactive Spotlight Radial Light */}
            <div
              className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
              style={{
                background: isDarkMode
                  ? `radial-gradient(350px circle at ${mousePos[achievement.id]?.x || 0}px ${mousePos[achievement.id]?.y || 0}px, rgba(212, 249, 51, 0.12), transparent 80%)`
                  : `radial-gradient(350px circle at ${mousePos[achievement.id]?.x || 0}px ${mousePos[achievement.id]?.y || 0}px, rgba(45, 82, 4, 0.08), transparent 80%)`,
              }}
            />

            <div className="relative h-48 overflow-hidden bg-[#181920] border-b border-inherit">
              <img
                src={achievement.image}
                alt={achievement.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Holographic Shine Sweep Effect */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-10 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent skew-x-[-20deg]" />

              <div className="absolute top-3 left-3 z-20 font-mono text-[10px] px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs border border-white/[0.1] text-[#D4F933] font-semibold">
                REC #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="font-mono text-xs text-white bg-black/80 px-3 py-1 rounded border border-white/[0.2] flex items-center gap-1.5 shadow-lg">
                  <i className="fas fa-search-plus text-[#D4F933] text-xs"></i>
                  <span>INSPECT</span>
                </span>
              </div>
            </div>

            <div className="relative z-10 p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3
                  className={`text-base font-bold mb-1.5 line-clamp-2 transition-colors duration-200 ${
                    isDarkMode ? "text-white group-hover:text-[#D4F933]" : "text-gray-900 group-hover:text-[#2D5204]"
                  }`}
                >
                  {achievement.title}
                </h3>

                <p
                  className={`text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {achievement.issuer}
                </p>
              </div>

              <div
                className={`mt-4 pt-3 border-t flex items-center justify-between font-mono text-[11px] ${
                  isDarkMode ? "border-white/[0.06]" : "border-black/[0.06]"
                }`}
              >
                <span className="text-gray-500">{t("issuedOn")}</span>
                <span
                  className={`font-semibold ${
                    isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                  }`}
                >
                  {achievement.issuedDate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <div className="text-center py-20 border border-dashed border-white/[0.1] rounded-2xl">
          <i
            className={`fas fa-certificate text-4xl mb-3 ${
              isDarkMode ? "text-gray-600" : "text-gray-400"
            }`}
          ></i>
          <p
            className={`font-mono text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t("noAchievements")}
          </p>
        </div>
      )}
    </div>
  );
};

export default Achievements;

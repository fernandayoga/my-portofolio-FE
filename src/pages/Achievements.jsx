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

  // Lock scroll on zoom
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
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
            // VERIFIED CERTIFICATIONS & HONORS
          </span>
          <div
            className={`flex-1 h-[1px] ${
              isDarkMode ? "bg-white/[0.08]" : "bg-black/[0.08]"
            }`}
          ></div>
        </div>

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
        <div className="relative max-w-md w-full">
          <input
            type="text"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full px-4 py-2.5 pl-10 rounded-lg border font-mono text-xs focus:outline-none transition-all ${
              isDarkMode
                ? "bg-[#121216] border-white/[0.1] text-white placeholder-gray-500 focus:border-[#D4F933]"
                : "bg-white border-black/[0.1] text-gray-900 placeholder-gray-400 focus:border-[#2D5204] shadow-xs"
            }`}
          />
          <i
            className={`fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-xs ${
              isDarkMode ? "text-gray-500" : "text-gray-400"
            }`}
          ></i>
        </div>

        {/* Counter Badge - Inverted Dark Pill in Light Mode */}
        <div
          className={`font-mono text-xs px-3 py-1.5 rounded self-start sm:self-center font-semibold ${
            isDarkMode
              ? "text-[#D4F933] bg-[#D4F933]/10 border border-[#D4F933]/30"
              : "bg-[#0A0A0C] border border-black text-[#D4F933] shadow-xs"
          }`}
        >
          RECORDS: {filteredAchievements.length} // TOTAL: {achievements.length}
        </div>
      </div>

      {/* Zoom Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 font-mono text-xs text-white/80 hover:text-[#D4F933] flex items-center gap-1.5 transition-colors"
            >
              <span>[CLOSE]</span>
              <span className="text-lg leading-none">&times;</span>
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
            className={`group rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col ${
              isDarkMode
                ? "bg-[#121216] border-white/[0.08] hover:border-white/[0.2]"
                : "bg-white border-black/[0.08] hover:border-black/[0.2] shadow-sm"
            }`}
          >
            <div className="relative h-48 overflow-hidden bg-[#181920] border-b border-inherit">
              <img
                src={achievement.image}
                alt={achievement.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute top-3 left-3 font-mono text-[10px] px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs border border-white/[0.1] text-[#D4F933] font-semibold">
                REC #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="font-mono text-xs text-white bg-black/80 px-3 py-1 rounded border border-white/[0.2] flex items-center gap-1.5">
                  <i className="fas fa-search-plus text-[#D4F933] text-xs"></i>
                  <span>INSPECT</span>
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3
                  className={`text-base font-bold mb-1.5 line-clamp-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
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

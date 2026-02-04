import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { achievements } from "../data/dataAchivment.js";
import { useTranslation } from "react-i18next";

const Achievements = () => {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useTranslation();
  const [filteredAchievements, setFilteredAchievements] =
    useState(achievements);

  // Search only
  // const filteredAchievements = achievements.filter(
  //   (achievement) =>
  //     achievement.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
  //     achievement.issuer.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  // );

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

  return (
    <div
      className="min-h-screen py-8 pt-20 lg:pt-8 pl-4"
      data-aos="fade-down"
      data-aos-delay="100"
      data-aos-duration="600"
    >
      {/* Header */}
      <div className="mb-8">
        <h1
          className={`text-3xl md:text-4xl font-bold mb-3 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {t("achievementsTitle")}
        </h1>
        <p
          className={`text-base ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {t("achievementsSubtitle")}
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full px-4 py-3 pl-12 rounded-lg border ${
              isDarkMode
                ? "bg-gray-900 border-gray-800 text-white placeholder-gray-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          <i
            className={`fas fa-search absolute left-4 top-1/2 -translate-y-1/2 ${
              isDarkMode ? "text-gray-500" : "text-gray-400"
            }`}
          ></i>
        </div>
      </div>

      {/* Total */}
      <div className={`mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
        Total: {filteredAchievements.length}
      </div>

      {/* zoom image */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Container gambar */}
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol close */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-red-400"
            >
              ✕
            </button>

            {/* Gambar sertifikat */}
            <img
              src={selectedImage}
              alt="Certificate Preview"
              className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => (
          <div
            key={achievement.id}
            onClick={() => setSelectedImage(achievement.image)}
            className={`rounded-xl overflow-hidden border transition-all duration-300 hover:scale-105 cursor-pointer ${
              isDarkMode
                ? "bg-gray-900 border-gray-800 hover:border-purple-500"
                : "bg-white border-gray-200 hover:border-purple-500"
            }`}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={achievement.image}
                alt={achievement.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>

            <div className="p-5 ">
              <h3
                className={`text-sm  font-semibold mb-2  ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {achievement.title}
              </h3>

              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {achievement.issuer}
              </p>

              <p
                className={`text-sm mt-1 ${
                  isDarkMode ? "text-gray-500" : "text-gray-500"
                }`}
              >
                {t("issuedOn")}: {achievement.issuedDate}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <div className="text-center py-16">
          <i
            className={`fas fa-trophy text-6xl mb-4 ${
              isDarkMode ? "text-gray-700" : "text-gray-300"
            }`}
          ></i>
          <p
            className={`text-lg ${
              isDarkMode ? "text-gray-500" : "text-gray-400"
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

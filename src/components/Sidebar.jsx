import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === "id" ? "ID" : "EN";

  // const menuItems = [
  //   { path: "/", icon: "fa-home", label: "Home" },
  //   { path: "/about", icon: "fa-user", label: "About" },
  //   { path: "/achievements", icon: "fa-trophy", label: "Achievements" },
  //   { path: "/projects", icon: "fa-briefcase", label: "Projects" },
  //   { path: "/dashboard", icon: "fa-chart-line", label: "Dashboard" },
  //   { path: "/chat-room", icon: "fa-comments", label: "Chat Room" },
  //   { path: "/contact", icon: "fa-envelope", label: "Contact" },
  // ];

  const menuItems = [
    { path: "/", icon: "fa-home", label: t("home") },
    { path: "/about", icon: "fa-user", label: t("about") },
    { path: "/achievements", icon: "fa-trophy", label: t("achievements") },
    { path: "/projects", icon: "fa-briefcase", label: t("projects") },
    { path: "/dashboard", icon: "fa-chart-line", label: t("dashboard") },
    { path: "/chat-room", icon: "fa-comments", label: t("chatRoom") },
    { path: "/contact", icon: "fa-envelope", label: t("contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "id" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      {/* Burger Menu Button - Only visible on mobile, hidden when scrolled */}
      <button
        onClick={toggleSidebar}
        className={`lg:hidden fixed top-4 left-4 z-50 w-12 h-12 ${
          isOpen && "hidden"
        } ${
          isDarkMode
            ? "bg-gray-900 border-purple-500"
            : "bg-white border-purple-500"
        } border rounded-lg flex items-center justify-center transition-all duration-300 ${
          isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <i
          className={`fas ${isOpen ? "fa-times" : "fa-bars"} ${
            isDarkMode ? "text-purple-400" : "text-purple-600"
          } text-xl`}
        ></i>
      </button>

      {/* Overlay - Only visible on mobile when sidebar is open */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed  top-0 h-screen w-72 text-md  ${
          isDarkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"
        } border-r flex flex-col z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* toggle Section */}

        <div className="flex gap-8 mt-10 text-center justify-center">
          <button
            onClick={toggleTheme}
            className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-gray-300"
            }`}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {/* Toggle Circle */}
            <div
              className={`absolute top-0.5 w-7 h-7 rounded-full transition-all duration-300 flex items-center justify-center ${
                isDarkMode
                  ? "left-0.5 bg-black"
                  : "left-[calc(100%-1.875rem)] bg-white"
              }`}
            >
              {/* Icon inside circle */}
              {isDarkMode ? (
                // Moon Icon
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                // Sun Icon
                <svg
                  className="w-4 h-4 text-gray-800"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line
                    x1="12"
                    y1="1"
                    x2="12"
                    y2="3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="12"
                    y1="21"
                    x2="12"
                    y2="23"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="4.22"
                    y1="4.22"
                    x2="5.64"
                    y2="5.64"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="18.36"
                    y1="18.36"
                    x2="19.78"
                    y2="19.78"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="1"
                    y1="12"
                    x2="3"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="21"
                    y1="12"
                    x2="23"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="4.22"
                    y1="19.78"
                    x2="5.64"
                    y2="18.36"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="18.36"
                    y1="5.64"
                    x2="19.78"
                    y2="4.22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
          </button>

          <button
            onClick={toggleLanguage}
            className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-gray-300"
            }`}
            title={
              currentLang === "EN"
                ? "Switch to Indonesian"
                : "Switch to English"
            }
          >
            {/* Toggle Circle */}
            <div
              className={`absolute top-0.5 w-7 h-7 rounded-full transition-all duration-300 flex items-center justify-center font-bold text-xs ${
                currentLang === "EN"
                  ? "left-0.5 bg-purple-600 text-white"
                  : "left-[calc(100%-1.875rem)] bg-purple-600 text-white"
              }`}
            >
              {currentLang}
            </div>

            {/* Background Text Labels */}
            <div className="absolute inset-0 flex items-center justify-between px-2 text-xs font-semibold">
              <span
                className={`transition-opacity duration-300 ${
                  currentLang === "EN"
                    ? "opacity-0"
                    : isDarkMode
                    ? "opacity-50 text-gray-400"
                    : "opacity-50 text-gray-600"
                }`}
              >
                EN
              </span>
              <span
                className={`transition-opacity duration-300 ${
                  currentLang === "ID"
                    ? "opacity-0"
                    : isDarkMode
                    ? "opacity-50 text-gray-400"
                    : "opacity-50 text-gray-600"
                }`}
              >
                ID
              </span>
            </div>
          </button>
        </div>

        <div
          className={`mb-  border-b pb-8 ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          }`}
        ></div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                location.pathname === item.path
                  ? isDarkMode
                    ? "bg-gray-900 text-white"
                    : "bg-purple-50 text-purple-600"
                  : isDarkMode
                  ? "text-gray-400 hover:bg-gray-900 hover:text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <i className={`fas ${item.icon} w-5`}></i>
              <span>{item.label}</span>
              <i className="fas fa-chevron-right ml-auto text-xs"></i>
            </Link>
          ))}

          <div
          className={`p-4 mb-10  ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          } `}
        >
          <Link
            to="/smart-talk"
            onClick={closeSidebar}
            className="w-full bg-gradient-to-r from-purple-400 to-violet-500 hover:from-purple-600 hover:to-violet-700 text-white px-2 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
          >
            <i className="fas fa-robot"></i>
            {t("AskBot")}
          </Link>
        </div>
        </nav>

        {/* Smart Talk Button */}
        
      </div>
    </>
  );
};

export default Sidebar;

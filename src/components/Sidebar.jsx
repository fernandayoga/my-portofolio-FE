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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "unset"; // Enable scroll
    }

    return () => {
      document.body.style.overflow = "unset"; // Cleanup
    };
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const [langRotate, setLangRotate] = useState(0);

  const toggleLanguage = () => {
    setLangRotate((prev) => prev + 360);
    const newLang = i18n.language === "en" ? "id" : "en";
    i18n.changeLanguage(newLang);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Array page yang tidak perlu button
  const hideBackToTopPages = ['/chat-room', '/contact', '/ask-bot'];

  // Cek apakah current page ada di list
  const shouldShowBackToTop = !hideBackToTopPages.includes(location.pathname);

  return (
    <>
      {/* Burger Menu Button - Only visible on mobile */}
      <div
        className={`xl:hidden fixed top-0 left-0 w-full z-40 border-b transition-[background-color,border-color,box-shadow] duration-200 ${
          isOpen ? "hidden" : "block"
        } ${
          isScrolled
            ? isDarkMode
              ? "bg-[#0A0A0C]/90 backdrop-blur-md border-white/[0.08] shadow-sm"
              : "bg-white/90 backdrop-blur-md border-black/[0.08] shadow-sm"
            : "bg-transparent border-transparent pointer-events-none"
        } p-4`}
      >
        <button
          onClick={toggleSidebar}
          aria-label="Toggle Menu"
          className={`w-11 h-11 ${
            isDarkMode
              ? "bg-[#121216] border-white/[0.12] text-gray-200 hover:border-[#D4F933]/60 hover:text-[#D4F933]"
              : "bg-white border-black/[0.12] text-gray-800 hover:border-[#D4F933]"
          } border rounded-lg flex items-center justify-center transition-all shadow-sm pointer-events-auto`}
        >
          <i className="fas fa-bars text-lg"></i>
        </button>
      </div>

      {/* Back to Top Button */}
      {shouldShowBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          className={`xl:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-lg border flex items-center justify-center transition-all duration-300 shadow-xl ${
            isDarkMode
              ? "bg-[#181920] border-white/[0.15] text-[#D4F933] hover:bg-[#D4F933] hover:text-black"
              : "bg-white border-black/[0.15] text-black hover:bg-[#D4F933] hover:text-black"
          } ${
            isScrolled && !isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-6 pointer-events-none"
          }`}
          title="Back to Top"
        >
          <i className="fas fa-arrow-up text-sm"></i>
        </button>
      )}

      {/* Overlay - Only visible on mobile when sidebar is open */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="xl:hidden fixed inset-0 bg-black/75 backdrop-blur-xs z-40 transition-opacity"
        ></div>
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 h-screen w-72 ${
          isDarkMode
            ? "bg-[#0A0A0C] border-white/[0.08] text-gray-300"
            : "bg-white border-black/[0.08] text-gray-800"
        } border-r flex flex-col z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
        }`}
      >
        {/* Controls Section (Theme & Language) */}
        <div className="px-6 pt-8 pb-6 flex items-center justify-between gap-3 border-b border-inherit">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 px-3 rounded-md border text-xs font-mono transition-all duration-200 active:scale-95 active:-translate-y-0.5 cursor-pointer ${
              isDarkMode
                ? "bg-[#121216] border-white/[0.1] text-gray-300 hover:border-[#D4F933]/40 hover:text-white"
                : "bg-white border-black/[0.1] text-gray-800 hover:border-black hover:text-black shadow-2xs"
            }`}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <>
                <svg className="w-3.5 h-3.5 text-[#D4F933] transition-transform duration-300 hover:rotate-12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <span>DARK</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-amber-500 transition-transform duration-300 hover:rotate-45" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="font-semibold text-gray-900">LIGHT</span>
              </>
            )}
          </button>

          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className={`group flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md border text-xs font-mono transition-all duration-200 active:scale-95 active:-translate-y-0.5 cursor-pointer overflow-hidden ${
              isDarkMode
                ? "bg-[#121216] border-white/[0.1] text-gray-300 hover:border-[#D4F933]/40 hover:text-white"
                : "bg-white border-black/[0.1] text-gray-800 hover:border-black hover:text-black shadow-2xs"
            }`}
            title={currentLang === "EN" ? "Switch to Indonesian" : "Switch to English"}
          >
            <i
              style={{ transform: `rotate(${langRotate}deg)` }}
              className={`fas fa-globe text-[11px] transition-transform duration-700 ease-out group-hover:scale-110 ${
                isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
              }`}
            ></i>
            <span
              className={`inline-block transition-all duration-300 transform ${
                currentLang === "EN"
                  ? isDarkMode
                    ? "text-[#D4F933] font-bold scale-110 -translate-y-0.25"
                    : "text-[#2D5204] font-bold scale-110 -translate-y-0.25"
                  : "text-gray-500 font-normal scale-90 opacity-50"
              }`}
            >
              EN
            </span>
            <span className="text-gray-500 text-[10px] opacity-40 select-none">/</span>
            <span
              className={`inline-block transition-all duration-300 transform ${
                currentLang === "ID"
                  ? isDarkMode
                    ? "text-[#D4F933] font-bold scale-110 -translate-y-0.25"
                    : "text-[#2D5204] font-bold scale-110 -translate-y-0.25"
                  : "text-gray-500 font-normal scale-90 opacity-50"
              }`}
            >
              ID
            </span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`relative group flex items-center gap-3.5 px-4 py-3.5 rounded-xl mb-2.5 text-base font-medium transition-all duration-300 overflow-hidden active:scale-[0.98] ${
                  isActive
                    ? isDarkMode
                      ? "bg-[#181920] text-white shadow-sm translate-x-1.5 border border-white/[0.08]"
                      : "bg-[#0A0A0C] text-white shadow-md translate-x-1.5 border border-black/[0.08]"
                    : isDarkMode
                    ? "text-gray-400 hover:text-white hover:bg-white/[0.04] hover:translate-x-1 border border-transparent"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:translate-x-1 border border-transparent"
                }`}
              >
                {/* Left Indicator Accent Bar */}
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-300 ease-out ${
                    isActive
                      ? "h-6 bg-[#D4F933] opacity-100 scale-y-100"
                      : "h-0 bg-transparent opacity-0 scale-y-0 group-hover:h-3 group-hover:bg-[#D4F933]/50 group-hover:opacity-100 group-hover:scale-y-100"
                  }`}
                />

                <i
                  className={`fas ${item.icon} w-5 text-center text-base transition-all duration-300 ${
                    isActive
                      ? "text-[#D4F933] scale-110 -rotate-2"
                      : isDarkMode
                      ? "text-gray-400 group-hover:text-gray-200 group-hover:scale-105"
                      : "text-gray-500 group-hover:text-gray-800 group-hover:scale-105"
                  }`}
                ></i>
                <span className="flex-1 transition-colors duration-300">{item.label}</span>
                <i
                  className={`fas fa-chevron-right ml-auto text-xs transition-all duration-300 ${
                    isActive
                      ? "text-[#D4F933] translate-x-1 opacity-100 scale-110"
                      : isDarkMode
                      ? "text-gray-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                      : "text-gray-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}
                ></i>
              </Link>
            );
          })}

          {/* AskBot Section */}
          <div className="pt-3 mt-1 border-t border-inherit flex justify-center">
            <Link
              to="/ask-bot"
              onClick={closeSidebar}
              className={`group relative w-[85%] px-3.5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-between border overflow-hidden active:scale-[0.98] ${
                location.pathname === "/ask-bot"
                  ? isDarkMode
                    ? "bg-[#181920] border-[#D4F933]/40 text-[#D4F933] shadow-md translate-x-1"
                    : "bg-[#0A0A0C] border-black text-[#D4F933] shadow-md translate-x-1"
                  : isDarkMode
                  ? "bg-[#121216] border-white/[0.08] text-gray-300 hover:border-[#D4F933]/50 hover:text-[#D4F933] hover:translate-x-0.5"
                  : "bg-white border-black/[0.08] text-gray-800 hover:border-black hover:text-black shadow-2xs hover:translate-x-0.5"
              }`}
            >
              {/* Left Indicator Accent Bar for AskBot */}
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-300 ease-out ${
                  location.pathname === "/ask-bot"
                    ? "h-5 bg-[#D4F933] opacity-100 scale-y-100"
                    : "h-0 bg-transparent opacity-0 scale-y-0 group-hover:h-2.5 group-hover:bg-[#D4F933]/50 group-hover:opacity-100 group-hover:scale-y-100"
                }`}
              />

              <div className="flex items-center gap-2.5">
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center transition-all duration-300 ${
                    location.pathname === "/ask-bot"
                      ? "scale-110 -rotate-3"
                      : "group-hover:scale-105"
                  } ${
                    isDarkMode
                      ? "bg-[#D4F933]/10 border border-[#D4F933]/20 text-[#D4F933]"
                      : location.pathname === "/ask-bot"
                      ? "bg-[#D4F933]/20 text-[#D4F933]"
                      : "bg-black/[0.05] border border-black/[0.1] text-gray-800"
                  }`}
                >
                  <i className="fas fa-terminal text-[11px]"></i>
                </div>
                <span className="font-semibold text-sm transition-colors duration-300">{t("AskBot")}</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold transition-all duration-300 ${
                  isDarkMode || location.pathname === "/ask-bot"
                    ? "bg-[#D4F933]/15 text-[#D4F933] border border-[#D4F933]/30 scale-105"
                    : "bg-gray-100 text-gray-700 border border-gray-200"
                }`}
              >
                AI
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

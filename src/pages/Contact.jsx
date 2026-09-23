import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const Contact = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const { t } = useTranslation();

  // Custom Cyberpunk Alert Modal (Option 5)
  const showCyberAlert = ({ title, text, icon = "info" }) => {
    const isDark = isDarkMode;
    const iconColors = {
      error: "bg-red-500/10 border-red-500/30 text-red-400",
      warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
      info: "bg-[#D4F933]/10 border-[#D4F933]/30 text-[#D4F933]",
      success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    };
    const iconIcons = {
      error: "fas fa-exclamation-triangle",
      warning: "fas fa-shield-alt",
      info: "fas fa-info-circle",
      success: "fas fa-check-circle",
    };

    return Swal.fire({
      html: `
        <div class="flex flex-col items-center text-center">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center border ${
            iconColors[icon] || iconColors.info
          } mb-4">
            <i class="${iconIcons[icon] || iconIcons.info} text-2xl"></i>
          </div>
          ${
            title
              ? `<h3 class="font-mono text-base sm:text-lg font-bold tracking-tight ${
                  isDark ? "text-white" : "text-gray-900"
                } mb-1.5">${title}</h3>`
              : ""
          }
          ${
            text
              ? `<p class="font-mono text-xs ${
                  isDark ? "text-gray-400" : "text-gray-600"
                } leading-relaxed max-w-xs">${text}</p>`
              : ""
          }
        </div>
      `,
      buttonsStyling: false,
      background: isDark ? "#121216" : "#ffffff",
      color: isDark ? "#ffffff" : "#0f172a",
      backdrop: isDark ? "rgba(0, 0, 0, 0.75)" : "rgba(15, 23, 42, 0.4)",
      confirmButtonText: "OK",
      customClass: {
        popup: `rounded-2xl border ${
          isDark
            ? "border-white/[0.12] bg-[#121216] shadow-[0_20px_60px_rgba(0,0,0,0.85)]"
            : "border-gray-200 bg-white shadow-2xl"
        } p-6 sm:p-7 backdrop-blur-xl`,
        actions: "!flex !justify-center !mt-6 !w-full",
        confirmButton: `px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 ${
          isDark
            ? "bg-[#D4F933] hover:bg-[#bce615] text-black shadow-[0_0_16px_rgba(212,249,51,0.3)]"
            : "bg-[#0A0A0C] hover:bg-black text-[#D4F933] shadow-md"
        }`,
      },
      showClass: { popup: "animate-modal-zoom" },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTransmitting(true);

    // Launch plane animation first before loading spinner (Option 1)
    await new Promise((resolve) => setTimeout(resolve, 320));
    setIsLoading(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showCyberAlert({
          title: t("alertTitle"),
          text: t("alertSuccessMessage"),
          icon: "success",
        });

        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        showCyberAlert({
          title: t("alertErrorTitle"),
          text: t("alertErrorMesssage"),
          icon: "error",
        });
      }
    } catch (error) {
      showCyberAlert({
        title: t("alertErrorTitle"),
        text: t("alertErrorMesssage"),
        icon: "error",
      });
    } finally {
      setIsLoading(false);
      setIsTransmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    {
      icon: "fab fa-instagram",
      link: "https://www.instagram.com/fernanddyoga_/",
      label: "Instagram",
      title: "Instagram",
      description: t("deskIg"),
      buttonText: t("buttonIg"),
      officialLogo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 rounded-xl shadow-sm">
          <defs>
            <radialGradient id="ig-grad-contact" cx="0.2" cy="1" r="1.3">
              <stop offset="0%" stopColor="#FFDD55" />
              <stop offset="25%" stopColor="#FF543E" />
              <stop offset="50%" stopColor="#C837AB" />
              <stop offset="100%" stopColor="#3771C8" />
            </radialGradient>
          </defs>
          <rect width="24" height="24" rx="6" fill="url(#ig-grad-contact)" />
          <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.3" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
          <circle cx="16" cy="8" r="0.9" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      icon: "fab fa-linkedin-in",
      link: "https://www.linkedin.com/in/fernanda-yoga-kurniawan-186b20295/",
      label: "LinkedIn",
      title: "LinkedIn",
      description: t("deskLinkedin"),
      buttonText: t("buttonLinkedin"),
      officialLogo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 rounded-lg shadow-sm">
          <rect width="24" height="24" rx="4" fill="#0A66C2" />
          <path
            fill="#FFFFFF"
            d="M7.1 8.5H4.2V19h2.9V8.5zM5.65 4.8c-.95 0-1.65.75-1.65 1.65s.7 1.65 1.65 1.65 1.65-.75 1.65-1.65-.7-1.65-1.65-1.65zM19.8 13.3c0-3-1.6-4.4-3.75-4.4-1.75 0-2.5.95-2.95 1.65V8.5h-2.9c.04.8 0 10.5 0 10.5h2.9v-5.85c0-.3.02-.65.12-.9.25-.65.85-1.3 1.85-1.3 1.3 0 1.83 1 1.83 2.45V19h2.9v-5.7z"
          />
        </svg>
      ),
    },
    {
      icon: "fab fa-tiktok",
      link: "https://www.tiktok.com/@cancerrboyyy__",
      label: "TikTok",
      title: "TikTok",
      description: t("deskTt"),
      buttonText: t("buttonTt"),
      officialLogo: (
        <svg viewBox="-3 -3 30 30" className="w-8 h-8 rounded-lg shadow-sm overflow-hidden">
          <rect x="-3" y="-3" width="30" height="30" rx="6" fill="#000000" />
          {/* Cyan chromatic layer (offset to the top-left) */}
          <path
            fill="#25F4EE"
            transform="translate(-0.9, -0.6)"
            d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z"
          />
          {/* Magenta/Red chromatic layer (offset to the bottom-right) */}
          <path
            fill="#FE2C55"
            transform="translate(0.9, 0.6)"
            d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z"
          />
          {/* Crisp White center note */}
          <path
            fill="#FFFFFF"
            d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z"
          />
        </svg>
      ),
    },
    {
      icon: "fab fa-github",
      link: "https://github.com/fernandayoga",
      label: "GitHub",
      title: "GitHub",
      description: t("deskGithub"),
      buttonText: t("buttonGithub"),
      officialLogo: (
        <svg
          viewBox="0 0 24 24"
          className={`w-8 h-8 rounded-full overflow-hidden p-0.5 shadow-sm ${
            isDarkMode ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen pb-12 pt-20 xl:pt-8"
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
          {t("contactTitle")}
        </h1>
        <p className={`font-mono text-xs sm:text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          {t("contactSubtitle")}
        </p>

        <div className="mt-8 hairline-divider"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact Form */}
        <div
          className={`lg:col-span-7 rounded-2xl p-6 sm:p-8 border ${
            isDarkMode
              ? "bg-[#121216] border-white/[0.08]"
              : "bg-white border-black/[0.08] shadow-md"
          }`}
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-inherit">
            <h2
              className={`text-lg sm:text-xl font-bold flex items-center gap-2.5 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <i
                className={`fas fa-paper-plane text-xs ${
                  isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                }`}
              ></i>
              <span>{t("sendMessage")}</span>
            </h2>
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
              DIRECT DISPATCH
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className={`block font-mono text-[11px] uppercase tracking-wider mb-2 font-medium ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {t("yourName")}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg font-mono text-xs focus:outline-none transition-all ${
                  isDarkMode
                    ? "bg-[#181920] text-white border border-white/[0.1] focus:border-[#D4F933]"
                    : "bg-gray-50 text-gray-900 border border-gray-300 focus:border-[#2D5204] shadow-xs focus:shadow-sm"
                }`}
                placeholder="e.g. Alex Smith"
              />
            </div>

            <div>
              <label
                className={`block font-mono text-[11px] uppercase tracking-wider mb-2 font-medium ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {t("emailAddress")}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg font-mono text-xs focus:outline-none transition-all ${
                  isDarkMode
                    ? "bg-[#181920] text-white border border-white/[0.1] focus:border-[#D4F933]"
                    : "bg-gray-50 text-gray-900 border border-gray-300 focus:border-[#2D5204] shadow-xs focus:shadow-sm"
                }`}
                placeholder="e.g. alex@domain.com"
              />
            </div>

            <div>
              <label
                className={`block font-mono text-[11px] uppercase tracking-wider mb-2 font-medium ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {t("message")}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className={`w-full px-4 py-3 rounded-lg font-mono text-xs focus:outline-none transition-all resize-none ${
                  isDarkMode
                    ? "bg-[#181920] text-white border border-white/[0.1] focus:border-[#D4F933]"
                    : "bg-gray-50 text-gray-900 border border-gray-300 focus:border-[#2D5204] shadow-xs focus:shadow-sm"
                }`}
                placeholder="Write your transmission..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isLoading || isTransmitting}
              className={`w-full py-3.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2.5 border relative overflow-hidden group cursor-pointer active:scale-[0.98] ${
                isLoading || isTransmitting
                  ? isDarkMode
                    ? "bg-[#D4F933]/40 border-transparent text-black cursor-not-allowed"
                    : "bg-black/50 border-transparent text-[#D4F933]/70 cursor-not-allowed"
                  : isDarkMode
                  ? "bg-[#D4F933] hover:bg-[#cbf028] text-black border-[#D4F933] hover:border-[#cbf028] hover:-translate-y-0.5"
                  : "bg-[#0A0A0C] hover:bg-black text-[#D4F933] border-black hover:-translate-y-0.5 shadow-md hover:shadow-xl"
              }`}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin text-xs"></i>
                  <span>{t("sending")}</span>
                </>
              ) : (
                <>
                  <i
                    className={`fas fa-paper-plane text-xs transition-all duration-300 ease-out ${
                      isTransmitting
                        ? "translate-x-8 -translate-y-8 rotate-45 opacity-0 scale-75"
                        : "group-hover:translate-x-1.5 group-hover:-translate-y-0.5 group-hover:rotate-12 transition-transform duration-200"
                    }`}
                  ></i>
                  <span className="transition-all duration-200 group-hover:tracking-widest">
                    {isTransmitting ? t("sending") : t("sendMessage")}
                  </span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Social Channels */}
        <div className="lg:col-span-5 space-y-4">
          <div className="mb-2">
            <h2
              className={`text-lg sm:text-xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {t("connectWithMe")}
            </h2>
          </div>

          <div className="space-y-3">
            {socialLinks.map((social, index) => (
              <div
                key={index}
                className="animate-slide-in-left"
                style={{ animationDelay: `${index * 130 + 100}ms` }}
              >
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-5 rounded-xl border transition-all duration-300 block group hover:-translate-y-1 ${
                    isDarkMode
                      ? "bg-[#121216] border-white/[0.08] hover:border-[#D4F933]/50 hover:bg-[#181920] hover:shadow-[0_0_20px_rgba(212,249,51,0.08)]"
                      : "bg-white border-black/[0.08] hover:border-[#2D5204] hover:bg-gray-50 shadow-md hover:shadow-xl"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <h3
                        className={`text-base font-bold transition-colors ${
                          isDarkMode
                            ? "text-white group-hover:text-[#D4F933]"
                            : "text-gray-900 group-hover:text-[#2D5204]"
                        }`}
                      >
                        {social.title}
                      </h3>
                      <p
                        className={`text-xs mt-1 line-clamp-2 leading-relaxed ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {social.description}
                      </p>

                      <div
                        className={`mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider group-hover:translate-x-1.5 transition-transform duration-200 ${
                          isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                        }`}
                      >
                        <span>{social.buttonText}</span>
                        <i className="fas fa-arrow-right text-[9px] transition-transform duration-200 group-hover:translate-x-0.5"></i>
                      </div>
                    </div>

                    <div className="relative w-10 h-10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      {/* Monochrome Icon (Default Unhovered State) */}
                      <i
                        className={`${social.icon} text-2xl transition-all duration-300 absolute ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        } group-hover:opacity-0 group-hover:scale-50`}
                      ></i>

                      {/* Authentic Official Brand Logo (Hover State) */}
                      <div className="absolute transition-all duration-300 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 flex items-center justify-center pointer-events-none">
                        {social.officialLogo}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>


        </div>
      </div>
    </div>
  );
};

export default Contact;

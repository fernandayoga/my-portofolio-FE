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
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        Swal.fire({
          title: t("alertTitle"),
          text: t("alertSuccessMessage"),
          icon: "success",
          draggable: true,
        });

        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      Swal.fire({
        title: t("alertErrorTitle"),
        text: t("alertErrorMesssage"),
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
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
    },
    {
      icon: "fab fa-linkedin-in",
      link: "https://www.linkedin.com/in/fernanda-yoga-kurniawan-186b20295/",
      label: "LinkedIn",
      title: "LinkedIn",
      description: t("deskLinkedin"),
      buttonText: t("buttonLinkedin"),
    },
    {
      icon: "fab fa-tiktok",
      link: "https://www.tiktok.com/@cancerrboyyy__",
      label: "TikTok",
      title: "TikTok",
      description: t("deskTt"),
      buttonText: t("buttonTt"),
    },
    {
      icon: "fab fa-github",
      link: "https://github.com/fernandayoga",
      label: "GitHub",
      title: "GitHub",
      description: t("deskGithub"),
      buttonText: t("buttonGithub"),
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
              : "bg-white border-black/[0.08] shadow-sm"
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
                    : "bg-gray-50 text-gray-900 border border-gray-300 focus:border-[#2D5204]"
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
                    : "bg-gray-50 text-gray-900 border border-gray-300 focus:border-[#2D5204]"
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
                    : "bg-gray-50 text-gray-900 border border-gray-300 focus:border-[#2D5204]"
                }`}
                placeholder="Write your transmission..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border ${
                isLoading
                  ? isDarkMode
                    ? "bg-[#D4F933]/50 border-transparent text-black cursor-not-allowed"
                    : "bg-black/50 border-transparent text-[#D4F933]/70 cursor-not-allowed"
                  : isDarkMode
                  ? "bg-[#D4F933] hover:bg-[#bce615] text-black border-[#D4F933] shadow-md"
                  : "bg-[#0A0A0C] hover:bg-black text-[#D4F933] border-black shadow-md hover:shadow-lg"
              }`}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin text-xs"></i>
                  <span>{t("sending")}</span>
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane text-xs"></i>
                  <span>{t("sendMessage")}</span>
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
                  className={`p-5 rounded-xl border transition-all duration-200 block group ${
                    isDarkMode
                      ? "bg-[#121216] border-white/[0.08] hover:border-[#D4F933]/50 hover:bg-[#181920]"
                      : "bg-white border-black/[0.08] hover:border-[#2D5204] hover:bg-gray-50 shadow-sm"
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
                        className={`mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider group-hover:translate-x-0.5 transition-transform ${
                          isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                        }`}
                      >
                        <span>{social.buttonText}</span>
                        <i className="fas fa-arrow-right text-[9px]"></i>
                      </div>
                    </div>

                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                        isDarkMode
                          ? "bg-white/[0.03] border border-white/[0.08] text-gray-300 group-hover:text-[#D4F933] group-hover:border-[#D4F933]/40"
                          : "bg-black/[0.03] border border-black/[0.08] text-gray-700 group-hover:text-[#2D5204] group-hover:border-[#2D5204]/40"
                      }`}
                    >
                      <i className={`${social.icon} text-xl`}></i>
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

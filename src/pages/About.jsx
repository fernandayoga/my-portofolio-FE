import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import untag from "../assets/about/untag.png";
import coreInitiative from "../assets/about/experience/coreInitiatif.jpeg";
import wmk from "../assets/about/experience/wmk.jpg"; 
import infranexia from "../assets/about/experience/infranexia.png";
import wootix from "../assets/about/experience/wootix.png";

const About = () => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const experienceData = [
    {
      company: "Wootix",
      image: wootix,
      role: t("aboutExpWootix"),
      period: t("aboutWootixPeriod"),
      indexCode: "01",
      description: [
        t("aboutWootixDesc1"),
        t("aboutWootixDesc2"),
        t("aboutWootixDesc3"),
        t("aboutWootixDesc4"),
        t("aboutWootixDesc5"),
      ],
    },
    {
      company: "PT Telkom Infrastruktur Indonesia (Infranexia)",
      image: infranexia,
      role: t("aboutExpInfranexia"),
      period: t("aboutInfranexiaPeriod"),
      indexCode: "02",
      description: [
        t("aboutInfranexiaDesc1"),
        t("aboutInfranexiaDesc2"),
        t("aboutInfranexiaDesc3"),
        t("aboutInfranexiaDesc4"),
        t("aboutInfranexiaDesc5"),
        t("aboutInfranexiaDesc6"),
      ],
    },
    {
      company: "Core Initiative x Rakamin Academy",
      image: coreInitiative,
      role: t("aboutExpRole1"),
      period: t("aboutExpPeriod1"),
      indexCode: "03",
      description: [
        t("aboutExpDesc1_1"),
        t("aboutExpDesc1_2"),
        t("aboutExpDesc1_3"),
        t("aboutExpDesc1_4"),
        t("aboutExpDesc1_5"),
        t("aboutExpDesc1_6"),
      ],
    },
    {
      company: "Wirausaha Merdeka (WMK)",
      image: wmk,
      role: t("aboutExpWmk"),
      period: t("aboutWmkPeriod"),
      indexCode: "04",
      description: [
        t("aboutWmkDesc1"),
        t("aboutWmkDesc2"),
        t("aboutWmkDesc3"),
        t("aboutWmkDesc4"),
        t("aboutWmkDesc5"),
        t("aboutWmkDesc6"),
      ],
    },
  ];

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
          {t("aboutTitle")}
        </h1>
        <p
          className={`font-mono text-xs sm:text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {t("aboutSubtitle")}
        </p>

       
      </div>

      <div className="flex flex-col gap-12 max-w-5xl">
        {/* Section 01: Biography / Who I Am */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
              isDarkMode 
                ? "bg-[#D4F933] shadow-[0_0_8px_rgba(212,249,51,0.6)]" 
                : "bg-[#2D5204] shadow-[0_0_8px_rgba(45,82,4,0.4)]"
            }`}></div>
            <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              {t("aboutBiography")}
            </h2>
            <div className={`flex-1 h-[1px] ${isDarkMode ? "bg-white/[0.08]" : "bg-black/[0.08]"}`}></div>
          </div>

          <div
            onMouseMove={handleMouseMove}
            className={`relative p-6 sm:p-8 rounded-xl border border-l-4 transition-all duration-300 group overflow-hidden hover:-translate-y-1 ${
              isDarkMode
                ? "bg-[#121216] border-white/[0.08] border-l-[#D4F933] hover:border-[#D4F933]/50 hover:border-l-[#D4F933] hover:shadow-[0_12px_32px_-8px_rgba(212,249,51,0.12)]"
                : "bg-white border-black/[0.08] border-l-[#2D5204] hover:border-[#2D5204]/60 hover:border-l-[#2D5204] hover:shadow-lg"
            }`}
          >
            {/* Interactive Spotlight Radial Light */}
            <div
              className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: isDarkMode
                  ? "radial-gradient(450px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 249, 51, 0.12), transparent 80%)"
                  : "radial-gradient(450px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(45, 82, 4, 0.08), transparent 80%)",
              }}
            />

            <div className="relative z-10">
              <p
                className={`leading-relaxed mb-4 text-justify hyphens-auto text-sm sm:text-base ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t("aboutPara1")}
              </p>
              <p
                className={`leading-relaxed mb-4 text-justify hyphens-auto text-sm sm:text-base ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t("aboutPara2")}
              </p>
              <p
                className={`leading-relaxed text-justify hyphens-auto text-sm sm:text-base ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t("aboutPara3")}
              </p>
            </div>
          </div>
        </div>

        {/* Section 02: Education */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
              isDarkMode 
                ? "bg-[#D4F933] shadow-[0_0_8px_rgba(212,249,51,0.6)]" 
                : "bg-[#2D5204] shadow-[0_0_8px_rgba(45,82,4,0.4)]"
            }`}></div>
            <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              {t("aboutEducation")}
            </h2>
            <div className={`flex-1 h-[1px] ${isDarkMode ? "bg-white/[0.08]" : "bg-black/[0.08]"}`}></div>
          </div>

          <div
            onMouseMove={handleMouseMove}
            className={`relative p-6 rounded-xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group overflow-hidden ${
              isDarkMode
                ? "bg-[#121216] border-white/[0.08] hover:border-[#D4F933]/50 hover:shadow-[0_12px_32px_-8px_rgba(212,249,51,0.14)]"
                : "bg-white border-black/[0.08] hover:border-[#2D5204]/60 hover:shadow-lg"
            } hover:-translate-y-1`}
          >
            {/* Interactive Spotlight Radial Light */}
            <div
              className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: isDarkMode
                  ? "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 249, 51, 0.12), transparent 80%)"
                  : "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(45, 82, 4, 0.08), transparent 80%)",
              }}
            />

            <div className="relative z-10 flex items-center gap-4">
              <div className={`w-14 h-14 p-2 rounded-lg border flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                isDarkMode ? "bg-white/[0.04] border-white/[0.08]" : "bg-black/[0.04] border-black/[0.08]"
              }`}>
                <img
                  src={untag}
                  alt="University Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <h3
                  className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-200 ${
                    isDarkMode ? "text-white group-hover:text-[#D4F933]" : "text-gray-900 group-hover:text-[#2D5204]"
                  }`}
                >
                  {t("aboutEduMajor")}
                </h3>
                <p className="text-sm text-gray-400 mt-0.5">
                  {t("aboutEduUniversity")}
                </p>
              </div>
            </div>

            <div className={`relative z-10 font-mono text-xs px-3 py-1.5 rounded self-start sm:self-center font-semibold tracking-wider ${
              isDarkMode 
                ? "bg-[#D4F933]/10 border border-[#D4F933]/30 text-[#D4F933]" 
                : "bg-[#0A0A0C] border border-black text-[#D4F933] shadow-xs"
            }`}>
              UNDERGRADUATE
            </div>
          </div>
        </div>

        {/* Section 03: Experience */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
              isDarkMode 
                ? "bg-[#D4F933] shadow-[0_0_8px_rgba(212,249,51,0.6)]" 
                : "bg-[#2D5204] shadow-[0_0_8px_rgba(45,82,4,0.4)]"
            }`}></div>
            <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              {t("aboutExperience")}
            </h2>
            <div className={`flex-1 h-[1px] ${isDarkMode ? "bg-white/[0.08]" : "bg-black/[0.08]"}`}></div>
          </div>

          <div className="flex flex-col gap-4">
            {experienceData.map((exp, index) => (
              <div
                key={index}
                onMouseMove={handleMouseMove}
                className={`relative rounded-xl border transition-all duration-300 overflow-hidden group ${
                  isDarkMode
                    ? "bg-[#121216] border-white/[0.08] hover:border-[#D4F933]/50 hover:shadow-[0_12px_32px_-8px_rgba(212,249,51,0.12)]"
                    : "bg-white border-black/[0.08] hover:border-[#2D5204]/60 hover:shadow-lg"
                } hover:-translate-y-1`}
              >
                {/* Interactive Spotlight Radial Light */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: isDarkMode
                      ? "radial-gradient(450px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 249, 51, 0.12), transparent 80%)"
                      : "radial-gradient(450px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(45, 82, 4, 0.08), transparent 80%)",
                  }}
                />

                <div className="relative z-10 p-6">
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    {/* Company Logo */}
                    <div className={`w-14 h-14 rounded-lg overflow-hidden border p-1 flex-shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                      isDarkMode ? "border-white/[0.1] bg-[#181920]" : "border-black/[0.1] bg-gray-50"
                    }`}>
                      <img
                        src={exp.image}
                        alt={exp.company}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>

                    {/* Role & Company Information */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h3
                          className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-200 ${
                            isDarkMode ? "text-white group-hover:text-[#D4F933]" : "text-gray-900 group-hover:text-[#2D5204]"
                          }`}
                        >
                          {exp.company}
                        </h3>
                        <span className={`font-mono text-xs px-2.5 py-0.5 rounded font-semibold tracking-wider ${
                          isDarkMode 
                            ? "bg-[#D4F933]/10 border border-[#D4F933]/30 text-[#D4F933]" 
                            : "bg-[#0A0A0C] border border-black text-[#D4F933] shadow-xs"
                        }`}>
                          {exp.period}
                        </span>
                      </div>

                      <p
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {exp.role}
                      </p>

                      {/* Accordion Content with Staggered Fade-in */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openIndex === index
                            ? "max-h-[1000px] opacity-100 mt-4 pt-4 border-t border-inherit"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <ul className="space-y-2.5 font-mono text-xs leading-relaxed">
                          {exp.description.map((item, i) => (
                            <li
                              key={i}
                              style={{
                                transitionDelay: openIndex === index ? `${i * 60}ms` : "0ms",
                              }}
                              className={`flex items-start gap-2.5 transition-all duration-300 ease-out transform ${
                                openIndex === index
                                  ? "opacity-100 translate-x-0"
                                  : "opacity-0 -translate-x-3"
                              } ${
                                isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"
                              }`}
                            >
                              <span className={`mt-0.5 flex-shrink-0 transition-transform ${
                                isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                              }`}>→</span>
                              <span className="font-sans text-xs sm:text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Expand / Collapse Button with Micro-Rotation */}
                      <button
                        onClick={() => toggleAccordion(index)}
                        className={`mt-4 px-3.5 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider uppercase flex items-center gap-2 border transition-all duration-200 ${
                          isDarkMode
                            ? "bg-[#181920] border-white/[0.1] text-gray-300 hover:text-white hover:border-[#D4F933]/50 hover:bg-[#1f2129]"
                            : "bg-gray-100 border-black/[0.1] text-gray-700 hover:text-black hover:border-[#2D5204] hover:bg-gray-200"
                        }`}
                      >
                        <span>
                          {openIndex === index
                            ? t("aboutClose")
                            : t("aboutShowResponsibilities")}
                        </span>
                        <i
                          className={`fas fa-chevron-down text-[10px] transition-transform duration-300 ease-out ${
                            openIndex === index 
                              ? "rotate-180 text-[#D4F933]" 
                              : isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

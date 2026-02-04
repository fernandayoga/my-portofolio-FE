import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { cardClass, textClass, textSecondaryClass } from "../utils/themeUtils";
import untag from "../assets/about/untag.png";
import coreInitiative from "../assets/about/experience/coreInitiatif.jpeg";
import { useState, useEffect } from "react";

const About = () => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const experienceData = [
    {
      company: "Core Initiative x Rakamin Academy",
      image: coreInitiative,
      role: t("aboutExpRole1"),
      period: t("aboutExpPeriod1"),
      description: [
        t("aboutExpDesc1_1"),
        t("aboutExpDesc1_2"),
        t("aboutExpDesc1_3"),
        t("aboutExpDesc1_4"),
        t("aboutExpDesc1_5"),
        t("aboutExpDesc1_6"),
      ],
    },
    
  ];

  return (
    <div
      className="min-h-screen py-8 pt-20 lg:pt-8 pl-4"
      data-aos="fade-down"
      data-aos-delay="100"
      data-aos-duration="600"
    >
      <h1
        className={`text-3xl md:text-4xl font-bold mb-2 ${textClass(
          isDarkMode,
        )}`}
      >
        {t("aboutTitle")}
      </h1>
      <p
        className={`text-sm md:text-base  ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {t("aboutSubtitle")}
      </p>

      <div
        className={`mb-5  border-b pb-8 ${
          isDarkMode ? "border-gray-800" : "border-gray-200"
        }`}
      ></div>

      <div className="flex flex-col gap-8 max-w-5xl">
        {/* Who I Am */}
        <div className={`${cardClass(isDarkMode)} p-6`}>
          <p
            className={`${textSecondaryClass(isDarkMode)} leading-relaxed mb-4`}
          >
            {t("aboutPara1")}
          </p>
          <p
            className={`${textSecondaryClass(isDarkMode)} leading-relaxed mb-4`}
          >
            {t("aboutPara2")}
          </p>
          <p className={`${textSecondaryClass(isDarkMode)} leading-relaxed`}>
            {t("aboutPara3")}
          </p>
        </div>

        {/* Education */}
        <div className={`${cardClass(isDarkMode)} p-6`}>
          <h2
            className={`text-2xl font-semibold mb-6 pb-2 flex items-center
            ${
              isDarkMode
                ? "border-b border-gray-700"
                : "border-b border-gray-300"
            }`}
          >
            <i className="fas fa-graduation-cap mr-3 text-primary"></i>
            {t("aboutEducation")}
          </h2>

          <div className="flex items-start gap-4">
            <img
              src={untag}
              alt="University Logo"
              className="w-12 h-12 object-contain rounded-md"
            />

            <div>
              <h3 className={`text-md font-semibold ${textClass(isDarkMode)}`}>
                {t("aboutEduMajor")}
              </h3>
              <p className="text-gray-400 text-sm">{t("aboutEduUniversity")}</p>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className={`${cardClass(isDarkMode)} p-6`}>
          <h2
            className={`text-2xl font-semibold mb-6 pb-2 flex items-center
            ${
              isDarkMode
                ? "border-b border-gray-700"
                : "border-b border-gray-300"
            }`}
          >
            <i className="fas fa-briefcase mr-3 text-primary"></i>
            {t("aboutExperience")}
          </h2>

          <div className="flex flex-col gap-3">
            {experienceData.map((exp, index) => (
              <div
                key={index}
                className={`rounded-xl border p-6 transition-all   ${
                  isDarkMode
                    ? "bg-slate-800 border-gray-800 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              >
                <div className="flex flex-col gap-4 items-start min-[476px]:flex-row">
                  {/* Image */}
                  <img
                    src={exp.image}
                    alt={exp.company}
                    className="w-14 h-14 rounded-lg object-cover border"
                  />

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{exp.company}</h3>
                    <p className="text-sm  font-medium">{exp.role}</p>
                    <p className="text-xs text-gray-400 mb-1">{exp.period}</p>

                    {/* Accordion Content */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        openIndex === index
                          ? "max-h-[1200px] opacity-100 mt-3"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul
                        className={`list-disc pl-5 space-y-2 text-sm leading-relaxed ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {exp.description.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => toggleAccordion(index)}
                      className={`mt-4 px-4 py-2 rounded-full text-sm font-medium
                        flex items-center gap-2 transition-all duration-300
                        ${
                          isDarkMode
                            ? "bg-gray-900 text-gray-200 hover:bg-gray-700"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      <span
                        className={`transition-opacity duration-600 text-xs  ${
                          openIndex === index ? "opacity-100" : "opacity-90"
                        }`}
                      >
                        {openIndex === index
                          ? t("aboutClose")
                          : t("aboutShowResponsibilities")}
                      </span>

                      <i
                        className={`fas fa-chevron-${
                          openIndex === index ? "up" : "down"
                        } text-xs transition-transform duration-600 ${
                          openIndex === index ? "rotate-180" : "rotate-0"
                        }`}
                      ></i>
                    </button>
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

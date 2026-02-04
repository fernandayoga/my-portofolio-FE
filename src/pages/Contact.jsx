import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { Form } from "react-router-dom";
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

  console.log(formData);

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

        setFormData({ name: "", email: "", message: "" });
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
      icon: "fa-brands fa-github",
      label: "GitHub",
      link: "https://github.com/fernandayoga",
      color: "hover:text-gray-400",
    },
    {
      icon: "fa-brands fa-linkedin",
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/fernanda-yoga-kurniawan-186b20295/",
      color: "hover:text-blue-500",
    },
    {
      icon: "fa-brands fa-instagram",
      label: "Instagram",
      link: "https://www.instagram.com/fernanddyoga_/",
      color: "hover:text-pink-500",
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 pt-20 lg:pt-8"
    data-aos="fade-down"
      data-aos-delay="100"
      data-aos-duration="600">
      <h1
        className={`text-3xl md:text-4xl font-bold mb-2 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {t("contactTitle")}
      </h1>
      <p className={`mb-8  ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
        {t("contactSubtitle")}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Form */}
        <div
          className={`rounded-xl p-8 border ${
            isDarkMode
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-200 shadow-lg"
          }`}
        >
          <h2
            className={`text-2xl font-semibold mb-6 flex items-center gap-3 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <i className="fas fa-paper-plane text-primary"></i>
            {t("sendMessage")}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
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
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-gray-50 text-gray-900 border border-gray-300"
                }`}
                placeholder=" "
              />
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
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
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-gray-50 text-gray-900 border border-gray-300"
                }`}
                placeholder=""
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t("message")}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                  isDarkMode
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-gray-50 text-gray-900 border border-gray-300"
                }`}
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-medium transition-all
    flex items-center justify-center gap-2
    ${
      isLoading
        ? "bg-purple-400 cursor-not-allowed"
        : "bg-purple-600 hover:bg-purple-700"
    }
    text-white
  `}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  {t("sending")}
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  {t("sendMessage")}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Social Links & Info */}
        <div className="space-y-6">
          {/* Social Media */}
          <div
            className={`rounded-xl p-8 border ${
              isDarkMode
                ? "bg-gray-900 border-gray-800"
                : "bg-white border-gray-200 shadow-lg"
            }`}
          >
            <h2
              className={`text-lg sm:text-2xl font-semibold mb-6 flex items-center gap-3 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <i className="fas fa-share-alt text-primary"></i>
              {t("connectWithMe")}
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-6 rounded-lg flex flex-col items-center justify-center transition-all 
                  group ${social.color} ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  title={social.label}
                >
                  <i
                    className={`${
                      social.icon
                    } text-4xl group-hover:scale-110 transition-transform ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  ></i>
                </a>
              ))}
            </div>
          </div>

          {/* Availability Info */}
          <div
            className={`rounded-xl p-8 border ${
              isDarkMode
                ? "bg-gray-900 border-gray-800"
                : "bg-white border-gray-200 shadow-lg"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-6 flex items-center gap-3 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <i className="fas fa-clock text-primary"></i>
              {t("availability")}
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <i className="fas fa-check-circle text-green-500"></i>
                <span
                  className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                >
                  {t("availableFreelance")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-check-circle text-green-500"></i>
                <span
                  className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                >
                  {t("openFulltime")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-check-circle text-green-500"></i>
                <span
                  className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                >
                  {t("responseTime")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

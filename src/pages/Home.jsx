import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import profileImage from "../assets/about/experience/image.png";

const Home = () => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const [typedText, setTypedText] = useState("");
  const fullText = t("title"); // "Fullstack Developer"

  useEffect(() => {
    let index = 0;
    setTypedText(""); // Reset saat language berubah

    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.substring(0, index));
        index++;
      } else {
        index = 0; // Reset untuk looping
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText]); // Re-run saat fullText (language) berubah

  const skills = [
    { icon: "fa-brands fa-html5", color: "bg-orange-500", name: "HTML5" },
    { icon: "fa-brands fa-css3-alt", color: "bg-blue-500", name: "CSS3" },
    {
      icon: "fa-brands fa-bootstrap",
      color: "bg-purple-600",
      name: "Bootstrap",
    },
    {
      icon: "tailwind",
      color: "bg-cyan-500",
      name: "Tailwind",
      isCustom: true,
    },
    { icon: "fa-brands fa-js", color: "bg-yellow-400", name: "JavaScript" },
    { icon: "fa-brands fa-react", color: "bg-blue-400", name: "React" },
    { icon: "nextjs", color: "bg-black", name: "Next.js", isCustom: true },
    { icon: "fa-brands fa-vuejs", color: "bg-green-500", name: "Vue.js" },
    { icon: "fa-brands fa-figma", color: "bg-pink-500", name: "Figma" },
    { icon: "fa-brands fa-node", color: "bg-green-700", name: "Node.js" },
    { icon: "express", color: "bg-gray-700", name: "Express", isCustom: true },
    { icon: "fa-brands fa-laravel", color: "bg-red-500", name: "Laravel" },
    { icon: "fa-brands fa-docker", color: "bg-blue-500", name: "Docker" },
    { icon: "mysql", color: "bg-blue-700", name: "MySQL", isCustom: true },
    { icon: "fa-solid fa-leaf", color: "bg-green-500", name: "MongoDB" },
    { icon: "fa-brands fa-git-alt", color: "bg-orange-600", name: "Git" },
    { icon: "nginx", color: "bg-green-600", name: "Nginx", isCustom: true },
    { icon: "flutter", color: "bg-blue-400", name: "Flutter", isCustom: true },
    { icon: "fa-brands fa-github", color: "bg-gray-700", name: "GitHub" },
  ];

  const features = [
    {
      icon: "fa-trophy",
      title: t("featAchievementsTitle"),
      description: t("featAchievementsDesc"),
      color: "bg-yellow-500",
    },
    {
      icon: "fa-briefcase",
      title: t("featProjectsTitle"),
      description: t("featProjectsDesc"),
      color: "bg-blue-500",
    },
    {
      icon: "fa-chart-line",
      title: t("featDashboardTitle"),
      description: t("featDashboardDesc"),
      color: "bg-purple-500",
    },
    {
      icon: "fa-comments",
      title: t("featChatTitle"),
      description: t("featChatDesc"),
      color: "bg-green-500",
    },
    {
      icon: "fa-envelope",
      title: t("featContactTitle"),
      description: t("featContactDesc"),
      color: "bg-red-500",
    },
    {
      icon: "fa-robot",
      title: t("featSmartTitle"),
      description: t("featSmartDesc"),
      color: "bg-pink-500",
    },
  ];

  // Custom SVG Icons (sama seperti sebelumnya)
  const NextJsIcon = () => (
    <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 md:w-10 md:h-10">
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
    </svg>
  );

  const TailwindIcon = () => (
    <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 md:w-10 md:h-10">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
  );

  const ExpressIcon = () => (
    <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 md:w-10 md:h-10">
      <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z" />
    </svg>
  );

  const MysqlIcon = () => (
  <svg viewBox="0 0 200 200" className="w-8 h-8 md:w-10 md:h-10">
    {/* Background Circle - Solid Blue */}
    <circle cx="100" cy="100" r="100" className="fill-blue-700"/>
    
    {/* Text Container */}
    <text
      x="100"
      y="120"
      fontSize="60"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      textAnchor="middle"
    >
      <tspan fill="#FFFFFF">My</tspan>
      <tspan fill="#E97826">SQL</tspan>
    </text>
  </svg>
);

  const NginxIcon = () => (
    <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 md:w-10 md:h-10">
      <path d="M12 0L1.605 6v12L12 24l10.395-6V6L12 0zm0 1.324l9.395 5.424v10.848L12 23.018l-9.395-5.422V6.748L12 1.324zM8.832 8.168v7.664h1.584V9.918l4.32 5.914h1.416V8.168h-1.584v5.914l-4.32-5.914H8.832z" />
    </svg>
  );

  const FlutterIcon = () => (
    <svg viewBox="0 0 256 317" className="w-8 h-8 md:w-10 md:h-10">
      <defs>
        <linearGradient
          x1="3.952%"
          y1="26.993%"
          x2="75.897%"
          y2="52.919%"
          id="flutter-a"
        >
          <stop stopColor="#5BBBED" offset="0%" />
          <stop stopColor="#61C0F2" offset="100%" />
        </linearGradient>
        <linearGradient
          x1="23.481%"
          y1="50.002%"
          x2="75.897%"
          y2="50.002%"
          id="flutter-b"
        >
          <stop stopColor="#0A5C9E" offset="0%" />
          <stop stopColor="#0F73C4" offset="100%" />
        </linearGradient>
      </defs>
      <polygon
        fill="url(#flutter-a)"
        points="157.666 0 0 157.667 48.8 206.467 255.267 0"
      />
      <polygon
        fill="#0F73C4"
        points="156.567 145.397 72.146 229.818 121.055 278.726 205.476 194.305 255.267 145.397"
      />
      <polygon
        fill="url(#flutter-b)"
        points="121.133 279.531 169.933 230.731 121.133 181.931 72.333 230.731"
      />
    </svg>
  );

  const renderSkillIcon = (skill) => {
    if (!skill.isCustom) {
      return <i className={`${skill.icon} text-xl md:text-2xl text-white`}></i>;
    }

    switch (skill.icon) {
      case "nextjs":
        return <NextJsIcon />;
      case "tailwind":
        return <TailwindIcon />;
      case "express":
        return <ExpressIcon />;
      case "mysql":
        return <MysqlIcon />;
      case "nginx":
        return <NginxIcon />;
      case "flutter":
        return <FlutterIcon />;
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen py-8 pt-20 lg:pt-8 pl-4"
      data-aos="fade-down"
      data-aos-delay="100"
      data-aos-duration="600"
    >
      {/* Header Section */}
      <div className="mb-10 mt-8">
        <div className="flex items-start justify-between">
          <div>
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {t("greeting")}
            </h1>

            {/* Typing Effect */}
            <div className="mb-6">
              <span className="text-2xl md:text-3xl font-semibold text-primary">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            <div className="flex flex-col-reverse md:flex-row gap-6 items-start">
              {/* Left Side - Text */}
              <p
                className={`flex-1 text-base md:text-md leading-relaxed text-left ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {t("description")}
              </p>

              {/* Right Side - Image */}
              <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                <img
                  src={profileImage}
                  alt="Fernanda Yoga Kurniawan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`mb- mt-4 border-b pb-8 ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          }`}
        ></div>
      </div>

      {/* Skills Section */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <i className="fas fa-code text-xl md:text-2xl text-primary"></i>
          <h2
            className={`text-2xl md:text-3xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {t("skills")}
          </h2>
        </div>
        <p className="text-gray-400 mb-4">{t("skillsSubtitle")}</p>

        <div className="flex flex-wrap gap-3 md:gap-6 max-w-4xl">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2.5 cursor-pointer"
              title={skill.name}
            >
              <div
                className={`w-12 h-12 md:w-16 md:h-16 ${skill.color} rounded-full
                  flex items-center justify-center
                  hover:scale-110 transition-transform shadow-lg`}
              >
                {renderSkillIcon(skill)}
              </div>
            </div>
          ))}
        </div>
        <div
          className={`mb- mt-4 border-b pb-8 ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          }`}
        ></div>
      </div>

      {/* Features Section */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <i className="fas fa-star text-xl md:text-2xl text-primary"></i>
          <h2
            className={`text-2xl md:text-3xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {t("features")}
          </h2>
        </div>
        <p className="text-gray-400 mb-8">{t("featuresSubtitle")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${
                isDarkMode
                  ? "bg-gray-900 border-gray-800 hover:border-purple-500"
                  : "bg-white border-gray-200 hover:border-purple-500"
              } border rounded-xl p-6 transition-all duration-300 hover:scale-105 cursor-pointer group`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <i className={`fas ${feature.icon} text-white text-xl`}></i>
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

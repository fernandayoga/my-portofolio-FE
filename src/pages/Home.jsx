import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import profileImage from "../assets/about/experience/imageProfile.png";
import cvFile from "../assets/CV/CV Fernanda Yoga Kurniawan.pdf";
import profileImage2 from "../assets/about/experience/profileImage2.png";

const Home = () => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const [typedText, setTypedText] = useState("");
  const [indexText, setIndexText] = useState(0);
  const [mousePos, setMousePos] = useState({});

  const handleMouseMove = (index, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos((prev) => ({
      ...prev,
      [index]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  const daftarText = [
    "Fullstack Developer",
    "Software Engineer",
    "AI Integration Enthusiast",
  ];
  const fullText = daftarText[indexText]; 

  useEffect(() => {
    let index = 0;
    setTypedText(""); // Reset saat language berubah

    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.substring(0, index));
        index++;
      } else {
        setIndexText((prevIndex) => 
          prevIndex === daftarText.length - 1
            ? 0
            : prevIndex + 1
        );  
        index = 0; // Reset untuk looping
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  const skills = [
    { icon: "fa-brands fa-html5", color: "text-orange-500", name: "HTML5" },
    { icon: "fa-brands fa-css3-alt", color: "text-blue-500", name: "CSS3" },
    {
      icon: "fa-brands fa-bootstrap",
      color: "text-purple-400",
      name: "Bootstrap",
    },
    {
      icon: "tailwind",
      color: "text-cyan-400",
      name: "Tailwind",
      isCustom: true,
    },
    { icon: "fa-brands fa-js", color: "text-yellow-400", name: "JavaScript" },
    { icon: "typescript", color: "text-blue-400", name: "TypeScript", isCustom: true },
    { icon: "fa-brands fa-react", color: "text-cyan-400", name: "React" },
    { icon: "nextjs", color: "text-white", name: "Next.js", isCustom: true },
    { icon: "fa-brands fa-vuejs", color: "text-emerald-400", name: "Vue.js" },
    { icon: "fa-brands fa-figma", color: "text-pink-400", name: "Figma" },
    { icon: "fa-brands fa-node", color: "text-emerald-500", name: "Node.js" },
    { icon: "express", color: "text-gray-300", name: "Express", isCustom: true },
    { icon: "fa-brands fa-laravel", color: "text-red-500", name: "Laravel" },
    { icon: "fa-brands fa-docker", color: "text-blue-400", name: "Docker" },
    { icon: "mysql", color: "text-amber-500", name: "MySQL", isCustom: true },
    { icon: "fa-solid fa-leaf", color: "text-emerald-400", name: "MongoDB" },
    { icon: "fa-brands fa-git-alt", color: "text-orange-500", name: "Git" },
    { icon: "nginx", color: "text-emerald-400", name: "Nginx", isCustom: true },
    { icon: "flutter", color: "text-sky-400", name: "Flutter", isCustom: true },
    { icon: "fa-brands fa-github", color: "text-gray-200", name: "GitHub" },
  ];

  const skillsRow1 = skills.slice(0, 10);
  const skillsRow2 = skills.slice(10);

  const features = [
    {
      icon: "fa-trophy",
      title: t("featAchievementsTitle"),
      description: t("featAchievementsDesc"),
      num: "01",
    },
    {
      icon: "fa-briefcase",
      title: t("featProjectsTitle"),
      description: t("featProjectsDesc"),
      num: "02",
    },
    {
      icon: "fa-chart-line",
      title: t("featDashboardTitle"),
      description: t("featDashboardDesc"),
      num: "03",
    },
    {
      icon: "fa-comments",
      title: t("featChatTitle"),
      description: t("featChatDesc"),
      num: "04",
    },
    {
      icon: "fa-envelope",
      title: t("featContactTitle"),
      description: t("featContactDesc"),
      num: "05",
    },
    {
      icon: "fa-robot",
      title: t("featSmartTitle"),
      description: t("featSmartDesc"),
      num: "06",
    },
  ];

  // Custom SVG Icons
  const NextJsIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
    </svg>
  );

  const TypescriptIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <circle cx="12" cy="12" r="12" fill="#3178C6" />
      <text
        x="20"
        y="19"
        textAnchor="end"
        fontFamily="sans-serif"
        fontWeight="bold"
        fontSize="10"
        fill="white"
      >
        TS
      </text>
    </svg>
  );

  const TailwindIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-cyan-400">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
  );

  const ExpressIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-300">
      <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z" />
    </svg>
  );

  const MysqlIcon = () => (
    <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center font-bold text-[9px] text-white">
      SQL
    </div>
  );

  const NginxIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-emerald-400">
      <path d="M12 0L1.605 6v12L12 24l10.395-6V6L12 0zm0 1.324l9.395 5.424v10.848L12 23.018l-9.395-5.422V6.748L12 1.324zM8.832 8.168v7.664h1.584V9.918l4.32 5.914h1.416V8.168h-1.584v5.914l-4.32-5.914H8.832z" />
    </svg>
  );

  const FlutterIcon = () => (
    <svg viewBox="0 0 256 317" className="w-6 h-6">
      <polygon fill="#5BBBED" points="157.666 0 0 157.667 48.8 206.467 255.267 0" />
      <polygon fill="#0F73C4" points="156.567 145.397 72.146 229.818 121.055 278.726 205.476 194.305 255.267 145.397" />
      <polygon fill="#0A5C9E" points="121.133 279.531 169.933 230.731 121.133 181.931 72.333 230.731" />
    </svg>
  );

  const renderSkillIcon = (skill) => {
    if (!skill.isCustom) {
      return <i className={`${skill.icon} text-xl ${skill.color}`}></i>;
    }

    switch (skill.icon) {
      case "nextjs":
        return <NextJsIcon />;
      case "typescript":
        return <TypescriptIcon />;
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
      className="min-h-screen py-8 pt-20 xl:pt-8 w-full max-w-full overflow-x-hidden"
      data-aos="fade-down"
      data-aos-delay="100"
      data-aos-duration="600"
    >
      {/* Header Section */}
      <div className="mb-10 mt-8">
        <div className="flex items-start justify-between">
          <div className="w-full">
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {t("greeting")}
            </h1>

            {/* Typing Subtitle with Monospace Precision */}
            <div className="mb-6 flex items-center gap-2 h-9 sm:h-10 lg:h-11">
              <span className={`font-mono text-xl sm:text-2xl lg:text-3xl font-bold ${
                isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
              }`}>
                {typedText || "\u200B"}
              </span>
              <span className={`w-2.5 h-6 sm:h-7 lg:h-8 animate-pulse inline-block ${
                isDarkMode ? "bg-[#D4F933]" : "bg-[#2D5204]"
              }`}></span>
            </div>

            <div className="flex flex-col-reverse md:flex-row gap-6 items-start">
              {/* Left Side - Text */}
              <p
                className={`flex-1 text-base md:text-md leading-relaxed text-justify hyphens-auto ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {t("description")}
              </p>

              {/* Right Side - Image */}
              <div className="w-[170px] h-[170px] md:w-[265px] md:h-[265px] rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                <img
                  src={profileImage2}
                  alt="Fernanda Yoga Kurniawan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Download CV Button */}
            <div className="mt-8 flex justify-start">
              <a
                href={cvFile}
                download="CV_Fernanda_Yoga_Kurniawan.pdf"
                className={`px-6 py-3.5 rounded-lg font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-3 border ${
                  isDarkMode
                    ? "bg-[#181920] hover:bg-[#D4F933] hover:text-black text-white border-white/[0.12] hover:border-[#D4F933] shadow-md"
                    : "bg-gray-900 hover:bg-[#2D5204] hover:text-white text-white border-transparent shadow-md"
                }`}
              >
                <i className="fas fa-download text-xs"></i>
                <span>Download CV</span>
                <span className="text-[10px] opacity-70 font-normal">[PDF]</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 hairline-divider"></div>
      </div>

      {/* Skills Section — Technical Index */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <h2
            className={`text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2.5 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
           
            <span>{t("skills")}</span>
          </h2>
          
        </div>
        <p className={`font-mono text-xs sm:text-sm mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          {t("skillsSubtitle")}
        </p>

        {/* Infinite Running Tech Marquee */}
        <div className="marquee-wrapper w-full max-w-full min-w-0 overflow-hidden py-3 space-y-4 marquee-mask">
          {/* Row 1 — Moving Left */}
          <div className="flex w-max marquee-row">
            <div className="flex shrink-0 animate-marquee-left gap-4 pr-4">
              {[...skillsRow1, ...skillsRow1].map((skill, index) => (
                <div
                  key={`r1-a-${index}`}
                  className={`marquee-item px-5 py-3.5 rounded-xl border transition-all duration-200 flex items-center gap-3.5 group flex-shrink-0 cursor-pointer ${
                    isDarkMode
                      ? "bg-[#121216] border-white/[0.08] hover:border-[#D4F933]/50 hover:bg-[#181920]"
                      : "bg-white border-black/[0.08] hover:border-[#2D5204] hover:bg-gray-50 shadow-xs"
                  }`}
                  title={skill.name}
                >
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${
                    isDarkMode ? "bg-white/[0.03] border-white/[0.06]" : "bg-black/[0.03] border-black/[0.06]"
                  }`}>
                    {renderSkillIcon(skill)}
                  </div>
                  <span
                    className={`font-mono text-xs sm:text-sm font-semibold ${
                      isDarkMode ? "text-gray-300 group-hover:text-white" : "text-gray-800 group-hover:text-black"
                    }`}
                  >
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex shrink-0 animate-marquee-left gap-4 pr-4" aria-hidden="true">
              {[...skillsRow1, ...skillsRow1].map((skill, index) => (
                <div
                  key={`r1-b-${index}`}
                  className={`marquee-item px-5 py-3.5 rounded-xl border transition-all duration-200 flex items-center gap-3.5 group flex-shrink-0 cursor-pointer ${
                    isDarkMode
                      ? "bg-[#121216] border-white/[0.08] hover:border-[#D4F933]/50 hover:bg-[#181920]"
                      : "bg-white border-black/[0.08] hover:border-[#2D5204] hover:bg-gray-50 shadow-xs"
                  }`}
                  title={skill.name}
                >
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${
                    isDarkMode ? "bg-white/[0.03] border-white/[0.06]" : "bg-black/[0.03] border-black/[0.06]"
                  }`}>
                    {renderSkillIcon(skill)}
                  </div>
                  <span
                    className={`font-mono text-xs sm:text-sm font-semibold ${
                      isDarkMode ? "text-gray-300 group-hover:text-white" : "text-gray-800 group-hover:text-black"
                    }`}
                  >
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — Moving Right */}
          <div className="flex w-max marquee-row">
            <div className="flex shrink-0 animate-marquee-right gap-4 pr-4">
              {[...skillsRow2, ...skillsRow2].map((skill, index) => (
                <div
                  key={`r2-a-${index}`}
                  className={`marquee-item px-5 py-3.5 rounded-xl border transition-all duration-200 flex items-center gap-3.5 group flex-shrink-0 cursor-pointer ${
                    isDarkMode
                      ? "bg-[#121216] border-white/[0.08] hover:border-[#D4F933]/50 hover:bg-[#181920]"
                      : "bg-white border-black/[0.08] hover:border-[#2D5204] hover:bg-gray-50 shadow-xs"
                  }`}
                  title={skill.name}
                >
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${
                    isDarkMode ? "bg-white/[0.03] border-white/[0.06]" : "bg-black/[0.03] border-black/[0.06]"
                  }`}>
                    {renderSkillIcon(skill)}
                  </div>
                  <span
                    className={`font-mono text-xs sm:text-sm font-semibold ${
                      isDarkMode ? "text-gray-300 group-hover:text-white" : "text-gray-800 group-hover:text-black"
                    }`}
                  >
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex shrink-0 animate-marquee-right gap-4 pr-4" aria-hidden="true">
              {[...skillsRow2, ...skillsRow2].map((skill, index) => (
                <div
                  key={`r2-b-${index}`}
                  className={`marquee-item px-5 py-3.5 rounded-xl border transition-all duration-200 flex items-center gap-3.5 group flex-shrink-0 cursor-pointer ${
                    isDarkMode
                      ? "bg-[#121216] border-white/[0.08] hover:border-[#D4F933]/50 hover:bg-[#181920]"
                      : "bg-white border-black/[0.08] hover:border-[#2D5204] hover:bg-gray-50 shadow-xs"
                  }`}
                  title={skill.name}
                >
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${
                    isDarkMode ? "bg-white/[0.03] border-white/[0.06]" : "bg-black/[0.03] border-black/[0.06]"
                  }`}>
                    {renderSkillIcon(skill)}
                  </div>
                  <span
                    className={`font-mono text-xs sm:text-sm font-semibold ${
                      isDarkMode ? "text-gray-300 group-hover:text-white" : "text-gray-800 group-hover:text-black"
                    }`}
                  >
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 hairline-divider"></div>
      </div>

      {/* Features Section — Editorial Numerals */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <h2
            className={`text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2.5 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
           
            <span>{t("features")}</span>
          </h2>
          
        </div>
        <p className={`font-mono text-xs sm:text-sm mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          {t("featuresSubtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              onMouseMove={(e) => handleMouseMove(index, e)}
              className={`relative p-6 rounded-xl border transition-all duration-300 flex flex-col justify-between group overflow-hidden ${
                isDarkMode
                  ? "bg-[#121216] border-white/[0.08] hover:border-[#D4F933]/50 hover:shadow-[0_12px_32px_-8px_rgba(212,249,51,0.14)]"
                  : "bg-white border-black/[0.08] shadow-md hover:border-[#2D5204]/60 hover:shadow-xl"
              } hover:-translate-y-1`}
            >
              {/* Interactive Spotlight Radial Light */}
              <div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: isDarkMode
                    ? `radial-gradient(350px circle at ${mousePos[index]?.x || 0}px ${mousePos[index]?.y || 0}px, rgba(212, 249, 51, 0.12), transparent 80%)`
                    : `radial-gradient(350px circle at ${mousePos[index]?.x || 0}px ${mousePos[index]?.y || 0}px, rgba(45, 82, 4, 0.08), transparent 80%)`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-mono text-xs tracking-wider font-semibold ${
                    isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                  }`}>
                    [{feature.num}]
                  </span>
                  <div className={`w-8 h-8 rounded-md border flex items-center justify-center transition-transform group-hover:scale-110 ${
                    isDarkMode 
                      ? "bg-white/[0.04] border-white/[0.06] text-[#D4F933]" 
                      : "bg-black/[0.04] border-black/[0.06] text-[#2D5204]"
                  }`}>
                    <i className={`fas ${feature.icon} text-xs`}></i>
                  </div>
                </div>

                <h3
                  className={`text-lg font-bold mb-2 tracking-tight transition-colors ${
                    isDarkMode 
                      ? "text-white group-hover:text-[#D4F933]" 
                      : "text-gray-900 group-hover:text-[#2D5204]"
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

              <div className={`relative z-10 mt-6 pt-4 border-t flex items-center justify-between font-mono text-[10px] ${
                isDarkMode ? "border-white/[0.06] text-gray-500" : "border-black/[0.06] text-gray-500"
              }`}>
                <span>SECTION // 0{index + 1}</span>
                <i className={`fas fa-arrow-right text-[10px] group-hover:translate-x-1.5 transition-transform ${
                  isDarkMode ? "text-[#D4F933]" : "text-[#2D5204]"
                }`}></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

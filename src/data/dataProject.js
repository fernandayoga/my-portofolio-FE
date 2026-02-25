//portofolio
import mainImagePort from "../assets/project/porto/mainImage.png";
import lightImagePort from "../assets/project/porto/lightMode.png";
import askBot from "../assets/project/porto/askBot.png";
import githubAnalytics from "../assets/project/porto/githubAnalitic.png";
import mobileView from "../assets/project/porto/mobileDevice.png";

//ramadhan app
import mainImageRamadhan from "../assets/project/ramadhanApp/mainImageRmdhn.png";
import prayerImage from "../assets/project/ramadhanApp/prayerImage.png";
import quranImage from "../assets/project/ramadhanApp/quranImage.png";
import qiblaImage from "../assets/project/ramadhanApp/qiblaImage.png";
import iftarImage from "../assets/project/ramadhanApp/iftarImage.png";
import fastingImage from "../assets/project/ramadhanApp/fastingImage.png";
import trackerImage from "../assets/project/ramadhanApp/trackerImage.png";
import mobileViewRmdhn from "../assets/project/ramadhanApp/mobileViewRmdhn.png";

export const projects = [
  //portofolio
  {
    id: "personal-portfolio",
    title: "Personal Portfolio Website",
    pre: "(This Website)",
    shortDescription:
      "A modern personal portfolio showcasing projects, real-time GitHub analytics, and interactive features with a clean, responsive design.",
    category: "web",
    mainImage: mainImagePort,

    technologies: [
      { name: "React", icon: "fa-brands fa-react", color: "text-blue-400" },
      { name: "Vite", icon: "fa-solid fa-bolt", color: "text-yellow-400" },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
        color: "text-cyan-500",
        isCustom: true,
      },
      { name: "Firebase", icon: "fa-solid fa-fire", color: "text-orange-500" },
      { name: "Node.js", icon: "fa-brands fa-node", color: "text-green-600" },
    ],

    sourceCode: "https://github.com/fernandayoga/my-portofolio-FE.git",
    liveDemo: "https://fernandayoga-portofolioweb.vercel.app",

    introduction:
      "This personal portfolio website is designed to present my profile, skills, and projects in a professional and interactive way. Built with modern frontend technologies, the website integrates real-time GitHub data, authentication features, and serverless backend services. The main goal of this project is to demonstrate my technical skills, problem-solving abilities, and real-world development experience through a clean UI and meaningful features.",

    techStack: [
      {
        category: "Frontend",
        items: [
          {
            name: "React 18",
            description: "Component-based UI library with hooks",
          },
          {
            name: "Vite",
            description: "Fast build tool and development server",
          },
          {
            name: "Tailwind CSS",
            description: "Utility-first CSS framework for responsive UI",
          },
          {
            name: "React Router",
            description: "Client-side routing for SPA navigation",
          },
          {
            name: "AOS Animation",
            description: "Scroll-based animations for better UX",
          },
          {
            name: "i18next",
            description: "Internationalization and language management",
          },
        ],
      },
      {
        category: "Backend & Services",
        items: [
          {
            name: "Firebase Authentication & Realtime Database",
            description:
              "Google & GitHub authentication integrated with Firebase Realtime Database for real-time chat messaging, user presence, and instant data synchronization without page reloads.",
          },

          {
            name: "Serverless Functions",
            description: "Backend logic deployed on Vercel",
          },
          {
            name: "Email Service",
            description: "Contact form email delivery via serverless API",
          },
        ],
      },
      {
        category: "APIs & Integrations",
        items: [
          {
            name: "GitHub API",
            description:
              "Fetch repositories, contributions, and recent activity",
          },
          {
            name: "Umami Analytics",
            description: "Visitor and activity tracking",
          },
          {
            name: "Groq AI",
            description: "High-performance LLM API for AI assistant features",
          },
        ],
      },
      {
        category: "Deployment & Tools",
        items: [
          {
            name: "Vercel",
            description: "Frontend hosting and serverless backend deployment",
          },
          {
            name: "GitHub",
            description: "Version control and project management",
          },
        ],
      },
    ],

    features: [
      {
        title: "Responsive & Modern UI",
        description:
          "Fully responsive design optimized for desktop, tablet, and mobile devices with dark and light mode support.",
        icon: "fa-desktop",
        color: "bg-blue-500",
      },
      {
        title: "GitHub Analytics Dashboard",
        description:
          "Displays real-time GitHub contribution graph, top programming languages, repositories, and recent activity using GitHub API.",
        icon: "fa-chart-bar",
        color: "bg-green-500",
      },
      {
        title: "Authentication System",
        description:
          "Integrated Google and GitHub authentication using Firebase for secure and seamless login experience.",
        icon: "fa-user-lock",
        color: "bg-purple-500",
      },
      {
        title: "Interactive Chat Room",
        description:
          "Real-time chat feature allowing authenticated users to interact and communicate within the platform.",
        icon: "fa-comments",
        color: "bg-orange-500",
      },
      {
        title: "Contact Form with Email Delivery",
        description:
          "Serverless contact form that sends messages directly to email using a backend API deployed on Vercel.",
        icon: "fa-envelope",
        color: "bg-red-500",
      },
      {
        title: "Multi-language Support",
        description:
          "Supports multiple languages using internationalization (i18n) to reach a broader audience.",
        icon: "fa-globe",
        color: "bg-indigo-500",
      },
      {
        title: "AI Assistant (Ask Bot)",
        description:
          "Interactive AI-powered assistant built using the Groq AI API, allowing users to ask questions, get instant responses, and explore information directly within the portfolio.",
        icon: "fa-robot",
        color: "bg-emerald-500",
      },
    ],

    gallery: [
      {
        src: lightImagePort,
        alt: "Portfolio homepage light mode",
        caption: "Homepage — Light mode with clean layout and hero section",
      },
      {
        src: mainImagePort,
        alt: "Portfolio homepage dark mode",
        caption: "Homepage — Dark mode with consistent contrast system",
      },
      {
        src: askBot,
        alt: "AI Ask Bot feature",
        caption: "AI Ask Bot powered by Groq AI for real-time interaction",
      },
      // {
      //   src: '/images/projects/portfolio/chat-room.png',
      //   alt: 'Realtime chat room',
      //   caption: 'Realtime Chat Room with Google Authentication',
      // },
      {
        src: githubAnalytics,
        alt: "GitHub analytics dashboard",
        caption: "GitHub analytics & recent activity visualization",
      },
      {
        src: mobileView,
        alt: "Responsive mobile view",
        caption: "Fully responsive layout optimized for mobile devices",
      },
    ],
  },

  //Ramadhan App
  {
    id: "ramadhan-app",
    title: "Ramadhan App",
    pre: "(Ramadhan Edition)",
    shortDescription:
      "A Ramadhan web application built with React using an offline-first approach — prayer times, Al-Qur'an, Qibla direction, worship tracker, and fasting journal in one app.",
    category: "web",
    mainImage: mainImageRamadhan,

    technologies: [
      { name: "React", icon: "fa-brands fa-react", color: "text-blue-400" },
      { name: "Vite", icon: "fa-solid fa-bolt", color: "text-yellow-400" },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
        color: "text-cyan-500",
        isCustom: true,
      },
      {
        name: "IndexedDB",
        icon: "fa-solid fa-database",
        color: "text-green-500",
      },
    ],

    sourceCode: "https://github.com/fernandayoga/RAMADHAN-APP.git",
    liveDemo: "https://ramadhan-app-yogz.vercel.app/",

    introduction:
      "Ramadhan App is a Ramadhan web application built with an offline-first approach using React and Vite. It is designed to help Muslims perform their worship during the holy month of Ramadhan with complete, lightweight, and accurate features. From automatic GPS-based prayer times, suhoor & iftar countdown, digital Qibla compass, full 30 Juz Al-Qur'an offline reading, daily fasting journal, to worship tracker — everything is available in one application that can be accessed without an internet connection after the first use.",

    techStack: [
      {
        category: "Frontend",
        items: [
          {
            name: "React 18",
            description:
              "Component-based UI library using hooks for state management",
          },
          {
            name: "Vite 5",
            description:
              "Modern and fast build tool for development and production",
          },
          {
            name: "Tailwind CSS 4",
            description:
              "Utility-first CSS framework for responsive and consistent UI",
          },
          {
            name: "Font Awesome 6",
            description: "Icon library for informative and clean UI design",
          },
          {
            name: "Google Fonts (Poppins + Amiri)",
            description:
              "Poppins for general text and Amiri for Arabic Qur'an text",
          },
        ],
      },
      {
        category: "Storage & Offline",
        items: [
          {
            name: "IndexedDB (idb)",
            description:
              "Large-capacity browser database to permanently store all 114 Surahs of the Qur'an — the API is fetched only once per Surah, then available offline.",
          },
          {
            name: "localStorage",
            description:
              "Lightweight storage for small data such as daily prayer times cache, user location, fasting journal, worship tracker, Qur'an bookmarks, and notification preferences.",
          },
        ],
      },
      {
        category: "APIs & Integration",
        items: [
          {
            name: "Aladhan API",
            description:
              "Free API without API key to fetch five daily prayer times based on GPS coordinates and selected calculation method.",
          },
          {
            name: "alquran.cloud API",
            description:
              "Free API to fetch Arabic Qur'an text along with Indonesian translation per Surah.",
          },
          {
            name: "Nominatim OpenStreetMap",
            description:
              "Free reverse geocoding service without API key to convert GPS coordinates into readable city names.",
          },
          {
            name: "Web Geolocation API",
            description:
              "Built-in browser API to automatically detect user location for prayer times and Qibla direction.",
          },
          {
            name: "DeviceOrientation API",
            description:
              "Built-in browser API to read device gyroscope sensor as a digital compass for Qibla direction.",
          },
        ],
      },
      {
        category: "Deployment",
        items: [
          {
            name: "Vercel",
            description: "Frontend hosting platform for production deployment",
          },
          {
            name: "GitHub",
            description: "Version control and project management platform",
          },
        ],
      },
    ],

    features: [
      {
        title: "Automatic Prayer Times",
        description:
          "Five daily prayer times based on GPS with daily caching — the API is called only once per day. Supports multiple calculation methods including Indonesia's Ministry of Religious Affairs.",
        icon: "fa-clock",
        color: "bg-blue-500",
      },
      {
        title: "Suhoor & Iftar Countdown",
        description:
          "Real-time countdown to suhoor and iftar with automatic status updates — Suhoor Time, Imsak, Fasting Time, or Iftar Time.",
        icon: "fa-moon",
        color: "bg-indigo-500",
      },
      {
        title: "Digital Qibla Direction",
        description:
          "Digital compass using device gyroscope sensor to show the direction of the Kaaba in real-time, including distance calculation to the Kaaba using the Haversine formula.",
        icon: "fa-compass",
        color: "bg-emerald-500",
      },
      {
        title: "Offline Al-Qur'an",
        description:
          "Read all 114 Surahs of the Qur'an with Indonesian translation. Data is cached in IndexedDB — once a Surah is opened for the first time, it is permanently available offline.",
        icon: "fa-book-open",
        color: "bg-amber-500",
      },
      {
        title: "Fasting Journal",
        description:
          "Mark daily fasting status with a 30-day Ramadhan visual calendar, add reasons if not fasting, and track overall fasting progress statistics.",
        icon: "fa-calendar-day",
        color: "bg-red-500",
      },
      {
        title: "Worship Tracker",
        description:
          "Checklist of 8 daily worship activities — five daily prayers, Tarawih, Qur'an recitation, and charity — including streak tracker, 30-day heatmap, and per-activity statistics.",
        icon: "fa-list-check",
        color: "bg-cyan-500",
      },
      {
        title: "Offline-First Architecture",
        description:
          "Most features work without an internet connection — location stored locally, prayer times cached daily, and Qur'an data permanently stored in IndexedDB.",
        icon: "fa-wifi",
        color: "bg-green-500",
      },
    ],

    gallery: [
      {
        src: mainImageRamadhan,
        alt: "Ramadhan App homepage",
        caption:
          "Homepage — Hero section with countdown and prayer time information",
      },
      {
        src: prayerImage,
        alt: "Prayer times page",
        caption: "Prayer Times — Daily schedule with active time highlight",
      },
      {
        src: iftarImage,
        alt: "Suhoor and iftar page",
        caption: "Suhoor & Iftar — Real-time countdown to suhoor and iftar",
      },
      {
        src: quranImage,
        alt: "Qur'an page",
        caption: "Al-Qur'an — Read all 114 Surahs with offline translation",
      },
      {
        src: qiblaImage,
        alt: "Qibla direction page",
        caption: "Qibla Direction — Digital compass using device sensors",
      },
      {
        src: fastingImage,
        alt: "Daily fasting page",
        caption: "Fasting Journal — Mark daily fasting status",
      },
      {
        src: trackerImage,
        alt: "Worship tracker page",
        caption: "Worship Tracker — Checklist of 8 daily worship activities",
      },
      {
        src: mobileViewRmdhn,
        alt: "Mobile view",
        caption: "Responsive Design — Mobile view with bottom navigation",
      },
    ],
  },
];

// Helper function untuk get project by ID
export const getProjectById = (id) => {
  return projects.find((project) => project.id === id);
};

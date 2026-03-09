//portofolio
import mainImagePort from "../assets/project/porto/mainImage.png";
import lightImagePort from "../assets/project/porto/lightMode.png";
import askBot from "../assets/project/porto/askBot.png";
import githubAnalytics from "../assets/project/porto/githubAnalitic.png";
import mobileView from "../assets/project/porto/mobileDevice.png";

//ramadhan app
import EtalaseRmdhn from "../assets/project/ramadhanApp/Etalase-RmdhnApp.png";
import mainImageRamadhan from "../assets/project/ramadhanApp/mainImageRmdhn.png";
import prayerImage from "../assets/project/ramadhanApp/prayerImage.png";
import quranImage from "../assets/project/ramadhanApp/quranImage.png";
import qiblaImage from "../assets/project/ramadhanApp/qiblaImage.png";
import iftarImage from "../assets/project/ramadhanApp/iftarImage.png";
import fastingImage from "../assets/project/ramadhanApp/fastingImage.png";
import trackerImage from "../assets/project/ramadhanApp/trackerImage.png";
import mobileViewRmdhn from "../assets/project/ramadhanApp/mobileViewRmdhn.png";

//finance tracker app
import FinanceTrackerMain from "../assets/project/finance-tracker/FinanceTrackerMain.png";
import FinanceTrackerTransactions from "../assets/project/finance-tracker/FinanceTrackerTransaction.png";
import FinanceTrackerAnalytics from "../assets/project/finance-tracker/FinanceTrackerAnalytics.png";
import FinanceTrackerCategories from "../assets/project/finance-tracker/FinanceTrackerCategories.png";
import FinanceTrackerChatbot from "../assets/project/finance-tracker/FinanceTrackerChatbot.png";
import FinanceTrackerMobile from "../assets/project/finance-tracker/FinanceTrackerMobile.png";
import FinanceTrackerLogin from "../assets/project/finance-tracker/FinanceTrackerLogin.png";




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
    mainImage: EtalaseRmdhn,

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

  //finance-tracker app
  {
    id: "finance-tracker",
    title: "Finance Tracker",

    shortDescription:
      "A personal finance web application built with React and Express — track income & expenses, visualize spending analytics, and get AI-powered financial insights in one app.",
    category: "web",
    mainImage: FinanceTrackerMain,

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
        name: "Express.js",
        icon: "express",
        color: "text-gray-400",
        isCustom: true,
      },
      {
        name: "MongoDB",
        icon: "fa-solid fa-database",
        color: "text-green-400",
      },
    ],

    sourceCode: "https://github.com/fernandayoga/finance-tracker.git",
    liveDemo: "https://finance-tracker-one-self.vercel.app/",

    introduction:
      "Finance Tracker is a full-stack personal finance web application built with React, Express, and MongoDB. It is designed to help users manage their finances efficiently with a clean and modern dark UI. From tracking daily income and expenses, visualizing spending patterns through interactive charts, managing custom categories, to getting AI-powered financial insights via an integrated chatbot — everything is available in one responsive application accessible on both desktop and mobile devices.",

    techStack: [
      {
        category: "Frontend",
        items: [
          {
            name: "React 18",
            description:
              "Component-based UI library using hooks and Context API for state management",
          },
          {
            name: "Vite 5",
            description:
              "Modern and fast build tool for development and production",
          },
          {
            name: "Tailwind CSS 4",
            description:
              "Utility-first CSS framework for responsive and consistent dark theme UI",
          },
          {
            name: "Recharts",
            description:
              "Composable charting library for interactive bar charts and pie charts",
          },
          {
            name: "React Router v6",
            description:
              "Client-side routing with protected routes for authenticated users",
          },
          {
            name: "Axios",
            description:
              "HTTP client with interceptors for automatic JWT token injection and 401 handling",
          },
          {
            name: "Font Awesome 6",
            description: "Icon library for consistent and clean UI design",
          },
          {
            name: "Google Fonts (DM Sans)",
            description:
              "Modern and readable sans-serif font for financial data display",
          },
        ],
      },
      {
        category: "Backend",
        items: [
          {
            name: "Node.js",
            description:
              "JavaScript runtime for server-side logic and API development",
          },
          {
            name: "Express.js",
            description:
              "Minimal and flexible web framework for building REST APIs",
          },
          {
            name: "MongoDB Atlas",
            description:
              "Cloud-hosted NoSQL database for storing users, transactions, and categories",
          },
          {
            name: "Mongoose",
            description:
              "ODM library for MongoDB with schema validation and query building",
          },
          {
            name: "JWT (jsonwebtoken)",
            description:
              "Stateless authentication using signed tokens with configurable expiration",
          },
          {
            name: "bcryptjs",
            description:
              "Password hashing library for secure user credential storage",
          },
        ],
      },
      {
        category: "AI Integration",
        items: [
          {
            name: "Groq API (LLaMA 3.1)",
            description:
              "Ultra-fast LLM inference for AI-powered financial chatbot with real-time user data context injection",
          },
        ],
      },
      {
        category: "Deployment",
        items: [
          {
            name: "Vercel",
            description:
              "Full-stack deployment platform hosting both frontend (static) and backend (serverless functions) in one project",
          },
          {
            name: "GitHub",
            description:
              "Version control and CI/CD trigger for automatic deployment on push",
          },
        ],
      },
    ],

    features: [
      {
        title: "JWT Authentication",
        description:
          "Secure register and login system with JWT tokens, bcrypt password hashing, and protected routes — unauthenticated users are automatically redirected to the login page.",
        icon: "fa-shield-halved",
        color: "bg-blue-500",
      },
      {
        title: "Transaction Management",
        description:
          "Add, edit, and delete income and expense transactions with category, date, amount, and note fields. Filter transactions by type and date range.",
        icon: "fa-arrow-right-arrow-left",
        color: "bg-green-500",
      },
      {
        title: "Financial Dashboard",
        description:
          "Overview of total balance, monthly income, and monthly expenses in real-time with recent transaction cards and quick-add transaction button.",
        icon: "fa-gauge",
        color: "bg-indigo-500",
      },
      {
        title: "Spending Analytics",
        description:
          "Interactive bar chart for income vs expense over the last 12 months and donut pie chart for expense breakdown by category this month.",
        icon: "fa-chart-pie",
        color: "bg-amber-500",
      },
      {
        title: "Weekly Insights",
        description:
          "Automatic weekly financial insights — spending trend vs last week, saving rate, top spending category, and most expensive day of the week.",
        icon: "fa-lightbulb",
        color: "bg-yellow-500",
      },
      {
        title: "AI Financial Chatbot",
        description:
          "Integrated AI chatbot powered by Groq (LLaMA 3.1) with real-time user financial data as context — ask anything about your finances in natural language.",
        icon: "fa-robot",
        color: "bg-purple-500",
      },
      {
        title: "Custom Categories",
        description:
          "13 built-in default categories with Font Awesome icons. Users can create and delete their own custom categories for both income and expenses.",
        icon: "fa-tag",
        color: "bg-cyan-500",
      },
      {
        title: "Export CSV",
        description:
          "Export all transaction data to CSV file with one click — includes date, type, category, amount, and note for further analysis in spreadsheet tools.",
        icon: "fa-file-csv",
        color: "bg-emerald-500",
      },
      {
        title: "Responsive Design",
        description:
          "Fully responsive layout — sidebar navigation on desktop and bottom navigation bar on mobile with a clean dark green theme throughout.",
        icon: "fa-mobile-screen",
        color: "bg-red-500",
      },
    ],

    gallery: [
      {
        src: FinanceTrackerMain,
        alt: "Finance Tracker dashboard",
        caption:
          "Dashboard — Overview of balance, income, expense, and recent transactions",
      },
      {
        src: FinanceTrackerTransactions,
        alt: "Transactions page",
        caption: "Transactions — Full list with filter by type and date range",
      },
      {
        src: FinanceTrackerAnalytics,
        alt: "Analytics page",
        caption:
          "Analytics — Bar chart, pie chart, category breakdown, and weekly insights",
      },
      {
        src: FinanceTrackerCategories,
        alt: "Categories page",
        caption:
          "Categories — Manage default and custom income/expense categories",
      },
      {
        src: FinanceTrackerChatbot,
        alt: "AI Chatbot",
        caption:
          "AI Chatbot — Ask anything about your finances powered by Groq LLaMA 3.1",
      },
      {
        src: FinanceTrackerMobile,
        alt: "Mobile view",
        caption: "Responsive Design — Mobile view with bottom navigation bar",
      },
      {
        src: FinanceTrackerLogin,
        alt: "Login page",
        caption: "Authentication — Clean dark login and register pages",
      },
    ],
  },
];

// Helper function untuk get project by ID
export const getProjectById = (id) => {
  return projects.find((project) => project.id === id);
};

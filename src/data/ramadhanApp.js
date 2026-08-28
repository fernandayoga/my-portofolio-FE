//ramadhan app
import EtalaseRmdhn from "../assets/project/ramadhanApp/etalase ramadhan app.jpeg";
import mainImageRamadhan from "../assets/project/ramadhanApp/mainImageRmdhn.png";
import prayerImage from "../assets/project/ramadhanApp/prayerImage.png";
import quranImage from "../assets/project/ramadhanApp/quranImage.png";
import qiblaImage from "../assets/project/ramadhanApp/qiblaImage.png";
import iftarImage from "../assets/project/ramadhanApp/iftarImage.png";
import fastingImage from "../assets/project/ramadhanApp/fastingImage.png";
import trackerImage from "../assets/project/ramadhanApp/trackerImage.png";
import mobileViewRmdhn from "../assets/project/ramadhanApp/mobileViewRmdhn.png";


export const ramadhanApp = {
    id: "ramadhan-app",
    title: "Ramadhan App",
    pre: "(Ramadhan Edition)",
    shortDescription:
      "A Ramadhan web application built with React using an offline-first approach, Prayer times, Al-Qur'an, Qibla direction, worship tracker, and fasting journal in one app.",
    category: "web",
    mainImage: mainImageRamadhan,
    etalase: EtalaseRmdhn,

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
      "Ramadhan App is a Ramadhan web application built with an offline-first approach using React and Vite. It is designed to help Muslims perform their worship during the holy month of Ramadhan with complete, lightweight, and accurate features. From automatic GPS-based prayer times, suhoor & iftar countdown, digital Qibla compass, full 30 Juz Al-Qur'an offline reading, daily fasting journal, to worship tracker. everything is available in one application that can be accessed without an internet connection after the first use.",

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
              "Large-capacity browser database to permanently store all 114 Surahs of the Qur'an. the API is fetched only once per Surah, then available offline.",
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
  };

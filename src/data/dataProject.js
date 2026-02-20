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
    pre: "",
    shortDescription:
      "Aplikasi web Ramadhan berbasis React dengan pendekatan offline-first — waktu sholat, Al-Qur'an, arah kiblat, tracker ibadah, dan catatan puasa dalam satu aplikasi.",
    category: "web",
    mainImage: mainImageRamadhan, // ganti dengan screenshot app

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
      "Ramadhan App adalah aplikasi web Ramadhan yang dibangun dengan pendekatan offline-first menggunakan React dan Vite. Aplikasi ini dirancang untuk membantu umat Muslim menjalankan ibadah selama bulan Ramadhan dengan fitur yang lengkap, ringan, dan akurat. Mulai dari jadwal sholat otomatis berbasis GPS, countdown sahur & berbuka, kompas arah kiblat, baca Al-Qur'an 30 Juz offline, catatan puasa harian, hingga tracker ibadah — semua tersedia dalam satu aplikasi yang bisa diakses tanpa internet setelah pertama kali digunakan.",

    techStack: [
      {
        category: "Frontend",
        items: [
          {
            name: "React 18",
            description:
              "Component-based UI library dengan hooks untuk state management",
          },
          {
            name: "Vite 5",
            description:
              "Build tool modern yang cepat untuk development dan production",
          },
          {
            name: "Tailwind CSS 4",
            description:
              "Utility-first CSS framework untuk UI yang responsif dan konsisten",
          },
          {
            name: "Font Awesome 6",
            description: "Icon library untuk tampilan UI yang informatif",
          },
          {
            name: "Google Fonts (Poppins + Amiri)",
            description:
              "Poppins untuk teks umum, Amiri untuk teks Arab Al-Qur'an",
          },
        ],
      },
      {
        category: "Storage & Offline",
        items: [
          {
            name: "IndexedDB (idb)",
            description:
              "Database browser berkapasitas besar untuk menyimpan data Al-Qur'an 114 surah secara permanen — fetch API hanya terjadi sekali per surah, setelah itu tersedia offline.",
          },
          {
            name: "localStorage",
            description:
              "Penyimpanan ringan untuk data kecil seperti jadwal sholat (cache harian), lokasi user, catatan puasa, tracker ibadah, bookmark Qur'an, dan preferensi notifikasi.",
          },
        ],
      },
      {
        category: "APIs & Integrasi",
        items: [
          {
            name: "Aladhan API",
            description:
              "API gratis tanpa API key untuk mengambil jadwal sholat 5 waktu berdasarkan koordinat GPS dan metode perhitungan yang dipilih.",
          },
          {
            name: "alquran.cloud API",
            description:
              "API gratis untuk mengambil teks Arab Al-Qur'an beserta terjemahan Bahasa Indonesia per surah.",
          },
          {
            name: "Nominatim OpenStreetMap",
            description:
              "Reverse geocoding gratis tanpa API key untuk mengubah koordinat GPS menjadi nama kota yang mudah dibaca.",
          },
          {
            name: "Web Geolocation API",
            description:
              "API bawaan browser untuk mendeteksi lokasi user secara otomatis untuk keperluan waktu sholat dan arah kiblat.",
          },
          {
            name: "DeviceOrientation API",
            description:
              "API bawaan browser untuk membaca sensor gyroscope perangkat sebagai kompas digital penunjuk arah kiblat.",
          },
        ],
      },
      
      {
        category: "Deployment",
        items: [
          {
            name: "Vercel",
            description:
              "Platform hosting untuk deployment frontend production",
          },
          {
            name: "GitHub",
            description: "Version control dan project management",
          },
        ],
      },
    ],

    features: [
      {
        title: "Waktu Sholat Otomatis",
        description:
          "Jadwal sholat 5 waktu berdasarkan GPS dengan cache harian — API hanya dipanggil sekali per hari. Support berbagai metode perhitungan termasuk Kemenag Indonesia.",
        icon: "fa-clock",
        color: "bg-blue-500",
      },
      {
        title: "Countdown Sahur & Berbuka",
        description:
          "Countdown real-time menuju waktu sahur dan berbuka dengan status otomatis — Waktu Sahur, Imsak, Sedang Berpuasa, atau Waktu Berbuka.",
        icon: "fa-moon",
        color: "bg-indigo-500",
      },
      {
        title: "Arah Kiblat Digital",
        description:
          "Kompas digital berbasis sensor gyroscope perangkat untuk menunjukkan arah Ka'bah secara real-time, dilengkapi kalkulasi jarak ke Ka'bah menggunakan Haversine formula.",
        icon: "fa-compass",
        color: "bg-emerald-500",
      },
      {
        title: "Al-Qur'an Offline",
        description:
          "Baca 114 Surah Al-Qur'an lengkap dengan terjemahan Bahasa Indonesia. Data di-cache di IndexedDB — setelah surah dibuka pertama kali, tersedia offline selamanya.",
        icon: "fa-book-open",
        color: "bg-amber-500",
      },
      {
        title: "Catatan Puasa",
        description:
          "Tandai status puasa harian dengan kalender visual 30 hari Ramadhan, catat alasan jika tidak puasa, dan lihat statistik progress puasa secara keseluruhan.",
        icon: "fa-calendar-day",
        color: "bg-red-500",
      },
      {
        title: "Tracker Ibadah",
        description:
          "Checklist 8 ibadah harian — Sholat 5 waktu, Tarawih, Tadarus, dan Sedekah — dilengkapi streak tracker, heatmap 30 hari, dan statistik per ibadah.",
        icon: "fa-list-check",
        color: "bg-cyan-500",
      },
      
      {
        title: "Offline-First",
        description:
          "Sebagian besar fitur berjalan tanpa internet — lokasi tersimpan lokal, jadwal sholat di-cache harian, dan Al-Qur'an tersimpan permanen di IndexedDB browser.",
        icon: "fa-wifi",
        color: "bg-green-500",
      },
    ],

    gallery: [
      {
        src: mainImageRamadhan,
        alt: "Ramadhan App homepage",
        caption:
          "Beranda — Hero section dengan countdown dan info waktu sholat",
      },
      {
        src: prayerImage,
        alt: "Halaman waktu sholat",
        caption: "Waktu Sholat — Jadwal harian dengan highlight waktu aktif",
      },
      {
        src: iftarImage,
        alt: "Halaman waktu berbuka dan sahur",
        caption: "Sahur & Berbuka — Countdown real-time menuju waktu sahur dan berbuka",
      },
      {
        src: quranImage,
        alt: "Halaman Al-Qur'an",
        caption: "Al-Qur'an — Baca 114 surah dengan terjemahan offline",
      },
      {
        src: qiblaImage,
        alt: "Halaman arah kiblat",
        caption: "Arah Kiblat — Kompas digital berbasis sensor perangkat",
      },
      {
        src: fastingImage,
        alt: "Halaman puasa harian",
        caption: "Catatan Puasa — Tandai status puasa harian",
      },
      {
        src: trackerImage,
        alt: "Tracker ibadah ",
        caption: "Tracker Ibadah dan Checklist 8 ibadah harian ",
      },
      {
        src: mobileViewRmdhn,
        alt: "Tampilan mobile",
        caption: "Responsive — Tampilan mobile dengan bottom navigation",
      },
    ],
  },
];

// Helper function untuk get project by ID
export const getProjectById = (id) => {
  return projects.find((project) => project.id === id);
};

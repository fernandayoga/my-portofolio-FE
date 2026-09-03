import mainImagePort from "../assets/project/porto/mainImage.png";
import etalasePorto from "../assets/project/porto/etalase portofolio.jpeg"
import lightImagePort from "../assets/project/porto/lightMode.png";
import askBot from "../assets/project/porto/askBot.png";
import githubAnalytics from "../assets/project/porto/githubAnalitic.png";
import mobileView from "../assets/project/porto/mobileDevice.png";


export const personalPortfolio = {
    id: "personal-portfolio",
    title: {
      en: "Personal Portfolio Website",
      id: "Website Portofolio Pribadi"
    },
    pre: {
      en: "(This Website)",
      id: "(Website Ini)"
    },
    shortDescription: {
      en: "A modern personal portfolio showcasing projects, real-time GitHub analytics, and interactive features with a clean, responsive design.",
      id: "Portofolio pribadi modern yang memamerkan proyek, analitik GitHub real-time, dan fitur interaktif dengan desain yang bersih dan responsif."
    },
    category: "web",
    mainImage: mainImagePort,
    etalase: etalasePorto,

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

    introduction: {
      en: "This personal portfolio website is designed to present my profile, skills, and projects in a professional and interactive way. Built with modern frontend technologies, the website integrates real-time GitHub data, authentication features, and serverless backend services. The main goal of this project is to demonstrate my technical skills, problem-solving abilities, and real-world development experience through a clean UI and meaningful features.",
      id: "Website portofolio pribadi ini dirancang untuk menyajikan profil, keahlian, dan proyek saya dengan cara yang profesional dan interaktif. Dibangun dengan teknologi frontend modern, website ini mengintegrasikan data GitHub real-time, fitur autentikasi, dan layanan backend serverless. Tujuan utama proyek ini adalah untuk menunjukkan keterampilan teknis, kemampuan memecahkan masalah, dan pengalaman pengembangan dunia nyata melalui antarmuka yang bersih dan fitur yang bermanfaat."
    },

    techStack: [
      {
        category: { en: "Frontend", id: "Frontend" },
        items: [
          {
            name: { en: "React 18", id: "React 18" },
            description: {
              en: "Component-based UI library with hooks",
              id: "Library UI berbasis komponen dengan hooks"
            },
          },
          {
            name: { en: "Vite", id: "Vite" },
            description: {
              en: "Fast build tool and development server",
              id: "Alat build cepat dan server pengembangan"
            },
          },
          {
            name: { en: "Tailwind CSS", id: "Tailwind CSS" },
            description: {
              en: "Utility-first CSS framework for responsive UI",
              id: "Framework CSS utility-first untuk UI responsif"
            },
          },
          {
            name: { en: "React Router", id: "React Router" },
            description: {
              en: "Client-side routing for SPA navigation",
              id: "Routing sisi klien untuk navigasi SPA"
            },
          },
          {
            name: { en: "AOS Animation", id: "Animasi AOS" },
            description: {
              en: "Scroll-based animations for better UX",
              id: "Animasi berbasis gulir untuk UX yang lebih baik"
            },
          },
          {
            name: { en: "i18next", id: "i18next" },
            description: {
              en: "Internationalization and language management",
              id: "Manajemen bahasa dan internasionalisasi (i18n)"
            },
          },
        ],
      },
      {
        category: { en: "Backend & Services", id: "Backend & Layanan" },
        items: [
          {
            name: { en: "Firebase Authentication & Realtime Database", id: "Autentikasi Firebase & Database Realtime" },
            description: {
              en: "Google & GitHub authentication integrated with Firebase Realtime Database for real-time chat messaging, user presence, and instant data synchronization without page reloads.",
              id: "Autentikasi Google & GitHub terintegrasi dengan Database Realtime Firebase untuk pesan obrolan real-time, kehadiran pengguna, dan sinkronisasi data instan tanpa memuat ulang halaman."
            },
          },
          {
            name: { en: "Serverless Functions", id: "Fungsi Serverless" },
            description: {
              en: "Backend logic deployed on Vercel",
              id: "Logika backend di-deploy di Vercel"
            },
          },
          {
            name: { en: "Email Service", id: "Layanan Email" },
            description: {
              en: "Contact form email delivery via serverless API",
              id: "Pengiriman email dari formulir kontak via API serverless"
            },
          },
        ],
      },
      {
        category: { en: "APIs & Integrations", id: "API & Integrasi" },
        items: [
          {
            name: { en: "GitHub API", id: "API GitHub" },
            description: {
              en: "Fetch repositories, contributions, and recent activity",
              id: "Mengambil repositori, kontribusi, dan aktivitas terbaru"
            },
          },
          {
            name: { en: "Umami Analytics", id: "Umami Analytics" },
            description: {
              en: "Visitor and activity tracking",
              id: "Pelacakan pengunjung dan aktivitas"
            },
          },
          {
            name: { en: "Groq AI", id: "Groq AI" },
            description: {
              en: "High-performance LLM API for AI assistant features",
              id: "API LLM berperforma tinggi untuk fitur asisten AI"
            },
          },
        ],
      },
      {
        category: { en: "Deployment & Tools", id: "Deployment & Alat" },
        items: [
          {
            name: { en: "Vercel", id: "Vercel" },
            description: {
              en: "Frontend hosting and serverless backend deployment",
              id: "Hosting frontend dan deployment backend serverless"
            },
          },
          {
            name: { en: "GitHub", id: "GitHub" },
            description: {
              en: "Version control and project management",
              id: "Kontrol versi dan manajemen proyek"
            },
          },
        ],
      },
    ],

    features: [
      {
        title: { en: "Responsive & Modern UI", id: "UI Responsif & Modern" },
        description: {
          en: "Fully responsive design optimized for desktop, tablet, and mobile devices with dark and light mode support.",
          id: "Desain sepenuhnya responsif yang dioptimalkan untuk perangkat desktop, tablet, dan seluler dengan dukungan mode gelap dan terang."
        },
        icon: "fa-desktop",
        color: "bg-blue-500",
      },
      {
        title: { en: "GitHub Analytics Dashboard", id: "Dasbor Analitik GitHub" },
        description: {
          en: "Displays real-time GitHub contribution graph, top programming languages, repositories, and recent activity using GitHub API.",
          id: "Menampilkan grafik kontribusi GitHub real-time, bahasa pemrograman teratas, repositori, dan aktivitas terbaru menggunakan API GitHub."
        },
        icon: "fa-chart-bar",
        color: "bg-green-500",
      },
      {
        title: { en: "Authentication System", id: "Sistem Autentikasi" },
        description: {
          en: "Integrated Google and GitHub authentication using Firebase for secure and seamless login experience.",
          id: "Autentikasi Google dan GitHub yang terintegrasi menggunakan Firebase untuk pengalaman login yang aman dan mulus."
        },
        icon: "fa-user-lock",
        color: "bg-purple-500",
      },
      {
        title: { en: "Interactive Chat Room", id: "Ruang Obrolan Interaktif" },
        description: {
          en: "Real-time chat feature allowing authenticated users to interact and communicate within the platform.",
          id: "Fitur obrolan real-time yang memungkinkan pengguna terautentikasi untuk berinteraksi dan berkomunikasi di dalam platform."
        },
        icon: "fa-comments",
        color: "bg-orange-500",
      },
      {
        title: { en: "Contact Form with Email Delivery", id: "Formulir Kontak dengan Pengiriman Email" },
        description: {
          en: "Serverless contact form that sends messages directly to email using a backend API deployed on Vercel.",
          id: "Formulir kontak serverless yang mengirimkan pesan langsung ke email menggunakan API backend yang di-deploy di Vercel."
        },
        icon: "fa-envelope",
        color: "bg-red-500",
      },
      {
        title: { en: "Multi-language Support", id: "Dukungan Multi-bahasa" },
        description: {
          en: "Supports multiple languages using internationalization (i18n) to reach a broader audience.",
          id: "Mendukung berbagai bahasa menggunakan internasionalisasi (i18n) untuk menjangkau audiens yang lebih luas."
        },
        icon: "fa-globe",
        color: "bg-indigo-500",
      },
      {
        title: { en: "AI Assistant (Ask Bot)", id: "Asisten AI (Ask Bot)" },
        description: {
          en: "Interactive AI-powered assistant built using the Groq AI API, allowing users to ask questions, get instant responses, and explore information directly within the portfolio.",
          id: "Asisten bertenaga AI yang interaktif dan dibangun menggunakan API Groq AI, memungkinkan pengguna mengajukan pertanyaan, mendapat tanggapan instan, dan menjelajahi informasi langsung di dalam portofolio."
        },
        icon: "fa-robot",
        color: "bg-emerald-500",
      },
    ],

    gallery: [
      {
        src: lightImagePort,
        alt: { en: "Portfolio homepage light mode", id: "Beranda portofolio mode terang" },
        caption: { en: "Homepage — Light mode with clean layout and hero section", id: "Beranda — Mode terang dengan tata letak bersih dan bagian hero" },
      },
      {
        src: mainImagePort,
        alt: { en: "Portfolio homepage dark mode", id: "Beranda portofolio mode gelap" },
        caption: { en: "Homepage — Dark mode with consistent contrast system", id: "Beranda — Mode gelap dengan sistem kontras yang konsisten" },
      },
      {
        src: askBot,
        alt: { en: "AI Ask Bot feature", id: "Fitur AI Ask Bot" },
        caption: { en: "AI Ask Bot powered by Groq AI for real-time interaction", id: "AI Ask Bot ditenagai oleh Groq AI untuk interaksi real-time" },
      },
      {
        src: githubAnalytics,
        alt: { en: "GitHub analytics dashboard", id: "Dasbor analitik GitHub" },
        caption: { en: "GitHub analytics & recent activity visualization", id: "Analitik GitHub & visualisasi aktivitas terbaru" },
      },
      {
        src: mobileView,
        alt: { en: "Responsive mobile view", id: "Tampilan seluler responsif" },
        caption: { en: "Fully responsive layout optimized for mobile devices", id: "Tata letak sepenuhnya responsif yang dioptimalkan untuk seluler" },
      },
    ],
  };

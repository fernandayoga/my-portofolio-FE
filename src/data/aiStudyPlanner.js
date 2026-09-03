//Ai Study Planner
import etalaseAiStudyPlanner from "../assets/project/ai-study-planner/etalase ai study planner.jpeg"
import AiStudyPlannerMain from "../assets/project/ai-study-planner/AiStudyPlannerMain.png";
import AiStudyPlannerDashboard from "../assets/project/ai-study-planner/AiStudyPlannerDashboard.png";
import AiStudyPlannerNewGoal from "../assets/project/ai-study-planner/AiStudyPlannerNewGoal.png";
import AiStudyPlannerRoadmap from "../assets/project/ai-study-planner/AiStudyPlannerRoadmap.png";
import AiStudyPlannerLogin from "../assets/project/ai-study-planner/AiStudyPlannerLogin.png";




export const aiStudyPlanner = {
  id: "ai-study-planner",
  title: { en: "AI Study Planner", id: "AI Study Planner" },
  shortDescription: {
    en: "A full-stack Next.js web application that leverages AI to generate personalized, day-by-day study roadmaps and automatically curates YouTube video tutorials for each task.",
    id: "Aplikasi web Next.js full-stack yang memanfaatkan AI untuk menghasilkan peta jalan studi harian yang dipersonalisasi dan secara otomatis menyusun tutorial video YouTube untuk setiap tugas."
  },
  category: "web",
  mainImage: AiStudyPlannerMain,
  etalase: etalaseAiStudyPlanner,
  technologies: [
    { name: "Next.js", icon: "fa-brands fa-react", color: "text-white" },
    { name: "Tailwind CSS", icon: "tailwind", color: "text-cyan-500", isCustom: true },
    { name: "MongoDB", icon: "fa-solid fa-database", color: "text-green-400" },
    { name: "Three.js", icon: "fa-solid fa-cube", color: "text-gray-300" },
  ],
  sourceCode: "https://github.com/fernandayoga/Ai-Study-Plan.git",
  liveDemo: "https://ai-study-plan-chi.vercel.app/",
  introduction: {
    en: "AI Study Planner is a modern, full-stack learning companion built with Next.js (App Router) and MongoDB. It leverages the power of Groq AI (LLaMA 3.1) to automatically generate structured, day-by-day study curriculums tailored to the user's specific goals, duration, and current skill level. Beyond generating tasks, it utilizes the YouTube Data API to fetch relevant tutorial videos for every single learning step. The application features a stunning dark mode UI with interactive WebGL (Three.js) backgrounds, secure authentication via NextAuth v5, and an intuitive progress tracking system.",
    id: "AI Study Planner adalah pendamping belajar full-stack modern yang dibangun dengan Next.js (App Router) dan MongoDB. Aplikasi ini memanfaatkan kekuatan Groq AI (LLaMA 3.1) untuk secara otomatis menghasilkan kurikulum studi harian terstruktur yang disesuaikan dengan tujuan spesifik, durasi, dan tingkat keahlian pengguna saat ini. Selain menghasilkan tugas, aplikasi ini menggunakan API Data YouTube untuk mengambil video tutorial yang relevan untuk setiap langkah pembelajaran. Aplikasi ini menampilkan UI mode gelap yang memukau dengan latar belakang WebGL (Three.js) interaktif, autentikasi aman melalui NextAuth v5, dan sistem pelacakan kemajuan yang intuitif."
  },
  techStack: [
    {
      category: { en: "Frontend", id: "Frontend" },
      items: [
        { name: { en: "Next.js 15 (App Router)", id: "Next.js 15 (App Router)" }, description: { en: "React framework used for both client-side UI and server-side rendering", id: "Framework React yang digunakan untuk UI sisi klien dan rendering sisi server" } },
        { name: { en: "Tailwind CSS 4", id: "Tailwind CSS 4" }, description: { en: "Utility-first CSS framework for responsive and beautiful premium dark theme UI", id: "Framework CSS utility-first untuk UI tema gelap premium yang indah dan responsif" } },
        { name: { en: "Three.js", id: "Three.js" }, description: { en: "WebGL library used for the dynamic, interactive ColorBends background animation", id: "Pustaka WebGL yang digunakan untuk animasi latar belakang ColorBends yang dinamis dan interaktif" } },
        { name: { en: "Lucide React", id: "Lucide React" }, description: { en: "Clean and consistent SVG icon library", id: "Pustaka ikon SVG yang bersih dan konsisten" } },
      ],
    },
    {
      category: { en: "Backend", id: "Backend" },
      items: [
        { name: { en: "Next.js API Routes", id: "Rute API Next.js" }, description: { en: "Serverless functions handling backend logic, database operations, and API integrations", id: "Fungsi serverless yang menangani logika backend, operasi database, dan integrasi API" } },
        { name: { en: "MongoDB Atlas", id: "MongoDB Atlas" }, description: { en: "Cloud-hosted NoSQL database for storing users, learning goals, and roadmaps", id: "Database NoSQL dihosting cloud untuk menyimpan pengguna, tujuan pembelajaran, dan peta jalan" } },
        { name: { en: "Mongoose", id: "Mongoose" }, description: { en: "ODM library for MongoDB schema validation and data modeling", id: "Pustaka ODM untuk validasi skema dan pemodelan data MongoDB" } },
        { name: { en: "NextAuth.js (Auth.js v5)", id: "NextAuth.js (Auth.js v5)" }, description: { en: "Secure authentication system with credentials provider and protected routes", id: "Sistem autentikasi aman dengan penyedia kredensial dan rute yang dilindungi" } },
        { name: { en: "bcryptjs", id: "bcryptjs" }, description: { en: "Password hashing library for secure user credential storage", id: "Pustaka hashing kata sandi untuk penyimpanan kredensial pengguna yang aman" } },
      ],
    },
    {
      category: { en: "AI & External APIs", id: "API AI & Eksternal" },
      items: [
        { name: { en: "Groq API (LLaMA 3.1)", id: "API Groq (LLaMA 3.1)" }, description: { en: "Lightning-fast LLM inference used to generate structured, personalized learning roadmaps in JSON format", id: "Inferensi LLM secepat kilat yang digunakan untuk menghasilkan peta jalan pembelajaran terstruktur dan dipersonalisasi dalam format JSON" } },
        { name: { en: "YouTube Data API v3", id: "API Data YouTube v3" }, description: { en: "Automatically fetches the most relevant tutorial videos concurrently for every generated study task", id: "Secara otomatis mengambil video tutorial paling relevan secara bersamaan untuk setiap tugas studi yang dihasilkan" } },
      ],
    },
    {
      category: { en: "Deployment", id: "Deployment" },
      items: [
        { name: { en: "Vercel", id: "Vercel" }, description: { en: "Seamless deployment platform hosting the Next.js full-stack application", id: "Platform deployment mulus yang meng-host aplikasi full-stack Next.js" } },
        { name: { en: "GitHub", id: "GitHub" }, description: { en: "Version control and CI/CD trigger for automatic deployments", id: "Kontrol versi dan pemicu CI/CD untuk deployment otomatis" } },
      ],
    },
  ],
  features: [
    {
      title: { en: "AI-Powered Curriculum", id: "Kurikulum Bertenaga AI" },
      description: { en: "Input any topic, choose your current skill level and timeframe, and the AI will generate a comprehensive, day-by-day learning roadmap customized just for you.", id: "Masukkan topik apa pun, pilih tingkat keahlian saat ini dan kerangka waktu, dan AI akan menghasilkan peta jalan pembelajaran harian yang komprehensif yang disesuaikan hanya untuk Anda." },
      icon: "fa-brain", color: "bg-purple-500",
    },
    {
      title: { en: "YouTube Video Curation", id: "Kurasi Video YouTube" },
      description: { en: "The system automatically searches and attaches relevant, high-quality YouTube tutorial videos for each specific topic in your daily roadmap.", id: "Sistem secara otomatis mencari dan melampirkan video tutorial YouTube berkualitas tinggi yang relevan untuk setiap topik spesifik di peta jalan harian Anda." },
      icon: "fa-youtube", color: "bg-red-500",
    },
    {
      title: { en: "Progress Tracking", id: "Pelacakan Kemajuan" },
      description: { en: "Interactive dashboard to track your learning journey. Check off daily tasks and watch your overall progress bar fill up as you reach your goals.", id: "Dasbor interaktif untuk melacak perjalanan belajar Anda. Centang tugas harian dan saksikan bilah kemajuan keseluruhan Anda terisi saat Anda mencapai tujuan Anda." },
      icon: "fa-chart-line", color: "bg-green-500",
    },
    {
      title: { en: "Parallel API Processing", id: "Pemrosesan API Paralel" },
      description: { en: "Optimized backend architecture using Promise.all to fetch YouTube resources concurrently, dramatically reducing AI generation wait times.", id: "Arsitektur backend yang dioptimalkan menggunakan Promise.all untuk mengambil sumber daya YouTube secara bersamaan, secara dramatis mengurangi waktu tunggu pembuatan AI." },
      icon: "fa-bolt", color: "bg-yellow-500",
    },
    {
      title: { en: "Secure Authentication", id: "Autentikasi Aman" },
      description: { en: "Full user authentication system built with Auth.js (NextAuth v5), featuring encrypted passwords, protected routes, and custom error handling.", id: "Sistem autentikasi pengguna penuh yang dibangun dengan Auth.js (NextAuth v5), menampilkan kata sandi terenkripsi, rute yang dilindungi, dan penanganan kesalahan khusus." },
      icon: "fa-shield-halved", color: "bg-blue-500",
    },
    {
      title: { en: "Premium WebGL UI", id: "UI WebGL Premium" },
      description: { en: "A stunning, responsive dark mode interface featuring dynamic WebGL (Three.js) background animations that react to scrolling and mouse movements.", id: "Antarmuka mode gelap responsif yang memukau yang menampilkan animasi latar belakang WebGL (Three.js) dinamis yang bereaksi terhadap guliran dan pergerakan mouse." },
      icon: "fa-wand-magic-sparkles", color: "bg-pink-500",
    },
  ],
  gallery: [
    { src: AiStudyPlannerMain, alt: { en: "AI Study Planner Landing Page", id: "Halaman Arahan AI Study Planner" }, caption: { en: "Landing Page — Premium dark UI with interactive WebGL background", id: "Halaman Arahan — UI gelap premium dengan latar belakang WebGL interaktif" } },
    { src: AiStudyPlannerDashboard, alt: { en: "Dashboard page", id: "Halaman dasbor" }, caption: { en: "Dashboard — Overview of all active and completed learning goals", id: "Dasbor — Ringkasan semua tujuan pembelajaran aktif dan yang sudah selesai" } },
    { src: AiStudyPlannerNewGoal, alt: { en: "Create Goal page", id: "Halaman Buat Tujuan" }, caption: { en: "Goal Creation — Input topic, timeframe, and level to generate a roadmap", id: "Pembuatan Tujuan — Masukkan topik, kerangka waktu, dan level untuk menghasilkan peta jalan" } },
    { src: AiStudyPlannerRoadmap, alt: { en: "Roadmap View", id: "Tampilan Peta Jalan" }, caption: { en: "Interactive Roadmap — Day-by-day tasks with curated YouTube video links", id: "Peta Jalan Interaktif — Tugas harian dengan tautan video YouTube yang dikurasi" } },
    { src: AiStudyPlannerLogin, alt: { en: "Login page", id: "Halaman login" }, caption: { en: "Authentication — Clean login and register pages with Auth.js", id: "Autentikasi — Halaman login dan register yang bersih dengan Auth.js" } },
  ],
};

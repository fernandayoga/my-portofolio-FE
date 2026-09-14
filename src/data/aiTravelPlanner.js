// Ai Travel Planner
import etalaseAiTravelPlanner from "../assets/project/ai-travel-planner/etalase ai travel planner.jpeg"
import AiTravelPlannerMain from "../assets/project/ai-travel-planner/AiTravelPlannerMain.png";
import AiTravelPlannerDashboard from "../assets/project/ai-travel-planner/AiTravelPlannerDashboard.png";
import AiTravelPlannerNewTrip from "../assets/project/ai-travel-planner/AiTravelPlannerNewTrip.png";
import AiTravelPlannerItinerary from "../assets/project/ai-travel-planner/AiTravelPlannerItinerary.png";
import AiTravelPlannerLogin from "../assets/project/ai-travel-planner/AiTravelPlannerLogin.png";

export const aiTravelPlanner = {
  id: "ai-travel-planner",
  title: { en: "AI Travel Planner (Wayfare)", id: "AI Travel Planner (Wayfare)" },
  shortDescription: {
    en: "A full-stack Next.js web application that leverages generative AI to instantly craft personalized, day-by-day travel itineraries and detailed budget breakdowns.",
    id: "Aplikasi web Next.js full-stack yang memanfaatkan AI generatif untuk menyusun itinerary perjalanan harian yang dipersonalisasi dan rincian anggaran secara instan."
  },
  category: "web",
  mainImage: AiTravelPlannerMain,
  etalase: etalaseAiTravelPlanner,
  technologies: [
    { name: "Next.js", icon: "fa-brands fa-react", color: "text-white" },
    { name: "Tailwind CSS", icon: "tailwind", color: "text-cyan-500", isCustom: true },
    { name: "MongoDB", icon: "fa-solid fa-database", color: "text-green-400" },
    { name: "Gemini AI", icon: "fa-solid fa-brain", color: "text-blue-500" },
  ],
  sourceCode: "https://github.com/fernandayoga/ai-travel-planner.git", // Sesuaikan dengan link repositori Anda
  liveDemo: "https://ai-travel-planner-demo.vercel.app/", // Sesuaikan jika sudah di-deploy
  introduction: {
    en: "Wayfare (AI Travel Planner) is a modern full-stack travel companion built with Next.js (App Router) and MongoDB. It harnesses the power of Google Gemini AI (OpenAI-compatible endpoints) to automatically generate highly structured, day-by-day travel itineraries based on the user's destination, travel dates, style, and interests. Beyond just schedules, the AI also provides comprehensive budget estimations and packing lists. The application features a clean and premium UI, secure credential-based authentication via NextAuth v5, and an interactive trip management dashboard.",
    id: "Wayfare (AI Travel Planner) adalah pendamping perjalanan full-stack modern yang dibangun dengan Next.js (App Router) dan MongoDB. Aplikasi ini memanfaatkan kekuatan Google Gemini AI (endpoint kompatibel OpenAI) untuk secara otomatis menghasilkan itinerary perjalanan harian yang sangat terstruktur berdasarkan tujuan, tanggal perjalanan, gaya, dan minat pengguna. Selain jadwal, AI juga memberikan estimasi anggaran yang komprehensif dan daftar barang bawaan. Aplikasi ini menampilkan UI premium yang bersih, autentikasi aman berbasis kredensial melalui NextAuth v5, dan dasbor manajemen perjalanan yang interaktif."
  },
  techStack: [
    {
      category: { en: "Frontend", id: "Frontend" },
      items: [
        { name: { en: "Next.js (App Router)", id: "Next.js (App Router)" }, description: { en: "React framework used for seamless client-side navigation and server-side rendering", id: "Framework React yang digunakan untuk navigasi sisi klien yang mulus dan rendering sisi server" } },
        { name: { en: "Tailwind CSS", id: "Tailwind CSS" }, description: { en: "Utility-first CSS framework for building a clean, responsive, and beautiful user interface", id: "Framework CSS utility-first untuk membangun antarmuka pengguna yang bersih, responsif, dan indah" } },
        { name: { en: "Lucide React", id: "Lucide React" }, description: { en: "Clean and consistent SVG icon library used throughout the application", id: "Pustaka ikon SVG yang bersih dan konsisten yang digunakan di seluruh aplikasi" } },
      ],
    },
    {
      category: { en: "Backend", id: "Backend" },
      items: [
        { name: { en: "Next.js API Routes", id: "Rute API Next.js" }, description: { en: "Serverless functions handling database operations and AI model integrations", id: "Fungsi serverless yang menangani operasi database dan integrasi model AI" } },
        { name: { en: "MongoDB Atlas", id: "MongoDB Atlas" }, description: { en: "Cloud-hosted NoSQL database for storing user accounts and generated travel plans", id: "Database NoSQL dihosting cloud untuk menyimpan akun pengguna dan rencana perjalanan yang dihasilkan" } },
        { name: { en: "Mongoose", id: "Mongoose" }, description: { en: "ODM library for schema validation and strictly typing MongoDB trip data", id: "Pustaka ODM untuk validasi skema dan pengetikan ketat data perjalanan MongoDB" } },
        { name: { en: "NextAuth.js (Auth.js v5)", id: "NextAuth.js (Auth.js v5)" }, description: { en: "Robust authentication system featuring secure credential login and protected user sessions", id: "Sistem autentikasi tangguh yang menampilkan login kredensial aman dan sesi pengguna yang dilindungi" } },
        { name: { en: "bcryptjs", id: "bcryptjs" }, description: { en: "Password hashing library for secure user credential storage", id: "Pustaka hashing kata sandi untuk penyimpanan kredensial pengguna yang aman" } },
      ],
    },
    {
      category: { en: "AI Integration", id: "Integrasi AI" },
      items: [
        { name: { en: "Google Gemini AI (3.6 Flash)", id: "Google Gemini AI (3.6 Flash)" }, description: { en: "Fast and intelligent LLM configured to strictly generate complex JSON outputs for itineraries and budget breakdowns", id: "LLM yang cepat dan cerdas yang dikonfigurasi untuk secara ketat menghasilkan output JSON kompleks untuk itinerary dan rincian anggaran" } },
      ],
    },
    {
      category: { en: "Deployment", id: "Deployment" },
      items: [
        { name: { en: "Vercel", id: "Vercel" }, description: { en: "Seamless deployment platform hosting the Next.js full-stack application", id: "Platform deployment mulus yang meng-host aplikasi full-stack Next.js" } },
      ],
    },
  ],
  features: [
    {
      title: { en: "AI-Powered Itinerary", id: "Itinerary Bertenaga AI" },
      description: { en: "Simply input your destination and dates, and the AI will craft a detailed day-by-day travel plan tailored to your specific travel style and interests.", id: "Cukup masukkan tujuan dan tanggal Anda, dan AI akan menyusun rencana perjalanan harian terperinci yang disesuaikan dengan gaya dan minat perjalanan spesifik Anda." },
      icon: "fa-map-location-dot", color: "bg-green-500",
    },
    {
      title: { en: "Smart Budget Estimation", id: "Estimasi Anggaran Cerdas" },
      description: { en: "Automatically calculates and breaks down estimated travel costs including flights, accommodation, food, and activities into your preferred currency.", id: "Secara otomatis menghitung dan merinci perkiraan biaya perjalanan termasuk penerbangan, akomodasi, makanan, dan aktivitas ke dalam mata uang pilihan Anda." },
      icon: "fa-wallet", color: "bg-blue-500",
    },
    {
      title: { en: "Trip Management Dashboard", id: "Dasbor Manajemen Perjalanan" },
      description: { en: "A centralized hub where you can view all your generated trips, edit basic details, request a complete AI regeneration, or delete past plans.", id: "Pusat kendali di mana Anda dapat melihat semua perjalanan yang dihasilkan, mengedit detail dasar, meminta pembuatan ulang AI penuh, atau menghapus rencana masa lalu." },
      icon: "fa-table-columns", color: "bg-purple-500",
    },
    {
      title: { en: "Strict JSON Formatting", id: "Pemformatan JSON Ketat" },
      description: { en: "Engineered prompts utilizing AI's JSON-mode capabilities to ensure the frontend always receives perfectly structured data for rendering.", id: "Prompt rekayasa yang memanfaatkan kemampuan mode JSON AI untuk memastikan frontend selalu menerima data terstruktur sempurna untuk ditampilkan." },
      icon: "fa-code", color: "bg-yellow-500",
    },
    {
      title: { en: "Secure Authentication", id: "Autentikasi Aman" },
      description: { en: "Complete credential-based authentication system built with Auth.js (NextAuth v5), keeping all your upcoming travel plans private and secure.", id: "Sistem autentikasi berbasis kredensial lengkap yang dibangun dengan Auth.js (NextAuth v5), menjaga semua rencana perjalanan Anda yang akan datang tetap pribadi dan aman." },
      icon: "fa-shield-halved", color: "bg-red-500",
    },
  ],
  gallery: [
    { src: AiTravelPlannerMain, alt: { en: "Wayfare Landing Page", id: "Halaman Arahan Wayfare" }, caption: { en: "Landing Page — Clean and inviting marketing page", id: "Halaman Arahan — Halaman pemasaran yang bersih dan mengundang" } },
    { src: AiTravelPlannerDashboard, alt: { en: "Dashboard page", id: "Halaman dasbor" }, caption: { en: "Dashboard — Overview of all planned trips with easy management tools", id: "Dasbor — Ringkasan semua rencana perjalanan dengan alat manajemen yang mudah" } },
    { src: AiTravelPlannerNewTrip, alt: { en: "Plan New Trip page", id: "Halaman Rencanakan Perjalanan Baru" }, caption: { en: "Trip Creation — Multi-step form to input destination, budget, and preferences", id: "Pembuatan Perjalanan — Formulir multi-langkah untuk memasukkan tujuan, anggaran, dan preferensi" } },
    { src: AiTravelPlannerItinerary, alt: { en: "Itinerary View", id: "Tampilan Itinerary" }, caption: { en: "Itinerary Details — Rich view of daily activities, packing list, and budget", id: "Detail Itinerary — Tampilan kaya aktivitas harian, daftar barang bawaan, dan anggaran" } },
    { src: AiTravelPlannerLogin, alt: { en: "Login page", id: "Halaman login" }, caption: { en: "Authentication — Simple and secure login process", id: "Autentikasi — Proses login yang sederhana dan aman" } },
  ],
};

//finance tracker app
import etalaseFinance from "../assets/project/finance-tracker/etalase finance tracker.jpeg"
import FinanceTrackerMain from "../assets/project/finance-tracker/FinanceTrackerMain.png";
import FinanceTrackerTransactions from "../assets/project/finance-tracker/FinanceTrackerTransaction.png";
import FinanceTrackerAnalytics from "../assets/project/finance-tracker/FinanceTrackerAnalytics.png";
import FinanceTrackerCategories from "../assets/project/finance-tracker/FinanceTrackerCategories.png";
import FinanceTrackerChatbot from "../assets/project/finance-tracker/FinanceTrackerChatbot.png";
import FinanceTrackerMobile from "../assets/project/finance-tracker/FinanceTrackerMobile.png";
import FinanceTrackerLogin from "../assets/project/finance-tracker/FinanceTrackerLogin.png";



export const financeTracker = {
    id: "finance-tracker",
    title: { en: "Finance Tracker", id: "Finance Tracker" },
    shortDescription: {
      en: "A personal finance web application built with React and Express. with fiture track income & expenses, visualize spending analytics, and get AI-powered financial insights in one app.",
      id: "Aplikasi web keuangan pribadi yang dibangun dengan React dan Express. Dilengkapi fitur pelacakan pendapatan & pengeluaran, visualisasi analitik pengeluaran, dan wawasan keuangan bertenaga AI dalam satu aplikasi."
    },
    category: "web",
    mainImage: FinanceTrackerMain,
    etalase: etalaseFinance,

    technologies: [
      { name: "React", icon: "fa-brands fa-react", color: "text-blue-400" },
      { name: "Vite", icon: "fa-solid fa-bolt", color: "text-yellow-400" },
      { name: "Tailwind CSS", icon: "tailwind", color: "text-cyan-500", isCustom: true },
      { name: "Express.js", icon: "express", color: "text-gray-400", isCustom: true },
      { name: "MongoDB", icon: "fa-solid fa-database", color: "text-green-400" },
    ],

    sourceCode: "https://github.com/fernandayoga/finance-tracker.git",
    liveDemo: "https://finance-tracker-one-self.vercel.app/",

    introduction: {
      en: "Finance Tracker is a full-stack personal finance web application built with React, Express, and MongoDB. It is designed to help users manage their finances efficiently with a clean and modern dark UI. From tracking daily income and expenses, visualizing spending patterns through interactive charts, managing custom categories, to getting AI-powered financial insights via an integrated chatbot — everything is available in one responsive application accessible on both desktop and mobile devices.",
      id: "Finance Tracker adalah aplikasi web keuangan pribadi full-stack yang dibangun dengan React, Express, dan MongoDB. Aplikasi ini dirancang untuk membantu pengguna mengelola keuangan mereka secara efisien dengan UI gelap yang bersih dan modern. Dari melacak pendapatan dan pengeluaran harian, memvisualisasikan pola pengeluaran melalui grafik interaktif, mengelola kategori khusus, hingga mendapatkan wawasan keuangan bertenaga AI melalui chatbot terintegrasi — semuanya tersedia dalam satu aplikasi responsif yang dapat diakses di desktop maupun perangkat seluler."
    },

    techStack: [
      {
        category: { en: "Frontend", id: "Frontend" },
        items: [
          { name: { en: "React 18", id: "React 18" }, description: { en: "Component-based UI library using hooks and Context API for state management", id: "Pustaka UI berbasis komponen yang menggunakan hooks dan Context API untuk manajemen state" } },
          { name: { en: "Vite 5", id: "Vite 5" }, description: { en: "Modern and fast build tool for development and production", id: "Alat build modern dan cepat untuk pengembangan dan produksi" } },
          { name: { en: "Tailwind CSS 4", id: "Tailwind CSS 4" }, description: { en: "Utility-first CSS framework for responsive and consistent dark theme UI", id: "Framework CSS utility-first untuk UI tema gelap yang responsif dan konsisten" } },
          { name: { en: "Recharts", id: "Recharts" }, description: { en: "Composable charting library for interactive bar charts and pie charts", id: "Pustaka grafik komposable untuk diagram batang dan diagram lingkaran interaktif" } },
          { name: { en: "React Router v6", id: "React Router v6" }, description: { en: "Client-side routing with protected routes for authenticated users", id: "Routing sisi klien dengan rute yang dilindungi untuk pengguna yang terautentikasi" } },
          { name: { en: "Axios", id: "Axios" }, description: { en: "HTTP client with interceptors for automatic JWT token injection and 401 handling", id: "Klien HTTP dengan pencegat (interceptors) untuk injeksi token JWT otomatis dan penanganan 401" } },
          { name: { en: "Font Awesome 6", id: "Font Awesome 6" }, description: { en: "Icon library for consistent and clean UI design", id: "Pustaka ikon untuk desain UI yang konsisten dan bersih" } },
          { name: { en: "Google Fonts (DM Sans)", id: "Google Fonts (DM Sans)" }, description: { en: "Modern and readable sans-serif font for financial data display", id: "Font sans-serif modern dan mudah dibaca untuk tampilan data keuangan" } },
        ],
      },
      {
        category: { en: "Backend", id: "Backend" },
        items: [
          { name: { en: "Node.js", id: "Node.js" }, description: { en: "JavaScript runtime for server-side logic and API development", id: "Lingkungan runtime JavaScript untuk logika sisi server dan pengembangan API" } },
          { name: { en: "Express.js", id: "Express.js" }, description: { en: "Minimal and flexible web framework for building REST APIs", id: "Framework web minimal dan fleksibel untuk membangun REST API" } },
          { name: { en: "MongoDB Atlas", id: "MongoDB Atlas" }, description: { en: "Cloud-hosted NoSQL database for storing users, transactions, and categories", id: "Database NoSQL dihosting cloud untuk menyimpan pengguna, transaksi, dan kategori" } },
          { name: { en: "Mongoose", id: "Mongoose" }, description: { en: "ODM library for MongoDB with schema validation and query building", id: "Pustaka ODM untuk MongoDB dengan validasi skema dan pembuatan kueri" } },
          { name: { en: "JWT (jsonwebtoken)", id: "JWT (jsonwebtoken)" }, description: { en: "Stateless authentication using signed tokens with configurable expiration", id: "Autentikasi stateless menggunakan token yang ditandatangani dengan waktu kedaluwarsa yang dapat dikonfigurasi" } },
          { name: { en: "bcryptjs", id: "bcryptjs" }, description: { en: "Password hashing library for secure user credential storage", id: "Pustaka hashing kata sandi untuk penyimpanan kredensial pengguna yang aman" } },
        ],
      },
      {
        category: { en: "AI Integration", id: "Integrasi AI" },
        items: [
          { name: { en: "Groq API (LLaMA 3.1)", id: "Groq API (LLaMA 3.1)" }, description: { en: "Ultra-fast LLM inference for AI-powered financial chatbot with real-time user data context injection", id: "Inferensi LLM ultra-cepat untuk chatbot keuangan bertenaga AI dengan injeksi konteks data pengguna real-time" } },
        ],
      },
      {
        category: { en: "Deployment", id: "Deployment" },
        items: [
          { name: { en: "Vercel", id: "Vercel" }, description: { en: "Full-stack deployment platform hosting both frontend (static) and backend (serverless functions) in one project", id: "Platform deployment full-stack yang meng-host frontend (statis) dan backend (fungsi serverless) dalam satu proyek" } },
          { name: { en: "GitHub", id: "GitHub" }, description: { en: "Version control and CI/CD trigger for automatic deployment on push", id: "Kontrol versi dan pemicu CI/CD untuk deployment otomatis saat push" } },
        ],
      },
    ],

    features: [
      {
        title: { en: "JWT Authentication", id: "Autentikasi JWT" },
        description: { en: "Secure register and login system with JWT tokens, bcrypt password hashing, and protected routes — unauthenticated users are automatically redirected to the login page.", id: "Sistem registrasi dan login aman dengan token JWT, hashing kata sandi bcrypt, dan rute terlindungi — pengguna yang tidak terautentikasi otomatis diarahkan ke halaman login." },
        icon: "fa-shield-halved", color: "bg-blue-500",
      },
      {
        title: { en: "Transaction Management", id: "Manajemen Transaksi" },
        description: { en: "Add, edit, and delete income and expense transactions with category, date, amount, and note fields. Filter transactions by type and date range.", id: "Tambah, edit, dan hapus transaksi pendapatan dan pengeluaran dengan bidang kategori, tanggal, jumlah, dan catatan. Filter transaksi berdasarkan jenis dan rentang tanggal." },
        icon: "fa-arrow-right-arrow-left", color: "bg-green-500",
      },
      {
        title: { en: "Financial Dashboard", id: "Dasbor Keuangan" },
        description: { en: "Overview of total balance, monthly income, and monthly expenses in real-time with recent transaction cards and quick-add transaction button.", id: "Ringkasan saldo total, pendapatan bulanan, dan pengeluaran bulanan secara real-time dengan kartu transaksi terbaru dan tombol tambah transaksi cepat." },
        icon: "fa-gauge", color: "bg-indigo-500",
      },
      {
        title: { en: "Spending Analytics", id: "Analitik Pengeluaran" },
        description: { en: "Interactive bar chart for income vs expense over the last 12 months and donut pie chart for expense breakdown by category this month.", id: "Diagram batang interaktif untuk pendapatan vs pengeluaran selama 12 bulan terakhir dan diagram lingkaran donat untuk rincian pengeluaran berdasarkan kategori bulan ini." },
        icon: "fa-chart-pie", color: "bg-amber-500",
      },
      {
        title: { en: "Weekly Insights", id: "Wawasan Mingguan" },
        description: { en: "Automatic weekly financial insights — spending trend vs last week, saving rate, top spending category, and most expensive day of the week.", id: "Wawasan keuangan mingguan otomatis — tren pengeluaran vs minggu lalu, tingkat tabungan, kategori pengeluaran teratas, dan hari termahal dalam seminggu." },
        icon: "fa-lightbulb", color: "bg-yellow-500",
      },
      {
        title: { en: "AI Financial Chatbot", id: "Chatbot Keuangan AI" },
        description: { en: "Integrated AI chatbot powered by Groq (LLaMA 3.1) with real-time user financial data as context — ask anything about your finances in natural language.", id: "Chatbot AI terintegrasi yang didukung oleh Groq (LLaMA 3.1) dengan data keuangan pengguna real-time sebagai konteks — tanyakan apa saja tentang keuangan Anda dalam bahasa alami." },
        icon: "fa-robot", color: "bg-purple-500",
      },
      {
        title: { en: "Custom Categories", id: "Kategori Khusus" },
        description: { en: "13 built-in default categories with Font Awesome icons. Users can create and delete their own custom categories for both income and expenses.", id: "13 kategori default bawaan dengan ikon Font Awesome. Pengguna dapat membuat dan menghapus kategori khusus mereka sendiri untuk pendapatan dan pengeluaran." },
        icon: "fa-tag", color: "bg-cyan-500",
      },
      {
        title: { en: "Export CSV", id: "Ekspor CSV" },
        description: { en: "Export all transaction data to CSV file with one click — includes date, type, category, amount, and note for further analysis in spreadsheet tools.", id: "Ekspor semua data transaksi ke file CSV dengan satu klik — mencakup tanggal, jenis, kategori, jumlah, dan catatan untuk analisis lebih lanjut di alat spreadsheet." },
        icon: "fa-file-csv", color: "bg-emerald-500",
      },
      {
        title: { en: "Responsive Design", id: "Desain Responsif" },
        description: { en: "Fully responsive layout — sidebar navigation on desktop and bottom navigation bar on mobile with a clean dark green theme throughout.", id: "Tata letak sepenuhnya responsif — navigasi bilah sisi di desktop dan bilah navigasi bawah di seluler dengan tema hijau gelap yang bersih di seluruh aplikasi." },
        icon: "fa-mobile-screen", color: "bg-red-500",
      },
    ],

    gallery: [
      { src: FinanceTrackerMain, alt: { en: "Finance Tracker dashboard", id: "Dasbor Finance Tracker" }, caption: { en: "Dashboard — Overview of balance, income, expense, and recent transactions", id: "Dasbor — Ringkasan saldo, pendapatan, pengeluaran, dan transaksi terbaru" } },
      { src: FinanceTrackerTransactions, alt: { en: "Transactions page", id: "Halaman transaksi" }, caption: { en: "Transactions — Full list with filter by type and date range", id: "Transaksi — Daftar lengkap dengan filter berdasarkan jenis dan rentang tanggal" } },
      { src: FinanceTrackerAnalytics, alt: { en: "Analytics page", id: "Halaman analitik" }, caption: { en: "Analytics — Bar chart, pie chart, category breakdown, and weekly insights", id: "Analitik — Diagram batang, diagram lingkaran, rincian kategori, dan wawasan mingguan" } },
      { src: FinanceTrackerCategories, alt: { en: "Categories page", id: "Halaman kategori" }, caption: { en: "Categories — Manage default and custom income/expense categories", id: "Kategori — Kelola kategori pendapatan/pengeluaran default dan khusus" } },
      { src: FinanceTrackerChatbot, alt: { en: "AI Chatbot", id: "Chatbot AI" }, caption: { en: "AI Chatbot — Ask anything about your finances powered by Groq LLaMA 3.1", id: "Chatbot AI — Tanyakan apa saja tentang keuangan Anda yang didukung oleh Groq LLaMA 3.1" } },
      { src: FinanceTrackerMobile, alt: { en: "Mobile view", id: "Tampilan seluler" }, caption: { en: "Responsive Design — Mobile view with bottom navigation bar", id: "Desain Responsif — Tampilan seluler dengan bilah navigasi bawah" } },
      { src: FinanceTrackerLogin, alt: { en: "Login page", id: "Halaman login" }, caption: { en: "Authentication — Clean dark login and register pages", id: "Autentikasi — Halaman login dan register gelap yang bersih" } },
    ],
  };

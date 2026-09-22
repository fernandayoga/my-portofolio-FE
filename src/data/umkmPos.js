// UMKM POS & Inventory Management System
import etalaseUmkmPos from "../assets/project/umkm-pos/etalaseUmkmPos.jpeg";
import UmkmPosMain from "../assets/project/umkm-pos/UmkmPosMain.png";
import UmkmPosDashboard from "../assets/project/umkm-pos/UmkmPosDashboard.png";
import UmkmPosPos from "../assets/project/umkm-pos/UmkmPosPos.png";
import UmkmPosAiAssistant from "../assets/project/umkm-pos/UmkmPosAiAssistant.png";
import UmkmPosInventory from "../assets/project/umkm-pos/UmkmPosInventory.png";
import UmkmPosProducts from "../assets/project/umkm-pos/UmkmPosProducts.png";
import UmkmPosReports from "../assets/project/umkm-pos/UmkmPosReports.png";

export const umkmPos = {
  id: "umkm-pos",
  title: { 
    en: "UMKM POS & Inventory System", 
    id: "Sistem POS & Inventori UMKM" 
  },
  shortDescription: {
    en: "A modern full-stack Point of Sale (POS) and inventory management web application tailored for retail MSMEs, featuring an AI business assistant, Cloudinary image upload, and real-time financial reporting.",
    id: "Aplikasi web Point of Sale (POS) dan manajemen inventori full-stack modern untuk UMKM ritel, dilengkapi asisten bisnis AI, upload foto produk Cloudinary, dan laporan keuangan real-time."
  },
  category: "web",
  categoryLabel: { en: "POS Web System", id: "Sistem Web POS" },
  role: { en: "Fullstack Developer", id: "Fullstack Developer" },
  deployment: "Vercel Cloud",
  status: { en: "Production", id: "Produksi" },
  mainImage: UmkmPosMain,
  etalase: etalaseUmkmPos,
  technologies: [
    { name: "Next.js", icon: "fa-brands fa-react", color: "text-white" },
    { name: "Tailwind CSS", icon: "tailwind", color: "text-cyan-500", isCustom: true },
    { name: "MongoDB", icon: "fa-solid fa-database", color: "text-green-400" },
    { name: "OpenRouter AI", icon: "fa-solid fa-robot", color: "text-purple-400" },
  ],
  sourceCode: "https://github.com/fernandayoga/UMKM-Pos.git",
  liveDemo: "https://umkm-pos-delta.vercel.app/",
  introduction: {
    en: "UMKM POS is a full-featured Point of Sale and store management web application built with Next.js 15 (App Router) and MongoDB. It empowers small-to-medium retail businesses to streamline transactions with a responsive 3-column cashier interface, track inventory movements, and record supplier stock-ins and damage adjustments. The application stands out with its integrated AI Business Assistant (via OpenRouter Tool Calling), which analyzes live MongoDB store data to answer stock inquiries and suggest actionable promotional and restocking strategies. Additionally, it provides Cloudinary-backed product photo management with anti-crop scaling, automated profit-margin calculations, and secure role-based access control (Owner vs Cashier).",
    id: "UMKM POS adalah aplikasi web Point of Sale dan manajemen toko ritel modern yang dibangun dengan Next.js 15 (App Router) dan MongoDB. Aplikasi ini memudahkan pelaku UMKM mencatat transaksi kasir lewat grid 3 kolom yang responsif, mengelola mutasi inventori, serta mencatat stok masuk supplier dan penyesuaian barang rusak. Keunggulan utamanya terletak pada AI Business Assistant terintegrasi (via OpenRouter Tool Calling) yang membaca database MongoDB toko secara langsung untuk menjawab pertanyaan stok dan memberikan rekomendasi strategi bisnis faktual. Dilengkapi pula dengan upload foto produk Cloudinary anti-crop, kalkulasi otomatis margin laba kotor, serta hak akses berbasis peran (Owner vs Kasir)."
  },
  techStack: [
    {
      category: { en: "Frontend", id: "Frontend" },
      items: [
        { 
          name: { en: "Next.js 15 (App Router)", id: "Next.js 15 (App Router)" }, 
          description: { 
            en: "React framework leveraging server-side rendering and client components for blazing-fast POS operations", 
            id: "Framework React dengan server-side rendering dan client components untuk transaksi kasir yang sangat cepat" 
          } 
        },
        { 
          name: { en: "Tailwind CSS", id: "Tailwind CSS" }, 
          description: { 
            en: "Utility-first styling with a custom Dark Charcoal Pine & Emerald green enterprise aesthetic", 
            id: "Styling utility-first dengan palet tema Dark Charcoal Pine & Emerald yang elegan dan profesional" 
          } 
        },
        { 
          name: { en: "Recharts", id: "Recharts" }, 
          description: { 
            en: "Composable charting library for visualizing sales trends, gross profit margins, and revenue growth", 
            id: "Library visualisasi grafik untuk tren penjualan harian, margin laba kotor, dan pertumbuhan omzet" 
          } 
        },
        { 
          name: { en: "Lucide React", id: "Lucide React" }, 
          description: { 
            en: "Lightweight and clean icon set for modern POS navigation and cashier actions", 
            id: "Koleksi ikon SVG yang modern, ringan, dan konsisten untuk navigasi kasir" 
          } 
        },
      ],
    },
    {
      category: { en: "Backend & Database", id: "Backend & Database" },
      items: [
        { 
          name: { en: "Next.js Route Handlers", id: "Route Handlers Next.js" }, 
          description: { 
            en: "Robust RESTful API endpoints handling checkout, stock mutations, product CRUD, and AI streaming", 
            id: "Endpoint RESTful API yang menangani alur checkout kasir, mutasi stok, produk, dan chat AI" 
          } 
        },
        { 
          name: { en: "MongoDB Atlas", id: "MongoDB Atlas" }, 
          description: { 
            en: "Scalable cloud NoSQL database storing transactions, products, suppliers, and user sessions", 
            id: "Database NoSQL cloud yang menyimpan data transaksi, katalog produk, supplier, dan sesi pengguna" 
          } 
        },
        { 
          name: { en: "Mongoose ODM", id: "Mongoose ODM" }, 
          description: { 
            en: "Schema-based modeling for rigorous data validation, stock constraints, and sales calculation", 
            id: "Pemodelan skema data untuk validasi stok barang, relasi data, dan kalkulasi penjualan" 
          } 
        },
        { 
          name: { en: "NextAuth.js", id: "NextAuth.js" }, 
          description: { 
            en: "Role-Based Access Control (RBAC) protecting sensitive administrative and financial routes via JWT", 
            id: "Sistem autentikasi berbasis peran (Owner vs Kasir) yang melindungi rute finansial sensitif dengan JWT" 
          } 
        },
        { 
          name: { en: "bcryptjs", id: "bcryptjs" }, 
          description: { 
            en: "Secure one-way password hashing for encrypted staff and owner credentials", 
            id: "Pustaka hashing kata sandi satu arah untuk keamanan akun staf toko" 
          } 
        },
      ],
    },
    {
      category: { en: "AI & Cloud Services", id: "Layanan Cloud & AI" },
      items: [
        { 
          name: { en: "OpenRouter AI (Tool Calling)", id: "OpenRouter AI (Tool Calling)" }, 
          description: { 
            en: "AI Business Assistant executing database tools to provide real-time sales summaries and restocking suggestions", 
            id: "Asisten AI yang mengeksekusi function calling ke database untuk analisis omzet dan saran restok riil" 
          } 
        },
        { 
          name: { en: "Cloudinary API", id: "API Cloudinary" }, 
          description: { 
            en: "Client-side unsigned image upload delivering CDN-hosted, anti-crop product photography", 
            id: "Penyimpanan cloud media gambar produk via unsigned preset dengan tampilan anti-crop proporsional" 
          } 
        },
      ],
    },
    {
      category: { en: "Deployment", id: "Deployment" },
      items: [
        { 
          name: { en: "Vercel", id: "Vercel" }, 
          description: { 
            en: "Production cloud hosting with automatic CI/CD deployment and global edge network", 
            id: "Platform hosting cloud produksi dengan deployment CI/CD otomatis dan CDN global" 
          } 
        },
        { 
          name: { en: "GitHub", id: "GitHub" }, 
          description: { 
            en: "Source code repository and version control management", 
            id: "Repositori kode sumber dan manajemen kontrol versi" 
          } 
        },
      ],
    },
  ],
  features: [
    {
      title: { en: "3-Column POS & Fast Cashier", id: "Kasir Grid 3 Kolom & Transaksi Cepat" },
      description: { 
        en: "Clean 3-column product catalog with direct quantity steppers (+/-), barcode list view, and quick cash calculation with change counter.", 
        id: "Katalog produk 3 kolom yang lega dengan tombol kuantiti langsung (+/-), mode list barcode, dan modal uang pas dengan hitung kembalian otomatis." 
      },
      icon: "fa-cash-register", 
      color: "bg-emerald-500",
    },
    {
      title: { en: "AI Business Assistant", id: "Asisten Bisnis Cerdas (AI)" },
      description: { 
        en: "Built-in AI consultant connected to the live database to evaluate inventory health, calculate daily profits, and recommend promotional bundles.", 
        id: "Asisten AI terhubung langsung ke database toko untuk evaluasi stok kritis, omzet harian, dan saran strategi promosi kasir." 
      },
      icon: "fa-robot", 
      color: "bg-purple-500",
    },
    {
      title: { en: "Cloudinary Image Hosting", id: "Integrasi Gambar Cloudinary" },
      description: { 
        en: "Seamless client-side product photo uploading with intelligent object-contain scaling to prevent awkward portrait or landscape cropping.", 
        id: "Upload foto produk langsung dari browser ke cloud dengan tata letak anti-crop proporsional untuk foto portrait maupun landscape." 
      },
      icon: "fa-cloud-arrow-up", 
      color: "bg-cyan-500",
    },
    {
      title: { en: "Inventory & Stock Movements", id: "Manajemen Inventori & Mutasi" },
      description: { 
        en: "Complete stock management supporting supplier stock-ins, inventory adjustments (damaged, lost, opname), and an audit movement log.", 
        id: "Pencatatan stok komprehensif mulai dari barang masuk supplier, penyesuaian barang rusak/hilang, hingga log riwayat mutasi stok." 
      },
      icon: "fa-boxes-stacked", 
      color: "bg-blue-500",
    },
    {
      title: { en: "Financial Analytics & Reports", id: "Laporan Keuangan & Analitik" },
      description: { 
        en: "Detailed business dashboard featuring revenue tracking, gross profit margin analysis, and a top-selling products leaderboard.", 
        id: "Dasbor finansial lengkap dengan visualisasi omzet, estimasi laba kotor, dan peringkat produk paling laris (best seller)." 
      },
      icon: "fa-chart-line", 
      color: "bg-amber-500",
    },
    {
      title: { en: "Role-Based Access Control", id: "Hak Akses Pengguna (RBAC)" },
      description: { 
        en: "Protected middleware routing separating Owner privileges (full finance & staff management) from Cashier duties (POS & sales).", 
        id: "Pembagian peran aman via middleware yang memisahkan hak akses Owner (laporan penuh & staf) dengan Kasir (POS & transaksi)." 
      },
      icon: "fa-shield-halved", 
      color: "bg-rose-500",
    },
  ],
  gallery: [
    { 
      src: UmkmPosMain, 
      alt: { en: "UMKM POS Overview", id: "Tampilan Utama UMKM POS" }, 
      caption: { 
        en: "Main Overview — POS application with modern Dark Charcoal Pine & Emerald branding", 
        id: "Tampilan Utama — Aplikasi POS modern dengan nuansa tema Dark Charcoal Pine & Emerald" 
      } 
    },
    { 
      src: UmkmPosDashboard, 
      alt: { en: "Analytics Dashboard", id: "Dasbor Analitik Toko" }, 
      caption: { 
        en: "Dashboard — Revenue metrics, gross profit, sales trend chart, and low-stock alerts", 
        id: "Dasbor — Kartu metrik omzet, laba kotor, grafik tren penjualan, dan alarm stok menipis" 
      } 
    },
    { 
      src: UmkmPosPos, 
      alt: { en: "Point of Sale Cashier", id: "Halaman Kasir (POS)" }, 
      caption: { 
        en: "POS Cashier — 3-column product grid with instant cart manipulation and quick cash payment", 
        id: "Kasir POS — Katalog grid 3 kolom dengan kontrol kuantiti instan dan pembayaran tunai cepat" 
      } 
    },
    { 
      src: UmkmPosAiAssistant, 
      alt: { en: "AI Business Assistant Drawer", id: "Drawer AI Business Assistant" }, 
      caption: { 
        en: "AI Assistant — Real-time conversational business advisor querying live MongoDB data", 
        id: "Asisten AI — Konsultan bisnis interaktif yang membaca data riil dari database MongoDB" 
      } 
    },
    { 
      src: UmkmPosProducts, 
      alt: { en: "Product Catalog Management", id: "Katalog & Manajemen Produk" }, 
      caption: { 
        en: "Product Management — SKU tracking, HPP cost price, selling price, and Cloudinary upload", 
        id: "Kelola Produk — Pengaturan SKU, HPP modal, harga jual, dan upload foto Cloudinary" 
      } 
    },
    { 
      src: UmkmPosInventory, 
      alt: { en: "Inventory & Stock Adjustment", id: "Inventori & Penyesuaian Stok" }, 
      caption: { 
        en: "Inventory Control — Supplier stock-ins, damage adjustments, and chronological movement ledger", 
        id: "Kontrol Stok — Pencatatan stok masuk supplier, adjustment barang rusak, dan buku mutasi stok" 
      } 
    },
    { 
      src: UmkmPosReports, 
      alt: { en: "Sales & Financial Reports", id: "Laporan Penjualan & Finansial" }, 
      caption: { 
        en: "Reports — Detailed transaction logs, profit margin breakdown, and best sellers ranking", 
        id: "Laporan — Riwayat transaksi detail, margin keuntungan, dan peringkat produk terlaris" 
      } 
    },
  ],
};
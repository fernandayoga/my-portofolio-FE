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
    title: { en: "Ramadhan App", id: "Aplikasi Ramadhan" },
    pre: { en: "(Ramadhan Edition)", id: "(Edisi Ramadhan)" },
    shortDescription: {
      en: "A Ramadhan web application built with React using an offline-first approach, Prayer times, Al-Qur'an, Qibla direction, worship tracker, and fasting journal in one app.",
      id: "Aplikasi web Ramadhan yang dibangun dengan React menggunakan pendekatan offline-first. Jadwal shalat, Al-Qur'an, arah Kiblat, pelacak ibadah, dan jurnal puasa dalam satu aplikasi."
    },
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

    introduction: {
      en: "Ramadhan App is a Ramadhan web application built with an offline-first approach using React and Vite. It is designed to help Muslims perform their worship during the holy month of Ramadhan with complete, lightweight, and accurate features. From automatic GPS-based prayer times, suhoor & iftar countdown, digital Qibla compass, full 30 Juz Al-Qur'an offline reading, daily fasting journal, to worship tracker. everything is available in one application that can be accessed without an internet connection after the first use.",
      id: "Aplikasi Ramadhan adalah aplikasi web Ramadhan yang dibangun dengan pendekatan offline-first menggunakan React dan Vite. Aplikasi ini dirancang untuk membantu umat Islam dalam menjalankan ibadah selama bulan suci Ramadhan dengan fitur yang lengkap, ringan, dan akurat. Mulai dari jadwal shalat otomatis berbasis GPS, hitung mundur sahur & buka puasa, kompas Kiblat digital, bacaan offline Al-Qur'an 30 Juz penuh, jurnal puasa harian, hingga pelacak ibadah, semuanya tersedia dalam satu aplikasi yang dapat diakses tanpa koneksi internet setelah penggunaan pertama."
    },

    techStack: [
      {
        category: { en: "Frontend", id: "Frontend" },
        items: [
          {
            name: { en: "React 18", id: "React 18" },
            description: {
              en: "Component-based UI library using hooks for state management",
              id: "Library UI berbasis komponen yang menggunakan hooks untuk manajemen state"
            },
          },
          {
            name: { en: "Vite 5", id: "Vite 5" },
            description: {
              en: "Modern and fast build tool for development and production",
              id: "Alat build modern dan cepat untuk pengembangan dan produksi"
            },
          },
          {
            name: { en: "Tailwind CSS 4", id: "Tailwind CSS 4" },
            description: {
              en: "Utility-first CSS framework for responsive and consistent UI",
              id: "Framework CSS utility-first untuk UI yang responsif dan konsisten"
            },
          },
          {
            name: { en: "Font Awesome 6", id: "Font Awesome 6" },
            description: {
              en: "Icon library for informative and clean UI design",
              id: "Pustaka ikon untuk desain UI yang informatif dan bersih"
            },
          },
          {
            name: { en: "Google Fonts (Poppins + Amiri)", id: "Google Fonts (Poppins + Amiri)" },
            description: {
              en: "Poppins for general text and Amiri for Arabic Qur'an text",
              id: "Poppins untuk teks umum dan Amiri untuk teks Al-Qur'an berbahasa Arab"
            },
          },
        ],
      },
      {
        category: { en: "Storage & Offline", id: "Penyimpanan & Offline" },
        items: [
          {
            name: { en: "IndexedDB (idb)", id: "IndexedDB (idb)" },
            description: {
              en: "Large-capacity browser database to permanently store all 114 Surahs of the Qur'an. the API is fetched only once per Surah, then available offline.",
              id: "Database browser berkapasitas besar untuk menyimpan permanen 114 Surah Al-Qur'an. API hanya dipanggil sekali per Surah, kemudian tersedia offline."
            },
          },
          {
            name: { en: "localStorage", id: "localStorage" },
            description: {
              en: "Lightweight storage for small data such as daily prayer times cache, user location, fasting journal, worship tracker, Qur'an bookmarks, and notification preferences.",
              id: "Penyimpanan ringan untuk data kecil seperti cache jadwal shalat harian, lokasi pengguna, jurnal puasa, pelacak ibadah, markah Al-Qur'an, dan preferensi notifikasi."
            },
          },
        ],
      },
      {
        category: { en: "APIs & Integration", id: "API & Integrasi" },
        items: [
          {
            name: { en: "Aladhan API", id: "API Aladhan" },
            description: {
              en: "Free API without API key to fetch five daily prayer times based on GPS coordinates and selected calculation method.",
              id: "API gratis tanpa kunci API untuk mengambil jadwal lima waktu shalat berdasarkan koordinat GPS dan metode perhitungan yang dipilih."
            },
          },
          {
            name: { en: "alquran.cloud API", id: "API alquran.cloud" },
            description: {
              en: "Free API to fetch Arabic Qur'an text along with Indonesian translation per Surah.",
              id: "API gratis untuk mengambil teks Al-Qur'an berbahasa Arab beserta terjemahan bahasa Indonesia per Surah."
            },
          },
          {
            name: { en: "Nominatim OpenStreetMap", id: "Nominatim OpenStreetMap" },
            description: {
              en: "Free reverse geocoding service without API key to convert GPS coordinates into readable city names.",
              id: "Layanan reverse geocoding gratis tanpa kunci API untuk mengonversi koordinat GPS menjadi nama kota yang dapat dibaca."
            },
          },
          {
            name: { en: "Web Geolocation API", id: "Web Geolocation API" },
            description: {
              en: "Built-in browser API to automatically detect user location for prayer times and Qibla direction.",
              id: "API browser bawaan untuk mendeteksi lokasi pengguna secara otomatis untuk jadwal shalat dan arah Kiblat."
            },
          },
          {
            name: { en: "DeviceOrientation API", id: "DeviceOrientation API" },
            description: {
              en: "Built-in browser API to read device gyroscope sensor as a digital compass for Qibla direction.",
              id: "API browser bawaan untuk membaca sensor giroskop perangkat sebagai kompas digital untuk arah Kiblat."
            },
          },
        ],
      },
      {
        category: { en: "Deployment", id: "Deployment" },
        items: [
          {
            name: { en: "Vercel", id: "Vercel" },
            description: {
              en: "Frontend hosting platform for production deployment",
              id: "Platform hosting frontend untuk deployment produksi"
            },
          },
          {
            name: { en: "GitHub", id: "GitHub" },
            description: {
              en: "Version control and project management platform",
              id: "Kontrol versi dan platform manajemen proyek"
            },
          },
        ],
      },
    ],

    features: [
      {
        title: { en: "Automatic Prayer Times", id: "Jadwal Shalat Otomatis" },
        description: {
          en: "Five daily prayer times based on GPS with daily caching — the API is called only once per day. Supports multiple calculation methods including Indonesia's Ministry of Religious Affairs.",
          id: "Jadwal shalat lima waktu berdasarkan GPS dengan cache harian — API hanya dipanggil sekali sehari. Mendukung berbagai metode perhitungan termasuk Kementerian Agama Republik Indonesia."
        },
        icon: "fa-clock",
        color: "bg-blue-500",
      },
      {
        title: { en: "Suhoor & Iftar Countdown", id: "Hitung Mundur Sahur & Berbuka" },
        description: {
          en: "Real-time countdown to suhoor and iftar with automatic status updates — Suhoor Time, Imsak, Fasting Time, or Iftar Time.",
          id: "Hitung mundur real-time untuk sahur dan berbuka dengan pembaruan status otomatis — Waktu Sahur, Imsak, Waktu Berpuasa, atau Waktu Berbuka."
        },
        icon: "fa-moon",
        color: "bg-indigo-500",
      },
      {
        title: { en: "Digital Qibla Direction", id: "Arah Kiblat Digital" },
        description: {
          en: "Digital compass using device gyroscope sensor to show the direction of the Kaaba in real-time, including distance calculation to the Kaaba using the Haversine formula.",
          id: "Kompas digital menggunakan sensor giroskop perangkat untuk menunjukkan arah Ka'bah secara real-time, termasuk perhitungan jarak ke Ka'bah menggunakan formula Haversine."
        },
        icon: "fa-compass",
        color: "bg-emerald-500",
      },
      {
        title: { en: "Offline Al-Qur'an", id: "Al-Qur'an Offline" },
        description: {
          en: "Read all 114 Surahs of the Qur'an with Indonesian translation. Data is cached in IndexedDB — once a Surah is opened for the first time, it is permanently available offline.",
          id: "Baca seluruh 114 Surah Al-Qur'an dengan terjemahan bahasa Indonesia. Data di-cache di IndexedDB — setelah Surah dibuka untuk pertama kalinya, secara permanen akan tersedia offline."
        },
        icon: "fa-book-open",
        color: "bg-amber-500",
      },
      {
        title: { en: "Fasting Journal", id: "Jurnal Puasa" },
        description: {
          en: "Mark daily fasting status with a 30-day Ramadhan visual calendar, add reasons if not fasting, and track overall fasting progress statistics.",
          id: "Tandai status puasa harian dengan kalender visual Ramadhan 30 hari, tambahkan alasan jika tidak berpuasa, dan pantau statistik progres puasa keseluruhan."
        },
        icon: "fa-calendar-day",
        color: "bg-red-500",
      },
      {
        title: { en: "Worship Tracker", id: "Pelacak Ibadah" },
        description: {
          en: "Checklist of 8 daily worship activities — five daily prayers, Tarawih, Qur'an recitation, and charity — including streak tracker, 30-day heatmap, and per-activity statistics.",
          id: "Daftar periksa 8 aktivitas ibadah harian — shalat lima waktu, Tarawih, tadarus Al-Qur'an, dan sedekah — termasuk pelacak beruntun, peta panas 30 hari, dan statistik per aktivitas."
        },
        icon: "fa-list-check",
        color: "bg-cyan-500",
      },
      {
        title: { en: "Offline-First Architecture", id: "Arsitektur Offline-First" },
        description: {
          en: "Most features work without an internet connection — location stored locally, prayer times cached daily, and Qur'an data permanently stored in IndexedDB.",
          id: "Sebagian besar fitur berfungsi tanpa koneksi internet — lokasi disimpan secara lokal, jadwal shalat di-cache setiap hari, dan data Al-Qur'an disimpan permanen di IndexedDB."
        },
        icon: "fa-wifi",
        color: "bg-green-500",
      },
    ],

    gallery: [
      {
        src: mainImageRamadhan,
        alt: { en: "Ramadhan App homepage", id: "Beranda Ramadhan App" },
        caption: {
          en: "Homepage — Hero section with countdown and prayer time information",
          id: "Beranda — Bagian hero dengan informasi hitung mundur dan jadwal shalat"
        },
      },
      {
        src: prayerImage,
        alt: { en: "Prayer times page", id: "Halaman jadwal shalat" },
        caption: { en: "Prayer Times — Daily schedule with active time highlight", id: "Jadwal Shalat — Jadwal harian dengan penyorotan waktu aktif" },
      },
      {
        src: iftarImage,
        alt: { en: "Suhoor and iftar page", id: "Halaman sahur dan berbuka" },
        caption: { en: "Suhoor & Iftar — Real-time countdown to suhoor and iftar", id: "Sahur & Berbuka — Hitung mundur real-time untuk sahur dan berbuka puasa" },
      },
      {
        src: quranImage,
        alt: { en: "Qur'an page", id: "Halaman Al-Qur'an" },
        caption: { en: "Al-Qur'an — Read all 114 Surahs with offline translation", id: "Al-Qur'an — Baca 114 Surah dengan terjemahan offline" },
      },
      {
        src: qiblaImage,
        alt: { en: "Qibla direction page", id: "Halaman arah Kiblat" },
        caption: { en: "Qibla Direction — Digital compass using device sensors", id: "Arah Kiblat — Kompas digital menggunakan sensor perangkat" },
      },
      {
        src: fastingImage,
        alt: { en: "Daily fasting page", id: "Halaman puasa harian" },
        caption: { en: "Fasting Journal — Mark daily fasting status", id: "Jurnal Puasa — Tandai status puasa harian" },
      },
      {
        src: trackerImage,
        alt: { en: "Worship tracker page", id: "Halaman pelacak ibadah" },
        caption: { en: "Worship Tracker — Checklist of 8 daily worship activities", id: "Pelacak Ibadah — Daftar periksa 8 aktivitas ibadah harian" },
      },
      {
        src: mobileViewRmdhn,
        alt: { en: "Mobile view", id: "Tampilan seluler" },
        caption: { en: "Responsive Design — Mobile view with bottom navigation", id: "Desain Responsif — Tampilan seluler dengan navigasi bawah" },
      },
    ],
  };

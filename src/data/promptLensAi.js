import PromptLensMain from "../assets/project/promplens/main.png";
import etalasePromptLens from "../assets/project/promplens/etalase.jpeg";
import PromptLensGenerate from "../assets/project/promplens/generate.png";
import PromptLensAnalysis from "../assets/project/promplens/analysis.png";


export const promptLensAi = {
  id: "promptlens",
  title: { en: "PromptLens AI", id: "PromptLens AI" },
  shortDescription: {
    en: "A full-stack web application that turns any reference image into a detailed, ready-to-use AI image-generation prompt using OpenRouter vision models — with mode and detail-level controls, visual analysis, and one-click export.",
    id: "Aplikasi web full-stack yang mengubah gambar referensi apa pun menjadi prompt pembuatan gambar AI yang terperinci dan siap pakai menggunakan model visi OpenRouter — dengan kontrol mode dan tingkat detail, analisis visual, dan ekspor sekali klik."
  },
  category: "web",
  mainImage: PromptLensMain,
  etalase: etalasePromptLens,
  technologies: [
    { name: "React", icon: "fa-brands fa-react", color: "text-blue-400" },
    { name: "Tailwind CSS", icon: "tailwind", color: "text-cyan-500", isCustom: true },
    { name: "Express", icon: "fa-brands fa-node-js", color: "text-green-500" },
    { name: "OpenRouter", icon: "fa-solid fa-robot", color: "text-white" },
  ],
  sourceCode: "https://github.com/fernandayoga/promptlens.git",
  liveDemo: "https://promptlens.vercel.app/",
  introduction: {
    en: "PromptLens AI is a modern full-stack tool built with React (Vite) on the frontend and an Express backend proxy. It lets users upload a reference image, pick a prompt mode (General, Photorealistic, Cinematic, Artistic, Product Photography) and a detail level (Concise, Detailed, Ultra), then uses an OpenRouter vision model to generate a structured, reusable image-generation prompt. The backend keeps the OpenRouter API key server-side so it never reaches the browser bundle. Images are compressed in-browser before being sent, and the result comes with a visual analysis panel and a heuristic completeness score.",
    id: "PromptLens AI adalah alat full-stack modern yang dibangun dengan React (Vite) di frontend dan proxy backend Express. Aplikasi ini memungkinkan pengguna mengunggah gambar referensi, memilih mode prompt (Umum, Fotorealistis, Sinematik, Artistik, Fotografi Produk) dan tingkat detail (Ringkas, Terperinci, Ultra), lalu menggunakan model visi OpenRouter untuk menghasilkan prompt pembuatan gambar yang terstruktur dan dapat digunakan kembali. Backend menyimpan kunci API OpenRouter di sisi server sehingga tidak pernah mencapai bundel browser. Gambar dikompresi di dalam browser sebelum dikirim, dan hasilnya dilengkapi dengan panel analisis visual dan skor kelengkapan heuristik."
  },
  techStack: [
    {
      category: { en: "Frontend", id: "Frontend" },
      items: [
        { name: { en: "React 18", id: "React 18" }, description: { en: "Component-based UI with a custom useImagePrompt state machine for the generation flow", id: "UI berbasis komponen dengan mesin state useImagePrompt khusus untuk alur pembuatan" } },
        { name: { en: "Vite 5", id: "Vite 5" }, description: { en: "Fast dev server with HMR and a production build that the Express backend serves", id: "Server pengembangan cepat dengan HMR dan build produksi yang dilayani oleh backend Express" } },
        { name: { en: "Tailwind CSS 4", id: "Tailwind CSS 4" }, description: { en: "Utility-first styling via the @tailwindcss/vite plugin for a clean, responsive dark UI", id: "Penataan gaya utility-first melalui plugin @tailwindcss/vite untuk UI gelap yang bersih dan responsif" } },
      ],
    },
    {
      category: { en: "Backend", id: "Backend" },
      items: [
        { name: { en: "Node.js + Express", id: "Node.js + Express" }, description: { en: "Lightweight proxy server that forwards requests to OpenRouter and serves the built SPA", id: "Server proxy ringan yang meneruskan permintaan ke OpenRouter dan melayani SPA yang telah di-build" } },
        { name: { en: "dotenv", id: "dotenv" }, description: { en: "Loads OPENROUTER_API_KEY and site config from environment, never exposed to the client", id: "Memuat OPENROUTER_API_KEY dan konfigurasi situs dari lingkungan, tidak pernah terekspos ke klien" } },
      ],
    },
    {
      category: { en: "AI & External APIs", id: "API AI & Eksternal" },
      items: [
        { name: { en: "OpenRouter (Vision Models)", id: "OpenRouter (Model Visi)" }, description: { en: "LLaMA/Gemini-class vision models return structured JSON (prompt + analysis) from the uploaded image", id: "Model visi sekelas LLaMA/Gemini mengembalikan JSON terstruktur (prompt + analisis) dari gambar yang diunggah" } },
      ],
    },
    {
      category: { en: "Deployment", id: "Deployment" },
      items: [
        { name: { en: "Vercel", id: "Vercel" }, description: { en: "Full-stack deployment platform hosting both the frontend UI and serverless backend API functions", id: "Platform deployment full-stack yang meng-host UI frontend dan fungsi API backend serverless" } },
        { name: { en: "GitHub", id: "GitHub" }, description: { en: "Version control and CI/CD trigger for automatic deployments", id: "Kontrol versi dan pemicu CI/CD untuk deployment otomatis" } },
      ],
    },
  ],
  features: [
    {
      title: { en: "AI Image Analysis", id: "Analisis Gambar AI" },
      description: { en: "Upload a reference image (drag & drop or file picker) and the vision model extracts visual elements to craft a reusable generation prompt.", id: "Unggah gambar referensi (seret & lepas atau pemilih file) dan model visi akan mengekstrak elemen visual untuk menyusun prompt pembuatan yang dapat digunakan kembali." },
      icon: "fa-eye", color: "bg-purple-500",
    },
    {
      title: { en: "Prompt Modes", id: "Mode Prompt" },
      description: { en: "Switch between General, Photorealistic, Cinematic, Artistic, and Product Photography modes to steer the prompt style.", id: "Beralih antara mode Umum, Fotorealistis, Sinematik, Artistik, dan Fotografi Produk untuk mengarahkan gaya prompt." },
      icon: "fa-sliders", color: "bg-blue-500",
    },
    {
      title: { en: "Detail Levels", id: "Tingkat Detail" },
      description: { en: "Choose Concise, Detailed, or Ultra Detailed output density to match how much control you want over the result.", id: "Pilih kepadatan output Ringkas, Terperinci, atau Sangat Terperinci agar sesuai dengan seberapa besar kontrol yang Anda inginkan atas hasilnya." },
      icon: "fa-layer-group", color: "bg-cyan-500",
    },
    {
      title: { en: "Visual Analysis Panel", id: "Panel Analisis Visual" },
      description: { en: "See a breakdown of subject, composition, lighting, style, mood, and colors the AI used to build the prompt.", id: "Lihat rincian subjek, komposisi, pencahayaan, gaya, suasana hati, dan warna yang digunakan AI untuk membangun prompt." },
      icon: "fa-chart-pie", color: "bg-green-500",
    },
    {
      title: { en: "Export & Regenerate", id: "Ekspor & Buat Ulang" },
      description: { en: "Copy the prompt to clipboard, download it as .txt, or instantly regenerate a fresh take on the same image.", id: "Salin prompt ke clipboard, unduh sebagai .txt, atau langsung buat ulang pengambilan baru pada gambar yang sama." },
      icon: "fa-copy", color: "bg-yellow-500",
    },
    {
      title: { en: "Secure Backend Proxy", id: "Proxy Backend Aman" },
      description: { en: "The OpenRouter API key stays server-side; the browser only ever calls /api/generate-prompt, so the key is never in the bundle.", id: "Kunci API OpenRouter tetap berada di sisi server; browser hanya memanggil /api/generate-prompt, sehingga kunci tersebut tidak pernah ada dalam bundel." },
      icon: "fa-shield-halved", color: "bg-red-500",
    },
  ],
  gallery: [
    { src: PromptLensMain, alt: { en: "PromptLens AI Landing Page", id: "Halaman Arahan PromptLens AI" }, caption: { en: "Landing Page — hero, uploader, and how-it-works panel", id: "Halaman Arahan — pahlawan, pengunggah, dan panel cara kerja" } },
    { src: PromptLensGenerate, alt: { en: "Generate Prompt view", id: "Tampilan Hasilkan Prompt" }, caption: { en: "Generate — pick mode & detail level, then run the analysis", id: "Hasilkan — pilih mode & tingkat detail, lalu jalankan analisis" } },
    { src: PromptLensAnalysis, alt: { en: "Result & Analysis view", id: "Tampilan Hasil & Analisis" }, caption: { en: "Result — generated prompt with completeness score and analysis panel", id: "Hasil — prompt yang dihasilkan dengan skor kelengkapan dan panel analisis" } },
  ],
};

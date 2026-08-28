import PromptLensMain from "../assets/project/promplens/main.png";
import etalasePromptLens from "../assets/project/promplens/etalase.jpeg";
import PromptLensGenerate from "../assets/project/promplens/generate.png";
import PromptLensAnalysis from "../assets/project/promplens/analysis.png";


export const promptLensAi = {
  id: "promptlens",
  title: "PromptLens AI",

  shortDescription:
    "A full-stack web application that turns any reference image into a detailed, ready-to-use AI image-generation prompt using OpenRouter vision models — with mode and detail-level controls, visual analysis, and one-click export.",
  category: "web",
  mainImage: PromptLensMain,
  etalase: etalasePromptLens,
  technologies: [
    { name: "React", icon: "fa-brands fa-react", color: "text-blue-400" },
    {
      name: "Tailwind CSS",
      icon: "tailwind",
      color: "text-cyan-500",
      isCustom: true,
    },
    {
      name: "Express",
      icon: "fa-brands fa-node-js",
      color: "text-green-500",
    },
    {
      name: "OpenRouter",
      icon: "fa-solid fa-robot",
      color: "text-white",
    },
  ],

  // TODO: ganti dengan URL repo & deploy asli kamu
  sourceCode: "https://github.com/fernandayoga/promptlens.git",
  liveDemo: "https://promptlens.vercel.app/",

  introduction:
    "PromptLens AI is a modern full-stack tool built with React (Vite) on the frontend and an Express backend proxy. It lets users upload a reference image, pick a prompt mode (General, Photorealistic, Cinematic, Artistic, Product Photography) and a detail level (Concise, Detailed, Ultra), then uses an OpenRouter vision model to generate a structured, reusable image-generation prompt. The backend keeps the OpenRouter API key server-side so it never reaches the browser bundle. Images are compressed in-browser before being sent, and the result comes with a visual analysis panel and a heuristic completeness score.",

  techStack: [
    {
      category: "Frontend",
      items: [
        {
          name: "React 18",
          description:
            "Component-based UI with a custom useImagePrompt state machine for the generation flow",
        },
        {
          name: "Vite 5",
          description:
            "Fast dev server with HMR and a production build that the Express backend serves",
        },
        {
          name: "Tailwind CSS 4",
          description:
            "Utility-first styling via the @tailwindcss/vite plugin for a clean, responsive dark UI",
        },
      ],
    },
    {
      category: "Backend",
      items: [
        {
          name: "Node.js + Express",
          description:
            "Lightweight proxy server that forwards requests to OpenRouter and serves the built SPA",
        },
        {
          name: "dotenv",
          description:
            "Loads OPENROUTER_API_KEY and site config from environment, never exposed to the client",
        },
      ],
    },
    {
      category: "AI & External APIs",
      items: [
        {
          name: "OpenRouter (Vision Models)",
          description:
            "LLaMA/Gemini-class vision models return structured JSON (prompt + analysis) from the uploaded image",
        },
      ],
    },
    {
      category: "Deployment",
      items: [
        {
          name: "Vercel",
          description:
            "Full-stack deployment platform hosting both the frontend UI and serverless backend API functions",
        },
        {
          name: "GitHub",
          description:
            "Version control and CI/CD trigger for automatic deployments",
        },
      ],
    },
  ],

  features: [
    {
      title: "AI Image Analysis",
      description:
        "Upload a reference image (drag & drop or file picker) and the vision model extracts visual elements to craft a reusable generation prompt.",
      icon: "fa-eye",
      color: "bg-purple-500",
    },
    {
      title: "Prompt Modes",
      description:
        "Switch between General, Photorealistic, Cinematic, Artistic, and Product Photography modes to steer the prompt style.",
      icon: "fa-sliders",
      color: "bg-blue-500",
    },
    {
      title: "Detail Levels",
      description:
        "Choose Concise, Detailed, or Ultra Detailed output density to match how much control you want over the result.",
      icon: "fa-layer-group",
      color: "bg-cyan-500",
    },
    {
      title: "Visual Analysis Panel",
      description:
        "See a breakdown of subject, composition, lighting, style, mood, and colors the AI used to build the prompt.",
      icon: "fa-chart-pie",
      color: "bg-green-500",
    },
    {
      title: "Export & Regenerate",
      description:
        "Copy the prompt to clipboard, download it as .txt, or instantly regenerate a fresh take on the same image.",
      icon: "fa-copy",
      color: "bg-yellow-500",
    },
    {
      title: "Secure Backend Proxy",
      description:
        "The OpenRouter API key stays server-side; the browser only ever calls /api/generate-prompt, so the key is never in the bundle.",
      icon: "fa-shield-halved",
      color: "bg-red-500",
    },
  ],

  gallery: [
    {
      src: PromptLensMain,
      alt: "PromptLens AI Landing Page",
      caption: "Landing Page — hero, uploader, and how-it-works panel",
    },
    {
      src: PromptLensGenerate,
      alt: "Generate Prompt view",
      caption: "Generate — pick mode & detail level, then run the analysis",
    },
    {
      src: PromptLensAnalysis,
      alt: "Result & Analysis view",
      caption: "Result — generated prompt with completeness score and analysis panel",
    },
    
  ],
};

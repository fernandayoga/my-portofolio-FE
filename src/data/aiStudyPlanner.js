//Ai Study Planner
import etalaseAiStudyPlanner from "../assets/project/ai-study-planner/etalase ai study planner.jpeg"
import AiStudyPlannerMain from "../assets/project/ai-study-planner/AiStudyPlannerMain.png";
import AiStudyPlannerDashboard from "../assets/project/ai-study-planner/AiStudyPlannerDashboard.png";
import AiStudyPlannerNewGoal from "../assets/project/ai-study-planner/AiStudyPlannerNewGoal.png";
import AiStudyPlannerRoadmap from "../assets/project/ai-study-planner/AiStudyPlannerRoadmap.png";
import AiStudyPlannerLogin from "../assets/project/ai-study-planner/AiStudyPlannerLogin.png";




export const aiStudyPlanner = {
  id: "ai-study-planner",
  title: "AI Study Planner",

  shortDescription:
    "A full-stack Next.js web application that leverages AI to generate personalized, day-by-day study roadmaps and automatically curates YouTube video tutorials for each task.",
  category: "web",
  mainImage: AiStudyPlannerMain, // Pastikan kamu sudah meng-import variabel gambar ini
  etalase: etalaseAiStudyPlanner,
  technologies: [
    { name: "Next.js", icon: "fa-brands fa-react", color: "text-white" },
    {
      name: "Tailwind CSS",
      icon: "tailwind",
      color: "text-cyan-500",
      isCustom: true,
    },
    {
      name: "MongoDB",
      icon: "fa-solid fa-database",
      color: "text-green-400",
    },
    {
      name: "Three.js",
      icon: "fa-solid fa-cube",
      color: "text-gray-300",
    },
  ],

  sourceCode: "https://github.com/fernandayoga/Ai-Study-Plan.git",
  liveDemo: "https://ai-study-plan-chi.vercel.app/", // Sesuaikan jika URL Vercel kamu berbeda

  introduction:
    "AI Study Planner is a modern, full-stack learning companion built with Next.js (App Router) and MongoDB. It leverages the power of Groq AI (LLaMA 3.1) to automatically generate structured, day-by-day study curriculums tailored to the user's specific goals, duration, and current skill level. Beyond generating tasks, it utilizes the YouTube Data API to fetch relevant tutorial videos for every single learning step. The application features a stunning dark mode UI with interactive WebGL (Three.js) backgrounds, secure authentication via NextAuth v5, and an intuitive progress tracking system.",

  techStack: [
    {
      category: "Frontend",
      items: [
        {
          name: "Next.js 15 (App Router)",
          description:
            "React framework used for both client-side UI and server-side rendering",
        },
        {
          name: "Tailwind CSS 4",
          description:
            "Utility-first CSS framework for responsive and beautiful premium dark theme UI",
        },
        {
          name: "Three.js",
          description:
            "WebGL library used for the dynamic, interactive ColorBends background animation",
        },
        {
          name: "Lucide React",
          description: "Clean and consistent SVG icon library",
        },
      ],
    },
    {
      category: "Backend",
      items: [
        {
          name: "Next.js API Routes",
          description:
            "Serverless functions handling backend logic, database operations, and API integrations",
        },
        {
          name: "MongoDB Atlas",
          description:
            "Cloud-hosted NoSQL database for storing users, learning goals, and roadmaps",
        },
        {
          name: "Mongoose",
          description:
            "ODM library for MongoDB schema validation and data modeling",
        },
        {
          name: "NextAuth.js (Auth.js v5)",
          description:
            "Secure authentication system with credentials provider and protected routes",
        },
        {
          name: "bcryptjs",
          description:
            "Password hashing library for secure user credential storage",
        },
      ],
    },
    {
      category: "AI & External APIs",
      items: [
        {
          name: "Groq API (LLaMA 3.1)",
          description:
            "Lightning-fast LLM inference used to generate structured, personalized learning roadmaps in JSON format",
        },
        {
          name: "YouTube Data API v3",
          description:
            "Automatically fetches the most relevant tutorial videos concurrently for every generated study task",
        },
      ],
    },
    {
      category: "Deployment",
      items: [
        {
          name: "Vercel",
          description:
            "Seamless deployment platform hosting the Next.js full-stack application",
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
      title: "AI-Powered Curriculum",
      description:
        "Input any topic, choose your current skill level and timeframe, and the AI will generate a comprehensive, day-by-day learning roadmap customized just for you.",
      icon: "fa-brain",
      color: "bg-purple-500",
    },
    {
      title: "YouTube Video Curation",
      description:
        "The system automatically searches and attaches relevant, high-quality YouTube tutorial videos for each specific topic in your daily roadmap.",
      icon: "fa-youtube",
      color: "bg-red-500",
    },
    {
      title: "Progress Tracking",
      description:
        "Interactive dashboard to track your learning journey. Check off daily tasks and watch your overall progress bar fill up as you reach your goals.",
      icon: "fa-chart-line",
      color: "bg-green-500",
    },
    {
      title: "Parallel API Processing",
      description:
        "Optimized backend architecture using Promise.all to fetch YouTube resources concurrently, dramatically reducing AI generation wait times.",
      icon: "fa-bolt",
      color: "bg-yellow-500",
    },
    {
      title: "Secure Authentication",
      description:
        "Full user authentication system built with Auth.js (NextAuth v5), featuring encrypted passwords, protected routes, and custom error handling.",
      icon: "fa-shield-halved",
      color: "bg-blue-500",
    },
    {
      title: "Premium WebGL UI",
      description:
        "A stunning, responsive dark mode interface featuring dynamic WebGL (Three.js) background animations that react to scrolling and mouse movements.",
      icon: "fa-wand-magic-sparkles",
      color: "bg-pink-500",
    },
  ],

  gallery: [
    {
      src: AiStudyPlannerMain, // Jangan lupa buat dan import variabel ini
      alt: "AI Study Planner Landing Page",
      caption:
        "Landing Page — Premium dark UI with interactive WebGL background",
    },
    {
      src: AiStudyPlannerDashboard, // Jangan lupa buat dan import variabel ini
      alt: "Dashboard page",
      caption: "Dashboard — Overview of all active and completed learning goals",
    },
    {
      src: AiStudyPlannerNewGoal, // Jangan lupa buat dan import variabel ini
      alt: "Create Goal page",
      caption:
        "Goal Creation — Input topic, timeframe, and level to generate a roadmap",
    },
    {
      src: AiStudyPlannerRoadmap, // Jangan lupa buat dan import variabel ini
      alt: "Roadmap View",
      caption:
        "Interactive Roadmap — Day-by-day tasks with curated YouTube video links",
    },
    {
      src: AiStudyPlannerLogin, // Jangan lupa buat dan import variabel ini
      alt: "Login page",
      caption: "Authentication — Clean login and register pages with Auth.js",
    },
  ],
};

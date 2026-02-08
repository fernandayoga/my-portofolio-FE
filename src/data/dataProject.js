//portofolio
import mainImagePort from "../assets/project/porto/mainImage.png";
import lightImagePort from "../assets/project/porto/lightMode.png";
import askBot from "../assets/project/porto/askBot.png";

import githubAnalytics from "../assets/project/porto/githubAnalitic.png";
import mobileView from "../assets/project/porto/mobileDevice.png";

export const projects = [
  {
    id: "personal-portfolio",
    title: "Personal Portfolio Website",
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

    sourceCode: "https://github.com/username/personal-portfolio",
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

  // Tambahkan project lain di sini
];

// Helper function untuk get project by ID
export const getProjectById = (id) => {
  return projects.find((project) => project.id === id);
};

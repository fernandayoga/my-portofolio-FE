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
    title: "Finance Tracker",

    shortDescription:
      "A personal finance web application built with React and Express. with fiture track income & expenses, visualize spending analytics, and get AI-powered financial insights in one app.",
    category: "web",
    mainImage: FinanceTrackerMain,
    etalase: etalaseFinance,

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
        name: "Express.js",
        icon: "express",
        color: "text-gray-400",
        isCustom: true,
      },
      {
        name: "MongoDB",
        icon: "fa-solid fa-database",
        color: "text-green-400",
      },
    ],

    sourceCode: "https://github.com/fernandayoga/finance-tracker.git",
    liveDemo: "https://finance-tracker-one-self.vercel.app/",

    introduction:
      "Finance Tracker is a full-stack personal finance web application built with React, Express, and MongoDB. It is designed to help users manage their finances efficiently with a clean and modern dark UI. From tracking daily income and expenses, visualizing spending patterns through interactive charts, managing custom categories, to getting AI-powered financial insights via an integrated chatbot — everything is available in one responsive application accessible on both desktop and mobile devices.",

    techStack: [
      {
        category: "Frontend",
        items: [
          {
            name: "React 18",
            description:
              "Component-based UI library using hooks and Context API for state management",
          },
          {
            name: "Vite 5",
            description:
              "Modern and fast build tool for development and production",
          },
          {
            name: "Tailwind CSS 4",
            description:
              "Utility-first CSS framework for responsive and consistent dark theme UI",
          },
          {
            name: "Recharts",
            description:
              "Composable charting library for interactive bar charts and pie charts",
          },
          {
            name: "React Router v6",
            description:
              "Client-side routing with protected routes for authenticated users",
          },
          {
            name: "Axios",
            description:
              "HTTP client with interceptors for automatic JWT token injection and 401 handling",
          },
          {
            name: "Font Awesome 6",
            description: "Icon library for consistent and clean UI design",
          },
          {
            name: "Google Fonts (DM Sans)",
            description:
              "Modern and readable sans-serif font for financial data display",
          },
        ],
      },
      {
        category: "Backend",
        items: [
          {
            name: "Node.js",
            description:
              "JavaScript runtime for server-side logic and API development",
          },
          {
            name: "Express.js",
            description:
              "Minimal and flexible web framework for building REST APIs",
          },
          {
            name: "MongoDB Atlas",
            description:
              "Cloud-hosted NoSQL database for storing users, transactions, and categories",
          },
          {
            name: "Mongoose",
            description:
              "ODM library for MongoDB with schema validation and query building",
          },
          {
            name: "JWT (jsonwebtoken)",
            description:
              "Stateless authentication using signed tokens with configurable expiration",
          },
          {
            name: "bcryptjs",
            description:
              "Password hashing library for secure user credential storage",
          },
        ],
      },
      {
        category: "AI Integration",
        items: [
          {
            name: "Groq API (LLaMA 3.1)",
            description:
              "Ultra-fast LLM inference for AI-powered financial chatbot with real-time user data context injection",
          },
        ],
      },
      {
        category: "Deployment",
        items: [
          {
            name: "Vercel",
            description:
              "Full-stack deployment platform hosting both frontend (static) and backend (serverless functions) in one project",
          },
          {
            name: "GitHub",
            description:
              "Version control and CI/CD trigger for automatic deployment on push",
          },
        ],
      },
    ],

    features: [
      {
        title: "JWT Authentication",
        description:
          "Secure register and login system with JWT tokens, bcrypt password hashing, and protected routes — unauthenticated users are automatically redirected to the login page.",
        icon: "fa-shield-halved",
        color: "bg-blue-500",
      },
      {
        title: "Transaction Management",
        description:
          "Add, edit, and delete income and expense transactions with category, date, amount, and note fields. Filter transactions by type and date range.",
        icon: "fa-arrow-right-arrow-left",
        color: "bg-green-500",
      },
      {
        title: "Financial Dashboard",
        description:
          "Overview of total balance, monthly income, and monthly expenses in real-time with recent transaction cards and quick-add transaction button.",
        icon: "fa-gauge",
        color: "bg-indigo-500",
      },
      {
        title: "Spending Analytics",
        description:
          "Interactive bar chart for income vs expense over the last 12 months and donut pie chart for expense breakdown by category this month.",
        icon: "fa-chart-pie",
        color: "bg-amber-500",
      },
      {
        title: "Weekly Insights",
        description:
          "Automatic weekly financial insights — spending trend vs last week, saving rate, top spending category, and most expensive day of the week.",
        icon: "fa-lightbulb",
        color: "bg-yellow-500",
      },
      {
        title: "AI Financial Chatbot",
        description:
          "Integrated AI chatbot powered by Groq (LLaMA 3.1) with real-time user financial data as context — ask anything about your finances in natural language.",
        icon: "fa-robot",
        color: "bg-purple-500",
      },
      {
        title: "Custom Categories",
        description:
          "13 built-in default categories with Font Awesome icons. Users can create and delete their own custom categories for both income and expenses.",
        icon: "fa-tag",
        color: "bg-cyan-500",
      },
      {
        title: "Export CSV",
        description:
          "Export all transaction data to CSV file with one click — includes date, type, category, amount, and note for further analysis in spreadsheet tools.",
        icon: "fa-file-csv",
        color: "bg-emerald-500",
      },
      {
        title: "Responsive Design",
        description:
          "Fully responsive layout — sidebar navigation on desktop and bottom navigation bar on mobile with a clean dark green theme throughout.",
        icon: "fa-mobile-screen",
        color: "bg-red-500",
      },
    ],

    gallery: [
      {
        src: FinanceTrackerMain,
        alt: "Finance Tracker dashboard",
        caption:
          "Dashboard — Overview of balance, income, expense, and recent transactions",
      },
      {
        src: FinanceTrackerTransactions,
        alt: "Transactions page",
        caption: "Transactions — Full list with filter by type and date range",
      },
      {
        src: FinanceTrackerAnalytics,
        alt: "Analytics page",
        caption:
          "Analytics — Bar chart, pie chart, category breakdown, and weekly insights",
      },
      {
        src: FinanceTrackerCategories,
        alt: "Categories page",
        caption:
          "Categories — Manage default and custom income/expense categories",
      },
      {
        src: FinanceTrackerChatbot,
        alt: "AI Chatbot",
        caption:
          "AI Chatbot — Ask anything about your finances powered by Groq LLaMA 3.1",
      },
      {
        src: FinanceTrackerMobile,
        alt: "Mobile view",
        caption: "Responsive Design — Mobile view with bottom navigation bar",
      },
      {
        src: FinanceTrackerLogin,
        alt: "Login page",
        caption: "Authentication — Clean dark login and register pages",
      },
    ],
  };

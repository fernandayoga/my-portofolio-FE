import { useTranslation } from "react-i18next";


export const projects = [
  {
    id: "web-parfum",
    title: 'Web Parfum E-Commerce',
    shortDescription: 'Modern e-commerce platform for perfume shopping with advanced filtering and payment integration.',
    category : "web",
    mainImage: '/images/projects/web-parfum/main.png',
    technologies: [
      { name: 'React', icon: 'fa-brands fa-react', color: 'text-blue-400' },
      { name: 'Node.js', icon: 'fa-brands fa-node', color: 'text-green-600' },
      { name: 'MongoDB', icon: 'fa-solid fa-leaf', color: 'text-green-500' },
      { name: 'Tailwind', icon: 'tailwind', color: 'text-cyan-500', isCustom: true },
    ],
    sourceCode: 'https://github.com/username/web-parfum',
    liveDemo: 'https://web-parfum.vercel.app',
    
    introduction: 'Web Parfum is a full-stack e-commerce platform designed specifically for perfume enthusiasts. Built with modern web technologies, it provides a seamless shopping experience with advanced product filtering, secure payment integration, and real-time inventory management. The platform focuses on user experience with intuitive navigation, detailed product information, and responsive design that works perfectly across all devices.',
    
    techStack: [
      {
        category: 'Frontend',
        items: [
          { name: 'React 18', description: 'Modern UI library with hooks and context' },
          { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
          { name: 'React Router', description: 'Client-side routing' },
          { name: 'Axios', description: 'HTTP client for API calls' },
        ],
      },
      {
        category: 'Backend',
        items: [
          { name: 'Node.js', description: 'JavaScript runtime environment' },
          { name: 'Express.js', description: 'Web application framework' },
          { name: 'MongoDB', description: 'NoSQL database' },
          { name: 'JWT', description: 'Authentication & authorization' },
        ],
      },
      {
        category: 'Tools & Services',
        items: [
          { name: 'Midtrans', description: 'Payment gateway integration' },
          { name: 'Cloudinary', description: 'Image hosting & optimization' },
          { name: 'Vercel', description: 'Deployment & hosting' },
        ],
      },
    ],
    
    features: [
      {
        title: 'Advanced Product Filtering',
        description: 'Users can filter products by brand, price range, fragrance notes, and category. Smart search functionality helps users find their perfect perfume quickly.',
        icon: 'fa-filter',
        color: 'bg-blue-500',
      },
      {
        title: 'Secure Payment Integration',
        description: 'Integrated with Midtrans payment gateway supporting multiple payment methods including credit cards, bank transfers, and e-wallets.',
        icon: 'fa-credit-card',
        color: 'bg-green-500',
      },
      {
        title: 'User Authentication',
        description: 'Secure JWT-based authentication system with password hashing, email verification, and password reset functionality.',
        icon: 'fa-lock',
        color: 'bg-purple-500',
      },
      {
        title: 'Shopping Cart & Wishlist',
        description: 'Persistent shopping cart and wishlist functionality that syncs across devices. Users can save items for later and manage quantities easily.',
        icon: 'fa-shopping-cart',
        color: 'bg-orange-500',
      },
      {
        title: 'Order Management',
        description: 'Complete order tracking system from placement to delivery. Users can view order history, track shipments, and download invoices.',
        icon: 'fa-box',
        color: 'bg-red-500',
      },
      {
        title: 'Admin Dashboard',
        description: 'Comprehensive admin panel for managing products, orders, users, and analytics. Includes inventory management and sales reporting.',
        icon: 'fa-chart-line',
        color: 'bg-indigo-500',
      },
    ],
    
    gallery: [
      '/images/projects/web-parfum/screenshot-1.png',
      '/images/projects/web-parfum/screenshot-2.png',
      '/images/projects/web-parfum/screenshot-3.png',
    ],
  },
  
  // Tambahkan project lain di sini
];

// Helper function untuk get project by ID
export const getProjectById = (id) => {
  return projects.find(project => project.id === id);
};
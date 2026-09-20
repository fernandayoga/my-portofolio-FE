// Utility functions for theme-based styling (Primary: #D4F933, Neutral: #0A0A0C, Secondary: #F3F4F6)

export const bgClass = (isDarkMode) => 
  isDarkMode ? 'bg-[#121216]' : 'bg-white';

export const bgSecondaryClass = (isDarkMode) => 
  isDarkMode ? 'bg-[#181920]' : 'bg-[#F3F4F6]';

export const textClass = (isDarkMode) => 
  isDarkMode ? 'text-[#F3F4F6]' : 'text-[#0A0A0C]';

export const textSecondaryClass = (isDarkMode) => 
  isDarkMode ? 'text-[#9ca3af]' : 'text-[#4b5563]';

export const textMutedClass = (isDarkMode) => 
  isDarkMode ? 'text-[#6b7280]' : 'text-[#9ca3af]';

export const borderClass = (isDarkMode) => 
  isDarkMode ? 'border-white/[0.08]' : 'border-black/[0.08]';

export const cardClass = (isDarkMode) => 
  `${bgClass(isDarkMode)} ${borderClass(isDarkMode)} border rounded-xl`;

export const hoverClass = (isDarkMode) => 
  isDarkMode ? 'hover:bg-[#181920] hover:border-[#D4F933]/30' : 'hover:bg-[#f8fafc] hover:border-black/[0.12]';

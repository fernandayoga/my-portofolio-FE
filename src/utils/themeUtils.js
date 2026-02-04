// Utility functions for theme-based styling

export const bgClass = (isDarkMode) => 
  isDarkMode ? 'bg-gray-900' : 'bg-white';

export const bgSecondaryClass = (isDarkMode) => 
  isDarkMode ? 'bg-gray-800' : 'bg-gray-50';

export const textClass = (isDarkMode) => 
  isDarkMode ? 'text-white' : 'text-gray-900';

export const textSecondaryClass = (isDarkMode) => 
  isDarkMode ? 'text-gray-300' : 'text-gray-600';

export const textMutedClass = (isDarkMode) => 
  isDarkMode ? 'text-gray-400' : 'text-gray-500';

export const borderClass = (isDarkMode) => 
  isDarkMode ? 'border-gray-800' : 'border-gray-200';

export const cardClass = (isDarkMode) => 
  `${bgClass(isDarkMode)} ${borderClass(isDarkMode)} border rounded-xl`;

export const hoverClass = (isDarkMode) => 
  isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100';

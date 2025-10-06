import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      const darkMode = savedTheme === 'dark';
      setIsDark(darkMode);
      updateTheme(darkMode);
    } else {
      setIsDark(prefersDark);
      updateTheme(prefersDark);
    }
  }, []);

  const updateTheme = (darkMode: boolean) => {
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
      root.style.setProperty('--bg-primary', '#111827');
      root.style.setProperty('--bg-secondary', '#1f2937');
      root.style.setProperty('--text-primary', '#f9fafb');
      root.style.setProperty('--text-secondary', '#d1d5db');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f8fafc');
      root.style.setProperty('--text-primary', '#1f2937');
      root.style.setProperty('--text-secondary', '#6b7280');
    }
  };

  useEffect(() => {
    updateTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-20 right-6 z-50 w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center group ${
        isDark 
          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg shadow-yellow-500/30' 
          : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg shadow-gray-800/30'
      }`}
    >
      {isDark ? (
        <Sun className="h-6 w-6 group-hover:animate-spin transition-transform duration-300" />
      ) : (
        <Moon className="h-6 w-6 group-hover:animate-pulse transition-transform duration-300" />
      )}
      <div className={`absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity ${
        isDark ? 'bg-yellow-400' : 'bg-gray-800'
      }`}></div>
    </button>
  );
};

export default ThemeToggle;
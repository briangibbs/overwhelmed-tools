import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <button
      onClick={toggleTheme}
      className={`p-3 rounded-lg transition-all duration-200 ${
        theme === 'dark' 
          ? 'bg-brand-gold/20 hover:bg-brand-gold/30' 
          : 'bg-brand-primary/10 hover:bg-brand-primary/20'
      }`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-6 w-6 text-brand-gold" />
      ) : (
        <Moon className="h-6 w-6 text-brand-primary" />
      )}
    </button>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
  return (
    <header className={`${
      theme === 'dark' 
        ? 'bg-gradient-to-r from-brand-secondary to-brand-primary text-white'
        : 'bg-gradient-to-r from-brand-gold/20 to-brand-primary/10 text-brand-primary'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className={`h-8 w-8 ${theme === 'dark' ? 'text-white' : 'text-brand-primary'}`} />
            <div className="flex flex-col">
              <span className="text-2xl font-bold">AI Tools Hub</span>
              <span className={`text-xs ${theme === 'dark' ? 'text-brand-gold' : 'text-brand-secondary'}`}>
                From Overwhelmed to Optimized
              </span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/readiness" className="hover:text-brand-gold transition">Assessment</Link>
            <Link to="/roadmap" className="hover:text-brand-gold transition">Roadmap</Link>
            <Link to="/tasks" className="hover:text-brand-gold transition">Tasks</Link>
            <Link to="/roi" className="hover:text-brand-gold transition">ROI</Link>
            <Link to="/marketing" className="hover:text-brand-gold transition">Marketing</Link>
            <Link to="/tool-finder/search" className="hover:text-brand-gold transition">Tools</Link>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <a 
              href="https://calendly.com/ai-consultation"
              target="_blank"
              rel="noopener noreferrer" 
              className={`px-4 py-2 rounded-lg hover:bg-opacity-90 transition ${
                theme === 'dark'
                  ? 'bg-brand-gold text-brand-dark'
                  : 'bg-brand-primary text-white'
              }`}
            >
              Book Consultation
            </a>
          </div>
          
          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </div>
    </header>
  );
}
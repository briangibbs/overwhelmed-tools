import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <div className="bg-gradient-to-b from-brand-secondary to-brand-dark text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="h-12 w-12 animate-pulse text-brand-gold" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Transform Your Business with AI
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-brand-neutral">
          Discover powerful AI tools and strategies to revolutionize your business operations
          and drive growth.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="bg-brand-gold text-brand-dark px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center space-x-2">
            <span>Explore Tools</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
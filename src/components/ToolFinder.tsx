import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';

export default function ToolFinder() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement AI tool search logic here
    setResults([
      'ChatGPT - Conversational AI',
      'Midjourney - AI Image Generation',
      'Jasper - AI Writing Assistant',
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">AI Tool Finder</h2>
        <p className="text-brand-neutral">Discover the perfect AI tools for your needs</p>
      </div>

      <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe your needs or challenges..."
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brand-gold text-brand-dark p-2 rounded-lg hover:bg-opacity-90 transition"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Recommended Tools</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((tool, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-white/10 hover:bg-white/15 transition cursor-pointer"
              >
                <h4 className="font-semibold">{tool}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  status: string;
  onClick: () => void;
  active: boolean;
}

export default function ToolCard({
  name,
  description,
  icon: Icon,
  tags,
  status,
  onClick,
  active
}: ToolCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all hover:bg-white/10 ${
        active ? 'ring-2 ring-brand-gold' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-brand-gold/20 rounded-lg">
          <Icon className="h-6 w-6 text-brand-gold" />
        </div>
        <span className={`text-sm px-3 py-1 rounded-full ${
          status === 'Premium' 
            ? 'bg-brand-gold/20 text-brand-gold' 
            : 'bg-brand-secondary/20 text-brand-secondary'
        }`}>
          {status}
        </span>
      </div>

      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-brand-neutral mb-4">{description}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-full bg-white/10 text-brand-neutral"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
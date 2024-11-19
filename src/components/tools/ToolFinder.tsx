import React from 'react';
import { Brain, Calculator, Map, LineChart, BarChart2, CheckSquare, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const tools = [
  {
    title: 'AI Readiness Assessment',
    description: 'Evaluate your organization\'s preparedness for AI implementation.',
    icon: CheckSquare,
    path: '/readiness',
    tags: ['Assessment', 'Planning', 'Readiness']
  },
  {
    title: 'Interactive AI Tool Finder',
    description: 'Find the perfect AI tools for your business needs.',
    icon: Search,
    path: '/tool-finder/search',
    tags: ['Discovery', 'Selection', 'Tools']
  },
  {
    title: 'ROI Calculator',
    description: 'Calculate potential returns and make informed decisions about your AI investments.',
    icon: Calculator,
    path: '/roi',
    tags: ['Finance', 'Analysis', 'Planning']
  },
  {
    title: 'AI Roadmap',
    description: 'Get a customized implementation plan for your business.',
    icon: Map,
    path: '/roadmap',
    tags: ['Planning', 'Strategy', 'Implementation']
  },
  {
    title: 'Task Calendar',
    description: 'Stay on track with your AI implementation journey.',
    icon: LineChart,
    path: '/tasks',
    tags: ['Tasks', 'Management', 'Productivity']
  },
  {
    title: 'Marketing Tracker',
    description: 'Track and optimize your AI-powered marketing efforts.',
    icon: BarChart2,
    path: '/marketing',
    tags: ['Marketing', 'Analytics', 'Optimization']
  }
].sort((a, b) => a.title.localeCompare(b.title));

export default function ToolFinder() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3 text-skin-primary">From Overwhelmed to Optimized</h2>
        <p className="text-skin-secondary text-lg">Your AI implementation toolkit</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <Link
            key={index}
            to={tool.path}
            className="bg-skin-secondary rounded-xl p-6 hover:bg-skin-accent transition transform hover:-translate-y-1 border border-skin-accent group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-brand-primary/10 rounded-lg">
                <tool.icon className="h-6 w-6 text-brand-gold" />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-skin-primary mb-3 group-hover:text-brand-dark">{tool.title}</h3>
            <p className="text-skin-secondary mb-4 group-hover:text-brand-dark/80">{tool.description}</p>

            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-xs px-3 py-1 rounded-full bg-skin-primary/10 text-skin-secondary group-hover:bg-brand-dark/10 group-hover:text-brand-dark/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
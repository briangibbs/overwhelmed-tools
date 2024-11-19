import React, { useState } from 'react';
import { Brain, Bot, LineChart, Sparkles, MessageSquare, Video, Music, Mic, Pen, BookOpen, FileText, Info } from 'lucide-react';

interface Tool {
  name: string;
  description: string;
  category: string;
  tags: string[];
  icon: typeof Brain;
  url?: string;
}

const aiTools: Tool[] = [
  {
    name: 'Chatbase',
    description: 'Create custom AI chatbots trained on your data',
    category: 'Productivity',
    tags: ['Chatbot', 'Customer Service', 'Lead Generation'].sort(),
    icon: MessageSquare,
    url: 'https://www.chatbase.co/?via=brian-gibbs'
  },
  {
    name: 'ChatGPT',
    description: 'Advanced AI chatbot for customer service and content generation',
    category: 'Productivity',
    tags: ['Automation', 'Content Creation', 'Customer Service'].sort(),
    icon: MessageSquare,
    url: 'https://chatgpt.com/'
  },
  {
    name: 'Claude.ai',
    description: 'Advanced AI assistant for analysis, writing, and coding tasks',
    category: 'Productivity',
    tags: ['Analysis', 'Content Creation', 'Programming'].sort(),
    icon: Brain,
    url: 'https://claude.ai/'
  },
  {
    name: 'DataSense AI',
    description: 'Business intelligence and predictive analytics platform',
    category: 'Operations',
    tags: ['Analytics', 'Decision Making', 'Forecasting'].sort(),
    icon: LineChart
  },
  {
    name: 'Descript',
    description: 'AI-powered video editing and transcription platform',
    category: 'Video',
    tags: ['Content Creation', 'Transcription', 'Video Editing'].sort(),
    icon: Video,
    url: 'https://www.descript.com/'
  },
  {
    name: 'Frase.io',
    description: 'AI-powered SEO and content optimization platform',
    category: 'Writing',
    tags: ['Content Creation', 'Research', 'SEO'].sort(),
    icon: Pen,
    url: 'https://www.frase.io/?via=brian33'
  },
  {
    name: 'Jasper AI',
    description: 'AI-powered writing assistant for marketing content',
    category: 'Writing',
    tags: ['Content Creation', 'Copywriting', 'Marketing'].sort(),
    icon: Pen,
    url: 'https://www.jasper.ai/'
  },
  {
    name: 'Make.com',
    description: 'Visual automation platform for connecting apps and workflows',
    category: 'Operations',
    tags: ['Automation', 'Integration', 'Workflow'].sort(),
    icon: Bot,
    url: 'https://www.make.com/en/register?pc=brian'
  },
  {
    name: 'Murf AI',
    description: 'AI voice generation and text-to-speech platform',
    category: 'Audio',
    tags: ['Text-to-Speech', 'Voice Synthesis', 'Voiceovers'].sort(),
    icon: Mic,
    url: 'https://get.murf.ai/8hplmwudx5xa'
  },
  {
    name: 'NEURONwriter',
    description: 'AI-powered content optimization and SEO writing platform',
    category: 'Writing',
    tags: ['Content Creation', 'SEO', 'Writing'].sort(),
    icon: Pen,
    url: 'https://app.neuronwriter.com/ar/e3ac42f13fa6540b3982d4131e55baae'
  },
  {
    name: 'NotebookLM',
    description: 'AI-powered note-taking and research assistant by Google',
    category: 'Productivity',
    tags: ['Notes', 'Research', 'Summarization'].sort(),
    icon: BookOpen,
    url: 'https://notebooklm.google.com/'
  },
  {
    name: 'Notion AI',
    description: 'AI-enhanced workspace for notes, docs, and collaboration',
    category: 'Productivity',
    tags: ['Notes', 'Collaboration', 'Organization'].sort(),
    icon: FileText,
    url: 'https://affiliate.notion.so/woiwg4wc2eli'
  },
  {
    name: 'Play.ht',
    description: 'Most realistic AI voice generator and text-to-speech platform',
    category: 'Audio',
    tags: ['Text-to-Speech', 'Voice Generation', 'Content Creation'].sort(),
    icon: Mic,
    url: 'https://www.play.ht/?via=brian-gibbs'
  },
  {
    name: 'Soundraw',
    description: 'AI music generation for content creators',
    category: 'Audio',
    tags: ['Background Music', 'Music Creation', 'Soundtrack'].sort(),
    icon: Music
  },
  {
    name: 'Suno',
    description: 'AI-powered music creation and song generation platform',
    category: 'Audio',
    tags: ['Music Creation', 'Song Generation', 'Composition'].sort(),
    icon: Music,
    url: 'https://suno.com/invite/@briangibbs'
  },
  {
    name: 'Zapier',
    description: 'Automated workflow and business process optimization',
    category: 'Operations',
    tags: ['Automation', 'Integration', 'Workflow'].sort(),
    icon: Bot,
    url: 'https://zapier.com/'
  }
].sort((a, b) => a.name.localeCompare(b.name));

export default function ToolSearch() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(aiTools.map(tool => tool.category))].sort();

  const filteredTools = selectedCategory === 'all' 
    ? aiTools 
    : aiTools.filter(tool => tool.category === selectedCategory);

  const handleToolClick = (tool: Tool) => {
    if (tool.url) {
      window.open(tool.url, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3 text-skin-primary">Interactive AI Tool Finder</h2>
        <p className="text-skin-secondary text-lg">Discover the perfect AI tools for your business needs</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-center flex-wrap gap-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg transition ${
                selectedCategory === category
                  ? 'bg-brand-gold text-brand-dark'
                  : 'bg-skin-secondary text-skin-primary hover:bg-skin-accent hover:text-brand-dark'
              }`}
            >
              {category === 'all' ? 'All Tools' : category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTools.map((tool, index) => (
            <div
              key={index}
              onClick={() => handleToolClick(tool)}
              className={`bg-skin-secondary rounded-xl p-6 hover:bg-skin-accent transition group border border-skin-accent ${
                tool.url ? 'cursor-pointer' : ''
              }`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 bg-brand-gold/20 rounded-lg">
                  <tool.icon className="h-6 w-6 text-brand-gold" />
                </div>
                <h3 className="text-xl font-semibold text-skin-primary group-hover:text-brand-dark">{tool.name}</h3>
              </div>
              <p className="text-skin-secondary group-hover:text-brand-dark/80 mb-4">{tool.description}</p>
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
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center space-x-2 text-sm text-skin-secondary mt-8 bg-skin-primary/30 p-3 rounded-lg">
          <Info className="h-4 w-4" />
          <p>Some links include affiliate codes. We may earn a commission at no additional cost to you.</p>
        </div>
      </div>
    </div>
  );
}
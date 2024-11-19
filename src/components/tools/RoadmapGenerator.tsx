import React, { useState } from 'react';
import { Map, CheckCircle, Download, Building2, Briefcase, Plus } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const industries = [
  'Construction',
  'Education',
  'E-commerce',
  'Finance',
  'Healthcare',
  'Manufacturing',
  'Professional Services',
  'Real Estate',
  'Retail',
  'SaaS',
  'Technology'
].sort();

const businessSizes = [
  'Startup (1-10 employees)',
  'Small (11-50 employees)',
  'Medium (51-200 employees)',
  'Large (201-500 employees)',
  'Enterprise (500+ employees)'
];

const implementationGoals = [
  'Automate Customer Service',
  'Enhance Data Analytics',
  'Improve Decision Making',
  'Increase Operational Efficiency',
  'Optimize Marketing Campaigns',
  'Reduce Operational Costs',
  'Scale Business Processes'
].sort();

// Task templates by goal
const taskTemplates = {
  'Automate Customer Service': [
    'Map current customer service workflows',
    'Identify automation opportunities in support processes',
    'Select AI chatbot platform',
    'Design conversation flows and responses',
    'Train AI on company-specific knowledge base'
  ],
  'Enhance Data Analytics': [
    'Audit existing data sources and quality',
    'Define key metrics and reporting needs',
    'Select AI analytics tools',
    'Set up data pipelines and integrations',
    'Create automated reporting dashboards'
  ],
  'Improve Decision Making': [
    'Identify critical decision points in operations',
    'Map data requirements for decision support',
    'Implement predictive analytics models',
    'Design decision support dashboards',
    'Train team on AI-assisted decision making'
  ],
  'Increase Operational Efficiency': [
    'Document current operational bottlenecks',
    'Identify processes for AI automation',
    'Select process automation tools',
    'Design new AI-enhanced workflows',
    'Monitor and optimize automated processes'
  ],
  'Optimize Marketing Campaigns': [
    'Analyze current marketing performance',
    'Select AI marketing tools',
    'Set up audience segmentation',
    'Implement AI-driven content creation',
    'Configure automated campaign optimization'
  ],
  'Reduce Operational Costs': [
    'Conduct cost analysis of current operations',
    'Identify high-cost processes for AI optimization',
    'Implement cost-tracking analytics',
    'Deploy resource optimization models',
    'Monitor and report cost savings'
  ],
  'Scale Business Processes': [
    'Document scalability bottlenecks',
    'Design AI-enhanced scaling strategy',
    'Implement automated scaling triggers',
    'Set up performance monitoring',
    'Create scaling playbooks'
  ]
};

// Industry-specific considerations
const industryConsiderations = {
  'Construction': {
    compliance: 'Safety regulations and building codes',
    focus: 'Project management and resource optimization'
  },
  'Education': {
    compliance: 'Student data privacy and educational standards',
    focus: 'Learning outcomes and student engagement'
  },
  'E-commerce': {
    compliance: 'Payment security and consumer protection',
    focus: 'Customer experience and inventory management'
  },
  'Finance': {
    compliance: 'Financial regulations and data security',
    focus: 'Risk management and fraud detection'
  },
  'Healthcare': {
    compliance: 'HIPAA and patient data protection',
    focus: 'Patient care and medical records'
  },
  'Manufacturing': {
    compliance: 'Quality standards and safety regulations',
    focus: 'Production efficiency and quality control'
  },
  'Professional Services': {
    compliance: 'Client confidentiality and industry standards',
    focus: 'Service delivery and client management'
  },
  'Real Estate': {
    compliance: 'Property laws and regulations',
    focus: 'Property management and client service'
  },
  'Retail': {
    compliance: 'Consumer protection and payment security',
    focus: 'Customer experience and inventory'
  },
  'SaaS': {
    compliance: 'Data protection and service availability',
    focus: 'User experience and service scaling'
  },
  'Technology': {
    compliance: 'Data security and privacy regulations',
    focus: 'Innovation and scalability'
  }
};

export default function RoadmapGenerator() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [businessSize, setBusinessSize] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [roadmapGenerated, setRoadmapGenerated] = useState(false);
  const [customRoadmap, setCustomRoadmap] = useState<any[]>([]);

  const handleGoalToggle = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const generateCustomRoadmap = () => {
    if (!businessName || !industry || !businessSize || selectedGoals.length === 0) return;

    const industryInfo = industryConsiderations[industry as keyof typeof industryConsiderations];
    
    // Phase 1: Assessment & Planning
    const assessmentTasks = [
      `Document ${businessName}'s current processes and pain points`,
      `Review ${industry}-specific compliance requirements: ${industryInfo.compliance}`,
      `Define AI implementation objectives focusing on ${industryInfo.focus}`,
      'Create stakeholder communication plan'
    ];

    // Phase 2: Tool Selection & Setup
    const setupTasks = selectedGoals.flatMap(goal => {
      const goalTasks = taskTemplates[goal as keyof typeof taskTemplates];
      return goalTasks.filter((_, index) => index < 2); // Take first 2 tasks from each goal
    });

    // Phase 3: Implementation
    const implementationTasks = selectedGoals.flatMap(goal => {
      const goalTasks = taskTemplates[goal as keyof typeof taskTemplates];
      return goalTasks.filter((_, index) => index >= 2 && index < 4); // Take next 2 tasks
    });

    // Phase 4: Optimization
    const optimizationTasks = selectedGoals.flatMap(goal => {
      const goalTasks = taskTemplates[goal as keyof typeof taskTemplates];
      return goalTasks.filter((_, index) => index === 4); // Take last task
    });

    const customizedRoadmap = [
      {
        title: 'Assessment & Planning',
        days: '1-3',
        tasks: assessmentTasks
      },
      {
        title: 'Tool Selection & Setup',
        days: '4-7',
        tasks: [...new Set(setupTasks)]
      },
      {
        title: 'Implementation',
        days: '8-11',
        tasks: [...new Set(implementationTasks)]
      },
      {
        title: 'Optimization & Scaling',
        days: '12-15',
        tasks: [...new Set(optimizationTasks)]
      }
    ];

    setCustomRoadmap(customizedRoadmap);
    localStorage.setItem('aiRoadmap', JSON.stringify(customizedRoadmap));
    setRoadmapGenerated(true);
  };

  const downloadPDF = () => {
    const element = document.getElementById('roadmap-content');
    if (!element) return;

    const opt = {
      margin: 1,
      filename: `${businessName.toLowerCase().replace(/\s+/g, '-')}-ai-roadmap.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3 text-skin-primary">15-Day AI Implementation Roadmap</h2>
        <p className="text-skin-secondary text-lg">Create your personalized AI implementation journey</p>
      </div>

      <div className="max-w-4xl mx-auto bg-skin-secondary p-6 rounded-xl border border-skin-accent">
        <div className="grid gap-6">
          <div>
            <label className="block text-skin-primary mb-2">Business Name</label>
            <div className="relative">
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-skin-primary border border-skin-accent text-skin-primary"
                placeholder="Enter your business name"
              />
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-skin-secondary" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-skin-primary mb-2">Industry</label>
              <div className="relative">
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-skin-primary border border-skin-accent text-skin-primary appearance-none"
                >
                  <option value="">Select Industry</option>
                  {industries.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-skin-secondary" />
              </div>
            </div>

            <div>
              <label className="block text-skin-primary mb-2">Business Size</label>
              <div className="relative">
                <select
                  value={businessSize}
                  onChange={(e) => setBusinessSize(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-skin-primary border border-skin-accent text-skin-primary appearance-none"
                >
                  <option value="">Select Business Size</option>
                  {businessSizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-skin-secondary" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-skin-primary mb-2">Implementation Goals</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {implementationGoals.map(goal => (
                <button
                  key={goal}
                  onClick={() => handleGoalToggle(goal)}
                  className={`flex items-center space-x-2 p-2 rounded-lg transition ${
                    selectedGoals.includes(goal)
                      ? 'bg-brand-gold text-brand-dark'
                      : 'bg-skin-primary text-skin-primary hover:bg-skin-accent'
                  }`}
                >
                  <CheckCircle className={`h-5 w-5 ${
                    selectedGoals.includes(goal) ? 'text-brand-dark' : 'text-brand-gold'
                  }`} />
                  <span>{goal}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateCustomRoadmap}
            disabled={!businessName || !industry || !businessSize || selectedGoals.length === 0}
            className="w-full py-3 bg-brand-gold text-brand-dark rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            <Map className="h-5 w-5" />
            <span>Generate Roadmap</span>
          </button>
        </div>

        {roadmapGenerated && (
          <div id="roadmap-content" className="mt-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-skin-primary">
                AI Implementation Roadmap for {businessName}
              </h3>
              <button
                onClick={downloadPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-brand-secondary text-white rounded-lg hover:bg-opacity-90 transition"
              >
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </button>
            </div>

            <div className="grid gap-4">
              {customRoadmap.map((phase, index) => (
                <div
                  key={index}
                  className="p-4 bg-skin-primary rounded-lg border border-skin-accent"
                >
                  <h4 className="font-semibold text-skin-primary mb-3">
                    {phase.title} (Days {phase.days})
                  </h4>
                  <ul className="space-y-2">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start space-x-2 text-skin-secondary">
                        <CheckCircle className="h-5 w-5 text-brand-gold mt-0.5" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
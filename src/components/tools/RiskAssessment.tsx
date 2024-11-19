import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const industries = [
  'Healthcare & Medical',
  'Financial Services',
  'Technology',
  'Retail & E-commerce',
  'Manufacturing',
  'Education',
  'Government',
  'Insurance',
  'Telecommunications',
  'Transportation & Logistics'
];

const aiRiskAreas = [
  'Data Privacy & Security',
  'Algorithm Bias',
  'Regulatory Compliance',
  'System Reliability',
  'Integration Risk',
  'Operational Impact',
  'User Adoption',
  'Vendor Dependencies',
  'Cost Management',
  'Performance Monitoring'
];

export default function RiskAssessment() {
  const [industry, setIndustry] = useState('');
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);

  const handleRiskToggle = (risk: string) => {
    setSelectedRisks(prev => 
      prev.includes(risk) 
        ? prev.filter(r => r !== risk)
        : [...prev, risk]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-6 text-brand-primary">AI Risk Assessment</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-brand-primary mb-2">
            Industry
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-secondary"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            <option value="">Select industry</option>
            {industries.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-primary mb-2">
            Risk Assessment Areas
          </label>
          <div className="space-y-2">
            {aiRiskAreas.map(risk => (
              <button
                key={risk}
                onClick={() => handleRiskToggle(risk)}
                className={`flex items-center space-x-2 w-full p-2 rounded ${
                  selectedRisks.includes(risk)
                    ? 'bg-brand-secondary text-white'
                    : 'bg-brand-dark/5 text-brand-primary hover:bg-brand-dark/10'
                }`}
              >
                <CheckCircle className={`h-5 w-5 ${
                  selectedRisks.includes(risk) ? 'text-brand-gold' : 'text-brand-secondary'
                }`} />
                <span>{risk}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-brand-dark/5 rounded-lg border border-brand-secondary/20">
            <div className="flex items-center space-x-2 text-brand-secondary mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Risk Factors</span>
            </div>
            <ul className="space-y-2 text-sm text-brand-primary">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-brand-secondary rounded-full"></span>
                <span>Data handling compliance requirements</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-brand-secondary rounded-full"></span>
                <span>AI decision-making transparency</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-brand-secondary rounded-full"></span>
                <span>System integration challenges</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-brand-dark/5 rounded-lg border border-brand-gold/20">
            <div className="flex items-center space-x-2 text-brand-gold mb-2">
              <Shield className="h-5 w-5" />
              <span className="font-medium">Mitigation Strategies</span>
            </div>
            <ul className="space-y-2 text-sm text-brand-primary">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                <span>Regular compliance audits</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                <span>AI model documentation</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                <span>Continuous monitoring system</span>
              </li>
            </ul>
          </div>
        </div>

        <button className="w-full bg-brand-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-secondary transition flex items-center justify-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>Generate Risk Report</span>
        </button>
      </div>
    </div>
  );
}
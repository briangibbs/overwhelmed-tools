import React, { useState } from 'react';

export default function ROICalculator() {
  const [implementation, setImplementation] = useState('');
  const [budget, setBudget] = useState('');
  const [hoursSaved, setHoursSaved] = useState('');
  const [roiData, setRoiData] = useState(null);

  const calculateROI = () => {
    const monthlyBudget = parseFloat(budget);
    const monthlyHours = parseFloat(hoursSaved);
    const hourlyRate = 100; // Average hourly rate

    const monthlySavings = monthlyHours * hourlyRate;
    const annualSavings = monthlySavings * 12;
    const annualCost = monthlyBudget * 12;
    const roi = ((annualSavings - annualCost) / annualCost) * 100;
    const paybackPeriod = monthlyBudget / monthlySavings;
    const fiveYearReturn = (annualSavings - annualCost) * 5;

    setRoiData({
      paybackPeriod: paybackPeriod.toFixed(1),
      fiveYearReturn: fiveYearReturn.toLocaleString(),
      roi: roi.toFixed(0)
    });
  };

  return (
    <div className="min-h-screen bg-[#000919] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">AI ROI Calculator</h2>
          <p className="text-[#A9987E] text-lg">Calculate potential returns on your AI investments</p>
        </div>
        
        <div className="space-y-6 bg-white/10 p-8 rounded-xl">
          <div>
            <label className="block text-white mb-2">AI Implementation Type</label>
            <select 
              value={implementation}
              onChange={(e) => setImplementation(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#C5B358] focus:ring-1 focus:ring-[#C5B358]"
            >
              <option value="">Select Implementation Type</option>
              <option value="chatbot">Customer Service Chatbot</option>
              <option value="automation">Process Automation</option>
              <option value="analytics">Data Analytics & Insights</option>
              <option value="marketing">AI Marketing Tools</option>
              <option value="sales">Sales Optimization AI</option>
            </select>
          </div>

          <div>
            <label className="block text-white mb-2">Implementation Budget (Monthly)</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#C5B358] focus:ring-1 focus:ring-[#C5B358]"
            >
              <option value="">Select Budget Range</option>
              <option value="500">$500/month</option>
              <option value="1000">$1,000/month</option>
              <option value="2500">$2,500/month</option>
              <option value="5000">$5,000/month</option>
              <option value="10000">$10,000/month</option>
            </select>
          </div>

          <div>
            <label className="block text-white mb-2">Estimated Monthly Hours Saved</label>
            <select
              value={hoursSaved}
              onChange={(e) => setHoursSaved(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#C5B358] focus:ring-1 focus:ring-[#C5B358]"
            >
              <option value="">Select Hours Saved</option>
              <option value="20">20 hours/month</option>
              <option value="40">40 hours/month</option>
              <option value="80">80 hours/month</option>
              <option value="160">160 hours/month</option>
              <option value="320">320 hours/month</option>
            </select>
          </div>

          <button
            onClick={calculateROI}
            className="w-full py-3 px-4 bg-[#2a628f] hover:bg-[#07213F] text-white rounded-lg transition-colors"
          >
            Calculate ROI
          </button>

          {roiData && (
            <div className="mt-6 space-y-4">
              <h3 className="text-xl font-semibold text-[#C5B358]">ROI Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-sm text-[#A9987E]">Investment Payback Period</p>
                  <p className="text-xl font-bold">{roiData.paybackPeriod} months</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-sm text-[#A9987E]">5-Year Return</p>
                  <p className="text-xl font-bold">${roiData.fiveYearReturn}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-sm text-[#A9987E]">ROI</p>
                  <p className="text-xl font-bold">{roiData.roi}% annually</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
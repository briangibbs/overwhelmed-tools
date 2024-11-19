import React, { useState } from 'react';
import { Calendar, DollarSign, BarChart2, ArrowRight, Users, Target, Eye } from 'lucide-react';

interface Campaign {
  type: string;
  startDate: string;
  endDate: string;
  budget: number;
  targetAudience: string;
  impressionGoal: number;
  conversionGoal: number;
  metrics: {
    impressions: number;
    engagement: number;
    conversion: number;
    cpc: number;
    revenue: number;
    roi: number;
  };
}

export default function MarketingTracker() {
  const [campaignType, setCampaignType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [impressionGoal, setImpressionGoal] = useState('');
  const [conversionGoal, setConversionGoal] = useState('');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const campaignTypes = [
    'AI-Generated Email Campaign',
    'AI-Optimized Ads',
    'Chatbot Marketing',
    'Personalized AI Recommendations',
    'Social Media AI Content'
  ];

  const audienceTypes = [
    'B2B - Enterprise',
    'B2B - Small Business',
    'B2C - General',
    'B2C - Luxury',
    'B2C - Value'
  ].sort();

  const calculateMetrics = (budget: number, impressionGoal: number, conversionGoal: number) => {
    // Calculate realistic metrics based on goals and budget
    const impressions = Math.min(impressionGoal, budget * Math.floor(Math.random() * (100 - 50) + 50));
    const engagements = impressions * (Math.random() * (0.15 - 0.05) + 0.05);
    const conversions = Math.min(conversionGoal, engagements * (Math.random() * (0.10 - 0.02) + 0.02));
    const averageOrderValue = Math.floor(Math.random() * (200 - 50) + 50);
    const revenue = conversions * averageOrderValue;

    return {
      impressions: Math.floor(impressions),
      engagement: Number((engagements / impressions * 100).toFixed(1)),
      conversion: Number((conversions / engagements * 100).toFixed(1)),
      cpc: Number((budget / engagements).toFixed(2)),
      revenue: Math.floor(revenue),
      roi: Number(((revenue - budget) / budget * 100).toFixed(1))
    };
  };

  const trackCampaign = () => {
    if (!campaignType || !startDate || !endDate || !budget || !targetAudience || !impressionGoal || !conversionGoal) return;

    const budgetNum = parseFloat(budget);
    const impressionGoalNum = parseFloat(impressionGoal);
    const conversionGoalNum = parseFloat(conversionGoal);

    const newCampaign: Campaign = {
      type: campaignType,
      startDate,
      endDate,
      budget: budgetNum,
      targetAudience,
      impressionGoal: impressionGoalNum,
      conversionGoal: conversionGoalNum,
      metrics: calculateMetrics(budgetNum, impressionGoalNum, conversionGoalNum)
    };

    setCampaigns([...campaigns, newCampaign]);
    setCampaignType('');
    setStartDate('');
    setEndDate('');
    setBudget('');
    setTargetAudience('');
    setImpressionGoal('');
    setConversionGoal('');
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3 text-skin-primary">Marketing Effectiveness Tracker</h2>
        <p className="text-skin-secondary text-lg">Track and optimize your AI-powered marketing campaigns</p>
      </div>

      <div className="max-w-4xl mx-auto bg-skin-secondary p-6 rounded-xl border border-skin-accent">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-skin-primary mb-2">Campaign Type</label>
            <select
              value={campaignType}
              onChange={(e) => setCampaignType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-skin-primary border border-skin-accent text-skin-primary"
            >
              <option value="">Select Campaign Type</option>
              {campaignTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-skin-primary mb-2">Target Audience</label>
            <select
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-skin-primary border border-skin-accent text-skin-primary"
            >
              <option value="">Select Target Audience</option>
              {audienceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-skin-primary mb-2">Budget ($)</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              min="0"
              step="100"
              className="w-full px-4 py-2 rounded-lg bg-skin-primary border border-skin-accent text-skin-primary"
              placeholder="Enter campaign budget"
            />
          </div>

          <div>
            <label className="block text-skin-primary mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-skin-primary border border-skin-accent text-skin-primary"
            />
          </div>

          <div>
            <label className="block text-skin-primary mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-skin-primary border border-skin-accent text-skin-primary"
            />
          </div>

          <div>
            <label className="block text-skin-primary mb-2">Impression Goal</label>
            <input
              type="number"
              value={impressionGoal}
              onChange={(e) => setImpressionGoal(e.target.value)}
              min="0"
              step="100"
              className="w-full px-4 py-2 rounded-lg bg-skin-primary border border-skin-accent text-skin-primary"
              placeholder="Target impressions"
            />
          </div>

          <div className="lg:col-span-3">
            <label className="block text-skin-primary mb-2">Conversion Goal</label>
            <input
              type="number"
              value={conversionGoal}
              onChange={(e) => setConversionGoal(e.target.value)}
              min="0"
              step="1"
              className="w-full px-4 py-2 rounded-lg bg-skin-primary border border-skin-accent text-skin-primary"
              placeholder="Target conversions"
            />
          </div>
        </div>

        <button
          onClick={trackCampaign}
          disabled={!campaignType || !startDate || !endDate || !budget || !targetAudience || !impressionGoal || !conversionGoal}
          className="w-full py-3 bg-brand-gold text-brand-dark rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <span>Track Campaign</span>
          <ArrowRight className="h-5 w-5" />
        </button>

        {campaigns.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold text-skin-primary">Campaign Performance</h3>
            <div className="grid gap-4">
              {campaigns.map((campaign, index) => (
                <div
                  key={index}
                  className="p-4 bg-skin-primary rounded-lg border border-skin-accent"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-skin-primary">{campaign.type}</h4>
                      <div className="flex items-center space-x-4 text-sm text-skin-primary">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-skin-primary" />
                          <span>{campaign.startDate} to {campaign.endDate}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-skin-primary" />
                          <span>{campaign.targetAudience}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-skin-primary">
                      <DollarSign className="h-4 w-4 text-skin-primary" />
                      <span>${campaign.budget.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div>
                      <p className="text-sm text-skin-secondary">Impressions</p>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4 text-skin-primary" />
                        <p className="text-xl font-bold text-skin-primary">
                          {campaign.metrics.impressions.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-skin-secondary">Engagement Rate</p>
                      <p className="text-xl font-bold text-skin-primary">{campaign.metrics.engagement}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-skin-secondary">Conversion Rate</p>
                      <p className="text-xl font-bold text-skin-primary">{campaign.metrics.conversion}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-skin-secondary">Cost per Click</p>
                      <p className="text-xl font-bold text-skin-primary">${campaign.metrics.cpc}</p>
                    </div>
                    <div>
                      <p className="text-sm text-skin-secondary">Revenue</p>
                      <p className="text-xl font-bold text-skin-primary">${campaign.metrics.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-skin-secondary">ROI</p>
                      <p className="text-xl font-bold text-skin-primary">{campaign.metrics.roi}%</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="p-3 bg-skin-secondary rounded-lg">
                      <p className="text-sm text-skin-secondary mb-1">Impression Goal Progress</p>
                      <div className="flex items-center justify-between">
                        <span className="text-skin-primary">{Math.round(campaign.metrics.impressions / campaign.impressionGoal * 100)}%</span>
                        <Target className="h-4 w-4 text-brand-gold" />
                      </div>
                    </div>
                    <div className="p-3 bg-skin-secondary rounded-lg">
                      <p className="text-sm text-skin-secondary mb-1">Conversion Goal Progress</p>
                      <div className="flex items-center justify-between">
                        <span className="text-skin-primary">
                          {Math.round((campaign.metrics.impressions * (campaign.metrics.conversion / 100)) / campaign.conversionGoal * 100)}%
                        </span>
                        <Target className="h-4 w-4 text-brand-gold" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ToolFinder from './components/tools/ToolFinder';
import ToolSearch from './components/tools/ToolSearch';
import RoadmapGenerator from './components/tools/RoadmapGenerator';
import RoiCalculator from './components/tools/ROICalculator';
import MarketingTracker from './components/tools/MarketingTracker';
import TaskReminder from './components/tools/TaskReminder';
import ReadinessAssessment from './components/tools/ReadinessAssessment';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen bg-skin-primary transition-colors duration-200`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<ToolFinder />} />
          <Route path="/tool-finder" element={<ToolFinder />} />
          <Route path="/tool-finder/search" element={<ToolSearch />} />
          <Route path="/roadmap" element={<RoadmapGenerator />} />
          <Route path="/roi" element={<RoiCalculator />} />
          <Route path="/marketing" element={<MarketingTracker />} />
          <Route path="/tasks" element={<TaskReminder />} />
          <Route path="/readiness" element={<ReadinessAssessment />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
import React from 'react';
import { Map, CheckCircle } from 'lucide-react';

export default function RoadmapGenerator() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Implementation Roadmap</h2>
        <p className="text-brand-neutral">Create your personalized AI implementation journey</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="grid gap-6">
          {[
            { phase: 'Assessment', description: 'Evaluate current processes and AI readiness' },
            { phase: 'Planning', description: 'Define objectives and select appropriate AI tools' },
            { phase: 'Implementation', description: 'Deploy and integrate AI solutions' },
            { phase: 'Training', description: 'Prepare team members and stakeholders' },
            { phase: 'Optimization', description: 'Monitor, measure, and improve AI implementation' },
          ].map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-lg bg-white/10 hover:bg-white/15 transition"
            >
              <div className="bg-brand-gold rounded-full p-2">
                <Map className="h-6 w-6 text-brand-dark" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.phase}</h3>
                <p className="text-brand-neutral">{step.description}</p>
                <div className="mt-4 flex gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-gold" />
                  <span className="text-sm">Customized for your business</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
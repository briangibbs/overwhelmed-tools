import React, { useState } from 'react';
import { Brain, BarChart, Download, ArrowUp, CheckCircle, AlertTriangle } from 'lucide-react';

const assessmentQuestions = [
  {
    text: "How structured and organized is your data?",
    category: "Data Readiness",
    improvements: [
      "Implement a data governance framework",
      "Standardize data collection processes",
      "Clean and validate existing datasets",
      "Create comprehensive data documentation"
    ]
  },
  {
    text: "How modern is your current tech stack?",
    category: "Technical Infrastructure",
    improvements: [
      "Upgrade legacy systems to cloud-based solutions",
      "Implement API-first architecture",
      "Enhance security protocols",
      "Adopt containerization and microservices"
    ]
  },
  {
    text: "How tech-savvy is your workforce?",
    category: "Team Capability",
    improvements: [
      "Provide AI and ML training programs",
      "Hire AI/ML specialists or consultants",
      "Create internal knowledge sharing sessions",
      "Partner with AI education providers"
    ]
  },
  {
    text: "How well-documented are your processes?",
    category: "Process Maturity",
    improvements: [
      "Create detailed process documentation",
      "Implement process monitoring tools",
      "Establish standard operating procedures",
      "Regular process audits and updates"
    ]
  },
  {
    text: "Is there executive support for AI initiatives?",
    category: "Strategic Alignment",
    improvements: [
      "Develop AI business case presentations",
      "Create ROI models for AI initiatives",
      "Align AI projects with business goals",
      "Regular executive briefings on AI potential"
    ]
  }
];

const scoreRanges = [
  { min: 0, max: 40, level: "Early Stage", description: "Significant preparation needed before AI implementation" },
  { min: 41, max: 60, level: "Developing", description: "Basic foundation present, but improvements needed" },
  { min: 61, max: 80, level: "Advanced", description: "Good readiness level with some areas for improvement" },
  { min: 81, max: 100, level: "Optimal", description: "Excellent position for AI implementation" }
];

interface Answer {
  score: number;
  category: string;
}

export default function ReadinessAssessment() {
  const [answers, setAnswers] = useState<{ [key: number]: Answer }>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionIndex: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: {
        score: value,
        category: assessmentQuestions[questionIndex].category
      }
    }));
  };

  const calculateScore = () => {
    if (Object.keys(answers).length < assessmentQuestions.length) return 0;
    const total = Object.values(answers).reduce((sum, answer) => sum + answer.score, 0);
    return Math.round((total / (assessmentQuestions.length * 5)) * 100);
  };

  const getReadinessLevel = (score: number) => {
    return scoreRanges.find(range => score >= range.min && score <= range.max) || scoreRanges[0];
  };

  const getCategoryScore = (category: string) => {
    const categoryAnswers = Object.values(answers).filter(answer => answer.category === category);
    if (categoryAnswers.length === 0) return 0;
    
    const total = categoryAnswers.reduce((sum, answer) => sum + answer.score, 0);
    return Math.round((total / (categoryAnswers.length * 5)) * 100);
  };

  const getPriorityImprovements = () => {
    const categoryScores = assessmentQuestions.map((q, index) => ({
      category: q.category,
      score: answers[index]?.score || 0,
      improvements: q.improvements
    }));

    return categoryScores
      .sort((a, b) => a.score - b.score)
      .slice(0, 3);
  };

  const downloadReport = () => {
    const score = calculateScore();
    const readinessLevel = getReadinessLevel(score);
    const priorityImprovements = getPriorityImprovements();
    
    const reportContent = `
AI Readiness Assessment Report

Overall Score: ${score}%
Readiness Level: ${readinessLevel.level}
${readinessLevel.description}

Category Scores:
${assessmentQuestions.map(q => `
${q.category}
Score: ${getCategoryScore(q.category)}%
Recommended Improvements:
${q.improvements.map(imp => `- ${imp}`).join('\n')}`).join('\n')}

Priority Areas for Improvement:
${priorityImprovements.map(area => `
${area.category} (Score: ${area.score}/5)
Recommended Actions:
${area.improvements.map(imp => `- ${imp}`).join('\n')}`).join('\n')}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-readiness-assessment.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3 text-skin-primary">AI Readiness Assessment</h2>
        <p className="text-skin-secondary text-lg">Evaluate your organization's preparedness for AI implementation</p>
      </div>

      <div className="max-w-4xl mx-auto bg-skin-secondary p-6 rounded-xl border border-skin-accent">
        {!showResults ? (
          <div className="space-y-8">
            {assessmentQuestions.map((question, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-brand-gold" />
                  <div>
                    <h3 className="font-semibold text-skin-primary">{question.category}</h3>
                    <p className="text-skin-primary">{question.text}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleAnswer(index, value)}
                      className={`w-12 h-12 rounded-lg border ${
                        answers[index]?.score === value
                          ? 'bg-brand-gold text-brand-dark border-brand-gold'
                          : 'bg-skin-primary text-skin-primary border-skin-accent hover:border-brand-gold'
                      } transition`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={() => setShowResults(true)}
              disabled={Object.keys(answers).length < assessmentQuestions.length}
              className="w-full py-3 bg-brand-gold text-brand-dark rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <BarChart className="h-5 w-5" />
              <span>Calculate Readiness Score</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {(() => {
              const score = calculateScore();
              const readinessLevel = getReadinessLevel(score);
              const priorityImprovements = getPriorityImprovements();
              
              return (
                <>
                  <div className="text-center">
                    <div className="inline-block p-6 bg-skin-primary rounded-full mb-4">
                      <span className="text-4xl font-bold text-brand-gold">{score}%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-skin-primary mb-2">
                      {readinessLevel.level} Readiness
                    </h3>
                    <p className="text-skin-secondary">{readinessLevel.description}</p>
                  </div>

                  <div className="grid gap-4">
                    <h4 className="text-lg font-semibold text-skin-primary">Category Breakdown</h4>
                    {assessmentQuestions.map((question, index) => {
                      const categoryScore = getCategoryScore(question.category);
                      return (
                        <div key={index} className="p-4 bg-skin-primary rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-skin-primary">{question.category}</h5>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              categoryScore >= 80 ? 'bg-green-100 text-green-800' :
                              categoryScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {categoryScore}%
                            </span>
                          </div>
                          <div className="w-full bg-skin-secondary rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                categoryScore >= 80 ? 'bg-green-500' :
                                categoryScore >= 60 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${categoryScore}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-skin-primary">Priority Improvements</h4>
                    {priorityImprovements.map((area, index) => (
                      <div key={index} className="p-4 bg-skin-primary rounded-lg">
                        <div className="flex items-center space-x-2 mb-3">
                          <AlertTriangle className="h-5 w-5 text-brand-gold" />
                          <h5 className="font-medium text-skin-primary">{area.category}</h5>
                        </div>
                        <ul className="space-y-2">
                          {area.improvements.map((improvement, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <ArrowUp className="h-4 w-4 text-brand-secondary mt-1" />
                              <span className="text-skin-secondary">{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowResults(false)}
                      className="flex-1 py-3 bg-skin-primary text-skin-primary rounded-lg font-semibold hover:bg-skin-accent transition"
                    >
                      Retake Assessment
                    </button>
                    <button
                      onClick={downloadReport}
                      className="flex-1 py-3 bg-brand-gold text-brand-dark rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center justify-center space-x-2"
                    >
                      <Download className="h-5 w-5" />
                      <span>Download Report</span>
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
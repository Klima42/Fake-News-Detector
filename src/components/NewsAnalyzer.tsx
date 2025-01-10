import React, { useState } from 'react';
import { ReliabilityScore } from './ReliabilityScore';
import type { AnalysisResult } from '../types';

const NewsAnalyzer: React.FC = () => {
  const [articleText, setArticleText] = useState('');
  const [articleUrl, setArticleUrl] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (articleText.trim().length < 10) {
      setError('Please enter at least 10 characters');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulated analysis
      const result: AnalysisResult = {
        reliability: Math.random(),
        factualScore: Math.random(),
        biasScore: Math.random(),
        sourceScore: Math.random()
      };
      setAnalysis(result);
    } catch (err) {
      setError('Analysis failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">News Article Analyzer</h2>
      
      <div className="space-y-4">
        <textarea
          className="w-full h-32 p-2 border rounded-md resize-none"
          placeholder="Paste article text here..."
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
          disabled={isLoading}
        />
        
        <input
          type="url"
          className="w-full p-2 border rounded-md"
          placeholder="Article URL (optional)"
          value={articleUrl}
          onChange={(e) => setArticleUrl(e.target.value)}
          disabled={isLoading}
        />
        
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Article'}
        </button>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {analysis && (
          <div className="space-y-4">
            <ReliabilityScore scores={analysis} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsAnalyzer;
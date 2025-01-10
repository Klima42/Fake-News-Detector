// src/components/NewsAnalyzer.tsx
import React, { useState } from 'react';
import { analyzeArticle } from '../services/robertaService';

const NewsAnalyzer: React.FC = () => {
  const [articleText, setArticleText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<{
    factualScore: number;
    details: Array<{
      question: string;
      answer: string;
      confidence: number;
    }>;
  } | null>(null);

  const handleAnalyze = async () => {
    if (articleText.trim().length < 50) {
      setError('Please enter at least 50 characters');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await analyzeArticle(articleText);
      setAnalysisResults(results);
    } catch (err) {
      setError('Analysis failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">News Article Fact Checker</h2>
      
      <div className="space-y-4">
        <textarea
          className="w-full h-32 p-2 border rounded-md resize-none"
          placeholder="Paste article text here..."
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
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

        {analysisResults && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold mb-2">Factual Score</h3>
              <p className="text-lg">
                {(analysisResults.factualScore * 100).toFixed(1)}%
              </p>
            </div>

            <div className="divide-y">
              {analysisResults.details.map((detail, index) => (
                <div key={index} className="py-4">
                  <p className="font-medium text-gray-700">{detail.question}</p>
                  <p className="mt-1">{detail.answer}</p>
                  <p className="text-sm text-gray-500">
                    Confidence: {(detail.confidence * 100).toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsAnalyzer;
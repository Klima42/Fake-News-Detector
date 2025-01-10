import React from 'react';
import NewsAnalyzer from './components/NewsAnalyzer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            News Reliability Analyzer
          </h1>
          <p className="text-gray-600">
            Analyze articles and check their reliability using AI
          </p>
        </header>

        <main>
          <NewsAnalyzer />
        </main>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Use this tool to analyze news articles and check their reliability</p>
          <p>Results are algorithmic assessments and should not be taken as absolute truth</p>
        </footer>
      </div>
    </div>
  );
};

export default App;




import React from 'react';
import type { AnalysisResult } from '../types';

interface ReliabilityScoreProps {
  scores: AnalysisResult;
}

export const ReliabilityScore = (props: ReliabilityScoreProps) => {
  const getScoreColor = (score: number): string => {
    if (score >= 0.7) return 'text-green-600';
    if (score >= 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const ScoreItem = ({ label, score }: { label: string; score: number }) => (
    <div className="p-4 border rounded-md">
      <h3 className="font-semibold mb-2">{label}</h3>
      <span className={getScoreColor(score)}>
        {(score * 100).toFixed(1)}%
      </span>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-md">
        <p className="text-lg">
          Overall Reliability Score: 
          <span className={`font-bold ml-2 ${getScoreColor(props.scores.reliability)}`}>
            {(props.scores.reliability * 100).toFixed(1)}%
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ScoreItem label="Factual Accuracy" score={props.scores.factualScore} />
        <ScoreItem label="Bias Assessment" score={props.scores.biasScore} />
      </div>
    </div>
  );
};

export default ReliabilityScore;
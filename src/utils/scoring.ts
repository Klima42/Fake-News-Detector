import { ReliabilityMetrics, ClickbaitAnalysis } from '../types';

export const calculateReliabilityScore = (metrics: ReliabilityMetrics): number => {
  const weights: Record<keyof ReliabilityMetrics, number> = {
    factualConsistency: 0.4,
    sourceCredibility: 0.3,
    biasLevel: 0.2,
    sensationalism: 0.1
  };

  return Object.entries(weights).reduce((score, [key, weight]) => {
    return score + (metrics[key as keyof ReliabilityMetrics] || 0) * weight;
  }, 0);
};

export const assessClickbait = (title: string): ClickbaitAnalysis => {
  const clickbaitPatterns: RegExp[] = [
    /you won't believe/i,
    /shocking/i,
    /mind-blowing/i,
    /\d+ (things|ways|reasons)/i,
    /this one trick/i
  ];
  
  const matchCount = clickbaitPatterns.reduce((count, pattern) => 
    count + (pattern.test(title) ? 1 : 0), 0);
    
  return {
    isClickbait: matchCount > 0,
    clickbaitScore: Math.min(matchCount / 2, 1)
  };
};

import { TextAnalysis } from '../types';

export const preprocessText = (text: string): TextAnalysis => {
  // Remove extra whitespace and normalize
  text = text.trim().toLowerCase();
  
  // Remove special characters
  text = text.replace(/[^\w\s]/g, '');
  
  // Split into sentences (basic implementation)
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  
  return {
    cleanText: text,
    sentences,
    wordCount: text.split(/\s+/).length,
    averageSentenceLength: sentences.length ? 
      text.split(/\s+/).length / sentences.length : 0
  };
};

export const extractKeywords = (text: string): string[] => {
  const words = text.toLowerCase().split(/\s+/);
  const wordFreq: Record<string, number> = {};
  
  // Count word frequencies
  words.forEach(word => {
    if (word.length > 3) { // Ignore short words
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });
  
  // Sort by frequency
  return Object.entries(wordFreq)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10) // Top 10 keywords
    .map(([word]) => word);
};

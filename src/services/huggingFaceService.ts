// src/services/huggingFaceService.ts
const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";

interface AnalysisResult {
  reliability: number;
  factualScore: number;
  biasScore: number;
  sourceScore: number;
}

export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  const labels = ["reliable", "unreliable", "factual", "opinion", "biased", "neutral"];
  
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: text,
        parameters: {
          candidate_labels: labels
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    // Convert classification scores to our format
    return {
      reliability: result.scores[labels.indexOf("reliable")],
      factualScore: result.scores[labels.indexOf("factual")],
      biasScore: 1 - result.scores[labels.indexOf("biased")],
      sourceScore: result.scores[labels.indexOf("reliable")]
    };
  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};

// Usage in NewsAnalyzer.tsx
// import { analyzeText } from '../services/huggingFaceService';

// const handleAnalyze = async () => {
//   setIsLoading(true);
//   try {
//     const result = await analyzeText(articleText);
//     setAnalysis(result);
//   } catch (error) {
//     setError("Analysis failed");
//   } finally {
//     setIsLoading(false);
//   }
// };
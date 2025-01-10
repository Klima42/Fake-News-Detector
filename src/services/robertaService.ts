// src/services/robertaService.ts
const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
const API_URL = "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2";

interface FactCheckResult {
  answer: string;
  score: number;
  start: number;
  end: number;
}

export const factCheck = async (
  context: string,
  question: string
): Promise<FactCheckResult> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {
          question,
          context
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fact checking failed:", error);
    throw error;
  }
};

// Helper function to run multiple fact checks
export const analyzeArticle = async (text: string): Promise<{
  factualScore: number;
  details: { question: string; answer: string; confidence: number; }[];
}> => {
  // Key questions for fact checking
  const questions = [
    "What are the main claims made in this text?",
    "What evidence is provided for these claims?",
    "Who are the sources cited in this text?",
    "When did these events occur?",
    "Where did these events take place?"
  ];

  try {
    const results = await Promise.all(
      questions.map(question => factCheck(text, question))
    );

    // Calculate overall factual score based on answer confidences
    const averageConfidence = results.reduce(
      (sum, result) => sum + result.score, 
      0
    ) / results.length;

    return {
      factualScore: averageConfidence,
      details: results.map((result, index) => ({
        question: questions[index],
        answer: result.answer,
        confidence: result.score
      }))
    };
  } catch (error) {
    console.error("Article analysis failed:", error);
    throw error;
  }
};
import { SentimentAnalysis } from '../types';

class NewsClassifier {
  private sensitiveWords: Set<string>;

  constructor() {
    this.sensitiveWords = new Set([
      'allegedly', 'anonymous', 'sources say', 'rumored',
      'viral', 'controversial', 'scandal', 'shocking'
    ]);
  }

  private analyzeSentiment(text: string): number {
    const positiveWords = text.match(/good|great|excellent|amazing/gi) || [];
    const negativeWords = text.match(/bad|terrible|awful|horrible/gi) || [];
    
    const total = positiveWords.length + negativeWords.length;
    return total ? positiveWords.length / total : 0.5;
  }

  private checkSensationalism(text: string): number {
    const words = text.toLowerCase().split(/\s+/);
    const sensitiveCount = words.filter(word => 
      this.sensitiveWords.has(word)).length;
    
    return Math.min(sensitiveCount / 5, 1);
  }

  public async analyzeArticle(text: string): Promise<SentimentAnalysis> {
    const sentiment = this.analyzeSentiment(text);
    const sensationalism = this.checkSensationalism(text);
    
    return {
      sentiment,
      sensationalism,
      objectivity: 1 - sensationalism,
      confidence: 0.7 // Placeholder confidence score
    };
  }
}

export default new NewsClassifier();

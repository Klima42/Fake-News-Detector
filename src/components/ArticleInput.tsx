import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ArticleInputProps {
  articleText: string;
  articleUrl: string;
  onTextChange: (text: string) => void;
  onUrlChange: (url: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const ArticleInput: React.FC<ArticleInputProps> = ({
  articleText,
  articleUrl,
  onTextChange,
  onUrlChange,
  onAnalyze,
  isLoading
}) => {
  return (
    <div className="space-y-4">
      <textarea
        className="w-full h-32 p-2 border rounded-md resize-none"
        placeholder="Paste article text here..."
        value={articleText}
        onChange={(e) => onTextChange(e.target.value)}
        disabled={isLoading}
      />
      
      <input
        type="url"
        className="w-full p-2 border rounded-md"
        placeholder="Article URL (optional)"
        value={articleUrl}
        onChange={(e) => onUrlChange(e.target.value)}
        disabled={isLoading}
      />
      
      <Button
        onClick={onAnalyze}
        disabled={isLoading || articleText.length < 10}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          'Analyze Article'
        )}
      </Button>
    </div>
  );
};

export default ArticleInput;
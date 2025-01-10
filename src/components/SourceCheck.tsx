import React from 'react';

interface SourceCheckProps {
  url: string;
  sourceScore: number;
}

const SourceCheck: React.FC<SourceCheckProps> = ({ url, sourceScore }) => {
  const getDomainInfo = (url: string): string => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'Unknown Source';
    }
  };

  const getSourceRating = (score: number): string => {
    if (score >= 0.7) return 'Highly Reliable Source';
    if (score >= 0.4) return 'Moderately Reliable Source';
    return 'Potentially Unreliable Source';
  };

  return (
    <div className="p-4 border rounded-md">
      <h3 className="font-semibold mb-2">Source Analysis</h3>
      <div className="space-y-2">
        <p className="text-sm">
          Domain: <span className="font-medium">{url ? getDomainInfo(url) : 'No URL provided'}</span>
        </p>
        <p className="text-sm">
          Rating: <span className="font-medium">{getSourceRating(sourceScore)}</span>
        </p>
      </div>
    </div>
  );
};

export default SourceCheck;
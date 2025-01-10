# News Article Analyzer

A React application that analyzes news articles using Hugging Face's RoBERTa model to assess factual accuracy and reliability. The app helps users verify news content by analyzing claims, evidence, and source credibility.

## Key Features

- Fact-checking using RoBERTa model (deepset/roberta-base-squad2)
- Article content analysis
- Confidence scoring
- Detailed breakdown of claims and evidence
- Source credibility assessment

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Hugging Face Inference API

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- A Hugging Face API key

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd news-analyzer
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
- Copy `.env.example` to `.env`
- Add your Hugging Face API key:
```env
VITE_HUGGINGFACE_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npm run dev
```

### Usage

1. Paste an article text into the input area
2. Click "Analyze Article"
3. View the analysis results:
   - Factual accuracy score
   - Evidence assessment
   - Source credibility
   - Confidence ratings

## Project Structure

```
news-analyzer/
├── src/
│   ├── components/          # React components
│   │   └── NewsAnalyzer.tsx
│   ├── services/           # API and analysis services
│   │   └── robertaService.ts
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Environment Variables

Required environment variables:
- `VITE_HUGGINGFACE_API_KEY`: Your Hugging Face API key (Required for article analysis)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## Notes

- The app uses the `deepset/roberta-base-squad2` model for analysis
- API rate limits may apply based on your Hugging Face account tier
- Large articles may need to be processed in chunks

## Future Improvements

- Add support for URL input
- Implement result caching
- Add more detailed bias analysis
- Improve source verification
- Add bulk analysis capability

# 🔍 TruthLens — AI News Credibility Analyzer

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![AI](https://img.shields.io/badge/Powered%20By-LLM-purple)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black)
![Render](https://img.shields.io/badge/Backend-Render-purple)

---

## 🚀 Overview

TruthLens is an AI-powered News Credibility Analyzer that helps users evaluate the reliability of news articles, social media posts, and online claims.

Instead of relying on a traditional machine learning classifier, TruthLens uses modern Large Language Models (LLMs) to analyze content, identify credibility concerns, explain reasoning, and highlight warning signs.

---

## ✨ Features

- 📰 Analyze news articles and claims
- 🤖 AI-powered credibility assessment
- 📊 Confidence scoring
- ⚠️ Detection of suspicious indicators
- 💡 Human-readable explanations
- ⚡ Fast real-time analysis
- 🌐 Fully deployed frontend and backend

---

## 🧩 Tech Stack

### Frontend

- React + Vite
- Tailwind CSS
- Axios
- React Router

### Backend

- Node.js
- Express.js
- OpenRouter API
- Rate Limiting
- Helmet Security Middleware

### AI Layer

- OpenRouter
- DeepSeek Chat Model (Free Tier)
- Prompt Engineering
- Structured JSON Responses

---

## ⚙️ System Architecture

```text
[React Frontend]
        │
        ▼
[Node.js / Express API]
        │
        ▼
[OpenRouter]
        │
        ▼
[LLM Analysis Engine]
```

---

## 🧠 How It Works

1. User pastes a news article, claim, or social media post.
2. Frontend sends content to the backend API.
3. Backend generates a credibility-analysis prompt.
4. AI model evaluates the content.
5. AI returns:
   - Credibility Verdict
   - Confidence Score
   - Explanation
   - Warning Flags
6. Frontend displays the analysis instantly.

---

## 📋 Example Response

### Input

> Scientists claim a newly discovered plant species can absorb ten times more carbon dioxide than existing forests.

### Output

```json
{
  "prediction": "suspicious",
  "confidence": 76,
  "reason": "The claim is extraordinary and lacks supporting evidence or sources.",
  "flags": [
    "Extraordinary claim",
    "No source provided"
  ]
}
```

---

## 📦 Installation

### Clone Repository

```bash
git clone https://github.com/anuragrajpoott/fake_news_detector.git

cd fake_news_detector
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Create:

```env
VITE_API_URL=http://localhost:5000
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

Create:

```env
PORT=5000

OPENROUTER_API_KEY=your_openrouter_key
```

---

## API Endpoint

### Analyze News

```http
POST /api/analyze
```

Request:

```json
{
  "text": "Paste article or claim here"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "prediction": "credible",
    "confidence": 84,
    "reason": "The claim appears consistent with known information and lacks obvious misinformation indicators.",
    "flags": []
  }
}
```

---

## 🌐 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| AI Layer | OpenRouter |

---

## 📈 Future Improvements

- Image-based news analysis
- OCR support for screenshots
- Source verification
- Fact-check references
- Multi-language support
- News URL analysis
- Export analysis reports

---

## 👨‍💻 Developer

**Anurag Rajpoot**

Full Stack Developer

GitHub:
https://github.com/anuragrajpoott

---

## 📄 License

MIT License

---

⭐ If you like this project, consider starring the repository.

import { useState } from "react";
import { analyzeNews } from "../services/analyzeService";
import React from "react";

const VERDICT_COLORS = {
  credible: "text-green-400",
  misleading: "text-yellow-400",
  suspicious: "text-red-400",
  unverifiable: "text-slate-400",
};

const SAMPLE_NEWS =
  "Scientists claim a newly discovered plant species can absorb ten times more carbon dioxide than existing forests, potentially helping combat climate change.";

const MIN_TEXT_LENGTH = 20;

const Home = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    const trimmedText = text.trim();

    setError("");
    setResult(null);

    if (trimmedText.length < MIN_TEXT_LENGTH) {
      setError("Please enter a longer article or claim.");
      return;
    }

    try {
      setLoading(true);

      const response = await analyzeNews(trimmedText);

      if (!response?.success) {
        throw new Error(response?.message || "Analysis failed.");
      }

      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to analyze news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = () => {
    setError("");
    setResult(null);
    setText(SAMPLE_NEWS);
  };

  return (
    <main
      id="analyze"
      className="min-h-screen bg-slate-950 px-6 py-16 text-white"
    >
      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            AI News Credibility Analyzer
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Paste a news article, claim, or social media post and receive an
            AI-powered credibility assessment.
          </p>
        </header>

        {/* Input Section */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <label
            htmlFor="news-input"
            className="mb-3 block text-sm font-medium text-slate-300"
          >
            News Article or Claim
          </label>

          <textarea
            id="news-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste a news article, claim, or social media post here..."
            disabled={loading}
            className="h-56 w-full resize-none rounded-xl border border-slate-800 bg-slate-950 p-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-70"
          />

          <div className="mt-2 text-right text-sm text-slate-500">
            {text.trim().length} characters
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={loading}
              className="flex-1 rounded-xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze Credibility"}
            </button>

            <button
              type="button"
              onClick={handleLoadSample}
              disabled={loading}
              className="rounded-xl border border-slate-700 px-6 py-3 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Try Sample
            </button>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-5 rounded-xl border border-red-500 bg-red-500/10 p-4 text-red-300"
            >
              {error}
            </div>
          )}
        </section>

        {/* Results */}
        {result && (
          <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
            <h2 className="mb-8 text-2xl font-bold">
              Analysis Result
            </h2>

            <div className="mb-6">
              <p className="mb-2 text-slate-400">
                Verdict
              </p>

              <div
                className={`text-3xl font-bold capitalize ${
                  VERDICT_COLORS[result.prediction] || "text-white"
                }`}
              >
                {result.prediction}
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-slate-400">
                Confidence: {result.confidence}%
              </p>

              <div className="h-4 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-cyan-500 transition-all duration-700"
                  style={{
                    width: `${result.confidence}%`,
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-lg font-semibold">
                Explanation
              </h3>

              <p className="leading-relaxed text-slate-300">
                {result.reason}
              </p>
            </div>

            {result.flags?.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold">
                  Warning Flags
                </h3>

                <div className="space-y-3">
                  {result.flags.map((flag, index) => (
                    <div
                      key={`${flag}-${index}`}
                      className="rounded-xl bg-slate-800 p-4"
                    >
                      ⚠️ {flag}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* About */}
        <section
          id="about"
          className="mt-20 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold">
            About TruthLens
          </h2>

          <p className="mx-auto max-w-3xl leading-relaxed text-slate-400">
            TruthLens uses modern AI models to evaluate the credibility of news
            articles, social media posts, and online claims. It helps identify
            suspicious patterns, misinformation indicators, and credibility
            concerns while providing transparent reasoning for every assessment.
          </p>
        </section>
      </div>
    </main>
  );
};

export default Home;
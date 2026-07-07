import { useState } from "react";
import { analyzeNews } from "../services/analyzeService";

const Home = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const verdictColors = {
    credible: "text-green-400",
    misleading: "text-yellow-400",
    suspicious: "text-red-400",
    unverifiable: "text-slate-400",
  };

  const handleAnalyze = async () => {
    setError("");
    setResult(null);

    if (text.trim().length < 20) {
      setError("Please enter a longer article or claim.");
      return;
    }

    try {
      setLoading(true);

      const response = await analyzeNews(text);

      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.message || "Analysis failed.");
      }
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Failed to analyze news. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadSampleNews = () => {
    setText(
      "Scientists claim a newly discovered plant species can absorb ten times more carbon dioxide than existing forests, potentially helping combat climate change."
    );
  };

  return (
    <div
      id="analyze"
      className="min-h-screen bg-slate-950 text-white px-6 py-16"
    >
      <div className="max-w-5xl mx-auto">
        {/* HERO */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            AI News Credibility Analyzer
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Paste a news article, claim, or social media post and receive an
            AI-powered credibility assessment.
          </p>
        </div>

        {/* INPUT CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste a news article, claim, or social media post here..."
            className="w-full h-56 bg-slate-950 border border-slate-800 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold py-3 rounded-xl transition disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze Credibility"}
            </button>

            <button
              onClick={loadSampleNews}
              type="button"
              className="px-6 py-3 border border-slate-700 rounded-xl hover:bg-slate-800 transition"
            >
              Try Sample
            </button>
          </div>

          {error && (
            <div className="mt-5 border border-red-500 bg-red-500/10 text-red-300 rounded-xl p-4">
              {error}
            </div>
          )}
        </div>

        {/* RESULT */}
        {result && (
          <div className="mt-10 bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-8">
              Analysis Result
            </h2>

            {/* Verdict */}
            <div className="mb-6">
              <p className="text-slate-400 mb-2">
                Verdict
              </p>

              <div
                className={`text-3xl font-bold capitalize ${
                  verdictColors[result.prediction] || "text-white"
                }`}
              >
                {result.prediction}
              </div>
            </div>

            {/* Confidence */}
            <div className="mb-8">
              <p className="text-slate-400 mb-2">
                Confidence: {result.confidence}%
              </p>

              <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 transition-all duration-700"
                  style={{
                    width: `${result.confidence}%`,
                  }}
                />
              </div>
            </div>

            {/* Explanation */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">
                Explanation
              </h3>

              <p className="text-slate-300 leading-relaxed">
                {result.reason}
              </p>
            </div>

            {/* Flags */}
            {result.flags?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Warning Flags
                </h3>

                <div className="space-y-3">
                  {result.flags.map((flag, index) => (
                    <div
                      key={index}
                      className="bg-slate-800 rounded-xl p-4"
                    >
                      ⚠️ {flag}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ABOUT */}
        <section
          id="about"
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            About TruthLens
          </h2>

          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
            TruthLens uses modern AI models to evaluate the credibility of
            news articles, social media posts, and online claims. It helps
            identify suspicious patterns, misinformation indicators, and
            credibility concerns while providing transparent reasoning for
            every assessment.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Home;
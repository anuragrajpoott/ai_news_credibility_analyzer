import axios from "axios";

export const analyzeNews = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "News text is required",
      });
    }

    if (text.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: "Please provide a longer news article or claim",
      });
    }

    const prompt = `
You are an expert News Credibility Analyzer.

Analyze the following news article or claim.

Return ONLY valid JSON.

{
  "prediction": "credible",
  "confidence": 82,
  "reason": "Short explanation",
  "flags": [
    "flag1",
    "flag2"
  ]
}

Rules:

prediction must be one of:
- credible
- misleading
- suspicious
- unverifiable

confidence must be between 0 and 100.

flags should contain potential warning signs if present.

News:
${text}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const rawResponse =
      response.data?.choices?.[0]?.message?.content || "";

    let result;

    try {
      const cleaned = rawResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      result = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON Parse Error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        prediction: result.prediction || "unverifiable",
        confidence: result.confidence || 0,
        reason: result.reason || "No explanation provided",
        flags: result.flags || [],
      },
    });
  } catch (error) {
    console.error(
      "Analysis Error:",
      error?.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to analyze news",
      error:
        error?.response?.data?.error?.message ||
        error.message,
    });
  }
};
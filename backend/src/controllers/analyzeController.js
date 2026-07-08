import axios from "axios";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "deepseek/deepseek-chat-v3-0324";

const buildPrompt = (text) => `
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
- prediction must be one of:
  - credible
  - misleading
  - suspicious
  - unverifiable
- confidence must be between 0 and 100
- flags should contain potential warning signs if present

News:
${text}
`;

const sanitizeAiResponse = (content = "") =>
  content
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

const normalizeResult = (result = {}) => ({
  prediction: result.prediction || "unverifiable",
  confidence: Math.min(
    100,
    Math.max(0, Number(result.confidence) || 0)
  ),
  reason: result.reason || "No explanation provided",
  flags: Array.isArray(result.flags) ? result.flags : [],
});

export const analyzeNews = async (req, res) => {
  try {
    const text = req.body?.text?.trim();

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "News text is required",
      });
    }

    if (text.length < 20) {
      return res.status(400).json({
        success: false,
        message: "Please provide a longer news article or claim",
      });
    }

    if (text.length > 10000) {
      return res.status(400).json({
        success: false,
        message: "News text is too long",
      });
    }

    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: MODEL,
        messages: [
          {
            role: "user",
            content: buildPrompt(text),
          },
        ],
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    const rawContent =
      response.data?.choices?.[0]?.message?.content || "";

    let parsedResult;

    try {
      parsedResult = JSON.parse(
        sanitizeAiResponse(rawContent)
      );
    } catch (parseError) {
      console.error("[AI_PARSE_ERROR]", parseError);

      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response",
      });
    }

    return res.status(200).json({
      success: true,
      data: normalizeResult(parsedResult),
    });
  } catch (error) {
    console.error(
      "[ANALYSIS_ERROR]",
      error?.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to analyze news",
    });
  }
};

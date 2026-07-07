import axios from "axios";
import { NewsCheck } from "../models/News.js";

// ✅ Check News + Save
export const checkNews = async (req, res) => {
  try {
    const { title, date, subject, text } = req.body;
    const userId = req.user?.id;

    // Validation
    if (!title || !date || !subject || !text) {
      return res.status(400).json({
        success: false,
        message: "All fields (title, date, subject, text) are required",
      });
    }

    if (text.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Text must be at least 10 characters",
      });
    }

    const prompt = `
You are an AI News Credibility Analyzer.

Analyze the following news article.

Return ONLY valid JSON in this exact format:

{
  "prediction": "real",
  "confidence": 85,
  "reason": "Short explanation"
}

Rules:
- prediction must be one of:
  real
  fake
  misleading
  unverifiable

- confidence must be a number from 0 to 100

Article:
${text}
`;

    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }
    );

    const rawText =
      geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    let prediction = "unknown";
    let confidence = 0;
    let reason = "Analysis unavailable";

    try {
      const cleaned = rawText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      prediction = parsed.prediction?.toLowerCase() || "unknown";
      confidence = Number(parsed.confidence) || 0;
      reason = parsed.reason || "No explanation provided";
    } catch (parseError) {
      console.error("Gemini JSON Parse Error:", parseError);
      console.log("Gemini Raw Response:", rawText);
    }

    const saved = await NewsCheck.create({
      userId,
      title,
      date,
      subject,
      text,
      prediction,
      confidence,
      reason,
    });

    return res.status(200).json({
      success: true,
      data: saved,
    });
  } catch (error) {
    console.error(
      "News Analysis Error:",
      error?.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Error analyzing news",
      error: error?.response?.data || error.message,
    });
  }
};

// ✅ Fetch User History
export const getUserNews = async (req, res) => {
  try {
    const news = await NewsCheck.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch history",
      error: error.message,
    });
  }
};

// ✅ Delete Single Record
export const deleteUserNews = async (req, res) => {
  try {
    const deleted = await NewsCheck.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete",
      error: error.message,
    });
  }
};

// ✅ Clear Entire History
export const clearUserNews = async (req, res) => {
  try {
    await NewsCheck.deleteMany({
      userId: req.user.id,
    });

    return res.status(200).json({
      success: true,
      message: "All history cleared",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to clear history",
      error: error.message,
    });
  }
};
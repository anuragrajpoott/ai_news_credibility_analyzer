// routes/newsRoutes.js
import express from "express";
import rateLimit from "express-rate-limit";
import {
  checkNews,
} from "../controllers/newsController.js";


const router = express.Router();

// ✅ Rate Limit — prevents spamming ML server
const mlLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 8,
  message: { success: false, message: "Too many requests — slow down!" },
});

// 📌 Check Fake News (Requires Auth)
router.post("/check-news", mlLimiter, checkNews);


export default router;

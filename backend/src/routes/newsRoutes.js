// routes/newsRoutes.js
import express from "express";
import rateLimit from "express-rate-limit";
import {
  checkNews,
  getUserNews,
  deleteUserNews,
  clearUserNews,
} from "../controllers/newsController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Rate Limit — prevents spamming ML server
const mlLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 8,
  message: { success: false, message: "Too many requests — slow down!" },
});

// 📌 Check Fake News (Requires Auth)
router.post("/check-news", mlLimiter, checkNews);

// 📌 Get User History
router.get("/news/history", auth, getUserNews);

// 📌 Delete single history item
router.delete("/news/history/:id", auth, deleteUserNews);

// 💣 Clear all history
router.delete("/news/history", auth, clearUserNews);

export default router;

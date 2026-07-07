import express from "express";
import rateLimit from "express-rate-limit";
import { analyzeNews } from "../controllers/analyzeController.js";

const router = express.Router();

const analyzeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many analysis requests. Please try again in a minute.",
  },
});

router.post("/", analyzeLimiter, analyzeNews);

export default router;
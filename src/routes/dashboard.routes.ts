import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getDashboardSummary } from "../controllers/dashboard.controller";

const router = express.Router();

router.get("/summary", authMiddleware, getDashboardSummary);

export default router;

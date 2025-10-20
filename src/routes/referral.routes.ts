import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { useReferralCode } from "../controllers/referral.controller";

const router = express.Router();

router.post("/use", authMiddleware, useReferralCode);

export default router;

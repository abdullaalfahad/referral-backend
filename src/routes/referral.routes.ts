import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getLeaderboard, getMyReferrals, useReferralCode } from "../controllers/referral.controller";

const router = express.Router();

router.post("/use", authMiddleware, useReferralCode);
router.get("/mine", authMiddleware, getMyReferrals);
router.get("/leaderboard", getLeaderboard);

export default router;

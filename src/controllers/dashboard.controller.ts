import { Request, Response } from "express";
import { Referral } from "../models/referral";
import { User } from "../models/user";

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get referral dashboard summary for logged-in user
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns referral stats and credits
 */
export const getDashboardSummary = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find all referrals where user is the referrer
    const referrals = await Referral.find({ referrer: user._id });

    const totalReferrals = referrals.length;
    const convertedReferrals = referrals.filter(r => r.status === "converted").length;

    res.json({
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
      totalReferrals,
      convertedReferrals,
      credits: user.credits,
    });
  } catch (error) {
    console.error("getDashboardSummary Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

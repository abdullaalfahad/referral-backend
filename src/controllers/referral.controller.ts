import { Request, Response } from "express";
import { User } from "../models/user";
import { Referral } from "../models/referral";

/**
 * @swagger
 * tags:
 *   name: Referrals
 *   description: Manage referral codes
 */

/**
 * @swagger
 * /api/referrals/use:
 *   post:
 *     summary: Apply a referral code
 *     tags: [Referrals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "ABCD1234"
 *     responses:
 *       200:
 *         description: Referral applied successfully
 *       400:
 *         description: Invalid or duplicate referral
 */
export const useReferralCode = async (req: any, res: Response) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ message: "Referral code is required" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const referrer = await User.findOne({ referralCode: code.toUpperCase() });
    if (!referrer) return res.status(400).json({ message: "Invalid referral code" });

    if (String(referrer._id) === String(user._id))
      return res.status(400).json({ message: "You cannot refer yourself" });

    if (user.referredBy)
      return res.status(400).json({ message: "You already used a referral code" });

 
    user.referredBy = referrer._id as any;
    await user.save();

    
    await Referral.create({
      referrer: referrer._id,
      referred: user._id,
      status: "pending",
    });

    res.json({
      message: "Referral code applied successfully",
      referrer: referrer.name || referrer.email,
    });
  } catch (error) {
    console.error("useReferralCode Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

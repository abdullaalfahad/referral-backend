import { Response } from "express";
import { Purchase } from "../models/purchase";
import { Referral } from "../models/referral";
import { User } from "../models/user";

/**
 * @swagger
 * /api/purchases:
 *   post:
 *     summary: Simulate a purchase and reward referrer/referred if eligible
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 49.99
 *     responses:
 *       201:
 *         description: Purchase successful and rewards applied (if applicable)
 *       400:
 *         description: Invalid amount or duplicate purchase
 */
export const createPurchase = async (req: any, res: Response) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;

    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Invalid purchase amount" });

    const existing = await Purchase.findOne({ user: userId });
    if (existing)
      return res.status(400).json({ message: "User already made a purchase" });

    const purchase = await Purchase.create({ user: userId, amount });

    const referral = await Referral.findOne({ referred: userId, status: "pending" });
    if (referral) {
      referral.status = "converted";
      referral.convertedAt = new Date();
      await referral.save();

      const referrer = await User.findById(referral.referrer);
      const referred = await User.findById(referral.referred);

      if (referrer) referrer.credits += 2;
      if (referred) referred.credits += 2;

      await Promise.all([referrer?.save(), referred?.save()]);
    }

    res.status(201).json({
      message: "Purchase successful",
      purchase,
    });
  } catch (error) {
    console.error("createPurchase Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

import { Response } from "express";
import { Purchase } from "../models/purchase";
import { Referral } from "../models/referral";
import { User } from "../models/user";

/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: Handle user purchases and referral rewards
 */

/**
 * @swagger
 * /api/purchases:
 *   post:
 *     summary: Simulate a purchase and reward referrer/referred on the first purchase
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
 *         description: Purchase successful and rewards applied if first purchase
 *       400:
 *         description: Invalid amount
 */
export const createPurchase = async (req: any, res: Response) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid purchase amount" });
    }

    const purchase = await Purchase.create({ user: userId, amount });

    const purchaseCount = await Purchase.countDocuments({ user: userId });

    if (purchaseCount === 1) {
      const referral = await Referral.findOne({
        referred: userId,
        status: "pending",
      });

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
    }

    res.status(201).json({
      message:
        purchaseCount === 1
          ? "Purchase successful — referral reward applied"
          : "Purchase successful",
      purchase,
    });
  } catch (error) {
    console.error("createPurchase Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

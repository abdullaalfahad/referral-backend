import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createPurchase } from "../controllers/purchase.controller";

const router = express.Router();

router.post("/", authMiddleware, createPurchase);

export default router;

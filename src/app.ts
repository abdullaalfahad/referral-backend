import express from "express";
import cors from "cors";
import "express-async-errors";
import { errorHandler } from "./middleware/error.middleware";
import { setupSwagger } from "./config/swagger";
import authRoutes from "./routes/auth.routes";
import referralRoutes from "./routes/referral.routes";
import purchaseRoutes from "./routes/purchase.routes";
import dashboardRoutes from "./routes/dashboard.routes";

export const app = express();

app.use(cors());
app.use(express.json());
setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use("/api/referrals", referralRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (_req, res) => res.send("Referral API Health is OK!"));
app.use(errorHandler);

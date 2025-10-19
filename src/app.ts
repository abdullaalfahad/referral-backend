import express from "express";
import cors from "cors";
import "express-async-errors";
import { errorHandler } from "./middleware/error.middleware";
import { setupSwagger } from "./config/swagger"

export const app = express();

app.use(cors());
app.use(express.json());
setupSwagger(app);

app.get("/", (_req, res) => res.send("Referral API Health is OK!"));
app.use(errorHandler);

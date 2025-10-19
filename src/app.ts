import express from "express";
import cors from "cors";
import "express-async-errors";
import { errorHandler } from "./middleware/error.middleware.ts";

export const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (_req, res) => res.send("Referral API Health is OK!"));
app.use(errorHandler);

import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.ts";
import { connectDB } from "./config/db.ts";

const port = process.env.PORT || 4000;
const uri = process.env.MONGODB_URI as string;

connectDB(uri)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error("DB connection error:", err));

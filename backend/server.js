import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser()); // allow us to parse incoming cookies

app.use("/api/auth", authRoutes);

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  connectDB();
  console.log(`Server is running on ${Port}`.bgGreen);
});

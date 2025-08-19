import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import templateRoutes from "./routes/template.route.js";
import customizeRoutes from "./routes/customize.route.js";
import orderRoutes from "./routes/order.route.js";
import contactRoutes from "./routes/contact.route.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/customize", customizeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  connectDB();
  console.log(`Server is running on ${Port}`.bgGreen);
});

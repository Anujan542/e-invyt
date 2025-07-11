import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { Template } from "./models/template.model.js";
import dotnenv from "dotenv";

dotnenv.config();

const uploadTemplates = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const dataPath = path.resolve("./backend/templates.json");
    const rawData = fs.readFileSync(dataPath);
    const templates = JSON.parse(rawData);

    const result = await Template.insertMany(templates);
    console.log(`Inserted ${result.length} templates`);

    mongoose.disconnect();
  } catch (err) {
    console.error("Error during bulk upload:", err);
    mongoose.disconnect();
  }
};

uploadTemplates();

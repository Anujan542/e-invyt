import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected".bgCyan);
  } catch (error) {
    console.log("error connection to MongoDB: ".bgRed, error.message);
    process.exit(1);
  }
};

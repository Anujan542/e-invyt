import mongoose from "mongoose";

const CustomizationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },
    inputs: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export const Customization = mongoose.model(
  "Customization",
  CustomizationSchema
);

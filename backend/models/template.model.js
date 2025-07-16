import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    thumbnailUrl: String,
    previewVideoUrl: String,
    category: { type: String, enum: ["wedding", "birthday", "party", "other"] },
    isActive: { type: Boolean, default: true },
    price: { type: Number, default: 0 },
    duration: { type: Number },
    remotionCompositionId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Template = mongoose.model("Template", TemplateSchema);

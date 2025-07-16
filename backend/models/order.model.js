import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customization",
      required: true,
    },
    amountPaid: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentGateway: String,
    transactionId: String,
    renderStatus: {
      type: String,
      enum: ["not_started", "rendering", "completed", "failed"],
      default: "not_started",
    },
    renderId: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);

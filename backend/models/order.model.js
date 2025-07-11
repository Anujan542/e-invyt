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
    paymentGateway: String, // "Stripe", "PayHere", etc.
    transactionId: String,
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);

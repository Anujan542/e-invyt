import crypto from "crypto";
import { Customization } from "../models/customize.model.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";
import {
  getRenderProgress,
  renderMediaOnLambda,
} from "@remotion/lambda/client";

dotenv.config();

function generatePayHereHash({
  merchant_id,
  order_id,
  amount,
  currency,
  merchant_secret,
}) {
  const secretHash = crypto
    .createHash("md5")
    .update(merchant_secret)
    .digest("hex")
    .toUpperCase();

  const rawString = merchant_id + order_id + amount + currency + secretHash;

  const finalHash = crypto
    .createHash("md5")
    .update(rawString)
    .digest("hex")
    .toUpperCase();

  return finalHash;
}

export const initiatePayHerePayment = async (req, res) => {
  try {
    const { customizationId, amount } = req.body;
    const customization = await Customization.findById(customizationId);

    if (!customization) {
      return res.status(404).json({ error: "Customization not found" });
    }
    const user = await User.findById(req.userId).select("-password");

    // const amount = 50;
    const formattedAmount = amount.toFixed(2);

    const customizationExist = await Order.findOne({ customizationId });

    let order;

    if (customizationExist) {
      // Update the existing order
      customizationExist.amountPaid = amount;
      customizationExist.status = "pending"; // or keep previous status if needed
      customizationExist.paymentGateway = "PayHere";
      order = await customizationExist.save();
    } else {
      // Create a new order if it doesn't exist
      order = await Order.create({
        userId: req.userId,
        customizationId,
        amountPaid: amount,
        status: "pending",
        paymentGateway: "PayHere",
      });
    }

    const hash = generatePayHereHash({
      merchant_id: process.env.PAYHERE_MERCHANT_ID,
      order_id: order._id.toString(),
      amount: formattedAmount,
      currency: "LKR",
      merchant_secret: process.env.PAYHERE_SECRET,
    });

    const redirectData = {
      merchant_id: process.env.PAYHERE_MERCHANT_ID,
      return_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      notify_url: `${process.env.BACKEND_URL}/api/orders/payhere-notify`,
      order_id: order._id.toString(),
      items: "E-Invitation Template",
      amount,
      currency: "LKR",
      first_name: user.name,
      last_name: "Customer",
      email: user.email,
      phone: "0768855788",
      address: "123, Main Street",
      city: "Colombo",
      country: "Sri Lanka",
      sandbox: true,
      hash,
    };

    res.json({ payHereFormData: redirectData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to initiate payment" });
  }
};

export const handlePayHereNotify = async (req, res) => {
  const {
    merchant_id,
    order_id,
    payhere_amount,
    payhere_currency,
    status_code,
    md5sig,
    payment_id,
  } = req.body;

  try {
    const merchantSecret = process.env.PAYHERE_SECRET;

    // Step 1: Generate md5(merchant_secret) in UPPERCASE
    const secretMd5 = crypto
      .createHash("md5")
      .update(merchantSecret)
      .digest("hex")
      .toUpperCase();

    // Step 2: Concatenate and generate full md5sig
    const rawSigString =
      merchant_id +
      order_id +
      payhere_amount +
      payhere_currency +
      status_code +
      secretMd5;

    const generatedSig = crypto
      .createHash("md5")
      .update(rawSigString)
      .digest("hex")
      .toUpperCase();

    // Step 3: Compare
    if (generatedSig !== md5sig) {
      return res.status(400).json({ error: "Invalid signature from PayHere" });
    }

    // Step 4: Handle payment success
    if (status_code === "2") {
      const updated = await Order.findByIdAndUpdate(order_id, {
        status: "paid",
        transactionId: payment_id,
      });
    }

    res.send("OK");
  } catch (err) {
    console.error("Notify error:", err);
    res.status(500).json({ error: "Failed to process PayHere notify" });
  }
};

export const triggerRenderVideo = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId);

    if (order.renderStatus === "completed") {
      return res.status(200).json({ success: true, message: order });
    }

    if (!order || order.status !== "paid") {
      return res.status(400).json({ error: "Order not paid or not found" });
    }

    if (order.renderStatus !== "not_started") {
      return res
        .status(400)
        .json({ error: "Render already started or completed" });
    }

    const customization = await Customization.findById(
      order.customizationId
    ).populate("_id");
    const org = customization.inputs;
    console.log("org", org);

    order.renderStatus = "rendering";
    await order.save();

    const inputDataProps = {
      name: org.name,
      duration: org.duration,
      groomName: org.groomName,
      brideName: org.brideName,
      groomFamilyInfo: org.groomFamilyInfo,
      brideFamilyInfo: org.brideFamilyInfo,
      welcomeMessage: org.welcomeMessage,
      eventDate: org.eventDate,
      eventVenue: org.eventVenue,
      color: org.templateColor,
      audio: org.audio,
    };
    // lambda service ---->
    const { renderId } = await renderMediaOnLambda({
      region: "us-east-1",
      functionName: "remotion-render-4-0-331-mem2048mb-disk2048mb-900sec",
      composition: "Einvyt",
      framesPerLambda: null,
      serveUrl:
        "https://remotionlambda-useast1-qzsuscw6q7.s3.us-east-1.amazonaws.com/sites/e-invyt/index.html",
      inputProps: {
        name: inputDataProps.name,
        duration: inputDataProps.duration,
        groomName: inputDataProps.groomName,
        brideName: inputDataProps.brideName,
        groomFamilyInfo: inputDataProps.groomFamilyInfo,
        brideFamilyInfo: inputDataProps.brideFamilyInfo,
        welcomeMessage: inputDataProps.welcomeMessage,
        eventDate: inputDataProps.eventDate,
        eventVenue: inputDataProps.eventVenue,
        color: inputDataProps.color,
        audio: inputDataProps.audio,
      },
      timeoutInMilliseconds: 800000,
      codec: "h264",
      maxRetries: 0,
      privacy: "public",
      outName: {
        key: `renderTemplate/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.mp4`,
        bucketName: "remotionlambda-useast1-qzsuscw6q7",
      },
    });
    order.renderId = renderId;
    await order.save();

    res.json({ renderId, renderStatus: order.renderStatus });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to trigger video render" });
  }
};

export const renderProgress = async (req, res) => {
  const { renderId } = req.body;

  try {
    const progress = await getRenderProgress({
      renderId: `${renderId}`,
      bucketName: "remotionlambda-useast1-qzsuscw6q7",
      functionName: "remotion-render-4-0-331-mem2048mb-disk2048mb-900sec",
      region: "us-east-1",
    });

    if (progress.fatalErrorEncountered) {
      return res.status(500).json({
        status: "error",
        error: progress.errors,
      });
    }

    if (progress.done) {
      // Save final video and update status
      const order = await Order.findOne({ renderId });
      if (order) {
        order.renderStatus = "completed";
        order.videoUrl = progress.outputFile;
        await order.save();
      }

      return res.status(200).json({
        status: "success",
        videoUrl: progress.outputFile,
        totalCost: `$${progress.costs.accruedSoFar}`,
        totalTimeMinutes: Math.floor(progress.timeToFinish / 60000),
      });
    } else {
      return res.status(202).json({
        status: "in-progress",
        progress: (progress.overallProgress * 100).toFixed(0),
      });
    }
  } catch (error) {
    console.error("Progress Error:", error);
    res.status(500).json({ error: "Failed to fetch render progress" });
  }
};

export const getUserOrderDetails = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .populate("customizationId")
      .sort({ createdAt: -1 });

    if (!orders) {
      return res
        .status(400)
        .json({ success: false, message: "Orders not found" });
    }

    res.status(200).json({ success: true, message: orders });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

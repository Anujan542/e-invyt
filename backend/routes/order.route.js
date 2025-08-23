import express from "express";
import {
  getUserOrderDetails,
  handlePayHereNotify,
  initiatePayHerePayment,
  renderProgress,
  triggerRenderVideo,
  renderWebhook,
} from "../controllers/order.controller.js";
import { protectedAuth } from "../middleware/protectedAuth.js";

const router = express.Router();

// router.post("/", protectedAuth, createOrder);
router.post("/payhere", protectedAuth, initiatePayHerePayment);
router.post("/payhere-notify", handlePayHereNotify);
router.post("/render-template/:orderId", protectedAuth, triggerRenderVideo);
router.post("/render", protectedAuth, renderProgress);
router.get("/getOrder", protectedAuth, getUserOrderDetails);
router.post("/webhook/render", renderWebhook);

export default router;

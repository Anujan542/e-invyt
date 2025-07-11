import express from "express";
import {
  handlePayHereNotify,
  initiatePayHerePayment,
} from "../controllers/order.controller.js";
import { protectedAuth } from "../middleware/protectedAuth.js";

const router = express.Router();

// router.post("/", protectedAuth, createOrder);
router.post("/payhere", protectedAuth, initiatePayHerePayment);
router.post("/payhere-notify", handlePayHereNotify);

export default router;

import express from "express";
import { sendFeedbacks } from "../controllers/contact.controller.js";
// import { protectedAuth } from "../middleware/protectedAuth.js";

const router = express.Router();

router.post("/", sendFeedbacks);

export default router;

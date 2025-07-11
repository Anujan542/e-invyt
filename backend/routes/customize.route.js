import express from "express";
import { createCustomization } from "../controllers/customize.controller.js";
import { protectedAuth } from "../middleware/protectedAuth.js";

const router = express.Router();

router.post("/",protectedAuth, createCustomization);

export default router;

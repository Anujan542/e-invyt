import express from "express";
import {
  createCustomization,
  patchCustomization,
} from "../controllers/customize.controller.js";
import { protectedAuth } from "../middleware/protectedAuth.js";

const router = express.Router();

router.post("/", protectedAuth, createCustomization);
router.patch("/:id", protectedAuth, patchCustomization);

export default router;

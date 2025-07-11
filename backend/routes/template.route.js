import express from "express";
import { getAllTemplates } from "../controllers/template.controller.js";

const router = express.Router();

router.get("/", getAllTemplates);

export default router;

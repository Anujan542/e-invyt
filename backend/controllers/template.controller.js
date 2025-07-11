import { Template } from "../models/template.model.js";

export const getAllTemplates = async (req, res) => {
  try {
    const template = await Template.find({ isActive: true });
    res.status(200).json( template );
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch templates" });
  }
};

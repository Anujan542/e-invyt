import { Customization } from "../models/customize.model.js";

export const createCustomization = async (req, res) => {
  try {
    const customization = await Customization({
      userId: req.userId,
      templateId: req.body.templateId,
      inputs: req.body.inputs,
    });

    await customization.save();
    res.status(201).json(customization);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to create customization" });
  }
};

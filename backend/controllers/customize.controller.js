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


export const patchCustomization = async (req, res) => {
  try {
    const { id } = req.params;

    // only take the fields that are provided
    const updateData = {};
    if (req.body.templateId !== undefined)
      updateData.templateId = req.body.templateId;
    if (req.body.inputs !== undefined) updateData.inputs = req.body.inputs;

    const customization = await Customization.findOneAndUpdate(
      { _id: id, userId: req.userId }, // make sure user only updates their own
      { $set: updateData },
      { new: true }
    );

    if (!customization) {
      return res.status(404).json({ error: "Customization not found" });
    }

    res.status(200).json(customization);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to patch customization" });
  }
};

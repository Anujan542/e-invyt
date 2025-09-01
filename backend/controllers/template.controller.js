import { Template } from "../models/template.model.js";

export const getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find({ isActive: true });

    // Replace the S3 domain with CloudFront
    const updatedTemplates = templates.map((t) => {
      const obj = t.toObject(); // convert Mongoose doc to plain object

      obj.thumbnailUrl = obj.thumbnailUrl.replace(
        "e-invyt.s3.eu-north-1.amazonaws.com",
        "d3ampc50c60qih.cloudfront.net"
      );

      obj.previewVideoUrl = obj.previewVideoUrl.replace(
        "e-invyt.s3.eu-north-1.amazonaws.com",
        "d3ampc50c60qih.cloudfront.net"
      );

      return obj;
    });

    res.status(200).json(updatedTemplates);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch templates" });
  }
};

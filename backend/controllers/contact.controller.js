import { sendContacts } from "../utils/emails.js";

export const sendFeedbacks = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await sendContacts(name, email, message);
    res
      .status(200)
      .json({ success: true, message: "Feedback send successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch templates" });
  }
};

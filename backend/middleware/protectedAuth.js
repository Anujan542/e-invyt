import jwt from "jsonwebtoken";

export const protectedAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode)
      return res.status(401).json({ success: false, message: "Invalid token" });
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.error("Error in verify token",error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

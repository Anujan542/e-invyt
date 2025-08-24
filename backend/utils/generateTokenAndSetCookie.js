import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true on Railway
    sameSite: "none", // must be none for cross-site requests
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

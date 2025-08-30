import { config } from "../config/config.js";

export const verifyServiceSecret = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  if (token !== config.serviceJwtSecret) {
    return res.status(403).json({ message: "Invalid service token" });
  }
  next();
};



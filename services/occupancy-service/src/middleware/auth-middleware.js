import { verifyJwt } from "../utils/jwt.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.occupix;
    if (!token) return res.status(401).json({ error: "No token found" });

    const { valid, payload, error } = await verifyJwt(token);
    if (valid) {
      req.user = payload; // attach decoded payload to request
      next();
    } else {
      throw new Error(error || "Token invalid");
    }
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired. Please login again" });
    } else {
      return res.status(401).json({ error: "Token invalid" });
    }
  }
};

export default authMiddleware;

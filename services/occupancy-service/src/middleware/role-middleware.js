const roleMiddleware = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ error: "Forbidden: Insufficient role" });
    }

    next();
  };
};

export default roleMiddleware;

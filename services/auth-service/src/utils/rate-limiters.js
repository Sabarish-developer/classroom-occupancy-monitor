import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 10,
    message: {error: "Too many requests. Please try again later."},
    standardHeaders: true,
    legacyHeaders: false
});

export default rateLimiter;
import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 3,
    message: 'Too many requests. Try again later.',
    standardHeaders: true,
    legacyHeaders: false
});

export default rateLimiter;
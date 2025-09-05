import { Router } from "express";
import rateLimiter from '../utils/rate-limiter.js';
import authMiddleware from '../middleware/auth-middleware.js';
import roleMiddleware from '../middleware/role-middleware.js';
import { promptHandler } from "../controllers/genai-controllers.js";

const router = Router();

router.use(rateLimiter);

router.post('/prompt', roleMiddleware('student', 'faculty'), promptHandler);


export default router;
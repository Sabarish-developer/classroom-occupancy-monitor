import { Router } from "express";
import rateLimiter from '../utils/rate-limiter.js';
import authMiddleware from '../middleware/auth-middleware.js';
import roleMiddleware from '../middleware/role-middleware.js';


const router = Router();

//router.use(rateLimiter, authMiddleware);



export default router;
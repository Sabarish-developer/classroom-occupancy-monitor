import { Router } from "express";
import rateLimiter from '../utils/rate-limiter.js';
import authMiddleware from '../middleware/auth-middleware.js';
import roleMiddleware from '../middleware/role-middleware.js';
import { studentOccupancyHandler } from "../controllers/occupancy-controllers";

const router = Router();

router.use(rateLimiter, authMiddleware);

router.get('/student', roleMiddleware('student'), studentOccupancyHandler);
router.get('/faculty', roleMiddleware('faculty'), facultyOccupancyHandler);

export default router;
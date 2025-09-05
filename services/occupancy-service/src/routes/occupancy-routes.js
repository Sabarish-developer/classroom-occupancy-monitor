import { Router } from "express";
import rateLimiter from '../utils/rate-limiter.js';
import authMiddleware from '../middleware/auth-middleware.js';
import roleMiddleware from '../middleware/role-middleware.js';
import { occupancyHandler, refreshOccupancyHandler } from "../controllers/occupancy-controllers.js";

const router = Router();

router.use(rateLimiter);

router.get('/data', roleMiddleware('student', 'faculty'), occupancyHandler);
router.post('/refresh', roleMiddleware('student', 'faculty'), refreshOccupancyHandler);

export default router;
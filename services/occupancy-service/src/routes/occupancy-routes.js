import { Router } from "express";
import rateLimiter from '../utils/rate-limiter.js';
import authMiddleware from '../middleware/auth-middleware.js';
import roleMiddleware from '../middleware/role-middleware.js';
import { occupancyHandler, refreshOccupancyHandler } from "../controllers/occupancy-controllers.js";

const router = Router();

router.use(rateLimiter);

router.get('/data', occupancyHandler);
router.post('/refresh', refreshOccupancyHandler);

export default router;
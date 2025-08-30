import { Router } from "express";
import rateLimiter from '../utils/rate-limiter.js';
import authMiddleware from '../middleware/auth-middleware.js';
import roleMiddleware from '../middleware/role-middleware.js';
import { trackEventHandler, trackMetricHandler } from "../controllers/analytics-controller.js";


const router = Router();

router.use(authMiddleware);
router.post('/log-event', roleMiddleware('student', 'faculty'), trackEventHandler);
router.post('/log-metric', roleMiddleware('student', 'faculty'), trackMetricHandler);

export default router;
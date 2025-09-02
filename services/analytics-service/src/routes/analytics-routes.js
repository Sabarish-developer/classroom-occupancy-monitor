import { Router } from "express";
import rateLimiter from '../utils/rate-limiter.js';
import authMiddleware from "../middleware/auth-middleware.js";
import roleMiddleware from "../middleware/role-middleware.js";
import { verifyServiceSecret } from "../middleware/verify-service-secret.js";
import { trackEventHandler, trackMetricHandler, adminDataHandler } from "../controllers/analytics-controller.js";


const router = Router();

router.post('/log-event', verifyServiceSecret, trackEventHandler);
router.post('/log-metric', verifyServiceSecret, trackMetricHandler);
router.get('/admin-data', authMiddleware, roleMiddleware('admin'), adminDataHandler);

export default router;
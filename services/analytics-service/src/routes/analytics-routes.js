import { Router } from "express";
import rateLimiter from '../utils/rate-limiter.js';
import { verifyServiceSecret } from "../middleware/verify-service-secret.js";
import { trackEventHandler, trackMetricHandler } from "../controllers/analytics-controller.js";


const router = Router();

router.use(verifyServiceSecret);
router.post('/log-event', trackEventHandler);
router.post('/log-metric', trackMetricHandler);

export default router;
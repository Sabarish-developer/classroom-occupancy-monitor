import { Router } from "express";
import { studentOccupancyHandler } from "../controllers/occupancy-controllers";

const router = Router();

router.get('/student', studentOccupancyHandler);
router.get('/faculty', facultyOccupancyHandler);

export default router;
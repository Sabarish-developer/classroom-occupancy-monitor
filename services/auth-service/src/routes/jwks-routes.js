import { Router } from "express";
import { jwksHandler } from "../controllers/jwks-controller.js";

const jwksRouter = Router();

jwksRouter.get('/.well-known/jwks.json', jwksHandler);

export default jwksRouter;
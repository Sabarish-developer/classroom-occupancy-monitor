import { Router } from "express";
import passport from "passport";
import { googleCallbackHandler, logoutHandler, userInfoHandler} from "../controllers/auth-controller.js";

const router = Router();

router.get('/google', passport.authenticate("google", {scope: ["profile", "email"], prompt: "consent"}));
router.get('/google/callback', passport.authenticate("google", {session: false, failWithError: true}), googleCallbackHandler);
router.post('/logout', logoutHandler);
router.get('/user', userInfoHandler);

export default router;
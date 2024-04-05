import { Router } from "express";
import { signUpUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const router = Router();

router.route('/signup').post(signUpUser);
router.route('/signin').post(loginUser);
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/verify').get(verifyJWT);

export default router;
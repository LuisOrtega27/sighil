import { Router } from "express"

import { register, login, me, logout } from "../controllers/auth.controller.js"
import { optionalAuth } from "../middlewares/authRequired.js"

const router = Router()

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", optionalAuth, me);

export default router
import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller.js";

/* Montado en /api/profile con authRequired (ver app.js): req.user ya viene
   cargado desde la cookie, asi que el id nunca se toma del cliente. */
const router = Router();

router.route("/")
    .get(getProfile)
    .put(updateProfile);

export default router;

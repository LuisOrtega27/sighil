import { Router } from "express";

import authRequired from "../middlewares/authRequired.js";
import {
    getCuencas,
    getSubcuencas,
    getParroquias,
} from "../controllers/catalogos.controller.js";

const router = Router();

router.use(authRequired);

router.get("/cuencas", getCuencas);
router.get("/subcuencas", getSubcuencas);
router.get("/parroquias", getParroquias);

export default router;

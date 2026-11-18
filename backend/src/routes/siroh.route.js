import { Router } from "express";

import authRequired from "../middlewares/authRequired.js";
import roleRequired from "../middlewares/roleRequired.js";
import {
    createInspeccion,
    updateInspeccion,
} from "../controllers/siroh.controller.js";

const router = Router();

router.use(authRequired, roleRequired(1, 2));

router.post("/inspecciones", createInspeccion);
router.patch("/inspecciones/:id", updateInspeccion);

export default router;

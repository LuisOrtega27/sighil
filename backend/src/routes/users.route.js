import { Router } from "express";
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/admin.controller.js";

/* Este endpoint legacy queda protegido en app.js con authRequired +
   roleRequired(1). Reutiliza el controller seguro del modulo de administracion
   para no mantener dos implementaciones (y dos niveles de seguridad) distintos. */
const router = Router();

router.route("/")
    .get(getUsers)
    .post(createUser);

router.route("/:id")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

export default router;

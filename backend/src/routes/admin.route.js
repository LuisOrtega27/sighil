import { Router } from "express";

import authRequired from "../middlewares/authRequired.js";
import roleRequired from "../middlewares/roleRequired.js";
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    changeRole,
    deleteUser,
    getStats,
} from "../controllers/admin.controller.js";

/* Todo el modulo queda detrás de sesión válida y rol administrador. */
const router = Router();

router.use(authRequired, roleRequired(1));

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.patch("/users/:id/role", changeRole);
router.delete("/users/:id", deleteUser);
router.get("/stats", getStats);

export default router;

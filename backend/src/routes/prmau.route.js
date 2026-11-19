import { Router } from "express";

import authRequired from "../middlewares/authRequired.js";
import roleRequired from "../middlewares/roleRequired.js";
import {
  getVulnParroquias,
  getVulnSectores,
  getVulnManzanas,
  getVulnOrganizaciones,
  submitVulnerabilidad,
  submitSocioeconomico,
} from "../controllers/prmau.controller.js";

const router = Router();

router.use(authRequired);

// Catálogos (lectura) para el formulario de vulnerabilidad.
router.get("/catalogos/parroquias", getVulnParroquias);
router.get("/catalogos/sectores", getVulnSectores);
router.get("/catalogos/manzanas", getVulnManzanas);
router.get("/catalogos/organizaciones", getVulnOrganizaciones);

// Envío de formularios PRMAU (gestión: admin/editor).
router.post("/vulnerabilidad", roleRequired(1, 2), submitVulnerabilidad);
router.post("/socioeconomico", roleRequired(1, 2), submitSocioeconomico);

export default router;

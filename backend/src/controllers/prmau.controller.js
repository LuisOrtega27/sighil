import pool from "../database.js";

const safeJson = (payload) => JSON.stringify(payload ?? {});

/* Catálogos para FormVulne. Responden con el shape esperado por el frontend
   (id, nombre, cod y llaves foráneas para filtrado). */
const getVulnParroquias = async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, nombre, cod FROM prmau_parroquias ORDER BY nombre, id"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const getVulnSectores = async (req, res) => {
  const { parroquia_id: parroquiaId } = req.query;

  try {
    let sql =
      "SELECT id, parroquia_id, nombre, cod FROM prmau_sectores";
    const params = [];
    if (parroquiaId !== undefined && parroquiaId !== "") {
      if (Number.isNaN(Number(parroquiaId))) {
        return res.status(400).json({ message: "parroquia_id is invalid" });
      }
      sql += " WHERE parroquia_id = ?";
      params.push(parroquiaId);
    }
    sql += " ORDER BY nombre, id";

    const [rows] = await pool.query(sql, params);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const getVulnManzanas = async (req, res) => {
  const { sector_id: sectorId } = req.query;

  try {
    let sql = "SELECT id, sector_id, nombre, cod FROM prmau_manzanas";
    const params = [];
    if (sectorId !== undefined && sectorId !== "") {
      if (Number.isNaN(Number(sectorId))) {
        return res.status(400).json({ message: "sector_id is invalid" });
      }
      sql += " WHERE sector_id = ?";
      params.push(sectorId);
    }
    sql += " ORDER BY nombre, id";

    const [rows] = await pool.query(sql, params);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const getVulnOrganizaciones = async (req, res) => {
  const { parroquia_id: parroquiaId } = req.query;

  try {
    let sql =
      "SELECT id, parroquia_id, nombre, cod FROM prmau_organizaciones";
    const params = [];
    if (parroquiaId !== undefined && parroquiaId !== "") {
      if (Number.isNaN(Number(parroquiaId))) {
        return res.status(400).json({ message: "parroquia_id is invalid" });
      }
      sql += " WHERE parroquia_id = ?";
      params.push(parroquiaId);
    }
    sql += " ORDER BY nombre, id";

    const [rows] = await pool.query(sql, params);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

/* Recepción de formularios PRMAU. Se almacena el payload JSON completo
   (migración 002_prmau) para no perder datos mientras se consolida el esquema. */
const submitVulnerabilidad = async (req, res) => {
  const payload = req.body ?? {};
  const userId = req.user?.id ?? null;
  const codCatastral = payload.cod_catastral ?? payload.codCatastro ?? null;

  try {
    const [result] = await pool.query(
      `INSERT INTO prmau_ficha_vulnerabilidad (user_id, cod_catastral, payload)
       VALUES (?, ?, ?)`,
      [userId, codCatastral, safeJson(payload)]
    );

    res.status(201).json({
      id: result.insertId,
      message: "vulnerabilidad guardada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const submitSocioeconomico = async (req, res) => {
  const payload = req.body ?? {};
  const userId = req.user?.id ?? null;

  try {
    const [result] = await pool.query(
      `INSERT INTO prmau_ficha_socioeconomica (user_id, payload)
       VALUES (?, ?)`,
      [userId, safeJson(payload)]
    );

    res.status(201).json({
      id: result.insertId,
      message: "socioeconomico guardado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export {
  getVulnParroquias,
  getVulnSectores,
  getVulnManzanas,
  getVulnOrganizaciones,
  submitVulnerabilidad,
  submitSocioeconomico,
};

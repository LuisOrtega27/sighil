import pool from "../database.js";

/* Catalogos basicos del formulario SIROH. Todas las consultas van
   parametrizadas y los endpoints estan protegidos por authRequired. */

const getCuencas = async (req, res) => {
    console.log(req)
    try {
        const [rows] = await pool.query(
            "SELECT id, nombre FROM cuencas ORDER BY id"
        );
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error"});
    }
};

const getSubcuencas = async (req, res) => {
    const { cuenca_id: cuencaId } = req.query;

    if (!cuencaId || Number.isNaN(Number(cuencaId))) {
        return res.status(400).json({ message: "cuenca_id is required" });
    }

    try {
        const [rows] = await pool.query(
            `SELECT id, nombre, codigo, abreviatura
             FROM subcuencas
             WHERE cuenca_id = ?
             ORDER BY codigo, id`,
            [cuencaId]
        );
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

/* Parroquias es un catalogo independiente: no se filtra por subcuenca. */
const getParroquias = async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id, nombre FROM parroquias ORDER BY nombre"
        );
        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

export {
    getCuencas,
    getSubcuencas,
    getParroquias,
};

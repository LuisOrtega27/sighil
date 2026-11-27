import pool from "../database.js";

/* Columnas protegidas: se gestionan en el servidor, nunca desde el payload.
   En la tabla real cod_n es la PK auto-incremental y modification es interna. */
const COLUMNAS_PROTEGIDAS = new Set([
    "id",
    "user_id",
    "cod_n",
    "modification",
    "created_at",
    "updated_at",
]);

/* La lista blanca se lee del esquema real para no duplicar los ~150 names
   del formulario en codigo. */
const obtenerColumnasPermitidas = async () => {
    const [rows] = await pool.query(
        `SELECT COLUMN_NAME AS nombre
         FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'ficha_eoh'`
    );
    return new Set(
        rows
            .map((row) => row.nombre)
            .filter((nombre) => !COLUMNAS_PROTEGIDAS.has(nombre))
    );
};

/* Consulta para el modal "Editar ficha": acepta cod_n con o sin ceros. */
const getInspeccion = async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: "invalid inspeccion id" });
    }

    try {
        const [rows] = await pool.query(
            "SELECT * FROM ficha_eoh WHERE cod_n = ?",
            [id]
        );

        if (!rows.length) {
            return res.status(404).json({ message: "inspeccion not found" });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

/* Modal "Ver fichas": busqueda por cod_n, ficha_n o fecha de transcripcion.
   Los filtros que llegan se combinan con OR; sin filtros devuelve todas las
   filas. Se usa SELECT * porque el modal muestra todos los campos de la ficha. */
const searchInspecciones = async (req, res) => {
    const { cod_n: codN, ficha_n: fichaN, fecha } = req.query ?? {};

    const conditions = [];
    const values = [];

    if (codN !== undefined && String(codN).trim() !== "") {
        const raw = String(codN).trim();
        if (!/^\d+$/.test(raw)) {
            return res.status(400).json({ message: "cod_n debe ser numérico" });
        }
        conditions.push("cod_n = ?");
        values.push(Number(raw));
    }

    if (fichaN !== undefined && String(fichaN).trim() !== "") {
        conditions.push("ficha_n LIKE ?");
        values.push(`%${String(fichaN).trim()}%`);
    }

    if (fecha !== undefined && String(fecha).trim() !== "") {
        const rawFecha = String(fecha).trim();
        if (!/^\d{4}-\d{2}-\d{2}$/.test(rawFecha)) {
            return res.status(400).json({ message: "fecha debe tener el formato YYYY-MM-DD" });
        }
        conditions.push("DATE(fecha_transcripcion) = ?");
        values.push(rawFecha);
    }

    const where = conditions.length ? ` WHERE ${conditions.join(" OR ")}` : "";

    try {
        const [rows] = await pool.query(
            `SELECT * FROM ficha_eoh${where} ORDER BY fecha_transcripcion DESC, cod_n DESC`,
            values
        );

        res.status(200).json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

/* Paso 1: crear la fila vacia y devolver el codigo de 6 digitos. */
const createInspeccion = async (req, res) => {
    try {
        /* cod_n es INT AUTO_INCREMENT: la fila nueva ya recibe su id.
           Al cliente se le devuelve con ceros a la izquierda para el input. */
        const [result] = await pool.query("INSERT INTO ficha_eoh () VALUES ()");

        const id = result.insertId;
        const codN = String(id).padStart(6, "0");

        res.status(201).json({ id, cod_n: codN });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

/* Paso 2: actualizar la fila creada con los name -> valor del formulario. */
const updateInspeccion = async (req, res) => {
    const { id } = req.params;
    const payload = req.body ?? {};

    if (Number.isNaN(Number(id))) {
        return res.status(400).json({ message: "invalid inspeccion id" });
    }

    try {
        const permitidas = await obtenerColumnasPermitidas();
        const entradas = Object.entries(payload)
            .filter(([nombre]) => permitidas.has(nombre))
            .map(([nombre, valor]) => [nombre, valor === "" ? null : valor]);

        if (!entradas.length) {
            return res.status(400).json({ message: "no valid fields to update" });
        }

        const asignaciones = entradas
            .map(([nombre]) => `\`${nombre}\` = ?`)
            .join(", ");
        const valores = entradas.map(([, valor]) => valor);

        const [result] = await pool.query(
            `UPDATE ficha_eoh SET ${asignaciones}
             WHERE cod_n = ?`,
            [...valores, id]
        );

        if (!result.affectedRows) {
            return res.status(404).json({ message: "inspeccion not found" });
        }

        const [rows] = await pool.query(
            "SELECT cod_n FROM ficha_eoh WHERE cod_n = ?",
            [id]
        );

        res.status(200).json({
            id: rows[0].cod_n,
            cod_n: String(rows[0].cod_n).padStart(6, "0"),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

export {
    getInspeccion,
    searchInspecciones,
    createInspeccion,
    updateInspeccion,
};

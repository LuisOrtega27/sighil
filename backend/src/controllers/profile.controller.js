import pool from "../database.js";

/* Columnas visibles del perfil. Nunca se devuelve `password` (ni el hash). */
const PROFILE_COLUMNS = "id, fname, lname, ci, phone, email, direccion_id, rol_id, status";

const CI_PATTERN = /^\d{1,2}\.\d{3}\.\d{3}$/;
const PHONE_PATTERN = /^\d{4}-\d{7}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getProfile = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT ${PROFILE_COLUMNS} FROM users WHERE id = ?`,
            [req.user.id]
        );

        if (!rows.length) return res.status(404).json({ message: "user not found" });

        res.status(200).json(rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "internal server error" });
    }
};

/* El usuario solo puede cambiar sus datos personales. rol_id, status y
   password quedan fuera de este endpoint (el cambio de clave sera otro flujo). */
const updateProfile = async (req, res) => {
    const { fname, lname, ci, phone, email, direccion_id } = req.body ?? {};
    const userId = req.user.id;

    const values = {
        fname: typeof fname === "string" ? fname.trim() : "",
        lname: typeof lname === "string" ? lname.trim() : "",
        ci: typeof ci === "string" ? ci.trim() : "",
        phone: typeof phone === "string" ? phone.trim() : "",
        email: typeof email === "string" ? email.trim().toLowerCase() : "",
        direccion_id,
    };

    if (
        !values.fname || !values.lname || !values.ci || !values.phone || !values.email ||
        values.direccion_id === undefined || values.direccion_id === null || values.direccion_id === ""
    ) {
        return res.status(400).json({ message: "Todos los campos del perfil son obligatorios" });
    }

    if (!CI_PATTERN.test(values.ci)) {
        return res.status(400).json({ message: "La cédula debe tener el formato 00.000.000" });
    }
    if (!PHONE_PATTERN.test(values.phone)) {
        return res.status(400).json({ message: "El teléfono debe tener el formato 0000-0000000" });
    }
    if (!EMAIL_PATTERN.test(values.email)) {
        return res.status(400).json({ message: "Introduce un correo válido" });
    }
    if (!Number.isInteger(Number(values.direccion_id))) {
        return res.status(400).json({ message: "Selecciona un área o departamento válido" });
    }

    try {
        const [duplicates] = await pool.query(
            "SELECT id FROM users WHERE (email = ? OR ci = ?) AND id <> ?",
            [values.email, values.ci, userId]
        );
        if (duplicates.length) {
            return res.status(409).json({ message: "El correo o la cédula ya están registrados" });
        }

        await pool.query(
            `UPDATE users
                SET fname = ?, lname = ?, ci = ?, phone = ?, email = ?, direccion_id = ?
              WHERE id = ?`,
            [
                values.fname,
                values.lname,
                values.ci,
                values.phone,
                values.email,
                Number(values.direccion_id),
                userId,
            ]
        );

        const [rows] = await pool.query(
            `SELECT ${PROFILE_COLUMNS} FROM users WHERE id = ?`,
            [userId]
        );

        res.status(200).json(rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "internal server error" });
    }
};

export { getProfile, updateProfile };

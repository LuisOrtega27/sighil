import bcrypt from "bcryptjs";
import pool from "../database.js";

/* Columnas visibles del perfil. Nunca se devuelve `password` (ni el hash). */
const PROFILE_COLUMNS = "id, fname, lname, ci, phone, email, direccion_id, rol_id, status";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

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

/* Desde /perfil solo se cambia el correo: cualquier otro campo del body se
   ignora. El resto de datos, el rol y el estatus se gestionan en /api/admin. */
const updateProfile = async (req, res) => {
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const userId = req.user.id;

    if (!email) {
        return res.status(400).json({ message: "El correo es obligatorio" });
    }
    if (!EMAIL_PATTERN.test(email)) {
        return res.status(400).json({ message: "Introduce un correo válido" });
    }

    try {
        const [duplicates] = await pool.query(
            "SELECT id FROM users WHERE LOWER(email) = ? AND id <> ?",
            [email, userId]
        );
        if (duplicates.length) {
            return res.status(409).json({ message: "El correo ya está registrado" });
        }

        await pool.query(
            `UPDATE users
                SET email = ?
              WHERE id = ?`,
            [email, userId]
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

/* La clave se cambia aparte: se exige la actual para evitar que cualquiera con
   la sesión iniciada pueda tomar la cuenta sin conocerla. */
const changePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body ?? {};

    if (typeof currentPassword !== "string" || !currentPassword) {
        return res.status(400).json({ message: "La clave actual es obligatoria" });
    }
    if (typeof newPassword !== "string" || newPassword.length < MIN_PASSWORD_LENGTH) {
        return res.status(400).json({ message: `La nueva clave debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres` });
    }
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Las claves nuevas no coinciden" });
    }

    try {
        /* authRequired consulta la fila completa en cada request, así que el
           hash vigente ya está disponible en req.user. */
        const isMatch = await bcrypt.compare(currentPassword, req.user.password ?? "");
        if (!isMatch) {
            return res.status(400).json({ message: "La clave actual es incorrecta" });
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);
        await pool.query(
            "UPDATE users SET password = ? WHERE id = ?",
            [passwordHash, req.user.id]
        );

        res.status(200).json({ message: "Contraseña actualizada correctamente" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "internal server error" });
    }
};

export { getProfile, updateProfile, changePassword };

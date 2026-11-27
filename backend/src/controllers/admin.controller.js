import bcrypt from "bcryptjs";
import pool from "../database.js";

/* Unica fuente de verdad para el modulo de administracion.
   Todas las consultas son parametrizadas (incluidos los identificadores de
   tabla/columna de las estadisticas, que ademas vienen de una lista fija). */

const ROLES = Object.freeze({ ADMIN: 1 });
const STATUSES = new Set(["pendiente", "activado", "desactivado"]);
const CI_PATTERN = /^\d{1,2}\.\d{3}\.\d{3}$/;
const PHONE_PATTERN = /^\d{4}-\d{7}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

const USER_SELECT = `
    SELECT u.id, u.fname, u.lname, u.ci, u.phone, u.email,
           u.direccion_id, d.name AS direccion,
           u.rol_id, r.nombre AS rol, u.status, u.created_at
      FROM users u
      LEFT JOIN direcciones d ON d.id = u.direccion_id
      LEFT JOIN roles r ON r.id = u.rol_id
`;

const FORM_SOURCES = [
    {
        key: "ficha_eoh",
        label: "Ficha EOH (SIROH)",
        table: "ficha_eoh",
        dateColumn: "fecha_transcripcion",
    },
    {
        key: "prmau_vulnerabilidad",
        label: "Vulnerabilidad Física (PRMAU)",
        table: "prmau_ficha_vulnerabilidad",
        dateColumn: "created_at",
    },
    {
        key: "prmau_socioeconomico",
        label: "Socioeconómico (PRMAU)",
        table: "prmau_ficha_socioeconomica",
        dateColumn: "created_at",
    },
];

const isValidId = (value) => Number.isInteger(Number(value)) && Number(value) > 0;

const normalizeUser = (body) => ({
    fname: typeof body?.fname === "string" ? body.fname.trim() : "",
    lname: typeof body?.lname === "string" ? body.lname.trim() : "",
    ci: typeof body?.ci === "string" ? body.ci.trim() : "",
    phone: typeof body?.phone === "string" ? body.phone.trim() : "",
    email: typeof body?.email === "string" ? body.email.trim().toLowerCase() : "",
    direccion_id: body?.direccion_id,
    status: typeof body?.status === "string" ? body.status.trim() : "",
});

const validateUserData = (values) => {
    if (!values.fname || !values.lname || !values.ci || !values.phone || !values.email) {
        return "Todos los campos personales son obligatorios";
    }
    if (!CI_PATTERN.test(values.ci)) return "La cédula debe tener el formato 00.000.000";
    if (!PHONE_PATTERN.test(values.phone)) return "El teléfono debe tener el formato 0000-0000000";
    if (!EMAIL_PATTERN.test(values.email)) return "Introduce un correo válido";
    if (!isValidId(values.direccion_id)) return "Selecciona un área o departamento válido";
    if (!STATUSES.has(values.status)) return "Estatus no válido";
    return null;
};

const ensureUnique = async (email, ci, excludeId = null) => {
    const params = [email, ci];
    let sql = "SELECT id FROM users WHERE (email = ? OR ci = ?)";
    if (excludeId !== null) {
        sql += " AND id <> ?";
        params.push(excludeId);
    }
    const [rows] = await pool.query(sql, params);
    return rows.length === 0;
};

const findUser = async (id) => {
    const [rows] = await pool.query(`${USER_SELECT} WHERE u.id = ?`, [id]);
    return rows[0] ?? null;
};

const getUsers = async (_req, res) => {
    try {
        const [rows] = await pool.query(`${USER_SELECT} ORDER BY u.id`);
        res.status(200).json(rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "internal server error" });
    }
};

const getUser = async (req, res) => {
    if (!isValidId(req.params.id)) {
        return res.status(400).json({ message: "invalid user id" });
    }
    try {
        const user = await findUser(req.params.id);
        if (!user) return res.status(404).json({ message: "user not found" });
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "internal server error" });
    }
};

const createUser = async (req, res) => {
    const values = normalizeUser(req.body);
    const { rol_id: rolId, password } = req.body ?? {};

    const invalid = validateUserData(values);
    if (invalid) return res.status(400).json({ message: invalid });
    if (!isValidId(rolId)) return res.status(400).json({ message: "Rol no válido" });
    if (typeof password !== "string" || password.length < 6) {
        return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
    }

    try {
        const [roles] = await pool.query("SELECT id FROM roles WHERE id = ?", [rolId]);
        if (!roles.length) return res.status(400).json({ message: "Rol no válido" });
        if (!(await ensureUnique(values.email, values.ci))) {
            return res.status(409).json({ message: "El correo o la cédula ya están registrados" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            `INSERT INTO users
                (rol_id, fname, lname, direccion_id, ci, phone, email, password, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [rolId, values.fname, values.lname, values.direccion_id, values.ci,
             values.phone, values.email, passwordHash, values.status]
        );

        res.status(201).json(await findUser(result.insertId));
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "internal server error" });
    }
};

const updateUser = async (req, res) => {
    if (!isValidId(req.params.id)) {
        return res.status(400).json({ message: "invalid user id" });
    }

    const values = normalizeUser(req.body);
    const invalid = validateUserData(values);
    if (invalid) return res.status(400).json({ message: invalid });

    try {
        const existing = await findUser(req.params.id);
        if (!existing) return res.status(404).json({ message: "user not found" });

        if (!(await ensureUnique(values.email, values.ci, req.params.id))) {
            return res.status(409).json({ message: "El correo o la cédula ya están registrados" });
        }

        await pool.query(
            `UPDATE users
                SET fname = ?, lname = ?, ci = ?, phone = ?, email = ?,
                    direccion_id = ?, status = ?
              WHERE id = ?`,
            [values.fname, values.lname, values.ci, values.phone, values.email,
             values.direccion_id, values.status, req.params.id]
        );

        res.status(200).json(await findUser(req.params.id));
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "internal server error" });
    }
};

const changeRole = async (req, res) => {
    if (!isValidId(req.params.id)) {
        return res.status(400).json({ message: "invalid user id" });
    }

    const rolId = Number(req.body?.rol_id);
    if (!isValidId(rolId)) return res.status(400).json({ message: "Rol no válido" });

    try {
        const [roles] = await pool.query("SELECT id FROM roles WHERE id = ?", [rolId]);
        if (!roles.length) return res.status(400).json({ message: "Rol no válido" });

        const [rows] = await pool.query("SELECT rol_id FROM users WHERE id = ?", [req.params.id]);
        const target = rows[0];
        if (!target) return res.status(404).json({ message: "user not found" });

        const isSelf = Number(req.params.id) === Number(req.user.id);
        const wasAdmin = Number(target.rol_id) === ROLES.ADMIN;
        const willBeAdmin = rolId === ROLES.ADMIN;

        if (isSelf && !willBeAdmin) {
            return res.status(403).json({ message: "No puedes quitarte el rol de administrador" });
        }
        if (wasAdmin && !willBeAdmin) {
            const [admins] = await pool.query(
                "SELECT COUNT(*) AS total FROM users WHERE rol_id = ?",
                [ROLES.ADMIN]
            );
            if (Number(admins[0].total) <= 1) {
                return res.status(403).json({ message: "No puedes desactivar al último administrador" });
            }
        }

        await pool.query("UPDATE users SET rol_id = ? WHERE id = ?", [rolId, req.params.id]);
        res.status(200).json(await findUser(req.params.id));
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "internal server error" });
    }
};

/* El administrador puede fijar la clave de otro usuario sin conocer la actual.
   Su propia clave se cambia en /api/profile, donde sí se exige la vigente. */
const changeUserPassword = async (req, res) => {
    if (!isValidId(req.params.id)) {
        return res.status(400).json({ message: "invalid user id" });
    }
    if (Number(req.params.id) === Number(req.user.id)) {
        return res.status(403).json({ message: "Usa Mi perfil para cambiar tu propia clave" });
    }

    const { newPassword, confirmPassword } = req.body ?? {};
    if (typeof newPassword !== "string" || newPassword.length < MIN_PASSWORD_LENGTH) {
        return res.status(400).json({ message: `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres` });
    }
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    try {
        const existing = await findUser(req.params.id);
        if (!existing) return res.status(404).json({ message: "user not found" });

        const passwordHash = await bcrypt.hash(newPassword, 10);
        await pool.query(
            "UPDATE users SET password = ? WHERE id = ?",
            [passwordHash, req.params.id]
        );

        res.status(200).json({ message: "Clave actualizada correctamente" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "internal server error" });
    }
};

const deleteUser = async (req, res) => {
    if (!isValidId(req.params.id)) {
        return res.status(400).json({ message: "invalid user id" });
    }

    try {
        const [rows] = await pool.query("SELECT rol_id FROM users WHERE id = ?", [req.params.id]);
        const target = rows[0];
        if (!target) return res.status(404).json({ message: "user not found" });

        if (Number(req.params.id) === Number(req.user.id)) {
            return res.status(403).json({ message: "No puedes eliminar tu propio usuario" });
        }
        if (Number(target.rol_id) === ROLES.ADMIN) {
            const [admins] = await pool.query(
                "SELECT COUNT(*) AS total FROM users WHERE rol_id = ?",
                [ROLES.ADMIN]
            );
            if (Number(admins[0].total) <= 1) {
                return res.status(403).json({ message: "No puedes eliminar al último administrador" });
            }
        }

        await pool.query("DELETE FROM users WHERE id = ?", [req.params.id]);
        res.status(200).json({ message: "usuario eliminado" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "internal server error" });
    }
};

const toDateKey = (date) => date.toISOString().slice(0, 10);

const buildDateKeys = (days) => {
    if (!days) return [];
    const today = new Date();
    const keys = [];
    for (let offset = days - 1; offset >= 0; offset -= 1) {
        const day = new Date(Date.UTC(
            today.getUTCFullYear(),
            today.getUTCMonth(),
            today.getUTCDate() - offset
        ));
        keys.push(toDateKey(day));
    }
    return keys;
};

const tableExists = async (table) => {
    const [rows] = await pool.query(
        `SELECT COUNT(*) AS existe
           FROM information_schema.TABLES
          WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
        [table]
    );
    return Number(rows[0].existe) > 0;
};

const buildByDay = (rows, dateKeys) => {
    const counts = new Map(
        rows.filter((row) => row.dia).map((row) => [row.dia, Number(row.total)])
    );
    if (dateKeys.length) {
        return dateKeys.map((date) => ({ date, count: counts.get(date) ?? 0 }));
    }
    return [...counts.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, count]) => ({ date, count }));
};

const formStats = async (source, dateKeys) => {
    const base = {
        key: source.key,
        label: source.label,
        available: false,
        total: 0,
        sinFecha: 0,
        byDay: dateKeys.map((date) => ({ date, count: 0 })),
    };

    if (!(await tableExists(source.table))) {
        return { ...base, message: "Tabla no disponible — pendiente de migración" };
    }

    const [rows] = await pool.query(
        `SELECT DATE_FORMAT(??, '%Y-%m-%d') AS dia, COUNT(*) AS total
           FROM ??
          GROUP BY dia
          ORDER BY dia`,
        [source.dateColumn, source.table]
    );

    const sinFecha = rows
        .filter((row) => !row.dia)
        .reduce((sum, row) => sum + Number(row.total), 0);
    const total = rows.reduce((sum, row) => sum + Number(row.total), 0);

    return {
        ...base,
        available: true,
        total,
        sinFecha,
        byDay: buildByDay(rows, dateKeys),
    };
};

const getStats = async (req, res) => {
    const requested = Number(req.query.days ?? 7);
    const days = requested === 0 || String(req.query.days).toLowerCase() === "all"
        ? 0
        : [7, 30].includes(requested) ? requested : 7;

    try {
        const dateKeys = buildDateKeys(days);
        const forms = [];
        for (const source of FORM_SOURCES) {
            forms.push(await formStats(source, dateKeys));
        }

        const dates = days
            ? dateKeys
            : [...new Set(forms.flatMap((form) => form.byDay.map((day) => day.date)))].sort();

        res.status(200).json({
            range: { days, from: dateKeys[0] ?? null, to: toDateKey(new Date()) },
            dates,
            forms,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "internal server error" });
    }
};

export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    changeRole,
    changeUserPassword,
    deleteUser,
    getStats,
};

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/users.route.js";
import profileRoutes from "./routes/profile.route.js"
import catalogosRoutes from "./routes/catalogos.route.js";
import sirohRoutes from "./routes/siroh.route.js";
import prmauRoutes from "./routes/prmau.route.js";
import adminRoutes from "./routes/admin.route.js";

import authRequired from './middlewares/authRequired.js';
import roleRequired from './middlewares/roleRequired.js';


dotenv.config();

const app = express();


// Configs
app.set('port', process.env.PORT || 4001);


// Middlewares
const allowedOrigins = (
    process.env.CORS_ORIGINS || "http://localhost:5173,http://172.16.110.154:5173"
)
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            // Peticiones sin Origin (curl, server-to-server) se permiten.
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(null, false);
        },
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api/auth", authRoutes);
/* Legacy: se mantiene, pero solo administradores. El modulo nuevo usa /api/admin. */
app.use("/api/users", authRequired, roleRequired(1), userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/profile", authRequired, profileRoutes);
app.use("/api/catalogos", catalogosRoutes);
app.use("/api/siroh", sirohRoutes);
app.use("/api/prmau", prmauRoutes);

export default app;
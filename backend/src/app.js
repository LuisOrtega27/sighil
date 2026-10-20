import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/users.route.js";
import profileRoutes from "./routes/profile.route.js"

import authRequired from './middlewares/authRequired.js';


dotenv.config();

const app = express();


// Configs
app.set('port', process.env.PORT || 4001);


// Middlewares
app.use(cors({ origin: "http://localhost:5173/" }));
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", authRequired, profileRoutes);

export default app;
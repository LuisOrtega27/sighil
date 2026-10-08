import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from "./routes/auth.route.js";
import userRoutes from './routes/users.route.js';

dotenv.config();

const app = express();


// Configs
app.set('port', process.env.PORT || 4001);


// Middlewares
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes);


export default app;
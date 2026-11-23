import jwt from "jsonwebtoken";
import dotenv from "dotenv"

import pool from "../database.js";

dotenv.config()

const TOKEN_SECRET = process.env.TOKEN_SECRET;

/* Devuelve el usuario de la DB para un token valido; lanza si el token es
   invalido/expirado. Se comparte entre authRequired y optionalAuth. */
const getUserFromToken = async (token) => {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [decoded.id]);
    return rows[0] ?? null;
}

const authRequired = async (req,res,next)=>{

    try {
        const {token} = req.cookies
        if(!token) return res.status(401).json({message: "no cookie, user is not authorized"});

        let userFound;
        try {
            userFound = await getUserFromToken(token);
        } catch (error) {
            return res.status(401).json({message: "invalid or expired token"});
        }

        if(!userFound) return res.status(401).json({message: "user not found"});

        req.user = userFound;

        next()

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "internal server error"})
    }
    
}

/* Para restaurar la sesion: sin cookie o con un token invalido no es un error,
   simplemente se continúa sin req.user (ver GET /api/auth/me). */
const optionalAuth = async (req,res,next)=>{
    try {
        const {token} = req.cookies
        if(!token) return next()

        try {
            const userFound = await getUserFromToken(token)
            if(userFound) req.user = userFound
        } catch {
            // Token invalido o expirado: se trata como sesion vacia.
        }

        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "internal server error"})
    }
}

export default authRequired
export { optionalAuth }

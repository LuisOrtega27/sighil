import jwt from "jsonwebtoken";
import dotenv from "dotenv"

import pool from "../database.js";

dotenv.config()

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const authRequired = async (req,res,next)=>{

    try {
        const {token} = req.cookies
        if(!token) return res.status(401).json({message: "no cookie, user is not authorized"});

        let decoded;
        try {
            decoded = jwt.verify(token, TOKEN_SECRET);
        } catch (error) {
            return res.status(401).json({message: "invalid or expired token"});
        }

        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [decoded.id]);
        const [userFound] = rows;
        if(!userFound) return res.status(401).json({message: "user not found"});

        req.user = userFound;

        next()

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "internal server error"})
    }
    
}

export default authRequired;

import jwt from "jsonwebtoken";
import dotenv from "dotenv"

import pool from "../database.js";

dotenv.config({ path: ".env.development" || ".env" })

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const authRequired = async (req,res,next)=>{

    console.log("validating token")

    try {
        const {token} = req.cookies
        if(!token) return res.status(401).json({message: "no cookie, user is not authorized"});
        const decoded = await jwt.verify(token, TOKEN_SECRET);
        const [rows] = await pool.query(`SELECT * FROM users WHERE id = ${decoded.id}`);
        const [userFound] = rows;

        req.user = userFound;

        next()

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
}

export default authRequired;
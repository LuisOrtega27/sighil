import pool from "../database.js";
import bcrypt from "bcryptjs";


import createAccessToken from "../lib/jwt.js";


const register = async (req,res)=>{
    const {fname, lname, ci, email, password} = req.body

    try {
        
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await pool.query(`INSERT INTO users (fname, lname, ci, email, password, status) VALUES ("${fname}", "${lname}", "${ci}", "${email}", "${passwordHash}", "pendiente")`)
        if(!newUser) return console.log("error creating user");

        const token = createAccessToken({id: newUser.insertId})

        if(!token) return console.log("error creating token");

        res.cookie("token", token);
        
        res.status(200).json({message: "register successfull", data: newUser})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
    
    
    
}

const login = async (req,res)=>{
    const {email, password} = req.body;

    try {
        
        const [rows] = await pool.query(`SELECT * FROM users WHERE email = "${email}" AND status = "activado" `);
        const [userFound] = rows;
        if(!userFound) return res.status(401).json({message: "user not found"})
    
        const isMatch = bcrypt.compare(password, userFound.password);
        if(!isMatch) return res.status(200).json({message: "incorrect password"})
    
        const token = await createAccessToken({id: userFound.id})
    
        res.cookie("token", token);
        res.status(200).json({
            rol_id: userFound.rol_id,
            fname: userFound.fname,
            lname: userFound.lname,
            ci: userFound.ci,
            email: userFound.email,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const logout = (req,res)=>{
    res.cookie("token", "", new Date(0))
    res.status(200).json({message: "User logout"});
}


export {
    register,
    login,
    logout
}
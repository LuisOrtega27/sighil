import pool from "../database.js"

const register = async (req,res)=>{
    const {fname, lname, ci, email, password} = req.body
    
    const newUser = await pool.query(`INSERT INTO users (fname, lname, ci, email, password, status) VALUES ("${fname}", "${lname}", "${ci}", "${email}", "${password}", "desactivado")`)
    
    res.status(200).json({message: "register", data: newUser})
}

const login = async (req,res)=>{
    const {body} = req;
    const [rows] = await pool.query(`SELECT rol_id, fname, lname, ci, password FROM users WHERE email = "${body.email}" AND password = "${body.password}" AND status = "activado" `);
    res.status(200).json(rows)
}


const logout = async (req,res)=>{
    console.log("logout")
}


export {
    register,
    login,
    logout
}
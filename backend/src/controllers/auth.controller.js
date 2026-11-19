import pool from "../database.js";
import bcrypt from "bcryptjs";


import createAccessToken from "../lib/jwt.js";


/* Opciones compartidas por todas las respuestas que escriben/borran la cookie.
   Con httpOnly el token no es legible desde JS (js-cookie ya no se usa). */
const cookieOptions = (remember = false) => ({
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    ...(remember ? { maxAge: 30 * 24 * 60 * 60 * 1000 } : {}),
});

const register = async (req,res)=>{
    const {fname, lname, direccion_id, ci, phone, email, password} = req.body

    try {
        // La consulta devuelve [rows]; una cuenta pendiente NO debe autenticarse.
        const [found] = await pool.query("SELECT id FROM users WHERE ci = ?", [ci]);
        if(found.length) return res.status(409).json({message: "This user already exist"});

        const passwordHash = await bcrypt.hash(password, 10);
        await pool.query(
            `INSERT INTO users (fname, lname, direccion_id, ci, phone, email, password, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, "pendiente")`,
            [fname, lname, direccion_id, ci, phone, email, passwordHash]
        );

        res.status(200).json({message: "register successfull"})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
    
    
    
}

const login = async (req,res)=>{
    const {email, password, remember} = req.body;

    try {
        
        const [rows] = await pool.query(
            `SELECT * FROM users WHERE email = ? AND status = "activado"`,
            [email]
        );
        const [userFound] = rows;
        if(!userFound) return res.status(401).json({message: "user not found"})
    
        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return res.status(400).json({message: "incorrect password"})
    
        const token = await createAccessToken({id: userFound.id})
    
        res.cookie("token", token, cookieOptions(remember));
        res.status(200).json({
            rol_id: userFound.rol_id,
            fname: userFound.fname,
            lname: userFound.lname,
            ci: userFound.ci,
            email: userFound.email,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "internal server error"})
    }
}

/* Restaura la sesion al recargar: authRequired ya valido la cookie y cargo req.user. */
const me = (req,res)=>{
    const {id, rol_id, fname, lname, ci, email} = req.user
    res.status(200).json({id, rol_id, fname, lname, ci, email})
}

const logout = (req,res)=>{
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    })
    res.status(200).json({message: "User logout"});
}


export {
    register,
    login,
    me,
    logout
}
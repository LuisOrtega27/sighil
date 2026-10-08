import pool from "../database.js";

const getUsers = async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
};

const getUser = async (req,res)=>{
    const {id}  = req.params;
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ${id}`) 
    res.status(200).json(rows)
}

const createUser = async (req, res)=>{
    const {rol_id, nombre, email, estatus} = req.body;
    const result = await pool.query(`INSERT INTO users(rol_id, nombre, email, estatus) VALUES (${rol_id}, "${nombre}", "${email}", "${estatus}")`);        
    console.log(result)
}

const updateUser = async (req,res)=>{
    const {id}  = req.params;
    const {rol_id, nombre, email, estatus} = req.body;
    const result = await pool.query(`UPDATE  users  SET rol_id = "${rol_id}", nombre = "${nombre}", email = "${email}", estatus = "${estatus}" WHERE id = ${id}`) 
    res.status(200).json(result)
    console.log(result)
}

const deleteUser = async(req,res)=>{
    const {id} = req.params;
    console.log(id)
    const result = await pool.query(`DELETE FROM users WHERE id = ${id}`);
    console.log(result)
}

export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};

/* Middleware de autorizacion por rol.
   Uso: router.post("/algo", authRequired, roleRequired(1, 2), controller)
   Roles: 1 = administrador, 2 = editor, 3 = lector, 4 = visitante. */

const roleRequired = (...allowedRoles) => (req,res,next)=>{
    if(!req.user) return res.status(401).json({message: "user is not authenticated"});

    if(!allowedRoles.includes(Number(req.user.rol_id))){
        return res.status(403).json({message: "you do not have permission for this action"});
    }

    next()
}

export default roleRequired;

import {Router} from "express"

const router = Router();

router.route("/")
    .get((req,res)=>{ 
        console.log(req.cookies);
        console.log(req.user);
        res.status(200).json({message: "profile route"}
    )})

export default router;
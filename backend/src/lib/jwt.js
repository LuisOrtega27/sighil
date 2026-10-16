import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const createAccessToken = async (payload)=>{
    return new Promise((resolve,reject)=>{
        jwt.sign(
            payload,
            TOKEN_SECRET,
            (error, token)=>{
                if(error) return reject(error);
                resolve(token);
            }
        
        )
        
        

    })
}

export default createAccessToken;
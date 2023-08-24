const jwt = require("jsonwebtoken");

const secret = "myDog"
exports.jwtGenerate =async (payload)=>{
    const jwtToken = await jwt.sign(payload,secret,{expiresIn:"3h"})
    return jwtToken;
}


exports.jwtVerify = async (req,res,next)=>{
    try{
        const authHeader = req.get("Authorization");
         if(!authHeader){
            res.status(401).json({
            "message" : "please enter a valid token"
            })
        }else{
            const token = authHeader.split(' ')[1];
            const decoded = await jwt.verify(token,secret);
            req.user = decoded;
            next();
    }
    }catch(err){
        const error = new Error(err);
        error.statusCode = 403;
        next(error);
    }
}
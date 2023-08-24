const User = require("../model/user");
const {otpGenerated,otpVerified} = require("../authentication/otp");


const otpGenerate = (req,res,next)=>{
    User.findAll({
        where : {
            email : req.body.email
        }
    }).then(user=>{
        if(user[0]){
            req.user = user[0];        
            otpGenerated(user[0].email);
            res.status(200).json({"message" : `otp sent to email : ${user[0].email}`});
        }else{
            const error = new Error("email not found");
            error.statusCode = 404;
            next(error);
        }
    }).catch(err=>{
        const error = new Error(err);
            error.statusCode = 500;
            next(error);
    })
}


const otpVerify =  (req,res,next)=>{
    try{
            const isValid = otpVerified(req.body.token);
            if(isValid){
                next();
              }else{
                const error = new Error("wrong otp");
                error.statusCode = 403;
                next(error);
              }
    }catch(err){
        const error = new Error(err);
            error.statusCode = 500;
            next(error);
    }

}

module.exports = {
    otpGenerate,
    otpVerify 
  }
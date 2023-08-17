const User = require("../model/user");
const {otpGenerated,otpVerified} = require("../authentication/otp");


const otpGenerate = (req,res,next)=>{
    User.findAll({
        where : {
            email : req.body.email
        }
    }).then(user=>{
        if(user[0]){
            req.session.forgotUser = user[0];        
            otpGenerated(user[0].email);
            res.json(`otp sent to email : ${user[0].email}`);
        }else{
            res.json("No user found.Please create an account").status(400);
        }
    }).catch(err=>{
        console.log(err);
    })
}


const otpVerify =  (req,res,next)=>{
    try{
            const isValid = otpVerified(req.body.token);
            if(isValid){
                req.session.forgotPassword = true;
                res.json("correct otp. hit the correct route to change password").status(200);
              }else{
                res.json("wrong otp").status(400);
              }
    }catch(err){
        console.log(err);
    }

}

module.exports = {
    otpGenerate,
    otpVerify 
  }
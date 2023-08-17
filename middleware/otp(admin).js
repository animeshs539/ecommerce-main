const Admin = require("../model/admin");
const {otpGenerated,otpVerified} = require("../authentication/otp");


const otpGenerate = (req,res,next)=>{
    Admin.findAll({
        where : {
            email : req.body.email
        }
    }).then(admin=>{
        if(admin[0]){
            req.session.forgotAdmin = admin[0];
            otpGenerated(req.session.forgotAdmin.email);
            res.json(`otp sent to email : ${admin[0].email}`);
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
                req.session.forgotPasswordAdmin = true;
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
const Supplier = require("../model/supplier");
const {otpGenerated,otpVerified} = require("../authentication/otp");


const otpGenerate = (req,res,next)=>{
    Supplier.findAll({
        where : {
            email : req.body.email
        }
    }).then(supplier=>{
        if(supplier[0]){
            req.session.forgotSupplier = supplier[0];
            otpGenerated(req.session.forgotSupplier.email);
            res.json(`otp sent to email : ${supplier[0].email}`);
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
                req.session.forgotPasswordSupplier = true;
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
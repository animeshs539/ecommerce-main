const {otpGenerated,otpVerified} = require("../authentication/otp");
const Sequelize = require("sequelize");
const User = require("../model/user");
const {jwtGenerate} = require("../authentication/jwt")

exports.signupOtpGenerate = (req,res,next)=>{
    User.findAll({
        where : Sequelize.or({
            email : req.body.email 
        },
        {username : req.body.username})
    }).then((user)=>{
        if(user[0]){
                res.status(300).json({
                    "message" : `email : ${req.body.email} already exists`
                });      
            
        }else{
            const otp =otpGenerated(req.body.email);
            if(otp){
                jwtGenerate({
                    name : req.body.name,
                    username : req.body.username,
                    email : req.body.email,                    
                    password : req.body.password,
                    address : req.body.address,
                    contactNo : req.body.contactNo,
                    roleId : req.body.roleId
                }).then(jwtToken=>{
                    res.status(200).json({
                        "message" : "otp has been sent to email ",
                        "token" : jwtToken
                    });
                }).catch(err=>{
                    const error = new Error(err);
                    error.statusCode = 500;
                    next(error);
                })
                
            }
            else{
                const error = new Error("invalid otp");
                    error.statusCode = 403;
                    next(error);
            }    
        }
    }).catch(err=>{
        const error = new Error(err);
        error.statusCode = 500;
        next(error);
    })
}

exports.signupOtpVerify = (req,res,next)=>{
    const isValid = otpVerified(req.body.token);
    if(isValid){
        next();
    }
    else{
        res.json({
            "message" : "please enter correct otp"
        }).status(400);
    }
}

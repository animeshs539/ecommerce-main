const { or, Sequelize } = require("sequelize");
const User = require("../model/user");
const bcrypt = require("bcryptjs");

exports.postSignup = (req,res,next)=>{
    User.findAll({
        where : Sequelize.or({
            email : req.body.email 
        },
        {username : req.body.username})
    }).then(user=>{
        if(user[0]){
            res.json("user already exits").status(400);
        }
        else{
            bcrypt.hash(req.body.password,12).then(hashedPassword=>{
                User.create({
                    name : req.body.name,
                    username : req.body.username,
                    email : req.body.email,
                    password : hashedPassword,
                    address : req.body.address,
                    contactNo : req.body.contactNo
    
                }).then(result=>{
                    res.json(`user with email :  ${result.email} is created`).status(200);
            }).catch(err=>{
                console.log(err);
            })
            }).catch(err=>{
                console.log(err);
            })
        }
    }).catch(err=>{
        console.log(err);
    })
}

exports.postLogin = (req,res,next)=>{
    if(req.body.email){
        User.findAll({
            where : 
                {
                    email : req.body.email
                }
            
        }).then(user=>{
            if(user[0]){
                bcrypt.compare(req.body.password,user[0].password).then(doMatch=>{
                    if(doMatch){
                        req.session.isLoggedIn = true;
                        req.session.user = user[0];
                        res.json("login successfull").status(200);
                    }else{
                        res.json("wrong password").status(302);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            }else{
                res.json("user does not exists").status(302);
            }
        }).catch(err=>{
            console.log(err);
        })
     
    }
    else{
    User.findAll({
        where : {
                username : req.body.username
            }
    }).then(user=>{
        if(user[0]){
            bcrypt.compare(req.body.password,user[0].password).then(doMatch=>{
                if(doMatch){
                    req.session.isUser = true;
                    req.session.user= user[0].email;
                    res.json("login successfull").status(200);
                }else{
                    res.json("wrong password").status(302);
                }
            }).catch(err=>{
                console.log(err);
            })
        }else{
            res.json("user does not exists").status(302);
        }
    }).catch(err=>{
        console.log(err);
    })
   }
}


exports.postLogout = (req,res,next)=>{
    req.session.destroy();
    res.json("logout successfull").status(200);
}

exports.update = (req,res,next)=>{
    User.update({
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        address : req.body.address,
        contactNo : req.body.contactNo
    },{
        where : {
            id : req.session.user.id
        }
    }).then(result=>{
        res.json("details updated").status(200);
    }).catch(err=>{
        res.json(err).status(500);
    })
}

exports.delete = (req,res,next)=>{
    User.destroy({
        where : {
            id : req.session.user.id
        }
    }).then(result =>{
        if(result){
            res.json("deleted successfully").status(200);
        }else{
            res.json("supplier is not deleted").status(400);
        }
    }).catch(err=>{
        res.json(err).status(500);
    })
}

exports.forgotPassword = (req,res,next)=>{
    bcrypt.hash(req.body.password,12).then(hashedPassword=>{
        User.update({
            password : hashedPassword
        },{
            where:{
                email : req.session.forgotUser.email
            }
        }).then(result=>{
            if(result){
                res.json("password updated").status(200);
                req.session.destroy();
            }else{
                res.json("email not found").status(400);
            }
        }).catch(err=>{
            console.log(err);
        })
    }).catch(err=>{
        console.log(err);
    })
    
}
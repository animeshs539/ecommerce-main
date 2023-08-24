const { or, Sequelize } = require("sequelize");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const roles = require("../model/roles");
const {jwtGenerate} = require("../authentication/jwt");


exports.postSignup = (req,res,next)=>{
    
            bcrypt.hash(req.user.password,12).then(hashedPassword=>{
                User.create({
                    name : req.user.name,
                    username : req.user.username,
                    email : req.user.email,                    
                    password : hashedPassword,
                    address : req.user.address,
                    contactNo : req.user.contactNo
                }).then(user=>{
                    if(req.user.roleId){
                        user.setRoles(req.user.roleId).then((result)=>{
                            res.status(200).json({
                                "message" : "user created successfully"
                            })
                        }).catch((err)=>{
                            const error = new Error(err);
                            error.statusCode = 500
                            next(error);
                        })
                    }
                    else{
                        user.setRoles(3).then((result)=>{
                            res.status(200).json({
                                "message" : "user created successfully"
                            })
                        }).catch((err)=>{
                            const error = new Error(err);
                            error.statusCode = 500;
                            next(error);
                        })
                    }
                }).catch(err=>{
                    const error = new Error(err);
                    error.statusCode = 500;
                    next(error);
                })
            }).catch(err=>{
                const error = new Error(err);
                error.statusCode = 500;
                next(error);
            })
}
    

exports.postLogin =(req,res,next)=>{
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
                        // req.session.isLoggedIn = true;
                        // req.session.user = user[0];
                        // res.json("login successfull").status(200);
                        user[0].getRoles().then((roles)=>{
                            user[0]["dataValues"].roleId =roles[0]["dataValues"].id;
                            jwtGenerate(user[0]["dataValues"]).then(jwtToken=>{
                                res.status(200).json({
                                    "message" : "login successfull",
                                    "token" : jwtToken
                                }) 
                            }).catch(err=>{
                                const error = new Error(err);
                                error.statusCode = 500;
                                next(error);
                            })   
                        }).catch(err=>{
                            const error = new Error(err);
                            error.statusCode = 500;
                            next(error);
                        })
                        
                    }else{
                        const error = new Error("wrong password");
                        error.statusCode = 302;
                        next(error);
                    }
                }).catch(err=>{
                    const error = new Error(err);
                    error.statusCode = 500;
                    next(error);
                })
            }else{
                const error = new Error("user does not exists");
                error.statusCode = 302;
                next(error);
            }
        }).catch(err=>{
            const error = new Error(err);
            error.statusCode = 500;
            next(error);
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
                    // req.session.isLoggedIn = true;
                    // req.session.user = user[0];
                    // res.json("login successfull").status(200);
                    user[0].getRoles().then((roles)=>{
                        user[0]["dataValues"].roleId =roles[0]["dataValues"].id;
                        jwtGenerate(user[0]["dataValues"]).then(jwtToken=>{
                            res.status(200).json({
                                "message" : "login successfull",
                                "token" : jwtToken
                            }) 
                        }).catch(err=>{
                            const error = new Error(err);
                            error.statusCode = 500;
                            next(error);
                        })   
                    }).catch(err=>{
                        const error = new Error(err);
                        error.statusCode = 500;
                        next(error);
                    })
                    
                }else{
                    const error = new Error("wrong password");
                    error.statusCode = 302;
                    next(error);
                }
            }).catch(err=>{
                const error = new Error(err);
                error.statusCode = 500;
                next(error);
            })
        }else{
            const error = new Error("user does not exists");
            error.statusCode = 302;
            next(error);
        }
    }).catch(err=>{
        const error = new Error(err);
        error.statusCode = 500;
        next(error);
    })
 
}
}


exports.postLogout = (req,res,next)=>{
    res.json("logout successfull").status(200);
}

exports.update = (req,res,next)=>{
    bcrypt.hash(req.body.password,12).then(hashedPassword=>{
        User.update({
            name : req.body.name,
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword,
            address : req.body.address,
            contactNo : req.body.contactNo
        },{
            where : {
                id : req.user.id
            }
        }).then(result=>{
            res.status(200).json({
                "message" : "details updated successfully"
            });
        }).catch(err=>{
            const error = new Error(err);
            error.statusCode = 400;
            next(error);
        })
    }).catch(err=>{
        const error = new Error(err);
        error.statusCode = 500;
        next(error);
    })
    
}


exports.updateUser = (req,res,next)=>{
    bcrypt.hash(req.body.password,12).then(hashedPassword=>{
        User.update({
            name : req.body.name,
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword,
            address : req.body.address,
            contactNo : req.body.contactNo
        },{
            where : {
                id : req.params.id
            }
        }).then(result=>{
            res.status(200).json({
                "message" : "details updated successfully"
            });
        }).catch(err=>{
            const error = new Error(err);
            error.statusCode = 400;
            next(error);
        })
    }).catch(err=>{
        const error = new Error(err);
        error.statusCode = 500;
        next(error);
    })
    
}

exports.delete = (req,res,next)=>{
    User.destroy({
        where : {
            id : req.user.id
        }
    }).then(result =>{
        if(result){
            res.status(200).json({"message":"deleted successfully"});
        }else{
            const error = new Error({"message" : "user is not deleted"});
            error.statusCode = 403;
            next(error);
        }
    }).catch(err=>{
        const error = new Error(err);
        error.statusCode = 500;
        next(error);
    })
}

exports.deleteUser= (req,res,next)=>{
    User.destroy({
        where : {
            id : req.params.id
        }
    }).then(result =>{
        if(result){
            res.status(200).json({"message":"deleted successfully"});
        }else{
            const error = new Error({"message" : "user is not deleted"});
            error.statusCode = 403;
            next(error);
        }
    }).catch(err=>{
        const error = new Error(err);
        error.statusCode = 500;
        next(error);
    })
}

exports.forgotPassword = (req,res,next)=>{
    bcrypt.hash(req.body.password,12).then(hashedPassword=>{
        User.update({
            password : hashedPassword
        },{
            where:{
                email : req.user.email
            }
        }).then(result=>{
            if(result){
                res.status(200).json({"message":"password updated"});
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
    }).catch(err=>{
        const error = new Error(err);
        error.statusCode = 500;
        next(error);
    })
    
}

exports.getUsers = (req,res,next)=>{
    User.findAll().then(users=>{
        res.status(200).json(users);
    }).catch(err=>{
        const error = new Error(err);
        error.statusCode = 500;
        next(error);
    })
}


exports.getDetails = (req,res,next)=>{
    User.findAll({
        where : {
            id : req.user.id
        }
    }).then(user=>{
        if(user[0]){
            res.status(200).json(user[0]);
        }
        else{
            const error = new Error("user not found");
            error.statusCode = 404;
            next(error);
        }
    }).catch(err=>{
        const error = new Error(err);
        error.statusCode = 500;
        next(error);
    })
}
const Admin = require("../model/admin");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const Supplier = require("../model/supplier");
const User = require("../model/user");

exports.postSignup = (req,res,next)=>{
    Admin.findAll({
        where : Sequelize.or({
            email : req.body.email
        },
        {
            username : req.body.username
        })
    }).then(admin=>{
        if(admin[0]){
            res.json("admin already exists").status(302);
        }
        else{
            bcrypt.hash(req.body.password,12)
            .then(hashedPassword=>{
                Admin.create({
                    name : req.body.name,
                    username : req.body.username,
                    email : req.body.email,
                    password : hashedPassword,
                    address : req.body.address,
                    contactNo : req.body.contactNo,
                    permitted : false

                }).then(result=>{
                    res.json(`supplier with username : ${result.username} and email : ${result.email}
                     is created. wait for admin permission`).status(200);
                }).catch(err=>{
                    res.json(err).status(500);
                })
            }).catch(err=>{
                res.json(err).status(500);
            })
        }
    }).catch(err=>{
        res.json(err).status(500);
    })
}


exports.postLogin = (req,res,next)=>{
    Admin.findAll({
        where : {
            email : req.body.email
        }
    }).then(admin=>{
        if(admin[0]){
            if(!admin[0].permitted){
                res.json("wait for admin for permission").status(302);
            }
            else{
                bcrypt.compare(req.body.password,admin[0].password)
                .then(result=>{
                    req.session.isAdmin = true;
                    req.session.admin = admin[0]
                    res.json("login successfull").status(200);
            }).catch(err=>{
                res.json(err).status(500);
            })
            }
            
        }
        else{
            res.json("incorrect email.user does not exist").status(404);
        }
    }).catch(err=>{
        res.json(err).status(500);
    })
}


exports.logout = (req,res,next)=>{
    if(req.session.admin){
        req.session.destroy();
        res.json("logout successfull").status(200);
    }
    else{
        res.json("Please login first").status(200);
    }
    
}

exports.update = (req,res,next)=>{
    Admin.update({
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        address : req.body.address,
        contactNo : req.body.contactNo
    },{
        where : {
            id : req.session.admin.id
        }
    }).then(result=>{
        res.json("details updated").status(200);
    }).catch(err=>{
        res.json(err).status(500);
    })
}

exports.deleteSupplier = (req,res,next)=>{
    Supplier.destroy({
        where : {
            id : req.params.id
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

exports.delete = (req,res,next)=>{
    Admin.destroy({
        where : {
            id : req.session.admin.id
        }
    }).then(result =>{
        if(result){
            res.json("deleted successfully").status(200);
        }else{
            res.json("admin is not deleted").status(400);
        }
    }).catch(err=>{
        res.json(err).status(500);
    })
}

exports.deleteUser = (req,res,next)=>{
    User.destroy({
        where : {
            id : req.params.id
        }
    }).then(result =>{
        if(result){
            res.json("deleted successfully").status(200);
        }else{
            res.json("user is not deleted").status(400);
        }
    }).catch(err=>{
        res.json(err).status(500);
    })
}

exports.forgotPassword = (req,res,next)=>{
    bcrypt.hash(req.body.password,12).then(hashedPassword=>{
        Admin.update({
            password : hashedPassword
        },{
            where:{
                email : req.session.forgotAdmin.email
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

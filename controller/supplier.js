const Supplier = require("../model/supplier");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");


exports.postSignup = (req,res,next)=>{
    Supplier.findAll({
        where : Sequelize.or({
            email : req.body.email
        },
        {
            username : req.body.username
        })
    }).then(supplier=>{
        if(supplier[0]){
            res.json("supplier already exists").status(302);
        }
        else{
            bcrypt.hash(req.body.password,12)
            .then(hashedPassword=>{
                Supplier.create({
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
    Supplier.findAll({
        where : {
            email : req.body.email
        }
    }).then(supplier=>{
        if(supplier[0]){
            if(!supplier[0].permitted){
                res.json("wait for admin for permission").status(302);
            }
            else{
                bcrypt.compare(req.body.password,supplier[0].password)
                .then(result=>{
                    req.session.isSupplier = true;
                    req.session.supplier = supplier[0]
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

exports.update = (req,res,next)=>{
    Supplier.update({
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        address : req.body.address,
        contactNo : req.body.contactNo
    },{
        where : {
            id : req.session.supplier.id
        }
    }).then(result=>{
        res.json("details updated").status(200);
    }).catch(err=>{
        res.json(err).status(500);
    })
}


exports.logout = (req,res,next)=>{
    if(req.session.supplier){
        req.session.destroy();
        res.json("logout successfull").status(200);
    }
    else{
        res.json("Please login first").status(200);
    }
    
}

exports.delete = (req,res,next)=>{
    Supplier.destroy({
        where : {
            id : req.session.supplier.id
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
        Supplier.update({
            password : hashedPassword
        },{
            where:{
                email : req.session.forgotSupplier.email
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
const User = require("../model/user");
//const roles = require("../model/roles");

exports.authorizationAdmin = (req,res,next)=>{
    User.findAll({
        where : {
            id : req.user.id
        }
    }).then((user)=>{
        if(user[0]){
            user[0].getRoles().then(result=>{
                if(result[0]["dataValues"].name==="admin"){
                        next()
                }else{
                    res.status(403).json({"message":"not authorized"});
                }
            }).catch(err=>{
                const error = new Error(err);
                err.statusCode = 500;
                next(error);
            })
        }
    })
}

exports.authorizationSupplier = (req,res,next)=>{
    User.findAll({
        where : {
            id : req.user.id
        }
    }).then((user)=>{
        if(user[0]){
            user[0].getRoles().then(result=>{
                if(result[0]["dataValues"].name==="admin" || result[0]["dataValues"].name==="supplier"){
                        next()
                }else{
                    res.status(403).json({"message":"not authorized"});
                }
            }).catch(err=>{
                const error = new Error(err);
                err.statusCode = 500;
                next(error);
            })
        }
    })
}

exports.authorizationCustomer = (req,res,next)=>{
    User.findAll({
        where : {
            id : req.user.id
        }
    }).then((user)=>{
        if(user[0]){
            user[0].getRoles().then(result=>{
                if(result[0]["dataValues"].name==="admin" || result[0]["dataValues"].name==="customer"){
                        next()
                }else{
                    res.status(403).json({"message":"not authorized"});
                }
            }).catch(err=>{
                const error = new Error(err);
                err.statusCode = 500;
                next(error);
            })
        }
    })
}
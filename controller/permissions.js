const Supplier = require("../model/supplier");
const Admin = require("../model/admin");


exports.supplierWithNoPermission = (req,res,next)=>{
    Supplier.findAll({
        where : {
            permitted : false
        }
    }).then(suppliers=>{
        if(suppliers[0]){
            res.json(suppliers[0]).status(200);
        }
        else{
            res.json("no record").status(200);
        }
    }).catch(err=>{
        res.json(err).status(500);
    })
}

exports.givePermission = (req,res,next)=>{
    Supplier.findAll({
        where : {
            id : req.params.id
        }
    }).then(supplier=>{
        if(supplier[0]){
            Supplier.update({
                permitted : true,
                adminId : req.session.admin.id
            },{
                where : {
                    id : req.params.id
                }
            }).then(result=>{
                res.json("permission given").status(200);
            }).catch(err=>{
                res.json(err).status(500);
            })
            
        }else{
            res.json("no record").status(400);
        }
    }).catch(err=>{
        res.json(err).status(500);
    })   
}


exports.AdminWithNoPermission = (req,res,next)=>{
    Admin.findAll({
        where : {
            permitted : false
        }
    }).then(admin=>{
        if(admin[0]){
            res.json(admin[0]).status(200);
        }
        else{
            res.json("no record").status(200);
        }
    }).catch(err=>{
        res.json(err).status(500);
    })
}


exports.givePermissionAdmin = (req,res,next)=>{
    Admin.findAll({
        where : {
            id : req.params.id
        }
    }).then(admin=>{
        if(admin[0]){
            Admin.update({
                permitted : true
            },{
                where : {
                    id : req.params.id
                }
            }).then(result=>{
                res.json("permission given").status(200);
            }).catch(err=>{
                res.json(err).status(500);
            })
            
        }else{
            res.json("no record").status(400);
        }
    }).catch(err=>{
        res.json(err).status(500);
    })   
}

const product = require("../model/products");
const Sequelize = require("sequelize");
const Supplier = require("../model/supplier");

exports.getAllProducts = (req,res,next)=>{
    product.findAll().then(result=>{
        res.json(result).status(200);
    }).catch(err=>{
        console.log(err);
    })
}

exports.postAddProduct = (req,res,next)=>{
    product.create({
        name : req.body.name,
        category : req.body.category,
        price : req.body.price,
        quantity : req.body.quantity,
        supplierId : req.session.supplier.id
    }).then(result =>{
        res.json("product added successfully").status(200);
    }).catch(err=>{
        res.json(err).status(500);
    })
}

exports.getSuppliersProducts = (req,res,next)=>{
    product.findAll({
        where : {
            supplierId : req.session.supplier.id
        }
    }).then(Products=>{
        if(Products[0]){
            res.json(Products).status(200);
        }
        else{
            res.json("please add product").status(200);
        }
    }).catch(err=>{
        res.json(err).status(200);
    })
}

exports.postUpdateProduct = (req,res,next)=>{
    product.update({
        name : req.body.name,
        category : req.body.category,
        price : req.body.price,
        quantity : req.body.quantity
    },{
        where : Sequelize.and({id : req.params.id},{
            supplierId : req.session.supplier.id
        })
    }).then(result=>{
        if(result[0]){
            res.json("product updated").status(200);

        }
        else{
            res.json("wrong id").status(400);
        }
    }).catch(err=>{
        res.json(err).status(500);
    })    
}

exports.deleteSupplierProduct = (req,res,next)=>{
    product.destroy({
        where : Sequelize.and({id : req.params.id},
            {supplierId : req.session.supplier.id})
    }).then(result=>{
        if(result){
            
            res.json("deleted successfully").status(200);
        }
        else{
            res.json("product is not deleted").status(400);
        }
    }).catch(err=>{
        res.json(err).status(500);
    })
}

exports.deleteAdminProduct =  (req,res,next)=>{
    product.destroy({
        where : {
            id : req.params.id
        }
    }).then(result=>{
        if(result){
            
            res.json("deleted successfully").status(200);
        }
        else{
            res.json("product is not deleted").status(400);
        }
    }).catch(err=>{
        res.json(err).status(500);
    })
}
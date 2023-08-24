const product = require("../model/products");
const Sequelize = require("sequelize");

exports.getAllProducts = (req,res,next)=>{
    product.findAll().then(result=>{
        res.json(result).status(200);
    }).catch(err=>{
        const error = new Error(err);
        error.statusCode = 500;
        next(error);
    })
}

exports.postAddProduct = (req,res,next)=>{
    product.create({
        name : req.body.name,
        category : req.body.category,
        price : req.body.price,
        quantity : req.body.quantity,
        userId : req.user.id
    }).then(result =>{
        res.status(200).json("product added successfully");
    }).catch(err=>{
        const error = new Error(err);
        error.statusCode = 500;
        next(error);
    })
}

exports.getSuppliersProducts = (req,res,next)=>{
    product.findAll({
        where : {
            userId : req.user.id
        }
    }).then(Products=>{
        if(Products[0]){
            res.status(200).json(Products);
        }
        else{
            res.status(200).json("please add product");
        }
    }).catch(err=>{
        const error = new Error(err);
        error.statusCode = 500;
        next(error);
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
            userId : req.user.id
        })
    }).then(result=>{
        if(result[0]){
            res.status(200).json("product updated");

        }
        else{
            const error = new Error("wrong ID");
            error.statusCode = 401;
            next(error);
        }
    }).catch(err=>{
        const error = new Error(err);
            error.statusCode = 500;
            next(error);
    })    
}

exports.deleteSupplierProduct = (req,res,next)=>{
    product.destroy({
        where : Sequelize.and({id : req.params.id},
            {userId : req.user.id})
    }).then(result=>{
        if(result){
            
            res.status(200).json("deleted successfully");
        }
        else{
            const error = new Error("product is not deleted");
            error.statusCode = 403;
            next(error);
        }
    }).catch(err=>{
        const error = new Error(err);
        error.statusCode = 500;
        next(error);
    })
}

exports.deleteAdminProduct =  (req,res,next)=>{
    product.destroy({
        where : {
            id : req.params.id
        }
    }).then(result=>{
        if(result){
            
            res.status(200).json("deleted successfully");
        }
        else{
            const error = new Error("Product is not deleted");
            error.statusCode = 404;
            next(error);
        }
    }).catch(err=>{
        const error = new Error(err);
            error.statusCode = 500;
            next(error);
    })
}
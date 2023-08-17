const Supplier = require("../model/supplier");
const Product = require("../model/products");
const Sequelize = require("sequelize");
const Admin = require("../model/admin");


Supplier.hasOne(Product,{constraints : true, onDelete : "cascade"});
Admin.hasOne(Supplier,{constraints : true , onDelete : "cascade"});
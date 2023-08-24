// const Supplier = require("../model/supplier");
const Product = require("../model/products");
const Sequelize = require("sequelize");
const User = require("../model/user");
const Role = require("../model/roles");
const userRole = require("../model/UserRole");

//const Admin = require("../model/admin");


//Supplier.hasOne(Product,{constraints : true, onDelete : "cascade"});
//Admin.hasOne(Supplier,{constraints : true , onDelete : "cascade"});

User.belongsToMany(Role,{through : userRole});
Role.belongsToMany(User,{through : userRole});
User.hasMany(Product,{constraints : true,onDelete : "cascade"});
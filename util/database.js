const Sequelize = require("sequelize");

const sequelize = new Sequelize("ecommerce-final","root","root",{
    dialect : "mysql",
    host : "localhost"
});

module.exports = sequelize;
const sequelize = require("../util/database");
const Sequelize = require("sequelize");


const product = sequelize.define("product",{
    id :{
        type : Sequelize.INTEGER,
        allowNull : false ,
        autoIncrement : true,
        primaryKey : true
    },
    name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    category : {
        type : Sequelize.STRING,
        allowNull : false
    },
    price : {
        type : Sequelize.INTEGER,
        allowNull : false

    },
    quantity : {
        type : Sequelize.INTEGER,
        allowNull : false
    }
});

module.exports = product;
const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const admin = sequelize.define("admin",{
    id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    username : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : Sequelize.STRING,
        allowNull :false
    },
    address : {
        type : Sequelize.STRING,
        allowNull : false
    },
    contactNo : {
        type : Sequelize.INTEGER,
        allowNUll : false
    },
    permitted : {
        type : Sequelize.BOOLEAN,
        allowNUll : false
    }
});

module.exports = admin;
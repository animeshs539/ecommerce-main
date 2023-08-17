const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const user = sequelize.define("user",{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    username : {
        type : Sequelize.STRING,
        allowNull: false,
        unique : true
    },
    email : {
        type : Sequelize.STRING,
        allowNull: false,
        unique : true
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    },
    address : {
        type : Sequelize.STRING,
        allowNull : false
    },
    contactNo : {
        type : Sequelize.INTEGER,
        allowNull :false
    }
});

module.exports = user;
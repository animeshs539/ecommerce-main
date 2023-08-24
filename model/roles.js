const sequelize = require("../util/database");
const Sequelize = require('sequelize');

const role = sequelize.define('role',{
    id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : Sequelize.STRING,
        allowNull : false
    }
});

module.exports = role;
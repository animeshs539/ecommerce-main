const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const userRole = sequelize.define("userRole",{
    id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    }
})

module.exports = userRole;
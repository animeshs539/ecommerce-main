const express= require('express');
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const userRoutes = require("./routes/user");
//const session = require("express-session");
//const sequelizeStore = require("connect-session-sequelize")(session.Store);
const productRoutes = require("./routes/product");
//const supplierRoutes = require("./routes/supplier");
const connections = require("./util/connections");
//const adminRoutes = require("./routes/admin");

const app = express();
//const sessionStore = new sequelizeStore({db:sequelize});

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
// app.use(session({
//     secret : "project",
//     store : sessionStore,
//     resave : false,
//     saveUninitialized : false
// }));



app.use("/user",userRoutes);
app.use("/product",productRoutes);
//app.use("/supplier",supplierRoutes);
//app.use("/admin",adminRoutes);


app.use((err,req,res,next)=>{
    err.statusCode = 500 || err.statusCode;
    res.status(err.statusCode).json({
        "message" : err.message
    })
})

sequelize.sync().then(result=>{
    
    app.listen(3000);
}).catch(err=>{
    console.log(err);
})
 
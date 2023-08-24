const productController = require("../controller/product");
const isUser = require("../middleware/Authorization");
//const isSupplier = require("../middleware/isSupplier");
const router = require("express").Router();
const {jwtVerify} = require("../authentication/jwt");
const {authorizationAdmin,authorizationSupplier} = require("../middleware/Authorization");

//const isAdmin = require("../middleware/isAdmin");

router.get("/all",productController.getAllProducts);
router.post("/add-product",jwtVerify,authorizationSupplier,productController.postAddProduct);
router.get("/suppliers-product",jwtVerify,authorizationSupplier,productController.getSuppliersProducts);
 router.put("/edit-product/:id",jwtVerify,authorizationSupplier,productController.postUpdateProduct);
 router.delete("/supplier-delete/:id",jwtVerify,authorizationSupplier,productController.deleteSupplierProduct);
 router.delete("/delete/:id",jwtVerify,authorizationAdmin,productController.deleteAdminProduct);


module.exports = router;

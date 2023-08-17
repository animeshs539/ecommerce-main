const productController = require("../controller/product");
const isUser = require("../middleware/isUser");
const isSupplier = require("../middleware/isSupplier");
const router = require("express").Router();
const isAdmin = require("../middleware/isAdmin");

router.get("/all",productController.getAllProducts);
router.post("/add-product",isSupplier,productController.postAddProduct);
router.get("/suppliers-product",isSupplier,productController.getSuppliersProducts);
router.put("/edit-product/:id",isSupplier,productController.postUpdateProduct);
router.delete("/supplier-delete/:id",isSupplier,productController.deleteSupplierProduct);
router.delete("/delete/:id",isAdmin,productController.deleteAdminProduct);


module.exports = router;

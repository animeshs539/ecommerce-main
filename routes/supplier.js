const router = require("express").Router();
const supplierController = require("../controller/supplier");
const isSupplier = require("../middleware/isSupplier");
const {otpGenerate,otpVerify} = require("../middleware/otp(supplier)");
const isForgotPasswordSupplier = require("../middleware/isForgotPasswordSupplier");


router.post("/signup",supplierController.postSignup);
router.post("/login",supplierController.postLogin);
router.get("/logout",supplierController.logout);
router.delete("/delete",isSupplier,supplierController.delete);
router.put("/update",isSupplier,supplierController.update);
router.post("/forgot-password/otp-generate",otpGenerate);
router.post("/forgot-password/otp-verify",otpVerify);
router.post("/forgot-password/change-password",isForgotPasswordSupplier,supplierController.forgotPassword)



module.exports = router;

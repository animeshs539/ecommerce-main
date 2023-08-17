const adminController = require("../controller/admin");
const permission = require("../controller/permissions");
const isAdmin = require("../middleware/isAdmin");
const {otpGenerate,otpVerify} = require("../middleware/otp(admin)");
const isForgotPasswordAdmin = require("../middleware/isForgotPasswordAdmin");
const router = require("express").Router();

router.post("/signup",adminController.postSignup);
router.post("/login",adminController.postLogin);
router.get("/logout",adminController.logout);
router.put("/update",isAdmin,adminController.update);
router.get("/supplier-no-permission",isAdmin,permission.supplierWithNoPermission);
router.put("/supplier-no-permission/:id",isAdmin,permission.givePermission);
router.delete("/delete-supplier/:id",isAdmin,adminController.deleteSupplier);
router.get("/admin-no-permission",isAdmin,permission.AdminWithNoPermission);
router.put("/admin-no-permission/:id",isAdmin,permission.givePermissionAdmin);
router.delete("/delete",isAdmin,adminController.delete);
router.delete("/delete-user/:id",isAdmin,adminController.deleteUser);
router.post("/forgot-password/otp-generate",otpGenerate);
router.post("/forgot-password/otp-verify",otpVerify);
router.post("/forgot-password/change-password",isForgotPasswordAdmin,adminController.forgotPassword)


module.exports = router;
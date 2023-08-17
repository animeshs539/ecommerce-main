const router = require("express").Router();
const userController = require("../controller/user");
const isUser = require("../middleware/isUser");
const {otpGenerate} = require("../middleware/otp(User)");
const {otpVerify} = require("../middleware/otp(User)");
const isForgotPassword = require("../middleware/isForgotPassword");

router.post("/signup",userController.postSignup);
router.post("/login",userController.postLogin);
router.get("/logout",userController.postLogout);
router.put("/update",isUser,userController.update);
router.delete("/delete",isUser,userController.delete);
router.post("/forgot-password/otp-generate",otpGenerate);
router.post("/forgot-password/otp-verify",otpVerify);
router.post("/forgot-password/change-password",isForgotPassword,userController.forgotPassword)



module.exports = router;
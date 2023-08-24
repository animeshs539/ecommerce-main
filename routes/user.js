const router = require("express").Router();
const userController = require("../controller/user");
const {authorizationAdmin} = require("../middleware/Authorization");
const {otpGenerate} = require("../middleware/otp(User)");
const {otpVerify} = require("../middleware/otp(User)");
const {jwtVerify} = require("../authentication/jwt");
const {signupOtpGenerate,signupOtpVerify} = require("../middleware/signupAuthentication");

router.get("/getUsers",jwtVerify,authorizationAdmin,userController.getUsers);
router.get("/getDetails",jwtVerify,userController.getDetails);
router.post("/signup/otp",signupOtpGenerate);
router.post("/signup/otp/verify",jwtVerify,signupOtpVerify,userController.postSignup);
router.post("/login",userController.postLogin);
//router.get("/logout",userController.postLogout);
router.put("/update",jwtVerify,userController.update);
router.put("/update/admin/:id",jwtVerify,authorizationAdmin,userController.updateUser);
router.delete("/delete",jwtVerify,userController.delete);
router.delete("/delete/admin/:id",jwtVerify,authorizationAdmin,userController.deleteUser);
router.post("/forgot-password/otp-generate",otpGenerate);
router.post("/forgot-password/otp-verify/changepassword",jwtVerify,otpVerify,userController.forgotPassword);




module.exports = router;
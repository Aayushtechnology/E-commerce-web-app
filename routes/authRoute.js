

const { registerUser, loginUser, forgotPassword, verifyOtp, ResetPassword } = require("../controller/authController");
const CatchAysnc = require("../service/CatchAysnc");
const router = require("express").Router();


// Call controller function 
router.route("/register").post(CatchAysnc,registerUser);
router.route("/login").post(CatchAysnc,loginUser);
router.route("/forgotpassword").post(CatchAysnc , forgotPassword)

router.route("/verifyotp").post(CatchAysnc ,verifyOtp)
router.route("/resetpassword").post(CatchAysnc ,ResetPassword)
// router.route("/login").post(loginUser);
// module.exports = router;
// ./rsgister lie rediserUser fun call bagxa 

module.exports = router ; 
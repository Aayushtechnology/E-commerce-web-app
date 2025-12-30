const { getMyProfile, deleteMyProfile, updaeMyProfile, updateMyPassword } = require("../controller/userProfile/userProfile.controller");
const isAutenticated = require("../middleware/isAuthenticated");
// const catchAsync = require("../service/catchAsync");

const router = require("express").Router()


router.route("/").get(isAutenticated, getMyProfile).delete(isAutenticated, deleteMyProfile).patch(isAutenticated, updaeMyProfile)

router.route("/changepassword").patch(isAutenticated, updateMyPassword)

module.exports = router;
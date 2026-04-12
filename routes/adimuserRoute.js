const { getUser } = require("../controller/adimuserControler")
const isAutenticated = require("../middleware/isAuthention")
const restrictTo = require("../middleware/restrictTo")

const router= require("express").Router()

router.route("/user").get(isAutenticated, restrictTo("admin"), getUser)

module.exports= router
const { getUser } = require("../controller/adimuserControler")
const isAutenticated = require("../middleware/isAuthention")
const restrictTo = require("../middleware/restrictTo")
const CatchAysnc = require("../service/CatchAysnc")

const router= require("express").Router()

router.route("/user").get(isAutenticated, restrictTo("admin"),CatchAysnc, getUser)

module.exports= router
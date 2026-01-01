
const { getMyorders, createOrder, cancelOrder, updateMyOrder, deleteMyOrder } = require("../controller/oderController")
const isAutenticated = require("../middleware/isAuthention")
const CatchAysnc = require("../service/CatchAysnc")
// const restrictTo = require("../middleware/restrictTo")
// const catchAsync = reqire("../")

const router = require("express").Router()

router.route("/").get(isAutenticated, getMyorders).post(isAutenticated,CatchAysnc, createOrder)
router.route("/cancel").patch(isAutenticated, CatchAysnc,cancelOrder)
router.route("/:id").patch(isAutenticated, updateMyOrder).delete(isAutenticated,CatchAysnc, deleteMyOrder)


module.exports = router

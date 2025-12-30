
const { getMyorders, createOrder, cancelOrder, updateMyOrder, deleteMyOrder } = require("../controller/oderController")
const isAutenticated = require("../middleware/isAuthention")
// const restrictTo = require("../middleware/restrictTo")
// const catchAsync = reqire("../")

const router = require("express").Router()

router.route("/").get(isAutenticated, getMyorders).post(isAutenticated, createOrder)
router.route("/cancel").patch(isAutenticated, cancelOrder)
router.route("/:id").patch(isAutenticated, updateMyOrder).delete(isAutenticated, deleteMyOrder)


module.exports = router

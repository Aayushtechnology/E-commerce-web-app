const { addToCart } = require("../controller/CartController")
const isAuthention = require("../middleware/isAuthention")

const router = require("express").Router()

router.route("/:productId").post(isAuthention,(addToCart))

module.exports = router

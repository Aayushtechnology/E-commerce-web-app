const { addToCart } = require("../controller/CartController")
const isAuthention = require("../middleware/isAuthention")

const router = require("express").Router()

router.route("/:produtId").post(isAuthention,(addToCart))

module.exports = router

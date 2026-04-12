const express = require("express");
const router = express.Router();


const { createProduct,getProducts } = require("../controller/admin/productController.js");
const isAuthention = require("../middleware/isAuthention");
const restrictTo = require("../middleware/restrictTo");
// const multer = require ("../middleware/multerConfig.js");
const {multer,storage} = require("../middleware/multerConfig.js");
const CatchAysnc = require("../serive/CatchAysnc.js");
const upload = multer({ storage: storage })




router.route("/createProduct").post(isAuthention, restrictTo,CatchAysnc("admin"), upload.single("productImage"),CatchAysnc, createProduct);
router.route("/getProducts").get ( CatchAysnc ,getProducts);
router.route("/getProducts/:id").get(CatchAysnc,getProducts)


module.exports = router; 

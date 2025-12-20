const express = require("express");
const router = express.Router();
const shopController = require('../controllers/shop');

router.get('/',shopController.getIndex);
router.get('/product/:productId',shopController.getProductDetail);
router.get('/products',shopController.getProducts);

module.exports=router

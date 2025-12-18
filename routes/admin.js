const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/add_product',adminController.getAddProduct);
router.post('/add_product',adminController.postAddProduct);
router.get('/edit-products',adminController.getAdminProduct);

module.exports=router;

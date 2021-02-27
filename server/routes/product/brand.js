const express = require('express');
const router = express.Router();

const BrandControllers  = require('../../controller/product/BrandController');

// middleware 
const { auth } = require('../../middleware/Auth');
const { admin } = require('../../middleware/Admin');

router.post('/brand', auth, admin, BrandControllers.addProductBrand)

router.get('/brands', BrandControllers.getProductBrands);


module.exports = router;
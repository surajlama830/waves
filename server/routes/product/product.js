const express = require('express');
const router = express.Router();

const  ProductController = require('../../controller/product/ProductController');

// middleware
const { auth } = require('../../middleware/Auth');
const { admin } = require('../../middleware/Admin');

router.post('/article', auth, admin, ProductController.addProduct );
router.get('/articles_by_id', ProductController.getProducts);
router.get('/articles',ProductController.getByOrder )


router.post('/shop', ProductController.getShop )





module.exports = router 
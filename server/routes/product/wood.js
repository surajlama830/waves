const express = require('express');
const router = express.Router();

const  WoodController = require('../../controller/product/WoodController');

// middleware
const { auth } = require('../../middleware/Auth');
const { admin } = require('../../middleware/Admin');

router.post('/wood',auth, admin, WoodController.addProductWood)
router.get('/woods', WoodController.getProductWood)

module.exports = router
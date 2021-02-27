const express = require('express');
const router = express.Router();

const GuitarStrapController = require('../../../controller/product/accessories/GuitarStrapController')
// middleware
const { auth } = require('../../../middleware/Auth');
const { admin } = require('../../../middleware/Admin');

router.post('/item', auth, admin, GuitarStrapController.addGuitarStrap);

module.exports = router;
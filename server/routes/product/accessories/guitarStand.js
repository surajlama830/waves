const express = require('express');
const router = express.Router();

const GuitarStandController = require('../../../controller/product/accessories/GuitarStandController')
// middleware
const { auth } = require('../../../middleware/Auth');
const { admin } = require('../../../middleware/Admin');

router.post('/item', auth, admin, GuitarStandController.addGuitarStand);

module.exports = router;
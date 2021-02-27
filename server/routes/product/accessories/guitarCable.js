const express = require('express');
const router = express.Router();

const GuitarCableController = require('../../../controller/product/accessories/GuitarCableController')
// middleware
const { auth } = require('../../../middleware/Auth');
const { admin } = require('../../../middleware/Admin');

router.post('/item', auth, admin, GuitarCableController.addGuitarCable);

module.exports = router;
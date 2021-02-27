const express = require('express');
const router = express.Router();

const GuitarTunerController = require('../../../controller/product/accessories/GuitarTunerController')
// middleware
const { auth } = require('../../../middleware/Auth');
const { admin } = require('../../../middleware/Admin');

router.post('/item', auth, admin, GuitarTunerController.addGuitarTuner);

module.exports = router;
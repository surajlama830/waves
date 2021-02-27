const express = require('express');
const router = express.Router();

const GuitarCapoController = require('../../../controller/product/accessories/GuitarCapoController')
// middleware
const { auth } = require('../../../middleware/Auth');
const { admin } = require('../../../middleware/Admin');

router.post('/item', auth, admin, GuitarCapoController.addGuitarCapo);

module.exports = router;
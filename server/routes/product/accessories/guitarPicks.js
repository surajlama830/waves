const express = require('express');
const router = express.Router();

const GuitarPicksController = require('../../../controller/product/accessories/GuitarPicksController')
// middleware
const { auth } = require('../../../middleware/Auth');
const { admin } = require('../../../middleware/Admin');

router.post('/item', auth, admin, GuitarPicksController.addGuitarPicks);

module.exports = router;
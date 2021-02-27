const express = require('express');
const router = express.Router();

const SpareStringController = require('../../../controller/product/accessories/SpareStringController')

// middleware
const { auth } = require('../../../middleware/Auth');
const { admin } = require('../../../middleware/Admin');

router.post('/item', auth, admin, SpareStringController.addSpareString);
// router.get('/item_by_id', SpareStringController.getStrings);

module.exports = router;
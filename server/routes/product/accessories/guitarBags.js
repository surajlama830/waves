const express = require('express');
const router = express.Router();

const GuitarBagsController = require('../../../controller/product/accessories/GuitarBagsController')
// middleware
const { auth } = require('../../../middleware/Auth');
const { admin } = require('../../../middleware/Admin');

router.post('/item', auth, admin, GuitarBagsController.addGuitarBag);
router.get('/items',  GuitarBagsController.getGuitarBag);
router.get('/item_by_id' , GuitarBagsController.getGuitarBagSingle);
router.post('/update_accessories_data', auth, admin,GuitarBagsController.updateGuitarBag)

module.exports = router;
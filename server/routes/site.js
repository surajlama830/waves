const express = require('express');

const { admin } =require('../middleware/Admin');
const { auth } = require('../middleware/Auth');

const router = express.Router();
const siteController = require('../controller/site/site');

router.get('/site_data', siteController.getSiteInfo)
router.post('/site_data', auth, admin, siteController.postSiteInfo);


module.exports = router;

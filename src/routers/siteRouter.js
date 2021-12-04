const express = require('express');
const router = express.Router();
const SiteController = require('../controllers/siteController');

router.get('/', SiteController.homePage);

module.exports = router;

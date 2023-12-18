const express = require('express');
var router = express.Router();

var shop = require('../lib/shop');

router.get('/all', (req, res) => {
    shop.all(req, res);
})

module.exports = router;

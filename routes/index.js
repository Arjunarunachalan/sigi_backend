var express = require('express');
var router = express.Router();

router.use('/', require('./user/user'))
router.use('/products', require('./products/products'))


module.exports = router;

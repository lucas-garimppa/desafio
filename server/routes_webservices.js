var express = require('express');
var router = express.Router();
var control_exemplo = require('../controller/controller_exemplo.js');
const util = require('./util');
const { middewareWrapper: mw } = require('./utils.exception');

router.get('/exemplo/:id', mw(control_exemplo.get));
router.get('/exemplo', mw(control_exemplo.insert));

module.exports = router;

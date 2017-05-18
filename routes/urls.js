var express = require('express');
var router = express.Router();
var user = require('../controllers/loginsignup');
var points = require('../controllers/addPoints');
var transfer = require('../controllers/transfer');
var verifyToken = require('../middlewares/authenticate');

router.post('/register', user.create);
router.post('/login', user.login);
router.post('/addPoints', verifyToken, points.addpoints );
router.post('/transfer', verifyToken, transfer.transfer);

module.exports = router;
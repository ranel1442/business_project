var express = require('express');
var router = express.Router();
const users = require('../controllers/users');
const auth = require('../middleware/auth');

router.post('/signup', users.signup);
router.post('/login', users.login);
router.patch('/:email', auth, users.edit);
router.get('/:email', auth, users.getItem);


module.exports = router;

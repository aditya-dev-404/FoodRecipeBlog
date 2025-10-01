const express = require('express')
const router = express.Router();
const {userSignup, userLogin, getUser } = require('../controllers/user.js');

router.post('/signup',userSignup);
router.post('/login', userLogin);
router.get('/:id', getUser);

module.exports = router;
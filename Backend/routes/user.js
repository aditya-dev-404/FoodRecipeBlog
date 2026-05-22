const express = require('express')
const router = express.Router();
const { userSignup, userLogin, getUser, addFavourites, delFavourites, getFavourites } = require('../controllers/user.js');
const verifyToken = require('../middlewares/auth.js');

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/fav/:recipeId', verifyToken, addFavourites);
router.delete('/fav/:recipeId', verifyToken, delFavourites);
router.get('/favourites', verifyToken, getFavourites);
router.get('/:id', verifyToken, getUser);

module.exports = router;
const express = require('express');
const auth = require('../controllers/auth');
const router = express.Router();

router.get('/:uid', auth.isAuth);
router.post('/signup', auth.signUp);
router.post('/signin', auth.signIn);
router.post('/signout', auth.logOut);

module.exports = router;

const express = require('express');
const router = express.Router();

const {getUser} = require('../controllers/user');

router.get('/:uid', getUser);


module.exports = router;
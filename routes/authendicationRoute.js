const express = require('express');
const router = express.Router();
const { SignIn, Login } = require('../controllers/authendicationController');

router.post('/signin', SignIn)

router.post('/login', Login)

module.exports = router;
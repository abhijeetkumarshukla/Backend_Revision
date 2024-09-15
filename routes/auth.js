const express = require('express');
const userRegistration = require('../controllers/userRegistration.controller')
const userLogin = require('../controllers/userLogin.controller')
const router = express.Router();

router.post('/register', userRegistration )
router.post('/login', userLogin) 
    

module.exports = router;
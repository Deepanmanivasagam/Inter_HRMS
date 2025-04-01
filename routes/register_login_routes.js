const express = require('express');
const {
    userRegistration,
    userLogin,
    getregistereduser
} = require('../controllers/register_loginController');
 
const router = express.Router();

router.post('/register',userRegistration);
router.post('/login',userLogin);
router.post('/getuser',getregistereduser)

module.exports = router;
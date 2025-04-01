const express = require('express');

const router = express.Router();

const register = require('../register_login_routes');
const protected = require('../protectedroute');
const leaveRequest = require('../leaveRoutes');
const employee = require('../employee-routes');
router.use('/auth/internal',register);
router.use('/protected',protected);
router.use('/auth',leaveRequest);
router.use('/auth/employee',employee);

module.exports = router;
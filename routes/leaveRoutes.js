const express = require('express');
const router = express.Router();
const verifiedToken = require('../middleware/authmiddleware');
const isAdminMiddleware = require('../middleware/adminMiddleware')
const {
    applyLeave,
    getleaveId,
    getPendingId,
    updateLeaveStatus,
    deletestatus,
    getApprovedId,
    filterLeaveMonths,
} = require('../controllers/leaveRequestController');

router.post('/apply',verifiedToken,applyLeave);
router.post('/getleaveId',getleaveId);
router.post('/getpending',verifiedToken,isAdminMiddleware,getPendingId);
router.post('/getapproved',verifiedToken,getApprovedId);
router.post('/updatestatus/:id',verifiedToken,isAdminMiddleware,updateLeaveStatus);
router.post('/filtermonth',verifiedToken,filterLeaveMonths)
router.delete('/delete',verifiedToken,deletestatus);


module.exports = router;
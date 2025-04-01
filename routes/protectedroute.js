const express = require('express');
const router = express.Router();
const verifiedToken = require('../middleware/authmiddleware');

router.get('/leaverequest', verifiedToken,(req,res)=>{
    res.json({message:'Leave request',user:req.user});
});

module.exports = router;
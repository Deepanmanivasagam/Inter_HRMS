const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    const authtoken = req.header('Authorization');
    const token = authtoken.split(' ')[1];
    // console.log(token)
    if(!token){
        return res.status(401).json({message:'Access Denied: No Token Provided'});
    }
    try{
        const verifyuser = jwt.verify(token,process.env.JWT_SECRET);
        // console.log(decoded)
        req.user = verifyuser;
        next();
    }catch(error){
        res.status(403).json({message:'Invalid Token'});
    }
};

module.exports = verifyToken;
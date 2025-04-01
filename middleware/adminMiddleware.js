const User = require('../model/register');

const isAdminMiddleware = async(req,res,next)=>{
    try{
       const user = await User.findById(req.user.id)
       if(!user || !user.isAdmin){
        return res.status(400).json({message:"Only Admin can access this"})
       }
       next();
    }catch(error){
       res.status(500).json({message:"server error",error:error.message});
    }
};

module.exports = isAdminMiddleware;
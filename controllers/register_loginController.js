const User = require('../model/register');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRegistration = async (req,res)=>{
    try{
      const {userName,password} = req.body;
      const registeredUser = await User.findOne({userName});
      if(registeredUser){
        return res.status(400).json({message:'User is already registered..'});
      }
      const user = new User({
        userName:req.body.userName,
        password:req.body.password,
        isAdmin:req.body.isAdmin || false
      });
      await user.save();
      const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'10d'});

        res.status(200).json({message:'User registered successfully', id:user._id,token})
    }catch(error){
        res.status(500).json({message:"Error in server",error:error.message});
    }
}

const getregistereduser = async (req,res)=>{
    try{
       const {id} = req.body;
       const findedId = await User.findById(id);
       res.status(200).json({message:"user found",id:findedId.id,userName:findedId.userName,isadmin:findedId.isAdmin});
    }catch(error){
       res.status(400).json({message:error.message});
    }
}

const userLogin = async (req,res)=>{
    try{
        const {userName,password} = req.body;
        const registeredUser = await User.findOne({userName});
        if(!registeredUser){
            return res.status(400).json({message:'Please Enter valid credentials'})
        }

        const registeredPass = await bcrypt.compare(password, registeredUser.password);
        if(!registeredPass){
            return res.status(400).json({message:'please enter the registered password'});
        }
        const token = jwt.sign(
            {id:registeredUser._id},
            process.env.JWT_SECRET,
            {expiresIn:'10d'});
        res.status(200).json({message:'login successful',id:registeredUser._id,token});   
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

module.exports = {
    userRegistration,
    userLogin,
    getregistereduser,
}
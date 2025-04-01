const { isValidObjectId } = require('mongoose');
const Designation = require('../model/designation');

const createDesignation = async(req,res)=>{
    try{
     const {departmentId,designationName,description,status} = req.body;
     if(!isValidObjectId(departmentId)){
      return res.status(404).json("Invalid deptId");
     }

     const addDesignation = new Designation({
        departmentId,
        designationName,
        description,
        status,
        createdBy:req.user.id
     });
     await addDesignation.save()
     res.status(200).json({message:"Designation added",addDesignation})
    }catch(error){
    res.status(500).json({message:"server Error",error:error.message});
    }
}

const getallId = async(req,res)=>{
    try{
     const getallId = await Designation.find();
     res.status(200).json({result:getallId});
    }catch(error){
     res.status(500).json({message:"server Error",error:error.message})
    }
}

const getsingleId = async(req,res)=>{
    try{
        const {designationId} = req.body;
        const getsingle = await Designation.findById(designationId);
        res.status(200).json({result:getsingle});
    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message});
    }
}
const updateDesign = async(req,res)=>{
    try{
        const {id} = req.params
        if(!id){
            return res.status(404).json("Invalid Id");
        }
        const {departmentId,designationName,description,status} = req.body;
        const updated = await Designation.findByIdAndUpdate(id,{
            departmentId,
            designationName,
            description,
            status,
        },{new:true});
        await updated.save()
        res.status(200).json({result:updated});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

const deleteDesign = async(req,res)=>{
    try{
       const {id} = req.body;
       if(!id){
        return res.status(404).json({message:"Please enter a valid Id"})
       }
       const deleteDesignId = await Designation.findByIdAndUpdate(id);
       res.status(200).json({message:`Employee deleted successfully:${id}`,result:deleteDesignId});
    }catch(error){
       res.status(400).json({message:error.message});
    }
}

module.exports = {
    createDesignation,
    getallId,
    getsingleId,
    updateDesign,
    deleteDesign,
}
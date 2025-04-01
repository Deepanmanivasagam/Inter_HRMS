const Department = require('../model/department.');

const addDepartment = async(req,res)=>{
    try{
     const {departmentName,description,roleId} = req.body;
     if(!isValidObjectId(roleId)){
        return res.status(400).json({message:"Invalid type"});
     }
     const newdepartment = new Department({
        departmentName,
        description,
        roleId,
     });
     await newdepartment.save();
     res.status(200).json({message:"department added successfully",Dept:newdepartment});
    }catch(error){
     res.status(400).json({message:error.message});
    }
}

const getDept = async(req,res)=>{
    try{
     const getdept = await Department.find();
     res.status(200).json({result:getdept});
    }catch(error){
     res.status(400).json({message:error.message});
    }
}

const getsingleDept = async(req,res)=>{
    try{
        const {departmentId} = req.body;
     const getsingledept = await Department.findById(departmentId);
     if(!getsingledept){
        return res.status(404).json({message:"Invalid Id"});
     }
     res.status(200).json({result:getsingledept});
    }catch(error){
     res.status(400).json({message:error.message});
    }
}

const updateDepartment = async(req,res)=>{
    try{
    const {id} = req.params;
    const {departmentName,description,roleId} = req.body;
    if(!id){
        return res.status(404).json("Invalid Id");
    }
    const updatedId = await Department.findByIdAndUpdate(id,
        {
        departmentName,
        description,
        roleId
        },{new:true});
    res.status(200).json({message:"Id updated",updatedId});
    }catch(error){
     res.status(400).json({message:error.message});
    }
}

const deleteId = async (req, res) => {
    try{
        const { id } = req.body;
        const deletedDept = await Department.findByIdAndUpdate(id);
        if(!deletedDept){
            return res.status(404).json({ message: "Role not found" });
        }
        res.status(200).json({message:"DepartmentId deleted successfully",role:deletedDept});
    }catch(error){
        res.status(500).json({message:"Server error",error: error.message});
    }
};


module.exports = {
    addDepartment,
    getDept,
    getsingleDept,
    updateDepartment,
    deleteId,
};
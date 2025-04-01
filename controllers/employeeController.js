const Employee = require('../model/employee');

const addEmployee = async(req,res)=>{
    try{
    const {employeeName,userId,DOB,age,gender,Casual_Leave,Medical_Leave,Annual_Leave,salary} = req.body;

    const date = new Date(DOB).toISOString().split(' ')[0];
    const newEmployee = new Employee({
        employeeName,
        userId,
        DOB:date,
        age,
        gender,
        Casual_Leave,
        Medical_Leave,
        Annual_Leave,
        salary,
    });
    await newEmployee.save();
    res.status(200).json({message:"Employee added successfully",Employee:newEmployee});
}catch(error){
    res.status(400).json({message:error.message});
}
}

const getAllEmployee = async(req,res)=>{
    try{
        const getAllId = await Employee.find();
        res.status(200).json({message:"All employee Id fetched",result:getAllId});
    }catch(error){
        res.status(400).json({message:error.message});
    }
}

const getSingleId = async(req,res)=>{
    try{
        const {EmployeeId} = req.body;
       const getSingle = await Employee.findById(EmployeeId);
       res.status(200).json({message:"Id fetched successfully",getSingle});
    }catch(error){
       res.status(400).json({message:error.message});
    }
}

const updateEmployee = async(req,res)=>{
    try{
        const {id} = req.params;
       const {employeeName,age,DOB,gender,salary} = req.body;
       if(!id){
        return res.status(404).json({message:"Invalid Id"});
       }
       const updateemployee = await Employee.findByIdAndUpdate(id,{
        employeeName,
        age,
        DOB,
        gender,
        salary,
    },{new:true});
       res.status(200).json({message:'Updated successfully',result:updateemployee});
    }catch(error){
      res.status(400).json({message:error.message});
    }
}

const deleteEmployee = async(req,res)=>{
    try{
       const {id} = req.body;
       if(!id){
        return res.status(404).json({message:"Please enter a valid Id"})
       }
       const deleteEmployeeId = await Employee.findByIdAndUpdate(id);
       res.status(200).json({message:`Employee deleted successfully:${id}`,result:deleteEmployeeId});
    }catch(error){
       res.status(400).json({message:error.message});
    }
}

module.exports = {
    addEmployee,
    getAllEmployee,
    getSingleId,
    updateEmployee,
    deleteEmployee
}
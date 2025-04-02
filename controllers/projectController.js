const Project = require('../model/projectStatus');
const moment = require('moment');

const addProject = async(req,res)=>{
    try {
        const {projectName,teamMembers,startDate,endDate} = req.body;

        const formattedStartDate = moment(startDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        const formattedEndDate = moment(endDate, 'DD-MM-YYYY').format('YYYY-MM-DD');

        const newProject = new Project({
            projectName,
            teamMembers,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
        });

        await newProject.save();
        res.status(200).json({message:"Project details added successfully",newProject});
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

const getProject = async(req,res)=>{
    try{
      const {id} = req.params;
      const findedId = await Project.findById(id).populate('teamMembers' ,'userName');
      console.log(findedId);
      res.status(200).json({findedId});
    }catch(error){
      res.status(400).json({message:error.message});
    }
}

const updateProject = async(req,res)=>{
    try{
     const {id} = req.params;
     const {projectName,teamMembers,startDate,endDate} = req.body;
     
     const formattedStartDate = moment(startDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
     const formattedEndDate = moment(endDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
     const dueDays = moment(formattedEndDate).diff(moment(formattedStartDate), 'days');
     const updatedId = await Project.findByIdAndUpdate(id,
        {
            projectName,
            teamMembers,
            startDate:formattedStartDate,
            endDate:formattedEndDate,
            dueDays:dueDays,
        },{new:true}
     );
     res.status(200).json({message:"project updated successfully",updatedId});
    }catch(error){
     res.status(400).json({message:error.message});
    }
}

const deleteProject = async(req,res)=>{
    try{
      const {projectId} = req.body;
      const deletedId = await Project.findByIdAndUpdate(projectId);
      if(!deletedId){
        return res.status(400).json("Invalid Id");
      }
      res.status(200).json({message:`${projectId} deleted successfully`,deletedId});
    }catch(error){
      res.status(400).json({message:error.message});
    }
}

module.exports = { addProject,getProject,updateProject,deleteProject };
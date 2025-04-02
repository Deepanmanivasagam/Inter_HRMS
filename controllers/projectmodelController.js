const Project = require('../model/project-model');
const moment = require('moment');

const addProject = async(req,res)=>{
    try{
        const {projectName,teamMembers,startDate,endDate} = req.body;

        const formattedStartDate = moment(startDate, 'DD-MM-YYYY').toDate();
        const formattedEndDate = moment(endDate, 'DD-MM-YYYY').toDate();

        const dueDays = moment(formattedEndDate).diff(moment(formattedStartDate),'days');

        const today = moment().startOf('day');
        console.log(today)
        const overdueDays = today.isAfter(formattedEndDate) ?today.diff(moment(formattedEndDate),'days') :0;

        const newProject = new Project({
            projectName,
            teamMembers,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            dueDays,
            overdueDays
        });

        await newProject.save();
        
        res.status(200).json({message:"Project added successfully",newProject});
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

const getProject = async(req,res)=>{
    try{
        const {id} = req.params;

        const project = await Project.findById(id).populate('teamMembers','userName');

        if(!project){
            return res.status(404).json({message:"Project not found"});
        }

        res.status(200).json({project});
    }catch(error){
        res.status(400).json({message:error.message});
    }
};

const getallProject = async(req,res)=>{
    try{
    const allProject = await Project.find().populate('teamMembers','userName');
    res.status(200).json({message:"All Projects fetched",allProject});
}catch(error){
    res.status(400).json({message:error.message});
}
}

const updateProject = async(req,res)=>{
    try{
        const {id} = req.params;
        const {projectName,teamMembers,startDate,endDate} = req.body;

        const formattedStartDate = moment(startDate,'DD-MM-YYYY').format('YYYY-MM-DD');
        const formattedEndDate = moment(endDate,'DD-MM-YYYY').format('YYYY-MM-DD');

        const dueDays = moment(formattedEndDate).diff(moment(formattedStartDate),'days');
        const today = moment().format('YYYY-MM-DD');
        const overdueDays = moment(today).isAfter(formattedEndDate) ?moment(today).diff(moment(formattedEndDate), 'days') :0;

        const updatedProject = await Project.findByIdAndUpdate(id,
            {
                projectName,
                teamMembers,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                dueDays,
                overdueDays,
            },
            {new:true}
        ).populate('teamMembers','userName');

        if(!updatedProject){
            return res.status(404).json({message:"Project not found"});
        }

        res.status(200).json({message:"Project updated successfully",updatedProject});
    }catch(error){
        res.status(400).json({ message: error.message });
    }
};

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

module.exports = { 
    addProject,
    getProject,
    getallProject,
    updateProject,
    deleteProject
};
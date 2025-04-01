const moment = require('moment');
const LeaveRequest = require('../model/leaverequest-model');
const User = require('../model/register')
const Employee = require('../model/employee');

const applyLeave = async(req,res)=>{
  try {
      const {type,FromDate,ToDate,halfDayLeave,reason} = req.body;

      const leaveTypes = ['Medical_Leave', 'Casual_Leave', 'Annual_Leave'];
      if (!leaveTypes.includes(type)) {
          return res.status(400).json({ message: 'Invalid leave type' });
      }

      const fromDate = moment(FromDate, 'DD-MM-YYYY').toDate();
      const toDate = moment(ToDate, 'DD-MM-YYYY').toDate();

      const user = await User.findById(req.user.id);
      if(!user){
          return res.status(404).json({message:"User not found"});
      }
      const difference = (toDate-fromDate)/(1000*60*60*24);
      const fullDayLeave = Math.floor(difference)+1;
      const totalDays = fullDayLeave+(halfDayLeave*0.5);
      const totalHours = (fullDayLeave*8)+(halfDayLeave*4);

      const leaveRequest = new LeaveRequest({
          userId: req.user.id,
          leaveType: type,
          FromDate: fromDate,
          ToDate: toDate,
          fullDayLeave,
          halfDayLeave,
          reason
      });

      await leaveRequest.save();
      res.status(200).json({ 
          message: 'Leave request submitted', 
          requestedUser: user.userName,
          leaveDuration: `${totalDays} days`, 
          totalHours
      });

  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getleaveId = async(req,res)=>{
    try{
      const {id} = req.body;
      const findedId = await LeaveRequest.findById(id);
      if(!findedId){
        return res.status(400).json({message:"Leave Id not found"});
      }
      res.status(200).json({result:findedId});
    }catch(error){
      res.status(500).json({message:error.message});
    }
}

const updateLeaveStatus = async (req, res) => {
  try {
      const {id} = req.params;
      const {status} = req.body;

      // leaveRequest Id
      const leaveRequest = await LeaveRequest.findById(id);
      if(!leaveRequest){
          return res.status(400).json({message:'Leave request not found'});
      }
      // prevent from multiple approval
      if(leaveRequest.status === "Approved"){
        return res.status(200).json({message:"request already Approved"});
      }
      const employee = await Employee.findOne({userId:leaveRequest.userId});
      if(!employee){
          return res.status(400).json({message:'Employee not found'});
      }

      const from = new Date(leaveRequest.FromDate);
      const to = new Date(leaveRequest.ToDate);
      const fullDayLeave = Math.ceil((to - from)/(1000 * 60 * 60 * 24)) + 1;
      if(status === 'Approved'){
          const leaveType = leaveRequest.leaveType;
          const halfDayLeave = leaveRequest.halfDayLeave || 0;

          if(leaveType in employee.leaveBalance){
              employee.leaveBalance[leaveType] -= fullDayLeave + (halfDayLeave * 0.5);
              if(employee.leaveBalance[leaveType] < 0){
                  return res.status(400).json({message:`Insufficient ${leaveType} balance`});
              }
          }else{
              return res.status(400).json({message:`Invalid leave type: ${leaveType}`});
          }
          await employee.save();
      }
      const adminUser = await User.findById(req.user.id);
      const userRequestingLeave = await User.findById(leaveRequest.userId);

      leaveRequest.status = status;
      await leaveRequest.save();
      res.status(200).json({
          message: `Status for requested Leave by ${userRequestingLeave.userName}: ${status} by ${adminUser.userName}`,
          updatedLeaveBalance: employee.leaveBalance,
      });

  }catch(error){
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deletestatus = async (req,res)=>{
    try{
      const {id} = req.body;
      const deleted = await LeaveRequest.findByIdAndDelete(id);
      res.status(200).json({result:'Id deleted'});
    }catch(error){
    res.status(400).json({message:'error found',error})
    }
}


const getPendingId = async (req,res)=>{
    try {

      const count = await LeaveRequest.countDocuments({status:"pending"});  
      const PendingId = await LeaveRequest.find({ status: "pending" });
  
      if(PendingId.length>0) {
        return res.status(200).json({IdCount:count,message:"Pending Request",PendingId});
      }else{
        return res.status(400).json({message:"PendingId not found"});
      }
    } catch(error){
      res.status(500).json({message:error.message});
    }
  };


const getApprovedId = async(req,res)=>{
  try{
   const count = await LeaveRequest.countDocuments({status:"Approved"})
   const ApprovedId = await LeaveRequest.find({status:"Approved"});
   if(ApprovedId.length>0){
    return res.status(200).json({count:count,message:"Approved Id",ApprovedId})
   }else{
    res.status(400).json("Approved Id not found");
   }
  }catch(error){
    res.status(500).json({message:error.message})
  }
}


const filterLeaveMonths = async (req,res)=>{
    try {
        const {month,year,userId} = req.body;

        const monthAsNumber = parseInt(month);
        const yearAsNumber = parseInt(year);

        const employeeId = await User.findById(userId)
        if(!employeeId){
            return res.status(400).json({message:"UserId not found, Please Enter a valid Id"})
        }
        
       const startingDate = moment(`${yearAsNumber}-${monthAsNumber}-01`).startOf('month').toDate();
       const endingDate = moment(`${yearAsNumber}-${monthAsNumber}-31`).endOf('month').toDate();

       const leaves = await LeaveRequest.find({
        userId:userId,
        FromDate:{$gte: startingDate},
        ToDate:{$lte: endingDate},
        status:"Approved",
       });
    //    console.log(leaves);

       let totalLeaveDays = 0;
       let leaveDates = [];
       
       // loop through the filtered dates
       leaves.forEach(leave=>{
           let currentDate = moment(leave.FromDate);
           const toDate = moment(leave.ToDate);

           for(let date = currentDate; date.isSameOrBefore(toDate);date.add(1,'day')){
               if(date.month()+1 === monthAsNumber && date.year() === yearAsNumber){
                   leaveDates.push(date.format('DD-MM-YYYY'));
                   totalLeaveDays++;
               }
           }
       });

       res.status(200).json({
           employeeName: employeeId.userName,
           month: moment(startingDate).format('MMMM YYYY'),
           totalDays: totalLeaveDays,
           leaveTaken: leaveDates
       });

    }catch(error){
        res.status(500).json({message:'Server error',error: error.message});
    }
};

module.exports = {
    applyLeave,
    getleaveId,
    getPendingId,
    updateLeaveStatus,
    deletestatus,
    getApprovedId,
    filterLeaveMonths,
}
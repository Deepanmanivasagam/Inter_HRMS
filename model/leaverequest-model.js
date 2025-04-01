const mongoose = require('mongoose');
const Schema = mongoose.Schema
const leaveRequestSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Register',
        required:true
    },
    leaveType:{
        type:String,
        required:true,
        enum:['Medical_Leave','Casual_Leave','Annual_Leave'],
    },
    FromDate:{
        type:Date,
        required:true,
    },
    ToDate:{
        type:Date,
        required:true
    },
    fullDayLeave:{
        type:Number,
        default:0
    },
    halfDayLeave:{
        type:Number,
        default:0,
    },
    reason:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending','Approved','Rejected'],
        default:'pending'
    },
    appliededAt:{
        type:Date,
        default:Date.now
    },
},
{
    versionKey:false,
    timestamps:true
},
);


leaveRequestSchema.pre('save',function(next){
    const from = new Date(this.FromDate);
    const to = new Date(this.ToDate);
    if(!this.fullDayLeave || this.fullDayLeave ===0){
    const Difference = to.getTime() - from.getTime();
    const days = Math.ceil(Difference/(1000*60*60*24)) + 1;

    this.fullDayLeave = days
}
    next()
})

const LeaveRequest = mongoose.model("LeaveRequest",leaveRequestSchema);

module.exports = LeaveRequest;
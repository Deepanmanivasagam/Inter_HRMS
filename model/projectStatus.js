const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectName:{
        type:String,
        required:true,
    },
    teamMembers:[{
        type:mongoose.Types.ObjectId,
        ref:'Register'
    }],
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true,
    },
    dueDays:{
        type:Number,
        default:0
    }
},
{
    timestamps:true,
    versionKey:false
});

projectSchema.pre('save',function(next){
    const today = new Date();
    if(today > this.endDate){
        this.dueDays = Math.ceil((today - this.endDate)/(24*60*60*1000));
    }else{
        this.dueDays = 0
    }
    next();
});

const projectStatus = mongoose.model("Project",projectSchema);
module.exports = projectStatus;
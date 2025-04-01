const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const designationSchema = new Schema({
    departmentId:{
        type:mongoose.Types.ObjectId,
        ref:'Department',
    },
    designationName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:false,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:Number,
        default:1
    }
},{
    versionKey:false,
});

const Designation = mongoose.model("Designation",designationSchema);

module.exports = Designation;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    departmentName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    roleId:{
        type:mongoose.Types.ObjectId,
        ref:'Role',
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
},{versionKey:false});


module.exports = mongoose.model("Department",departmentSchema);
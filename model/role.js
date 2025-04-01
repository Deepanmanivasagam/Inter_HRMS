const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    role:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{versionKey:false});

module.exports = mongoose.model("Role",roleSchema);
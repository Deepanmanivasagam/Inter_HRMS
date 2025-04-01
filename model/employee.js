const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    employeeName:{
        type:String,
        required:true,
    },
    userId:{
       type:mongoose.Types.ObjectId,
       ref:'Register'
    },
    DOB:{
        type:Date,
        required:true,
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
        enum:["Male","female"],
    },
    leaveBalance:{
        Casual_Leave:{
            type:Number,
            default:12,
        },
        Medical_Leave:{
            type:Number,
            default:8,
        },
        Annual_Leave:{
            type:Number,
            default:10,
        }
    },
    salary:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
},
{versionKey:false},
)

// function calculateage(DOB){
//     const today = new Date();
//     const birthdate = new Date(DOB);
//     let age = today.getFullYear() - birthdate.getFullYear();
//     const monthdiff = today.getMonth() - birthdate.getMonth();
//     if( monthdiff<0 || monthdiff ===0 && birthdate.getDate() > today.getDate()){
//         age--;
//     }
//     return age;
// }

// employeeSchema.pre('save',function(next){
//     this.age = calculateage(this.DOB);
//     next();
// })

module.exports = mongoose.model("Employee",employeeSchema);
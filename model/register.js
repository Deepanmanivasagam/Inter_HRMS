const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const registerSchema = new Schema({
    userName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},
{
    versionKey:false,
    timestamps:true
});

registerSchema.pre('save',async function(next){
   if(!this.isModified('password')){
    return next();
}
    const salt = await bcrypt.genSalt(7);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

const Register = mongoose.model("Register",registerSchema);
module.exports = Register;
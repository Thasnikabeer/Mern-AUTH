import mongoose from 'mongoose';
import { type } from 'os';
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    emsil:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }

},{timestamps:true});  //each user have two extra infrmation time of creation and time of edit

const User= mongoose.model('User',userSchema)
export default User;
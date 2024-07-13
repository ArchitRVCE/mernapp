import mongoose from 'mongoose'


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    location:{
        type:String,
        reuired:true
    },
    email:{
        type:String,
        reuired:true
    },
    password:{
        type:String,
        reuired:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const user = mongoose.model('user',UserSchema)
export default user
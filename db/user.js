const mongoose = require("mongoose");
const userSchema= new mongoose.Schema({

    user_name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})

module.exports = mongoose.model("users" , userSchema)
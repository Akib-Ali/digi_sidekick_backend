const mongoose = require("mongoose");
const patientSchema= new mongoose.Schema({

    first_name:{
        type:String,
        required:true
    },
    middle_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    whatsapp_no:{
        type:Number,
        required:true
    },
    mobile_no:{
        type:Number,
        required:true
    },
    clinic_name:{
        type:String,
        required:true
    },
    
    createdAt:{
        type:Date,
        default:Date.now()
    }
  })

module.exports = mongoose.model("patient_lists" , patientSchema)
const mongoose=require("mongoose")

const testimonySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"Pending"
    },


})

const testimonals=mongoose.model("testimonals",testimonySchema)
module.exports=testimonals
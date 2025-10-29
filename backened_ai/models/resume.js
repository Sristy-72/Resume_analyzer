const mongoose = require("mongoose")
const ResumeSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,// mongoDB objectId unique identifier for another document
        ref:"user",
        required:true
    },
    resume_name:{
        type:String,
        required:true
    },
    job_desc:{
        type:String,
        required:true
    },
    score:{
        type:String,
    },
    feedback : {
        type : String,
        default : null
    }

},{timestamps:true});
const resumeModel= mongoose.model("resume", ResumeSchema);
module.exports= resumeModel;
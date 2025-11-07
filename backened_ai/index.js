// this file is for backened connection

const express = require('express');
const cors = require('cors')
require("dotenv").config();
const app= express();

const port=process.env.PORT||4000;
require('./conn');   // this will require conn.js 
app.use(express.json());
app.use(cors({
    credentials:true,
   origin: [
    "http://localhost:5173",
    "https://my-resume-analyzer.netlify.app"
  ]
}))
const UserRoutes= require('./Routes/user');
const ResumeRoutes= require('./Routes/resume');
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/",(_,res)=>{
    return res.send("Welcome to my server 😎")
})
app.use('/api/user',UserRoutes)
app.use('/api/resume', ResumeRoutes)
app.listen(port, ()=>{
    console.log("backened is working ")
})

module.exports = app;
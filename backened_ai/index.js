// this file is for backened connection

const express = require('express');
const cors = require('cors')
const app= express();
require("dotenv").config();
const port=process.env.PORT||4000;
// require('./conn');   // this will require conn.js 
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))
const UserRoutes= require('./Routes/user');
const ResumeRoutes= require('./Routes/resume');

app.get("/",(_,res)=>{
    return res.send("Welcome to my server 😎")
})
app.use('/api/user',UserRoutes)
app.use('/api/resume', ResumeRoutes)
app.listen(port, ()=>{
    console.log("backened is working ")
})
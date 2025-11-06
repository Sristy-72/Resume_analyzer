// this file is for mongoDB connection

const mongoose = require('mongoose');
// const url = "mongodb://localhost:27017/myDatabaseName";
const url = process.env.MONGO_URI;

console.log("Connecting to db",url)
mongoose.connect(url)
.then((res) => {
  console.log(" Database connected successfully");
})
.catch(err => {
  console.log(" Something went wrong:", err);
});



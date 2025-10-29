const express = require("express");
const router = express.Router();
const UserController= require('../controllers/user')
router.post('/',UserController.register)// if anyone goes to path / then it will be send to register function which is in controller (../controller/user)
module.exports=router;

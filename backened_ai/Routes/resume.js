const express =require("express");
const router = express.Router();
const ResumeController = require('../controllers/resume');

const {upload}= require("../utils/multer")
router.post('/addResume',upload.single("resume"), ResumeController.addResume)//jab bhi /addResume api endpoint hit hoga tab ResumeContoller ka addResume function chalega
//It tells Express app what to do when someone sends a POST request to the /addResume api endpoint.
router.get('/get', ResumeController.getResumeForAdmin);
  router.get('/:user', ResumeController.getAllResumesForUser);
  
module.exports= router;
const express=require("express");

const controller=require('./../controller/teacherController');
const validator=require("./../middlewares/validations/validationMw");
const teacherValidator=require("./../middlewares/validations/teactherValidator");

const AuthMW=require("./../middlewares/authenticationMW");
const router=express.Router();
const multer=require('multer');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,"./uploads/")
    },
    filename:function(req,file,cb){
       cb(null,new Date().toISOString().replace(/:/g, "_") + file.originalname);
    }
});

const filter = (req,file,cb)=>{
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        cb(null, true);
        console.log(true);
      } else {
        //if u want to throw error if file type doesn'match
        // cb(new Error("file type doesn't match"),false);
        cb(null, false);
      }
}

const upload=multer({
    storage:storage,
    limits:{fileSize:1024*1024*5},
    fileFilter: filter,
});





router.route("/teacher")
.get(AuthMW.checkAdminOrTeacher,controller.getTeacherData)
.post(upload.single('image'),teacherValidator.postValidation,validator,controller.postTeacherData)
.patch(AuthMW.checkAdminOrTeacher,upload.single('image'),teacherValidator.updateValidation,validator,controller.updateTeacherData)
.delete(AuthMW.checkAdminOrTeacher,teacherValidator.deleteValidation,validator,controller.deleteTeacherData)

router.route("/teacher/supervise")
.all(AuthMW.checkAdminOrTeacher)
.get(controller.getTeacherSuperviseData)

router.route("/teacher/:id")
.all(AuthMW.checkAdminOrTeacher)
.get(teacherValidator.getTeacher,validator,controller.getTeacherIDData)



module.exports=router;
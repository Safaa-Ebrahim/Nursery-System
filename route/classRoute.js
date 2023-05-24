const express=require("express");

const controller=require('./../controller/classController');
const validator=require("./../middlewares/validations/validationMw");
const classValidator=require("./../middlewares/validations/classValidator");

const AuthMW=require("./../middlewares/authenticationMW");
const router=express.Router();

router.route("/class")
.all(AuthMW.isAdmin)
.get(controller.getClassData)
.post(classValidator.postValidation,validator,controller.postClassData)
.patch(classValidator.updateValidation,validator,controller.updateClassData)
.delete(classValidator.deleteValidation,validator,controller.deleteClassData)

router.route("/class/:id")
.all(AuthMW.isAdmin)
.get(classValidator.getClass,validator,controller.getClassDataID)

router.route("/class/:id/childern")
.all(AuthMW.isAdmin)
.get(classValidator.getChildern,validator,controller.getClassChildDataId)

router.route("/class/:id/teacher")
.all(AuthMW.isAdmin)
.get(classValidator.getTeacher,validator,controller.getClassTeacherDataID)



router.route("/class/id/child")
.all(AuthMW.isAdmin)
.get(controller.getClassChildern)

router.route("/class/id/teacher")
.all(AuthMW.isAdmin)
.get(controller.getClassTeacher)


module.exports=router;
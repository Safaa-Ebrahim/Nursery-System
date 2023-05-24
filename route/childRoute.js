const express=require("express");

const controller=require('./../controller/childController');
const validator=require("./../middlewares/validations/validationMw");
const childValidator=require("./../middlewares/validations/childValidator");

const AuthMW=require("./../middlewares/authenticationMW");
const router=express.Router();

router.route("/child")
.all(AuthMW.isAdmin)
.get(controller.getChildData)
.post(childValidator.postValidation,validator,controller.postChildData)
.patch(childValidator.updateValidation,validator,controller.updateChildData)
.delete(childValidator.deleteValidation,validator,controller.deleteChildData)

router.route('/child/:id')
.all(AuthMW.isAdmin)
.get(childValidator.getChild,validator,controller.getChildDataId);


router.route("/child/:id/class")
.all(AuthMW.isAdmin)
.get(childValidator.getClass,validator,controller.getChildDataClass);

module.exports=router;
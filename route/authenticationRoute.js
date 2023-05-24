const  express =require("express");
const controller=require("./../controller/authenticationController");

const loginValidate =require("./../middlewares/validations/loginValidator");

const router=express.Router();

router.route("/login").post(loginValidate.postValidator,loginValidate,controller.login);
// router.route("/login").post(controller.login);

module.exports=router;
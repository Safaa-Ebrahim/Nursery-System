
const {query,param,body}=require("express-validator");

exports.postValidation=[
    body("fullName").isString().withMessage('fullname must be string'),
    body("password").isLength({min:8}).withMessage('password must be Min length 8'),
    body("email").isEmail().withMessage('email must be Invalid Format'),
    // body('image').isString().withMessage('image must be string')
]

exports.updateValidation=[
    body("id").isMongoId().withMessage('Invalid ObjectId'),
    body("fullName").optional().isString().withMessage('fullname must be string'),
    body("password").optional().isLength({min:8}).withMessage('password must be Min length 8'),
    body("email").optional().isEmail().withMessage('email must be Invalid Format'),
    // body('image').optional().isString().withMessage('image must be string')
]

exports.deleteValidation=[
    body("id").isMongoId().withMessage('Invalid ObjectId'),
]

exports.getTeacher=[
    param("id").isMongoId().withMessage('Invalid ObjectId'),
]
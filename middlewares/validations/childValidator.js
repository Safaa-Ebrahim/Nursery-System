const {query,param,body}=require("express-validator");

exports.postValidation=[
    body("fullName").isAlpha().withMessage('fullName must be string'),
    body("age").isInt().withMessage('age must be integer'),
    body("level").isIn(["PreKG","KG1","KG2"]).withMessage('Value not Matched'),
    body('address').isObject().withMessage('address must be object'),
    body('address.city').isString().withMessage('city must be string'),
    body('address.street').isString().withMessage('street must be string'),
    body('address.building').isInt({min:1}).withMessage('building Must be number'),
]

exports.updateValidation=[
    body("id").isInt().withMessage('id should be integer'),
    body("fullName").optional().isAlpha().withMessage('fullName must be string'),
    body("age").optional().isInt().withMessage('age must be integer'),
    body("level").optional().isIn(["PreKG","KG1","KG2"]).withMessage('Value not Matched'),
    body('address').optional().isObject().withMessage('address must be object'),
    body('address.city').optional().isString().withMessage('city must be string'),
    body('address.street').optional().isString().withMessage('street must be string'),
    body('address.building').optional().isInt({min:1}).withMessage('building Must be number'),
]

exports.deleteValidation=[
    body("id").isInt().withMessage('id should be integer'),
]

exports.getChild=[
    param("id").isInt().withMessage('id should be integer'),
]

exports.getClass=[
    param("id").isInt().withMessage('id should be integer'),
]
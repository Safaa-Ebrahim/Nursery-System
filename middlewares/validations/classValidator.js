const {query,param,body}=require("express-validator");

exports.postValidation=[
    body("name").isAlpha().withMessage('name must be string'),
    body("supervisor").isMongoId().withMessage('supervisor  must be objectId'),
    body("children").isArray().withMessage('children  must be array of children id')
    .custom((value)=>{ if (!value.every(Number.isInteger))
        throw new Error("Array must contain Integers only");
        return true;}),
]
exports.updateValidation=[
    body("id").isInt().withMessage("Id Shoud be Number"),
    body("name").optional().isAlpha().withMessage('name must be string'),
    body("supervisor").optional().isMongoId().withMessage('supervisor  must be objectId'),
    body("children").optional().isArray().withMessage('children  must be array of children id')
    .custom((value)=>{ if (!value.every(Number.isInteger))
        throw new Error("Array must contain Integers only");
      return true;}),
]
exports.deleteValidation=[
    body('id').isInt().withMessage('Id Shoud be Number')
]

exports.getClass = [
    param("id").isInt().withMessage("Id Shoud be Number")
]
exports.getChildern = [
    param("id").isInt().withMessage("Id Shoud be Number")
]
exports.getTeacher = [
    param("id").isInt().withMessage("Id Shoud be Number")
]

const mongoose=require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds);


const Teacher = mongoose.model("teacher");
const Class = mongoose.model("class");
const Child = mongoose.model("children");

exports.getTeacherData=(request,response,next)=>{
    Teacher.find()
    .then((data)=>{
        response.status(200).json(data);
    }
    ).catch(error=>next(error))
}


exports.postTeacherData=(request,response,next)=>{
    let teacherObject = new Teacher({
        _id: request.body.id,
        fullName: request.body.fullName,
        password: bcrypt.hashSync(request.body.password, salt),
        email: request.body.email,
        // image:request.body.image
        image:request.file.path
      });

      teacherObject.save()  
      .then(data=>{
        response.status(201).json({data});
      })
      .catch(error => next(error))
}

exports.updateTeacherData=(request,response,next)=>{
  let password;
  const imagePath = request.file ? request.file.path : request.data;
  
  if (request.body.password != undefined){
    password = bcrypt.hashSync(request.body.password, salt);
  }
  Teacher.updateOne({
    _id:request.body.id
  },{
    // { $set: req.file ? { ...req.body, image: req.file.path } : req.body }
    $set: {
      fullName:request.body.fullName,
      password:password,
      email:request.body.email,
      image:imagePath
      // image:request.body.image,
    }   
  })
  .then((data) => 
      {
        response.status(200).json(data);
      }).catch((error) => next(error))

}
exports.deleteTeacherData=(request,response,next)=>{
    Teacher.findOne({ _id: request.body.id})
    .then((teacher) => {
      if (!teacher) {
        throw new Error('Teacher not found with the specified _id value');
      }
      return Teacher.deleteOne({ _id: request.body.id });
    })
    .then((data) => {
        response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
}

exports.getTeacherIDData=(request,response,next)=>{
    Teacher.findOne({_id:request.params.id})
    .then(object=>{
        if(object == null)
        throw new Error("Teacher doesn't exist");
        response.status(200).json(object);
    }).catch(error=>next(error));
}

exports.getTeacherSuperviseData=async(request,response,next)=>{

    // Class.aggregate(
    //   [
    //     {
    //       $lookup: {
    //         from: Teacher.collection.name,
    //         localField: "supervisor",
    //         foreignField: "_id",
    //         as: "supervisor",
    //       },
    //     },
    //     { $unwind: { path: "$supervisor" } },
    //     {
    //       $project: { name: 1, supervisor: 1 },
    //     },

    //   ]).then((data) => {
    //       response.status(200).json(data);
    //   }).catch((error) => next(error));

   Class.find({},{supervisor:1,_id:1,name:1}).populate({path:"supervisor"})
    //  .populate({path: 'children',model: Child,select: {fullName:1}})
    .then((teachers) => {
      response.status(200).json(teachers);
    }).catch(error=>next(error))

}
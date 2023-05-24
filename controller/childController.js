const { request, response } = require("express");
const mongoose=require("mongoose");
const Child = mongoose.model("children");
const Class = mongoose.model("class");
const Teacher = mongoose.model("teacher");

exports.getChildData=(request,response,next)=>{
    Child.find()
    .then((data)=>{
        response.status(200).json(data);
    }
    ).catch(error=>next(error))
}


exports.postChildData=(request,response,next)=>{
    let object = new Child({
        _id:request.body.id,
        fullName:request.body.fullName,
        age:request.body.age,
        level:request.body.level,
        address:request.body.address,
    });

    object.save().then(data=>{
        response.status(201).json(data);
    }).catch(error=>next(error))
   
}


exports.updateChildData=(request,response,next)=>{
    Child.updateOne({
        _id:request.body.id
    },{
        $set:{
            fullName:request.body.fullName,
            age:request.body.age,
            level:request.body.level,
            address:request.body.address,
        }
        
    }).then((data)=>{
        response.status(200).json(data);
    }

    ).catch(error=>next(error));
}

exports.deleteChildData=(request,response,next)=>{
    Child.findOne({ _id: request.body.id })
    .then((teacher) => {
      if (!teacher) {
        throw new Error('Child not found with the specified _id value');
      }
      return Child.deleteOne({ _id: request.body.id });
    })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
}

exports.getChildDataId=(request,response,next)=>{
    Child.findOne({_id:request.params.id})
    .then(data=>{
        if(data == null)
        throw new Error("Child doesn't exist");
        response.status(200).json(data);
    }).catch(error=>next(error));
}


exports.getChildDataClass=async(request,response,next)=>
{
 
  Child.findOne({ _id: request.params.id })
    .then((obj) => {
      if (obj == null) {
        throw new Error("Child doesn't exist");
      }
      return obj._id;
    })
    .then((childId) => {
      return Class.find({children: childId}).populate({path: 'children'}).populate({path:"supervisor",select:{'fullName':1}});
    })
    .then((classObj) => {
      if (classObj == null) {
        throw new Error("The child doesn't belong to any class");
      }
      response.status(200).json(classObj);
    })
    .catch((error) => next(error));

    // Class.aggregate([
    //     {
    //       $match: { children: Number(request.params.id) },
    //     },
    //     {
    //       $lookup: {
    //         from: Child.collection.name,
    //         foreignField: "_id",
    //         localField: "children",
    //         as: "children",
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: Teacher.collection.name,
    //         foreignField: "_id",
    //         localField: "supervisor",
    //         as: "supervisor",
    //       },
    //     },
    //     { $unwind: { path: "$supervisor" } },
    //     // {
    //     //   $project: { children: 1 },
    //     // },
    //   ])
    //     .then((data) => {
    //       response.status(200).json(data);
    //     })
    //     .catch((error) => next(error));


}
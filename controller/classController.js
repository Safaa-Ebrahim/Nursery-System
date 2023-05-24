
const mongoose=require("mongoose");
const Class = mongoose.model("class");
const Child = mongoose.model("children");
const Teacher = mongoose.model("teacher");

exports.getClassData=(request,response,next)=>{
    Class.find()
    .then((data)=>{
        response.status(200).json(data);
    }
    ).catch(error=>next(error))
}


exports.postClassData=async(request,response,next)=>{

    try {
        const { id, name, supervisor, children } = request.body;
        // Check whether the supervisor exists in the Teacher collection
        const teacher = await Teacher.findById(supervisor);
        if (!teacher) {
          throw new Error("Teacher doesn't exist");
        }
        // Check whether specified children exist in the Child collection
        for (const childId of children) {
          const child = await Child.findById(childId);
          if (!child) {
          throw new Error(`Child with ID ${childId} doesn't exist`);
        }
        }
        // Create a new Class object with the specified children
        const newClass = new Class({
          _id: id,
          name,
          supervisor,
          children,
        });
        // Save the new class to the database
        const savedClass = await newClass.save();
        response.status(200).json(savedClass);
      } catch (error) {
        next(error);
      }
}

exports.updateClassData=async(request,response,next)=>{

  let childerns = Array.from(new Set(request.body.children));
  // let childerns = request.body.children;

  // Use Promise.all to wait for all the Child.findById promises to resolve

  Promise.all(childerns.map((childId) =>Child.findById(childId)))
      .then((child) => {
          if(child.some((child => !child))) {
            let childId=child.findIndex((child)=>!child);
            throw new Error(`Child with ID ${childerns[childId]} not found`);
          }
  
          return Teacher.findOne({_id:request.body.supervisor},{_id:1});
        })
      .then((data) => {

          if (data==null && request.body.supervisor !== undefined) {
            throw new Error('Teacher not found');
          }
 
      // Update the Class object with the new data
      return Class.updateOne(
        { _id: request.body.id },
        {
          $set: 
          {
            name: request.body.name,
            supervisor: request.body.supervisor,
            children: request.body.children,
          },
        }
      );
    })
  .then((data) => {
    if(data.matchedCount == 0){
      throw new Error("Not Found")
    }else{
      response.status(200).json(data);
    }
  })
  .catch((error) => next(error));

}

exports.deleteClassData=(request,response,next)=>
{
    Class.findOne({ _id: request.body.id })
    .then((teacher) => {
      if (!teacher) {
        throw new Error('Class not found with the specified _id value');
      }
      return Class.deleteOne({ _id: request.body.id });
    })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
}


exports.getClassDataID=(request,response,next)=>{

    Class.findOne({_id:request.params.id})
    .then(object=>{
        if(object == null)
        throw new Error("Class doesn't exist");
        response.status(200).json(object);
    }).catch(error=>next(error));
   
  
}

exports.getClassChildDataId=(request,response,next)=>{
    
  Class.find({_id:request.params.id},{children:1})
  .populate({path:"children",select:{'fullName':1}})
  .then(data=>{
    if(data == null){
      throw new Error("Not Found")
    }else{
      response.status(200).json({data})
    }
  })
  .catch(error=>next(error))
}



exports.getClassTeacherDataID=(request,response,next)=>{
  Class.findOne({_id:request.params.id},{supervisor:1})
  .populate({path:"supervisor",select:{'fullName':1}})
  .then(data=>{
      if(data == null){
        throw new Error("Not Found")
      }else{
        response.status(200).json({data})
      }
  })
  .catch(error=>next(error))
}




exports.getClassChildern=(request,response,next)=>{

    Class.find().populate({path:"children",select:{fullName:1}}) //select:{fullName:1}
    .then((child) => {
      response.status(200).json({ childrens: child });
    }).catch(error=>next(error))

}

exports.getClassTeacher=(request,response,next)=>{

    Class.find().populate({path:"supervisor"})
    .then((data)=>{
        response.status(200).json(data);
    }
    ).catch(error=>next(error))

}




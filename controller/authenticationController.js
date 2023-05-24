const jwt=require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Teacher = mongoose.model("teacher");

exports.login=(request,response,next)=>
{

    Teacher.findOne({email:request.body.email})
    .then(teacher=>{
      if(teacher == null) throw new Error("Not Found");
      let result = bcrypt.compareSync(request.body.password, teacher.password)
      if (!result) throw new Error("Wrong email or password");
      else {
          if(teacher._id == "64668c122b59fd718854e80a")
          {
            request.role = "admin";
          }
          else{
            request.role="teacher";
          }
          let token = jwt.sign({id:teacher._id, role:request.role}, process.env.SECRET_KEY, {expiresIn: "24h"});
          response.status(200).json({data:"ok",token});
      }
    })
    .catch(error=>{
        error.status=401;
        next(error);
    });


    // let token;
    // if(request.body.userName=="admin" && request.body.password == "123")
    // {
    //     token=jwt.sign({
    //         userName:request.body.userName,
    //         id:"64668c122b59fd718854e80a",
    //         role:"admin"
    //     },process.env.SECRET_KEY,{expiresIn:"24h"});
    //     response.status(200).json({data:"ok",token});
    // }else{
    //     let error=new Error("not authenicated");
    //     error.status=401;
    //     next(error);
    // }

}

  //module.exports.login = (req, res, next) => {
  //   let token;
  //   // Check if admin
  //   if (req.body.username === "admin" && req.body.password === "123") {
  //     token = jwt.sign(
  //       {
  //         username: "admin",
  //         role: "admin",
  //       },
  //       process.env.secretKey,
  //       { expiresIn: "3h" }
  //     );
  //     res.status(200).json({ data: "ok", token });
  //   } else {
  //     // Check if teacher
  //     Teacher.findOne(
  //       { fullname: req.body.useranme },
  //       { fullname: 1, password: 1 }
  //     ).then((obj) => {
  //       // if no teacher with username was found
  //       if (obj === null) {
  //         let error = new Error("Not authenticated");
  //         error.status = 401;
  //         next(error);
  //       }
  //       // check password
  //       bcrypt.compare(req.body.password, obj.password).then((result) => {
  //         if (result) {
  //           token = jwt.sign(
  //             {
  //               username: obj.fullname,
  //               id: obj._id,
  //               role: "teacher",
  //             },
  //             process.env.secretKey,
  //             { expiresIn: "3h" }
  //           );
  //           res.status(200).json({ data: "ok", token });
  //         } else {
  //           let error = new Error("Not authenticated");
  //           error.status = 401;
  //           next(error);
  //         }
  //       });
  //     });
  //   }
  // };
const express=require("express");
const morgan = require('morgan');
const cors = require('cors');
const mongoose=require("mongoose");
const dotenv=require("dotenv");


// module require
require("./model/teacherModel");
require("./model/childModel");
require("./model/classModel");

//route require
const teacherRouter=require("./route/teacherRoute");
const childRouter=require("./route/childRoute");
const classRouter=require("./route/classRoute");

//authentication require
const authenicatedRouter=require("./route/authenticationRoute");
const authMW=require("./middlewares/authenticationMW");


dotenv.config();
// open the server using express
const server=express(); //craete server
let port=process.env.PORT || 8080;
// server.listen(port,()=>{
//     console.log("server is listening .........from express",port);
// });

mongoose.connect("mongodb://127.0.0.1:27017/NurcerySysten")
.then(() =>{
    console.log("DB connected");
    server.listen(port,()=>{
        console.log("server is listening .........from express",port);
    });
}
).catch(error=>{
    console.log("DB connect Problem "+error);
});

server.use("/uploads", express.static("uploads/"));

/* --------morgan Middleware request url and method ---------------------*/    

server.use(morgan('tiny')); 
// server.use(morgan('dev')); 

// server.use((request,response,next)=>{
//     console.log(request.url,request.method);
//     next();
// });


/*--------------- CORS  middleware --------- */
server.use(cors());

/*-------------- settings -----------------*/
server.use(express.json());
// server.use(express.urlencoded());


/*----------------route middleware----------- */

server.use(authenicatedRouter);
server.use(authMW);

server.use(teacherRouter);
server.use(childRouter);
server.use(classRouter);


/*-------------- not Found middleware------------- */ 
server.use((request,response,next)=>{
    response.status(404).json({message:"page not found"});
});

/* -----------  error middleware -------------- */ 
server.use((error,request,response,next)=>{
    //in development
    response.status(error.status || 500).json({message:error + ""});
    //in deployment
    //response.status(500).json({message:"Internal server error"});
});

const jwt=require("jsonwebtoken");
module.exports = (request,response,next)=>{
    //check if the request has token
    let token;
    try{
        token=request.get("authorization").split(" ")[1];
        let decodetdToken= jwt.verify(token,process.env.SECRET_KEY);
        // console.log(decodetdToken)
        //  request.decodetdObject=decodetdToken;
        request.id = decodetdToken.id;
        request.role = decodetdToken.role;
        next();
        

    }catch(error)
    {
        error.status=401;
        error.message="Unauthorized";
        next(error);
    }

}

module.exports.isAdmin = (request,repsone,next)=>{

    if(request.role == "admin")
        next()
    else
    {
        let error=new Error("not Authorized");
        error.status=403;
        next(error);
    }
}

module.exports.checkAdminOrTeacher = (request,response,next)=>{
    
    if(request.role == "admin" || request.role == "teacher"){
        next();
    }else{
        let error = new Error("not Authorized");
        error.status=403;
        next(error);
    }
}

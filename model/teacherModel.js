const mongoose=require("mongoose");

const schema = new mongoose.Schema({
  _id:{
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  fullName:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true,
    length:{min:8}
  },
  email:{
    type:String,
    required:true,
    unique: [true, "Email must be unique"],
    trim:true,
    match:[
        /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
        'Please fill a valid email address'
    ]
  },
  
  image:{
    type:String,
  },

});

mongoose.model("teacher",schema);
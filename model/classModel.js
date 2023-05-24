const mongoose=require("mongoose");
const autoIncrement = require('@alec016/mongoose-autoincrement');
autoIncrement.initialize(mongoose.connection);

const schemaClass=new mongoose.Schema({
   _id:Number,
   name:{type:String,required:true},
   supervisor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'teacher',
    required:true
   } ,
   children:{
    type:[Number],
    ref:'children',
    required:true
   } 


})

schemaClass.plugin(autoIncrement.plugin, {
  model: 'class',
  field: '_id',
  startAt: 1,
  incrementBy: 1,
  unique:true
})


mongoose.model("class",schemaClass);
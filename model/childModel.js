const mongoose=require("mongoose");

const autoIncrement = require('@alec016/mongoose-autoincrement');
autoIncrement.initialize(mongoose.connection);


const schemaAdress=new mongoose.Schema({
    city:{
      type:String,
      required: true,
    },
    street:{
      type:String,
      required: true,
    },
    building:{
      type:Number,
      required: true,
    }
},{ _id: false })

const schema=new mongoose.Schema({
    _id:Number,
    fullName:{type:String,required:true},
    age:{type:Number},
    level:{type:String,enum:["PreKG","KG1","KG2"]},
    address:{type:schemaAdress}
})

schema.plugin(autoIncrement.plugin, {
  model: 'children',
  field: '_id',
  startAt: 1,
  incrementBy: 1,
  unique:true
})

mongoose.model("children", schema);








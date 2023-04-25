const mongoose= require("mongoose")
const userSchema= new mongoose.Schema({
    name:String,
    pin:Number,
    Address:String,
    Address:String,
    city:String,
    state:String,
    email:String,
    phone:String,
    links:[String],
    type: String, 
    enum: ['shop', 'customer', ], // enum values
    required: true
  

})
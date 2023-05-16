

const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{ type:String, required:true },
    email:String,
    phone:String,
    addressLine1:String,
    addressLine2:String,
    city:String,
    state:String,
    pin:Number,
    
    links:[String],
    type: { type:String, enum:["shop","customer"], required:true, default:"customer"}
});


module.exports = mongoose.model('User', userSchema);
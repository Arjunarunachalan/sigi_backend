const mongoose= require("mongoose")
const productSchema= new mongoose.Schema({
    name:String,
    price:float,
    discription:String,
    image:String,
    shopId:ObjectId(String)
    
  

})
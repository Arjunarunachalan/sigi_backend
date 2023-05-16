

const mongoose = require("mongoose")
const { Schema } = mongoose;

const productSchema = new Schema({
    name:{ type:String, required:true },
    price:Number,
    description:String,
    image:String,
    shopId: {type:Schema.Types.ObjectId, ref:"User"},
});


module.exports = mongoose.model('Products', productSchema);